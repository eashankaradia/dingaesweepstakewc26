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
};

const TEAM_NAMES = {
  MEX: "Mexico",
  RSA: "South Africa",
  KOR: "South Korea",
  CZE: "Czechia",
  CAN: "Canada",
  SUI: "Switzerland",
  QAT: "Qatar",
  BIH: "Bosnia and Herzegovina",
  BRA: "Brazil",
  MAR: "Morocco",
  SCO: "Scotland",
  HAI: "Haiti",
  USA: "United States",
  AUS: "Australia",
  PAR: "Paraguay",
  TUR: "Türkiye",
  GER: "Germany",
  ECU: "Ecuador",
  CIV: "Ivory Coast",
  CUW: "Curaçao",
  NED: "Netherlands",
  JPN: "Japan",
  TUN: "Tunisia",
  SWE: "Sweden",
  BEL: "Belgium",
  IRN: "Iran",
  EGY: "Egypt",
  NZL: "New Zealand",
  ESP: "Spain",
  URU: "Uruguay",
  KSA: "Saudi Arabia",
  CPV: "Cape Verde",
  FRA: "France",
  SEN: "Senegal",
  NOR: "Norway",
  IRQ: "Iraq",
  ARG: "Argentina",
  AUT: "Austria",
  ALG: "Algeria",
  JOR: "Jordan",
  POR: "Portugal",
  COL: "Colombia",
  UZB: "Uzbekistan",
  COD: "DR Congo",
  ENG: "England",
  CRO: "Croatia",
  PAN: "Panama",
  GHA: "Ghana",
};

