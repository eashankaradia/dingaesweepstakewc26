let cachedResponse = null;
let cachedAt = 0;

const CACHE_MS = 5 * 60 * 1000;

const TEAM_ALIASES = {
  Mexico: "MEX",
  "South Africa": "RSA",
  "Korea Republic": "KOR",
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
  "Korea Republic": "KOR",
"Republic of Korea": "KOR",
"South Korea": "KOR",
"Korea DPR": "KOR",

"Czech Republic": "CZE",
"Czechia": "CZE",
};

const GROUP_FIXTURES = [
  ["g1","Jun 11","MEX","RSA"],
  ["g2","Jun 11","KOR","CZE"],
  ["g3","Jun 12","CAN","BIH"],
  ["g4","Jun 12","USA","PAR"],
  ["g5","Jun 13","BRA","MAR"],
  ["g6","Jun 13","AUS","TUR"],
  ["g7","Jun 13","HAI","SCO"],
  ["g8","Jun 13","QAT","SUI"],
  ["g9","Jun 14","GER","CUW"],
  ["g10","Jun 14","CIV","ECU"],
  ["g11","Jun 14","NED","JPN"],
  ["g12","Jun 14","SWE","TUN"],
  ["g13","Jun 15","ESP","CPV"],
  ["g14","Jun 15","BEL","EGY"],
  ["g15","Jun 15","KSA","URU"],
  ["g16","Jun 15","IRN","NZL"],
  ["g17","Jun 16","FRA","SEN"],
  ["g18","Jun 16","IRQ","NOR"],
  ["g19","Jun 16","ARG","ALG"],
  ["g20","Jun 16","AUT","JOR"],
  ["g21","Jun 17","POR","COD"],
  ["g22","Jun 17","ENG","CRO"],
  ["g23","Jun 17","GHA","PAN"],
  ["g24","Jun 17","UZB","COL"]
];

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

function apiDate(dateLabel) {
  const d = new Date(`${dateLabel}, 2026 00:00:00 UTC`);
  return d.toISOString().slice(0, 10);
}

export default async function handler(req, res) {
  try {
    const now = Date.now();

    if (cachedResponse && now - cachedAt < CACHE_MS) {
      return res.status(200).json(cachedResponse);
    }

    const apiKey = process.env.FOOTBALL_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing FOOTBALL_API_KEY",
        g: [],
        k: [],
      });
    }

    const uniqueDates = [...new Set(GROUP_FIXTURES.map(m => m[1]))];

    const g = [];
    const debug = [];

    for (const label of uniqueDates) {
      const date = apiDate(label);

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

      debug.push({
        date,
        count: fixtures.length,
        sample: fixtures.slice(0, 20).map(f => ({
          home: f.teams?.home?.name,
          away: f.teams?.away?.name,
          status: f.fixture?.status?.short,
          goals: f.goals,
        })),
      });

      for (const f of fixtures) {
        const status = f.fixture?.status?.short;

        if (!["FT", "AET", "PEN"].includes(status)) {
          continue;
        }

        const homeCode = teamCode(f.teams?.home?.name);
        const awayCode = teamCode(f.teams?.away?.name);

        if (!homeCode || !awayCode) {
          continue;
        }

        const local = GROUP_FIXTURES.find(
          ([, fixtureDate, h, a]) =>
            apiDate(fixtureDate) === date &&
            h === homeCode &&
            a === awayCode
        );

        if (!local) {
          continue;
        }

        const [id] = local;

        g.push([
          id,
          f.goals.home ?? 0,
          f.goals.away ?? 0
        ]);
      }
    }

    const response = {
      g,
      k: [],
      meta: {
        source: "api-football",
        matchedResults: g.length,
        checkedAt: new Date().toISOString(),
        debug
      }
    };

    cachedResponse = response;
    cachedAt = now;

    return res.status(200).json(response);

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message || "sync failed",
      g: [],
      k: []
    });
  }
}