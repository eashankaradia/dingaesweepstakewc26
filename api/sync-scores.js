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

  const found = Object.entries(TEAM_ALIASES).find(
    ([alias]) => normalize(alias) === normalize(name)
  );

  return found ? found[1] : null;
}

function getWorldCupDates() {
  const dates = [];
  const start = new Date("2026-06-11T00:00:00Z");
  const end = new Date("2026-07-19T00:00:00Z");

  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    dates.push(d.toISOString().slice(0, 10));
  }

  return dates;
}

export default async function handler(req, res) {
  try {
    const now = Date.now();

    if (cachedResponse && now - cachedAt < CACHE_MS) {
      return res.status(200).json({
        ...cachedResponse,
        meta: { ...cachedResponse.meta, cached: true },
      });
    }

    const apiKey = process.env.FOOTBALL_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing FOOTBALL_API_KEY",
        matches: [],
      });
    }

    const dates = getWorldCupDates();
    const matches = [];

    for (const date of dates) {
      const apiRes = await fetch(
        `https://v3.football.api-sports.io/fixtures?date=${date}`,
        {
          headers: {
            "x-apisports-key": apiKey,
          },
        }
      );

      const data = await apiRes.json();
      const fixtures = data.response || [];

      for (const m of fixtures) {
        const homeName = m.teams?.home?.name;
        const awayName = m.teams?.away?.name;

        const homeCode = teamCode(homeName);
        const awayCode = teamCode(awayName);

        if (!homeCode || !awayCode) continue;

        const status = m.fixture?.status?.short;

        matches.push({
          id: m.fixture?.id,
          date: m.fixture?.date,
          status,

          league: m.league?.name,
          country: m.league?.country,

          homeName,
          awayName,
          homeCode,
          awayCode,

          homeGoals: m.goals?.home,
          awayGoals: m.goals?.away,

          isFinished: ["FT", "AET", "PEN"].includes(status),
          isScheduled: ["NS", "TBD"].includes(status),
          isLive: ["1H", "HT", "2H", "ET", "P", "LIVE"].includes(status),
        });
      }
    }

    matches.sort((a, b) => new Date(a.date) - new Date(b.date));

    const response = {
      matches,
      meta: {
        source: "api-football-all-world-cup-fixtures",
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