const GROUP_FIXTURES = [
  ["g1", "2026-06-11", "MEX", "RSA", "Group A"],
  ["g2", "2026-06-11", "KOR", "CZE", "Group A"],
  ["g3", "2026-06-12", "CAN", "BIH", "Group B"],
  ["g4", "2026-06-12", "USA", "PAR", "Group D"],
  ["g5", "2026-06-13", "BRA", "MAR", "Group C"],
  ["g6", "2026-06-13", "AUS", "TUR", "Group D"],
  ["g7", "2026-06-13", "HAI", "SCO", "Group C"],
  ["g8", "2026-06-13", "QAT", "SUI", "Group B"],
  ["g9", "2026-06-14", "GER", "CUW", "Group E"],
  ["g10", "2026-06-14", "CIV", "ECU", "Group E"],
  ["g11", "2026-06-14", "NED", "JPN", "Group F"],
  ["g12", "2026-06-14", "SWE", "TUN", "Group F"],
  ["g13", "2026-06-15", "ESP", "CPV", "Group H"],
  ["g14", "2026-06-15", "BEL", "EGY", "Group G"],
  ["g15", "2026-06-15", "KSA", "URU", "Group H"],
  ["g16", "2026-06-15", "IRN", "NZL", "Group G"],
  ["g17", "2026-06-16", "FRA", "SEN", "Group I"],
  ["g18", "2026-06-16", "IRQ", "NOR", "Group I"],
  ["g19", "2026-06-16", "ARG", "ALG", "Group J"],
  ["g20", "2026-06-16", "AUT", "JOR", "Group J"],
  ["g21", "2026-06-17", "POR", "COD", "Group K"],
  ["g22", "2026-06-17", "ENG", "CRO", "Group L"],
  ["g23", "2026-06-17", "GHA", "PAN", "Group L"],
  ["g24", "2026-06-17", "UZB", "COL", "Group K"],
  ["g25", "2026-06-18", "CZE", "RSA", "Group A"],
  ["g26", "2026-06-18", "SUI", "BIH", "Group B"],
  ["g27", "2026-06-18", "CAN", "QAT", "Group B"],
  ["g28", "2026-06-18", "MEX", "KOR", "Group A"],
  ["g29", "2026-06-19", "USA", "AUS", "Group D"],
  ["g30", "2026-06-19", "SCO", "MAR", "Group C"],
  ["g31", "2026-06-19", "BRA", "HAI", "Group C"],
  ["g32", "2026-06-19", "TUR", "PAR", "Group D"],
  ["g33", "2026-06-20", "NED", "SWE", "Group F"],
  ["g34", "2026-06-20", "GER", "CIV", "Group E"],
  ["g35", "2026-06-20", "ECU", "CUW", "Group E"],
  ["g36", "2026-06-20", "TUN", "JPN", "Group F"],
  ["g37", "2026-06-21", "ESP", "KSA", "Group H"],
  ["g38", "2026-06-21", "BEL", "IRN", "Group G"],
  ["g39", "2026-06-21", "URU", "CPV", "Group H"],
  ["g40", "2026-06-21", "NZL", "EGY", "Group G"],
  ["g41", "2026-06-22", "ARG", "AUT", "Group J"],
  ["g42", "2026-06-22", "FRA", "IRQ", "Group I"],
  ["g43", "2026-06-22", "NOR", "SEN", "Group I"],
  ["g44", "2026-06-22", "JOR", "ALG", "Group J"],
  ["g45", "2026-06-23", "POR", "UZB", "Group K"],
  ["g46", "2026-06-23", "ENG", "GHA", "Group L"],
  ["g47", "2026-06-23", "PAN", "CRO", "Group L"],
  ["g48", "2026-06-23", "COL", "COD", "Group K"],
  ["g49", "2026-06-24", "CZE", "MEX", "Group A"],
  ["g50", "2026-06-24", "RSA", "KOR", "Group A"],
  ["g51", "2026-06-24", "SUI", "CAN", "Group B"],
  ["g52", "2026-06-24", "BIH", "QAT", "Group B"],
  ["g53", "2026-06-24", "SCO", "BRA", "Group C"],
  ["g54", "2026-06-24", "MAR", "HAI", "Group C"],
  ["g55", "2026-06-25", "TUR", "USA", "Group D"],
  ["g56", "2026-06-25", "PAR", "AUS", "Group D"],
  ["g57", "2026-06-25", "GER", "ECU", "Group E"],
  ["g58", "2026-06-25", "CUW", "CIV", "Group E"],
  ["g59", "2026-06-25", "NED", "TUN", "Group F"],
  ["g60", "2026-06-25", "JPN", "SWE", "Group F"],
  ["g61", "2026-06-26", "EGY", "IRN", "Group G"],
  ["g62", "2026-06-26", "NZL", "BEL", "Group G"],
  ["g63", "2026-06-26", "ESP", "URU", "Group H"],
  ["g64", "2026-06-26", "CPV", "KSA", "Group H"],
  ["g65", "2026-06-26", "FRA", "NOR", "Group I"],
  ["g66", "2026-06-26", "SEN", "IRQ", "Group I"],
  ["g67", "2026-06-27", "PAN", "ENG", "Group L"],
  ["g68", "2026-06-27", "CRO", "GHA", "Group L"],
  ["g69", "2026-06-27", "COL", "POR", "Group K"],
  ["g70", "2026-06-27", "COD", "UZB", "Group K"],
  ["g71", "2026-06-27", "ALG", "AUT", "Group J"],
  ["g72", "2026-06-27", "JOR", "ARG", "Group J"],
];

