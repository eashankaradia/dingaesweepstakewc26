let cachedResponse = null;
let cachedAt = 0;
let nextRefreshAt = 0;

const CACHE_MS = 5 * 60 * 1000;

const OWNER = "eashankaradia";
const REPO = "dingaesweepstakewc26";
const BRANCH = "main";
const CACHE_FILE = "public/matches-cache.json";

async function writeMatchesCache(matches, meta, nextRefreshAtMs) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return;
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "dingae-sweepstake",
      Accept: "application/vnd.github+json",
    };
    const metaRes = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${CACHE_FILE}?ref=${BRANCH}`,
      { headers }
    );
    const sha = metaRes.ok ? (await metaRes.json()).sha : undefined;
    const body = {
      message: "Update matches cache",
      content: Buffer.from(JSON.stringify({
        matches,
        meta,
        cachedAt: new Date().toISOString(),
        nextRefreshAt: new Date(nextRefreshAtMs).toISOString(),
      }, null, 2) + "\n").toString("base64"),
      branch: BRANCH,
    };
    if (sha) body.sha = sha;
    await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${CACHE_FILE}`,
      { method: "PUT", headers, body: JSON.stringify(body) }
    );
  } catch {
    // non-blocking
  }
}

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
  "Bosnia & Herz.": "BIH",
  Bosnia: "BIH",
  "Bosnia-Herzegovina": "BIH",
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
  "Cape Verde Island": "CPV",
  "Cape Verde Islands": "CPV",
  "Cabo Verde": "CPV",
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
  MEX: "Mexico", RSA: "South Africa", KOR: "South Korea", CZE: "Czechia",
  CAN: "Canada", SUI: "Switzerland", QAT: "Qatar", BIH: "Bosnia and Herzegovina",
  BRA: "Brazil", MAR: "Morocco", SCO: "Scotland", HAI: "Haiti",
  USA: "United States", AUS: "Australia", PAR: "Paraguay", TUR: "Türkiye",
  GER: "Germany", ECU: "Ecuador", CIV: "Ivory Coast", CUW: "Curaçao",
  NED: "Netherlands", JPN: "Japan", TUN: "Tunisia", SWE: "Sweden",
  BEL: "Belgium", IRN: "Iran", EGY: "Egypt", NZL: "New Zealand",
  ESP: "Spain", URU: "Uruguay", KSA: "Saudi Arabia", CPV: "Cape Verde",
  FRA: "France", SEN: "Senegal", NOR: "Norway", IRQ: "Iraq",
  ARG: "Argentina", AUT: "Austria", ALG: "Algeria", JOR: "Jordan",
  POR: "Portugal", COL: "Colombia", UZB: "Uzbekistan", COD: "DR Congo",
  ENG: "England", CRO: "Croatia", PAN: "Panama", GHA: "Ghana",
};

