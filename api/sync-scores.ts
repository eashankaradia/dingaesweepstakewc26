// Vercel Serverless Function: /api/sync-scores.ts
// Put this file at: api/sync-scores.ts
// Required Vercel Environment Variable:
// FOOTBALL_API_KEY = your API-Football key
//
// This version is API-only. It contains ZERO hardcoded scores/fallbacks.

const WORLD_CUP_LEAGUE_ID = 1;
const WORLD_CUP_SEASON = 2026;

const normalizeName = (name = "") =>
  String(name)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.'’]/g, "")
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
    .replace(/\bcongo dr\b/g, "dr congo")
    .replace(/\bdemocratic republic of congo\b/g, "dr congo")
    .replace(/\bbosnia and herz\.?\b/g, "bosnia and herzegovina")
    .replace(/\bbosnia herzegovina\b/g, "bosnia and herzegovina")
    .replace(/\s+/g, " ")
    .trim();

const parseDate = (shortDate: string) => {
  // Converts "Jun 11" to "2026-06-11"
  const d = new Date(`${shortDate}, 2026 12:00:00 UTC`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
};

const isFinished = (status: string) =>
  ["FT", "AET", "PEN"].includes(String(status || "").toUpperCase());

const getGoals = (fixture: any) => {
  const home = fixture?.goals?.home;
  const away = fixture?.goals?.away;
  if (!Number.isInteger(home) || !Number.isInteger(away)) return null;
  return { home, away };
};

const looksLikeWorldCup = (fixture: any) => {
  const leagueName = normalizeName(fixture?.league?.name || "");
  return leagueName.includes("world cup") || leagueName.includes("fifa world cup");
};

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

const addGroupResult = (g: any[], pendingGroupForDate: any[], fx: any) => {
  const localGroup = findGroupMatch(pendingGroupForDate, fx);
  if (!localGroup) return false;
  if (g.some(([id]) => id === localGroup.id)) return false;

  const goals = getGoals(fx);
  if (!goals) return false;

  const apiHome = normalizeName(fx?.teams?.home?.name);
  const localHome = normalizeName(localGroup.homeName);
  const sameOrder = apiHome === localHome;

  g.push(
    sameOrder
      ? [localGroup.id, goals.home, goals.away]
      : [localGroup.id, goals.away, goals.home]
  );

  return true;
};

async function fetchJson(url: string, apiKey: string) {
  const resp = await fetch(url, {
    headers: {
      "x-apisports-key": apiKey,
    },
  });

  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(
      data?.message || data?.errors || `API-Football request failed: ${resp.status}`
    );
  }

  return data;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  try {
    const apiKey = process.env.FOOTBALL_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing FOOTBALL_API_KEY in Vercel Environment Variables",
      });
    }

    const pendingGroup = Array.isArray(req.body?.pendingGroup)
      ? req.body.pendingGroup
      : [];

    // Knockout sync is intentionally left empty until knockout teams are known.
    // Your frontend already lets you pick knockout teams manually.
    const k: any[] = [];
    const g: any[] = [];

    const dates = [
      ...new Set(pendingGroup.map((m) => parseDate(m.date)).filter(Boolean)),
    ];

    const debug: any = {
      mode: "API_ONLY_NO_HARDCODED_SCORES",
      datesChecked: dates,
      primaryFixturesSeen: 0,
      primaryFinishedSeen: 0,
      broadFixturesSeen: 0,
      broadFinishedWorldCupSeen: 0,
      matchedGroupResults: 0,
      sampleApiFixtures: [],
    };

    for (const date of dates) {
      const pendingGroupForDate = pendingGroup.filter(
        (m) => parseDate(m.date) === date
      );

      // First try the precise World Cup query.
      const primaryUrl =
        `https://v3.football.api-sports.io/fixtures?league=${WORLD_CUP_LEAGUE_ID}` +
        `&season=${WORLD_CUP_SEASON}&date=${date}`;

      const primaryData = await fetchJson(primaryUrl, apiKey);
      const primaryFixtures = Array.isArray(primaryData.response)
        ? primaryData.response
        : [];

      debug.primaryFixturesSeen += primaryFixtures.length;

      for (const fx of primaryFixtures) {
        if (debug.sampleApiFixtures.length < 8) {
          debug.sampleApiFixtures.push({
            source: "primary",
            date,
            league: fx?.league?.name,
            status: fx?.fixture?.status?.short,
            home: fx?.teams?.home?.name,
            away: fx?.teams?.away?.name,
            goals: fx?.goals,
          });
        }

        if (!isFinished(fx?.fixture?.status?.short)) continue;
        debug.primaryFinishedSeen++;

        if (addGroupResult(g, pendingGroupForDate, fx)) {
          debug.matchedGroupResults++;
        }
      }

      // If the precise query returns nothing useful, try a broader date query.
      // This still uses API data only; it just filters the returned fixtures to World Cup.
      if (!g.some(([id]) => pendingGroupForDate.some((m) => m.id === id))) {
        const broadUrl = `https://v3.football.api-sports.io/fixtures?date=${date}`;
        const broadData = await fetchJson(broadUrl, apiKey);
        const broadFixtures = Array.isArray(broadData.response)
          ? broadData.response
          : [];

        debug.broadFixturesSeen += broadFixtures.length;

        for (const fx of broadFixtures) {
          if (debug.sampleApiFixtures.length < 8) {
            debug.sampleApiFixtures.push({
              source: "broad",
              date,
              league: fx?.league?.name,
              status: fx?.fixture?.status?.short,
              home: fx?.teams?.home?.name,
              away: fx?.teams?.away?.name,
              goals: fx?.goals,
            });
          }

          if (!looksLikeWorldCup(fx)) continue;
          if (!isFinished(fx?.fixture?.status?.short)) continue;
          debug.broadFinishedWorldCupSeen++;

          if (addGroupResult(g, pendingGroupForDate, fx)) {
            debug.matchedGroupResults++;
          }
        }
      }
    }

    console.log("sync-scores debug", JSON.stringify(debug, null, 2));

    return res.status(200).json({
      g,
      k,
      debug,
      message:
        g.length || k.length
          ? undefined
          : "No API-matched finished World Cup results found. Check Vercel function logs for sampleApiFixtures.",
    });
  } catch (err: any) {
    console.error("sync-scores failed:", err);
    return res.status(500).json({
      error: err?.message || "Failed to sync scores from API-Football",
    });
  }
}