const KO_FIXTURES = [
  ["m73", "2026-06-28", "Round of 32", "Runner-up A", "Runner-up B"],
  ["m74", "2026-06-29", "Round of 32", "Winner E", "3rd place"],
  ["m75", "2026-06-29", "Round of 32", "Winner F", "Runner-up C"],
  ["m76", "2026-06-29", "Round of 32", "Winner C", "Runner-up F"],
  ["m77", "2026-06-30", "Round of 32", "Winner I", "3rd place"],
  ["m78", "2026-06-30", "Round of 32", "Runner-up E", "Runner-up I"],
  ["m79", "2026-06-30", "Round of 32", "Winner A", "3rd place"],
  ["m80", "2026-07-01", "Round of 32", "TBD", "TBD"],
  ["m81", "2026-07-01", "Round of 32", "TBD", "TBD"],
  ["m82", "2026-07-01", "Round of 32", "TBD", "TBD"],
  ["m83", "2026-07-02", "Round of 32", "TBD", "TBD"],
  ["m84", "2026-07-02", "Round of 32", "TBD", "TBD"],
  ["m85", "2026-07-02", "Round of 32", "TBD", "TBD"],
  ["m86", "2026-07-03", "Round of 32", "TBD", "TBD"],
  ["m87", "2026-07-03", "Round of 32", "TBD", "TBD"],
  ["m88", "2026-07-03", "Round of 32", "TBD", "TBD"],
  ["m89", "2026-07-04", "Round of 16", "TBD", "TBD"],
  ["m90", "2026-07-04", "Round of 16", "TBD", "TBD"],
  ["m91", "2026-07-05", "Round of 16", "TBD", "TBD"],
  ["m92", "2026-07-05", "Round of 16", "TBD", "TBD"],
  ["m93", "2026-07-06", "Round of 16", "TBD", "TBD"],
  ["m94", "2026-07-06", "Round of 16", "TBD", "TBD"],
  ["m95", "2026-07-07", "Round of 16", "TBD", "TBD"],
  ["m96", "2026-07-07", "Round of 16", "TBD", "TBD"],
  ["m97", "2026-07-09", "Quarter-finals", "TBD", "TBD"],
  ["m98", "2026-07-10", "Quarter-finals", "TBD", "TBD"],
  ["m99", "2026-07-11", "Quarter-finals", "TBD", "TBD"],
  ["m100", "2026-07-11", "Quarter-finals", "TBD", "TBD"],
  ["m101", "2026-07-14", "Semi-finals", "TBD", "TBD"],
  ["m102", "2026-07-15", "Semi-finals", "TBD", "TBD"],
  ["m103", "2026-07-18", "Third place", "TBD", "TBD"],
  ["m104", "2026-07-19", "Final", "TBD", "TBD"],
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
  if (!name) return null;

  if (TEAM_ALIASES[name]) return TEAM_ALIASES[name];

  const found = Object.entries(TEAM_ALIASES).find(
    ([alias]) => normalize(alias) === normalize(name)
  );

  return found ? found[1] : null;
}

function datesBetween(start, end) {
  const dates = [];
  const s = new Date(start + "T00:00:00Z");
  const e = new Date(end + "T00:00:00Z");

  for (let d = new Date(s); d <= e; d.setUTCDate(d.getUTCDate() + 1)) {
    dates.push(d.toISOString().slice(0, 10));
  }

  return dates;
}

function makePairKey(homeCode, awayCode) {
  if (!homeCode || !awayCode) return null;
  return [homeCode, awayCode].sort().join("|");
}

function makeBaseFixtures() {
  const groups = GROUP_FIXTURES.map(([id, date, h, a, round]) => ({
    id,
    date: date + "T12:00:00Z",
    status: "NS",
    round,
    league: "FIFA World Cup",
    country: "World",
    homeName: TEAM_NAMES[h],
    awayName: TEAM_NAMES[a],
    homeCode: h,
    awayCode: a,
    homeGoals: null,
    awayGoals: null,
    isFinished: false,
    isScheduled: true,
    isLive: false,
    source: "base",
  }));

  const knockouts = KO_FIXTURES.map(([id, date, round, homeName, awayName]) => ({
    id,
    date: date + "T12:00:00Z",
    status: "NS",
    round,
    league: "FIFA World Cup",
    country: "World",
    homeName,
    awayName,
    homeCode: null,
    awayCode: null,
    homeGoals: null,
    awayGoals: null,
    isFinished: false,
    isScheduled: true,
    isLive: false,
    source: "base",
  }));

  return [...groups, ...knockouts];
}

