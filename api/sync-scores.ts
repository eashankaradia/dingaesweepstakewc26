// Vercel Serverless Function: /api/sync-scores.ts
// Put this file at: api/sync-scores.ts
// Required Vercel Environment Variable for live API-Football data:
// FOOTBALL_API_KEY = your API-Football key

const WORLD_CUP_LEAGUE_ID = 1;
const WORLD_CUP_SEASON = 2026;

const normalizeName = (name = "") =>
  String(name)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "")
    .replace(/'/g, "")
    .replace(/&/g, "and")
    .replace(/-/g, " ")
    .replace(/\busa\b/g, "united states")
    .replace(/\bus\b/g, "united states")
    .replace(/\bunited states of america\b/g, "united states")
    .replace(/\bkorea republic\b/g, "south korea")
    .replace(/\brepublic of korea\b/g, "south korea")
    .replace(/\bczech republic\b/g, "czechia")
    .replace(/\bturkiye\b/g, "turkey")
    .replace(/\btürkiye\b/g, "turkey")
    .replace(/\bcote divoire\b/g, "ivory coast")
    .replace(/\bcôte divoire\b/g, "ivory coast")
    .replace(/\bivory coast\b/g, "ivory coast")
    .replace(/\bdr congo\b/g, "congo dr")
    .replace(/\bdemocratic republic of congo\b/g, "congo dr")
    .replace(/\bbosnia and herz\b/g, "bosnia and herzegovina")
    .replace(/\bbosnia herzegovina\b/g, "bosnia and herzegovina")
    .replace(/\s+/g, " ")
    .trim();

const parseDate = (shortDate: string) => {
  const d = new Date(`${shortDate}, 2026 12:00:00 UTC`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
};

const isFinished = (status: string) =>
  ["FT", "AET", "PEN"].includes(String(status || "").toUpperCase());

const findGroupMatch = (pendingGroup: any[], apiFixture: any) => {
  const apiHome = normalizeName(apiFixture?.teams?.home?.name);
  const apiAway = normalizeName(apiFixture?.teams?.away?.name);

  return pendingGroup.find((m) => {
    const localHome = normalizeName(m.homeName);
    const localAway = normalizeName(m.awayName);

    return (
      (apiHome === localHome && apiAway === localAway) ||
      (apiHome === localAway && apiAway === localHome)
    );
  });
};

// Provider-lag fallback for already-verified opening matches.
// This only fills these exact finished fixtures if the live API returns nothing/misses them.
const VERIFIED_FALLBACK_RESULTS: Record<string, [number, number]> = {
  g1: [2, 0], // Mexico 2-0 South Africa
  g2: [2, 1], // South Korea 2-1 Czechia
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  try {
    const apiKey = process.env.FOOTBALL_API_KEY;
    const pendingGroup = Array.isArray(req.body?.pendingGroup) ? req.body.pendingGroup : [];
    const pendingKnockout = Array.isArray(req.body?.pendingKnockout) ? req.body.pendingKnockout : [];

    const g: any[] = [];
    const k: any[] = [];
    const debug: any = {
      datesChecked: [],
      apiFixturesSeen: 0,
      apiFinishedSeen: 0,
      matchedFromApi: 0,
      matchedFromFallback: 0,
    };

    if (apiKey) {
      const dates = [
        ...new Set(
          [...pendingGroup, ...pendingKnockout]
            .map((m) => parseDate(m.date))
            .filter(Boolean)
        ),
      ];
      debug.datesChecked = dates;

      for (const date of dates) {
        const url =
          `https://v3.football.api-sports.io/fixtures?league=${WORLD_CUP_LEAGUE_ID}` +
          `&season=${WORLD_CUP_SEASON}&date=${date}`;

        const apiResp = await fetch(url, {
          headers: { "x-apisports-key": apiKey },
        });

        const data = await apiResp.json();

        if (!apiResp.ok) {
          console.error("API-Football error:", data);
          continue;
        }

        const fixtures = Array.isArray(data.response) ? data.response : [];
        debug.apiFixturesSeen += fixtures.length;

        for (const fx of fixtures) {
          const status = fx?.fixture?.status?.short;
          if (!isFinished(status)) continue;
          debug.apiFinishedSeen++;

          const homeGoals = fx?.goals?.home;
          const awayGoals = fx?.goals?.away;
          if (!Number.isInteger(homeGoals) || !Number.isInteger(awayGoals)) continue;

          const sameDatePending = pendingGroup.filter((m) => parseDate(m.date) === date);
          const localGroup = findGroupMatch(sameDatePending, fx);
          if (!localGroup) continue;

          const alreadyAdded = g.some(([id]) => id === localGroup.id);
          if (alreadyAdded) continue;

          const apiHome = normalizeName(fx.teams.home.name);
          const localHome = normalizeName(localGroup.homeName);
          const sameOrder = apiHome === localHome;

          g.push(
            sameOrder
              ? [localGroup.id, homeGoals, awayGoals]
              : [localGroup.id, awayGoals, homeGoals]
          );
          debug.matchedFromApi++;
        }
      }
    }

    // Fallback only for matches we know are finished and only when they are still pending.
    for (const pending of pendingGroup) {
      if (!VERIFIED_FALLBACK_RESULTS[pending.id]) continue;
      if (g.some(([id]) => id === pending.id)) continue;
      const [h, a] = VERIFIED_FALLBACK_RESULTS[pending.id];
      g.push([pending.id, h, a]);
      debug.matchedFromFallback++;
    }

    return res.status(200).json({
      g,
      k,
      debug,
      message:
        g.length || k.length
          ? undefined
          : apiKey
            ? "No new finished World Cup results found"
            : "No API key found, and no fallback results matched",
    });
  } catch (err: any) {
    console.error("sync-scores failed:", err);
    return res.status(500).json({ error: err?.message || "Failed to sync scores" });
  }
}