const GROUP_FIXTURES = [
  ["g1","2026-06-11","MEX","RSA","Group A","ITV1 / ITVX"],
  ["g2","2026-06-11","KOR","CZE","Group A","ITV1 / ITVX"],
  ["g3","2026-06-12","CAN","BIH","Group B","BBC One / iPlayer"],
  ["g4","2026-06-12","USA","PAR","Group D","BBC One / iPlayer"],
  ["g5","2026-06-13","BRA","MAR","Group C","BBC One / iPlayer"],
  ["g6","2026-06-13","AUS","TUR","Group D","ITV1 / ITVX"],
  ["g7","2026-06-13","HAI","SCO","Group C","BBC One / iPlayer"],
  ["g8","2026-06-13","QAT","SUI","Group B","ITV1 / ITVX"],
  ["g9","2026-06-14","GER","CUW","Group E","ITV1 / ITVX"],
  ["g10","2026-06-14","CIV","ECU","Group E","BBC One / iPlayer"],
  ["g11","2026-06-14","NED","JPN","Group F","ITV1 / ITVX"],
  ["g12","2026-06-14","SWE","TUN","Group F","ITV1 / ITVX"],
  ["g13","2026-06-15","ESP","CPV","Group H","ITV1 / ITVX"],
  ["g14","2026-06-15","BEL","EGY","Group G","BBC One / iPlayer"],
  ["g15","2026-06-15","KSA","URU","Group H","ITV1 / ITVX"],
  ["g16","2026-06-15","IRN","NZL","Group G","BBC One / iPlayer"],
  ["g17","2026-06-16","FRA","SEN","Group I","BBC One / iPlayer"],
  ["g18","2026-06-16","IRQ","NOR","Group I","BBC One / iPlayer"],
  ["g19","2026-06-16","ARG","ALG","Group J","ITV1 / ITVX"],
  ["g20","2026-06-16","AUT","JOR","Group J","BBC One / iPlayer"],
  ["g21","2026-06-17","POR","COD","Group K","BBC One / iPlayer"],
  ["g22","2026-06-17","ENG","CRO","Group L","ITV1 / ITVX"],
  ["g23","2026-06-17","GHA","PAN","Group L","ITV1 / ITVX"],
  ["g24","2026-06-17","UZB","COL","Group K","BBC One / iPlayer"],
  ["g25","2026-06-18","CZE","RSA","Group A","BBC One / iPlayer"],
  ["g26","2026-06-18","SUI","BIH","Group B","ITV1 / ITVX"],
  ["g27","2026-06-18","CAN","QAT","Group B","ITV1 / ITVX"],
  ["g28","2026-06-18","MEX","KOR","Group A","BBC One / iPlayer"],
  ["g29","2026-06-19","USA","AUS","Group D","BBC One / iPlayer"],
  ["g30","2026-06-19","SCO","MAR","Group C","ITV1 / ITVX"],
  ["g31","2026-06-19","BRA","HAI","Group C","ITV1 / ITVX"],
  ["g32","2026-06-19","TUR","PAR","Group D","ITV1 / ITVX"],
  ["g33","2026-06-20","NED","SWE","Group F","BBC One / iPlayer"],
  ["g34","2026-06-20","GER","CIV","Group E","ITV1 / ITVX"],
  ["g35","2026-06-20","ECU","CUW","Group E","BBC One / iPlayer"],
  ["g36","2026-06-20","TUN","JPN","Group F","BBC One / iPlayer"],
  ["g37","2026-06-21","ESP","KSA","Group H","BBC One / iPlayer"],
  ["g38","2026-06-21","BEL","IRN","Group G","ITV1 / ITVX"],
  ["g39","2026-06-21","URU","CPV","Group H","BBC One / iPlayer"],
  ["g40","2026-06-21","NZL","EGY","Group G","ITV1 / ITVX"],
  ["g41","2026-06-22","ARG","AUT","Group J","BBC One / iPlayer"],
  ["g42","2026-06-22","FRA","IRQ","Group I","BBC One / iPlayer"],
  ["g43","2026-06-22","NOR","SEN","Group I","ITV1 / ITVX"],
  ["g44","2026-06-22","JOR","ALG","Group J","ITV1 / ITVX"],
  ["g45","2026-06-23","POR","UZB","Group K","ITV1 / ITVX"],
  ["g46","2026-06-23","ENG","GHA","Group L","BBC One / iPlayer"],
  ["g47","2026-06-23","PAN","CRO","Group L","BBC One / iPlayer"],
  ["g48","2026-06-23","COL","COD","Group K","ITV1 / ITVX"],
  ["g49","2026-06-24","CZE","MEX","Group A","BBC One / iPlayer"],
  ["g50","2026-06-24","RSA","KOR","Group A","BBC Two / iPlayer"],
  ["g51","2026-06-24","SUI","CAN","Group B","ITV1 / ITVX"],
  ["g52","2026-06-24","BIH","QAT","Group B","ITV4 / ITVX"],
  ["g53","2026-06-24","SCO","BRA","Group C","BBC One / iPlayer"],
  ["g54","2026-06-24","MAR","HAI","Group C","BBC Two / iPlayer"],
  ["g55","2026-06-25","TUR","USA","Group D","ITV1 / ITVX"],
  ["g56","2026-06-25","PAR","AUS","Group D","ITV4 / ITVX"],
  ["g57","2026-06-25","GER","ECU","Group E","BBC One / iPlayer"],
  ["g58","2026-06-25","CUW","CIV","Group E","BBC Two / iPlayer"],
  ["g59","2026-06-25","NED","TUN","Group F","BBC One / iPlayer"],
  ["g60","2026-06-25","JPN","SWE","Group F","BBC Two / iPlayer"],
  ["g61","2026-06-26","EGY","IRN","Group G","BBC Two / iPlayer"],
  ["g62","2026-06-26","NZL","BEL","Group G","BBC One / iPlayer"],
  ["g63","2026-06-26","ESP","URU","Group H","ITV1 / ITVX"],
  ["g64","2026-06-26","CPV","KSA","Group H","ITV4 / ITVX"],
  ["g65","2026-06-26","FRA","NOR","Group I","ITV1 / ITVX"],
  ["g66","2026-06-26","SEN","IRQ","Group I","ITV4 / ITVX"],
  ["g67","2026-06-27","PAN","ENG","Group L","ITV1 / ITVX"],
  ["g68","2026-06-27","CRO","GHA","Group L","ITV4 / ITVX"],
  ["g69","2026-06-27","COL","POR","Group K","BBC One / iPlayer"],
  ["g70","2026-06-27","COD","UZB","Group K","BBC Two / iPlayer"],
  ["g71","2026-06-27","ALG","AUT","Group J","BBC Two / iPlayer"],
  ["g72","2026-06-27","JOR","ARG","Group J","BBC One / iPlayer"],
];