export default async function handler(req, res) {
  try {
    const now = Date.now();
    const debugMode = req.query?.debug === "1" || req.query?.debug === "true";

    if (!debugMode && cachedResponse && now - cachedAt < CACHE_MS) {
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

    const byKey = new Map();

    for (const f of makeBaseFixtures()) {
      const key = makePairKey(f.homeCode, f.awayCode) || f.id;
      byKey.set(key, f);
    }

    const dates = datesBetween("2026-06-11", "2026-07-19");
    const debug = [];
    const apiMatched = [];
    const apiUnmapped = [];
    let apiMatchesSeen = 0;
    let apiMatchesMerged = 0;

    for (const date of dates) {
      const apiRes = await fetch(
        `https://v3.football.api-sports.io/fixtures?date=${date}`,
        {
          headers: {
            "x-apisports-key": apiKey,
          },
        }
      );

      if (!apiRes.ok) {
        debug.push({
          date,
          ok: false,
          status: apiRes.status,
          count: 0,
          sample: [],
        });
        continue;
      }

      const data = await apiRes.json();
      const fixtures = data.response || [];

      const sample = fixtures.slice(0, 30).map((f) => ({
        league: f.league?.name,
        round: f.league?.round,
        country: f.league?.country,
        home: f.teams?.home?.name,
        away: f.teams?.away?.name,
        status: f.fixture?.status?.short,
        goals: f.goals,
        homeCode: teamCode(f.teams?.home?.name),
        awayCode: teamCode(f.teams?.away?.name),
      }));

      debug.push({
        date,
        ok: true,
        count: fixtures.length,
        sample,
      });

      for (const m of fixtures) {
        const homeName = m.teams?.home?.name;
        const awayName = m.teams?.away?.name;

        const homeCode = teamCode(homeName);
        const awayCode = teamCode(awayName);

        if (!homeCode || !awayCode) {
          if (apiUnmapped.length < 100) {
            apiUnmapped.push({
              date,
              league: m.league?.name,
              round: m.league?.round,
              home: homeName,
              away: awayName,
              homeCode,
              awayCode,
              status: m.fixture?.status?.short,
              goals: m.goals,
            });
          }
          continue;
        }

        apiMatchesSeen++;

        const key = makePairKey(homeCode, awayCode);
        if (!key) continue;

        const status = m.fixture?.status?.short || "NS";

        const merged = {
          id: m.fixture?.id || key,
          date: m.fixture?.date || date + "T12:00:00Z",
          status,
          round: m.league?.round || byKey.get(key)?.round || "World Cup",
          league: m.league?.name || "FIFA World Cup",
          country: m.league?.country || "World",
          homeName,
          awayName,
          homeCode,
          awayCode,
          homeGoals: typeof m.goals?.home === "number" ? m.goals.home : null,
          awayGoals: typeof m.goals?.away === "number" ? m.goals.away : null,
          isFinished: ["FT", "AET", "PEN"].includes(status),
          isScheduled: ["NS", "TBD"].includes(status),
          isLive: ["1H", "HT", "2H", "ET", "P", "LIVE"].includes(status),
          source: "api",
        };

        if (byKey.has(key)) {
          byKey.set(key, {
            ...byKey.get(key),
            ...merged,
          });
          apiMatchesMerged++;

          if (apiMatched.length < 100) {
            apiMatched.push({
              date,
              key,
              home: homeName,
              away: awayName,
              homeCode,
              awayCode,
              status,
              goals: m.goals,
              source: "merged",
            });
          }
        } else {
          byKey.set(`api-${m.fixture?.id || key}`, merged);

          if (apiMatched.length < 100) {
            apiMatched.push({
              date,
              key,
              home: homeName,
              away: awayName,
              homeCode,
              awayCode,
              status,
              goals: m.goals,
              source: "api-extra",
            });
          }
        }
      }
    }

    const matches = [...byKey.values()].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const response = {
      matches,
      meta: {
        source: "DEBUG-LATEST-MERGE-V4-1",
        cached: false,
        checkedAt: new Date().toISOString(),
        count: matches.length,
        apiMatchesSeen,
        apiMatchesMerged,
        apiMatched,
        apiUnmapped,
        debug,
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