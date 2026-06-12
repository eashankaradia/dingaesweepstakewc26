// Vercel Serverless Function: /api/sync-scores.ts
// Put this file at: api/sync-scores.ts
// Required Vercel Environment Variable: FOOTBALL_API_KEY = your API-Football key

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
    .replace(/\bu\.s\.a\b/g, "united states")
    .replace(/\busa\b/g, "united states")
    .replace(/\bus\b/g, "united states")
    .replace(/\bunited states of america\b/g, "united states")
    .replace(/\bturkiye\b/g, "turkey")
    .replace(/\bturkey\b/g, "turkey")
    .replace(/\bczech republic\b/g, "czechia")
    .replace(/\bcote divoire\b/g, "ivory coast")
    .replace(/\bcôte divoire\b/g, "ivory coast")
    .replace(/\bcongo dr\b/g, "dr congo")
    .replace(/\bdemocratic republic of congo\b/g, "dr congo")
    .replace(/\bbosnia and herzegovina\b/g, "bosnia herz")
    .replace(/\bbosnia & herzegovina\b/g, "bosnia herz")
    .replace(/\bsouth korea\b/g, "korea republic")
    .replace(/\brepublic of korea\b/g, "korea republic")
    .replace(/\bsaudi arabia\b/g, "saudi arabia")
    .replace(/\s+/g, " ")
    .trim();

const parseDate = (shortDate: string) => {
  // "Jun 11" -> "2026-06-11"
  const d = new Date(`${shortDate}, 2026 12:00:00 UTC`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
};

const isFinished = (status: string) =>
  ["FT", "AET", "PEN"].includes(String(status || "").toUpperCase());

const fixtureNames = (fx: any) => ({
  home: fx?.teams?.home?.name || "",
  away: fx?.teams?.away?.name || "",
  status: fx?.fixture?.status?.short || "",
  goals: `${fx?.goals?.home ?? "-"}-${fx?.goals?.away ?? "-"}`,
});

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

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  try {
    const apiKey = process.env.FOOTBALL_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing FOOTBALL_API_KEY in Vercel environment variables" });
    }

    const pendingGroup = Array.isArray(req.body?.pendingGroup) ? req.body.pendingGroup : [];
    const pendingKnockout = Array.isArray(req.body?.pendingKnockout) ? req.body.pendingKnockout : [];

    const dates = [
      ...new Set(
        [...pendingGroup, ...pendingKnockout]
          .map((m) => parseDate(m.date))
          .filter(Boolean)
      ),
    ];

    if (dates.length === 0) {
      return res.status(200).json({ g: [], k: [], message: "No playable dates to check" });
    }

    const g: any[] = [];
    const k: any[] = [];
    const debug = {
      datesChecked: dates,
      apiFixturesSeen: 0,
      finishedFixturesSeen: 0,
      sampleFixtures: [] as any[],
      unmatchedFinishedFixtures: [] as any[],
    };

    for (const date of dates) {
      const url =
        `https://v3.football.api-sports.io/fixtures?league=${WORLD_CUP_LEAGUE_ID}` +
        `&season=${WORLD_CUP_SEASON}&date=${date}`;

      const apiResp = await fetch(url, {
        headers: { "x-apisports-key": apiKey },
      });

      const data = await apiResp.json();

      if (!apiResp.ok || data?.errors?.length || (data?.errors && Object.keys(data.errors).length)) {
        console.error("API-Football error:", data);
        return res.status(500).json({
          error: "API-Football returned an error",
          apiStatus: apiResp.status,
          apiErrors: data?.errors || data,
        });
      }

      const fixtures = Array.isArray(data.response) ? data.response : [];
      debug.apiFixturesSeen += fixtures.length;
      debug.sampleFixtures.push(...fixtures.slice(0, 5).map(fixtureNames));

      for (const fx of fixtures) {
        const status = fx?.fixture?.status?.short;
        if (!isFinished(status)) continue;
        debug.finishedFixturesSeen++;

        const homeGoals = fx?.goals?.home;
        const awayGoals = fx?.goals?.away;
        if (!Number.isInteger(homeGoals) || !Number.isInteger(awayGoals)) continue;

        const localGroup = findGroupMatch(
          pendingGroup.filter((m) => parseDate(m.date) === date),
          fx
        );

        if (localGroup) {
          const apiHome = normalizeName(fx.teams.home.name);
          const localHome = normalizeName(localGroup.homeName);
          const sameOrder = apiHome === localHome;

          g.push(
            sameOrder
              ? [localGroup.id, homeGoals, awayGoals]
              : [localGroup.id, awayGoals, homeGoals]
          );
        } else {
          debug.unmatchedFinishedFixtures.push(fixtureNames(fx));
        }
      }
    }

    let message = "No new finished World Cup results found";
    if (g.length || k.length) message = `Found ${g.length + k.length} result(s)`;
    else if (debug.apiFixturesSeen === 0) message = `API returned 0 World Cup fixtures for ${dates.join(", ")}`;
    else if (debug.finishedFixturesSeen === 0) message = `API returned ${debug.apiFixturesSeen} World Cup fixture(s), but none are marked finished yet`;
    else message = `API returned ${debug.finishedFixturesSeen} finished fixture(s), but none matched your app fixtures`;

    return res.status(200).json({ g, k, message, debug });
  } catch (err: any) {
    console.error("sync-scores failed:", err);
    return res.status(500).json({ error: err?.message || "Failed to sync scores" });
  }
}
