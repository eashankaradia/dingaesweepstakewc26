let cachedResponse = null;
let cachedAt = 0;

const CACHE_MS = 5 * 60 * 1000;

const TEAM_ALIASES = {
  Mexico: "MEX",
  "South Africa": "RSA",
  "Korea Republic": "KOR",
  "Republic of Korea": "KOR",
  "South Korea": "KOR",
  Czechia: "CZE",
  "Czech Republic": "CZE",
  Canada: "CAN",
  Switzerland: "SUI",
  Qatar: "QAT",
  "Bosnia and Herzegovina": "BIH",
  "Bosnia & Herzegovina": "BIH",
  Bosnia: "BIH",
  Brazil: "BRA",
  Morocco: "MAR",
  Scotland: "SCO",
  Haiti: "HAI",
  USA: "USA",
  "United States": "USA",
  "United States of America": "USA",
  Australia: "AUS",
  Paraguay: "PAR",
  Turkey: "TUR",
  Türkiye: "TUR",
  Germany: "GER",
  Ecuador: "ECU",
  "Ivory Coast": "CIV",
  "Côte d'Ivoire": "CIV",
  Curacao: "CUW",
  Curaçao: "CUW",
  Netherlands: "NED",
  Japan: "JPN",
  Tunisia: "TUN",
  Sweden: "SWE",
  Belgium: "BEL",
  Iran: "IRN",
  "IR Iran": "IRN",
  Egypt: "EGY",
  "New Zealand": "NZL",
  Spain: "ESP",
  Uruguay: "URU",
  "Saudi Arabia": "KSA",
  "Cape Verde": "CPV",
  France: "FRA",
  Senegal: "SEN",
  Norway: "NOR",
  Iraq: "IRQ",
  Argentina: "ARG",
  Austria: "AUT",
  Algeria: "ALG",
  Jordan: "JOR",
  Portugal: "POR",
  Colombia: "COL",
  Uzbekistan: "UZB",
  "DR Congo": "COD",
  "Congo DR": "COD",
  England: "ENG",
  Croatia: "CRO",
  Panama: "PAN",
  Ghana: "GHA",
  Ghana: "GHA",
};

function normalize(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[.'’]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function teamCode(name) {
  const direct = TEAM_ALIASES[name];
  if (direct) return direct;

  const cleaned = normalize(name);
  const found = Object.entries(TEAM_ALIASES).find(
    ([alias]) => normalize(alias) === cleaned
  );

  return found ? found[1] : null;
}

export default async function handler(req, res) {
  try {
    const now = Date.now();

    if (cachedResponse && now - cachedAt < CACHE_MS) {
      return res.status(200).json({
        ...cachedResponse,
        meta: {
          ...cachedResponse.meta,
          cached: true,
        },
      });
    }

    const apiKey = process.env.FOOTBALL_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing FOOTBALL_API_KEY",
        matches: [],
      });
    }

    const apiRes = await fetch(
      "https://v3.football.api-sports.io/fixtures?date=2026-06-11",
      {
        headers: {
          "x-apisports-key": apiKey,
        },
      }
    );

    if (!apiRes.ok) {
      return res.status(500).json({
        error: `API-Football failed with status ${apiRes.status}`,
        matches: [],
      });
    }

    const data = await apiRes.json();

    const matches = (data.response || [])
      .map((m) => {
        const homeName = m.teams?.home?.name;
        const awayName = m.teams?.away?.name;

        return {
          id: m.fixture?.id,
          date: m.fixture?.date,
          status: m.fixture?.status?.short,

          homeName,
          awayName,

          homeCode: teamCode(homeName),
          awayCode: teamCode(awayName),

          homeGoals: m.goals?.home,
          awayGoals: m.goals?.away,

          league: m.league?.name,
          country: m.league?.country,
        };
      })
      .filter((m) => {
        return (
          m.homeCode &&
          m.awayCode &&
          typeof m.homeGoals === "number" &&
          typeof m.awayGoals === "number"
        );
      });

    const response = {
      matches,
      meta: {
        source: "api-football-direct-results",
        cached: false,
        checkedAt: new Date().toISOString(),
        count: matches.length,
      },
    };

    cachedResponse = response;
    cachedAt = now;

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      error: err.message || "sync failed",
      matches: [],
    });
  }
}