const KO_FIXTURES = [
  ["m73","2026-06-28","Round of 32","Runner-up A","Runner-up B"],
  ["m74","2026-06-29","Round of 32","Winner E","3rd place"],
  ["m75","2026-06-29","Round of 32","Winner F","Runner-up C"],
  ["m76","2026-06-29","Round of 32","Winner C","Runner-up F"],
  ["m77","2026-06-30","Round of 32","Winner I","3rd place"],
  ["m78","2026-06-30","Round of 32","Runner-up E","Runner-up I"],
  ["m79","2026-06-30","Round of 32","Winner A","3rd place"],
  ["m80","2026-07-01","Round of 32","TBD","TBD"],
  ["m81","2026-07-01","Round of 32","TBD","TBD"],
  ["m82","2026-07-01","Round of 32","TBD","TBD"],
  ["m83","2026-07-02","Round of 32","TBD","TBD"],
  ["m84","2026-07-02","Round of 32","TBD","TBD"],
  ["m85","2026-07-02","Round of 32","TBD","TBD"],
  ["m86","2026-07-03","Round of 32","TBD","TBD"],
  ["m87","2026-07-03","Round of 32","TBD","TBD"],
  ["m88","2026-07-03","Round of 32","TBD","TBD"],
  ["m89","2026-07-04","Round of 16","TBD","TBD"],
  ["m90","2026-07-04","Round of 16","TBD","TBD"],
  ["m91","2026-07-05","Round of 16","TBD","TBD"],
  ["m92","2026-07-05","Round of 16","TBD","TBD"],
  ["m93","2026-07-06","Round of 16","TBD","TBD"],
  ["m94","2026-07-06","Round of 16","TBD","TBD"],
  ["m95","2026-07-07","Round of 16","TBD","TBD"],
  ["m96","2026-07-07","Round of 16","TBD","TBD"],
  ["m97","2026-07-09","Quarter-finals","TBD","TBD"],
  ["m98","2026-07-10","Quarter-finals","TBD","TBD"],
  ["m99","2026-07-11","Quarter-finals","TBD","TBD"],
  ["m100","2026-07-11","Quarter-finals","TBD","TBD"],
  ["m101","2026-07-14","Semi-finals","TBD","TBD"],
  ["m102","2026-07-15","Semi-finals","TBD","TBD"],
  ["m103","2026-07-18","Third place","TBD","TBD"],
  ["m104","2026-07-19","Final","TBD","TBD"],
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

function makePairKey(homeCode, awayCode) {
  if (!homeCode || !awayCode) return null;
  return [homeCode, awayCode].sort().join("|");
}

function makeBaseFixtures() {
  const groups = GROUP_FIXTURES.map(([id, date, h, a, round, channel]) => ({
    id,
    date: date + "T12:00:00Z",
    channel,
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

function convertStatus(status) {
  if (status === "FINISHED") return "FT";
  if (status === "IN_PLAY" || status === "LIVE") return "LIVE";
  if (status === "PAUSED") return "HT";
  if (status === "EXTRA_TIME") return "ET";
  if (status === "PENALTY_SHOOTOUT") return "PEN";
  return "NS";
}

export default async function handler(req, res) {
  try {
    const now = Date.now();
    const debugMode = req.query?.debug === "1" || req.query?.debug === "true";

if (
  !debugMode &&
  cachedResponse &&
  now < nextRefreshAt
) {
  return res.status(200).json({
    ...cachedResponse,
    meta: {
      ...cachedResponse.meta,
      cached: true,
      nextRefreshAt: new Date(nextRefreshAt).toISOString(),
      minutesUntilRefresh: Math.ceil(
        (nextRefreshAt - now) / 60000
      ),
    },
  });
}

    const apiKey = process.env.FOOTBALL_DATA_TOKEN;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing FOOTBALL_DATA_TOKEN",
        matches: [],
      });
    }

    const byKey = new Map();

    for (const f of makeBaseFixtures()) {
      const key = makePairKey(f.homeCode, f.awayCode) || f.id;
      byKey.set(key, f);
    }

    const url =
      "https://api.football-data.org/v4/competitions/WC/matches?season=2026";

    const apiRes = await fetch(url, {
      headers: {
        "X-Auth-Token": apiKey,
      },
    });

    if (!apiRes.ok) {
      const text = await apiRes.text();

      return res.status(500).json({
        error: `football-data.org failed with status ${apiRes.status}`,
        providerResponse: text,
        matches: [...byKey.values()],
        meta: {
          source: "football-data-org",
          url,
          status: apiRes.status,
          checkedAt: new Date().toISOString(),
        },
      });
    }

    const data = await apiRes.json();
    const apiMatches = Array.isArray(data.matches) ? data.matches : [];

    const apiMatched = [];
    const apiUnmapped = [];
    let apiMatchesSeen = 0;
    let apiMatchesMerged = 0;

    for (const m of apiMatches) {
      const homeName = m.homeTeam?.name;
      const awayName = m.awayTeam?.name;

      const homeCode = teamCode(homeName);
      const awayCode = teamCode(awayName);

      if (!homeCode || !awayCode) {
        if (apiUnmapped.length < 100) {
          apiUnmapped.push({
            id: m.id,
            utcDate: m.utcDate,
            status: m.status,
            home: homeName,
            away: awayName,
            homeCode,
            awayCode,
            score: m.score,
          });
        }
        continue;
      }

      apiMatchesSeen++;

      const key = makePairKey(homeCode, awayCode);
      const status = convertStatus(m.status);

      const homeGoals =
        typeof m.score?.fullTime?.home === "number"
          ? m.score.fullTime.home
          : typeof m.score?.regularTime?.home === "number"
          ? m.score.regularTime.home
          : null;

      const awayGoals =
        typeof m.score?.fullTime?.away === "number"
          ? m.score.fullTime.away
          : typeof m.score?.regularTime?.away === "number"
          ? m.score.regularTime.away
          : null;

      const merged = {
        id: m.id || key,
        date: m.utcDate || byKey.get(key)?.date || null,
        status,
        round: m.stage || m.group || byKey.get(key)?.round || "World Cup",
        league: m.competition?.name || "FIFA World Cup",
        country: "World",
        homeName,
        awayName,
        homeCode,
        awayCode,
        homeGoals,
        awayGoals,
        isFinished: status === "FT" || status === "PEN",
        isScheduled: status === "NS",
        isLive: ["LIVE", "HT", "ET"].includes(status),
        source: "football-data",
      };

      if (byKey.has(key)) {
        byKey.set(key, {
          ...byKey.get(key),
          ...merged,
        });
        apiMatchesMerged++;
      } else {
        byKey.set(`football-data-${m.id || key}`, merged);
      }

      if (apiMatched.length < 100) {
        apiMatched.push({
          key,
          home: homeName,
          away: awayName,
          homeCode,
          awayCode,
          status,
          homeGoals,
          awayGoals,
          source: byKey.has(key) ? "merged" : "extra",
        });
      }
    }

    const matches = [...byKey.values()].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const response = {
      matches,
      meta: {
        source: "football-data-org-v4",
        cached: false,
        checkedAt: new Date().toISOString(),
        count: matches.length,
        apiMatchesSeen,
        apiMatchesMerged,
        apiMatched,
        apiUnmapped,
        providerCompetition: data.competition || null,
        providerResultSet: data.resultSet || null,
      },
    };

cachedResponse = response;
cachedAt = now;
nextRefreshAt = now + CACHE_MS;

    writeMatchesCache(matches, response.meta, nextRefreshAt).catch(() => {});

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      error: err.message || "sync failed",
      matches: [],
    });
  }
}
