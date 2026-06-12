// Vercel Serverless Function: /api/sync-scores.ts
// Put this file at: api/sync-scores.ts
//
// Required Vercel Environment Variable:
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
    .replace(/\busa\b/g, "united states")
    .replace(/\bus\b/g, "united states")
    .replace(/\bu\.s\.\b/g, "united states")
    .replace(/\bturkiye\b/g, "turkey")
    .replace(/\btürkiye\b/g, "turkey")
    .replace(/\bczech republic\b/g, "czechia")
    .replace(/\bcote divoire\b/g, "ivory coast")
    .replace(/\bcôte divoire\b/g, "ivory coast")
    .replace(/\bdr congo\b/g, "congo dr")
    .replace(/\bdemocratic republic of congo\b/g, "congo dr")
    .replace(/\bbosnia & herzegovina\b/g, "bosnia and herzegovina")
    .replace(/\bbosnia and herz\b/g, "bosnia and herzegovina")
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

    for (const date of dates) {
      const url =
        `https://v3.football.api-sports.io/fixtures?league=${WORLD_CUP_LEAGUE_ID}` +
        `&season=${WORLD_CUP_SEASON}&date=${date}`;

      const apiResp = await fetch(url, {
        headers: {
          "x-apisports-key": apiKey,
        },
      });

      const data = await apiResp.json();

      if (!apiResp.ok) {
        console.error("API-Football error:", data);
        continue;
      }

      const fixtures = Array.isArray(data.response) ? data.response : [];

      for (const fx of fixtures) {
        const status = fx?.fixture?.status?.short;
        if (!isFinished(status)) continue;

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
        }

        // Knockouts are hard to auto-map before teams are known. This endpoint safely avoids guessing them.
        // Once knockout teams are manually selected in the app, you can extend this similarly using selected teams.
      }
    }

    return res.status(200).json({
      g,
      k,
      message: g.length || k.length ? undefined : "No new finished World Cup results found",
    });
  } catch (err: any) {
    console.error("sync-scores failed:", err);
    return res.status(500).json({ error: err?.message || "Failed to sync scores" });
  }
}
