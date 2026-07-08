let cachedResponse = null;
let nextRefreshAt = 0;
const CACHE_MS = 5 * 60 * 1000;

const COMPETITIONS = ["PL", "PD", "BL1", "SA", "FL1", "CL", "EL", "ECL"];
const SEASON = 2026; // 2026/27 season

// football-data.org full team name → our code
const TEAM_ALIASES = {
  // Premier League
  "Arsenal FC": "ARS",
  "Aston Villa FC": "AVL",
  "AFC Bournemouth": "BOU",
  "Brentford FC": "BRE",
  "Brighton & Hove Albion FC": "BHA",
  "Chelsea FC": "CHE",
  "Crystal Palace FC": "CRY",
  "Everton FC": "EVE",
  "Fulham FC": "FUL",
  "Ipswich Town FC": "IPS",
  "Leicester City FC": "LEI",
  "Liverpool FC": "LIV",
  "Manchester City FC": "MCI",
  "Manchester United FC": "MUN",
  "Newcastle United FC": "NEW",
  "Nottingham Forest FC": "NFO",
  "Southampton FC": "SOU",
  "Tottenham Hotspur FC": "TOT",
  "West Ham United FC": "WHU",
  "Wolverhampton Wanderers FC": "WOL",
  // La Liga
  "Deportivo Alavés": "ALA",
  "Deportivo Alaves": "ALA",
  "Athletic Club": "ATH",
  "Club Atlético de Madrid": "ATM",
  "Atlético de Madrid": "ATM",
  "FC Barcelona": "BAR",
  "Real Betis Balompié": "BET",
  "Real Betis": "BET",
  "RC Celta de Vigo": "CEL",
  "RCD Espanyol de Barcelona": "ESY",
  "Getafe CF": "GET",
  "Girona FC": "GIR",
  "CD Leganés": "LEG",
  "RCD Mallorca": "MAL",
  "CA Osasuna": "OSA",
  "Rayo Vallecano de Madrid": "RAY",
  "Real Madrid CF": "RMA",
  "Real Sociedad de Fútbol": "RSO",
  "Real Sociedad": "RSO",
  "Sevilla FC": "SEV",
  "Valencia CF": "VAL",
  "Real Valladolid CF": "VLD",
  "Villarreal CF": "VIL",
  "UD Las Palmas": "LPA",
  // Bundesliga
  "FC Augsburg": "AUG",
  "Bayer 04 Leverkusen": "B04",
  "FC Bayern München": "FCB",
  "FC Bayern Munich": "FCB",
  "VfL Bochum 1848": "BOC",
  "Borussia Dortmund": "BVB",
  "Borussia Mönchengladbach": "BMG",
  "Borussia Monchengladbach": "BMG",
  "Eintracht Frankfurt": "SGE",
  "Sport-Club Freiburg": "SCF",
  "1. FC Heidenheim 1846": "HDH",
  "TSG 1899 Hoffenheim": "TSG",
  "Holstein Kiel": "KIE",
  "1. FSV Mainz 05": "M05",
  "RB Leipzig": "RBL",
  "FC St. Pauli 1910": "PAU",
  "FC St. Pauli": "PAU",
  "VfB Stuttgart": "VFB",
  "1. FC Union Berlin": "FCU",
  "SV Werder Bremen": "SVW",
  "VfL Wolfsburg": "WOB",
  // Serie A
  "AC Milan": "MIL",
  "AS Roma": "ROM",
  "Atalanta BC": "ATA",
  "Bologna FC 1909": "BOL",
  "Cagliari Calcio": "CAG",
  "Como 1907": "CMO",
  "Empoli FC": "EMP",
  "ACF Fiorentina": "FIO",
  "Genoa CFC": "GEN",
  "Hellas Verona FC": "VER",
  "Inter Milan": "INT",
  "FC Internazionale Milano": "INT",
  "Internazionale": "INT",
  "Juventus FC": "JUV",
  "SS Lazio": "LAZ",
  "US Lecce": "LEC",
  "AC Monza": "MNZ",
  "SSC Napoli": "NAP",
  "Parma Calcio 1913": "PRM",
  "Torino FC": "TOR",
  "Udinese Calcio": "UDI",
  "Venezia FC": "VEN",
  // Ligue 1
  "AJ Auxerre": "AJA",
  "Angers SCO": "ANG",
  "AS Monaco FC": "ASM",
  "AS Saint-Étienne": "STE",
  "AS Saint-Etienne": "STE",
  "Stade Brestois 29": "BRS",
  "Le Havre AC": "LHV",
  "RC Lens": "RCL",
  "LOSC Lille": "LIL",
  "Olympique Lyonnais": "OLY",
  "Olympique de Marseille": "OM",
  "Montpellier HSC": "MPL",
  "FC Nantes": "NAN",
  "OGC Nice": "NCE",
  "Paris Saint-Germain FC": "PSG",
  "Stade de Reims": "REI",
  "Stade Rennais FC 1901": "REN",
  "Stade Rennais FC": "REN",
  "RC Strasbourg Alsace": "STR",
  "Toulouse FC": "TLS",
};

function teamCode(name) {
  if (!name) return null;
  if (TEAM_ALIASES[name]) return TEAM_ALIASES[name];
  const norm = (s) => s.replace(/\b(FC|CF|SC|AC|RC|AS|SS|SD|UD|CD|RCD|CA|SV|SL|AFC)\b\.?\s*/gi, "").trim().toLowerCase();
  const found = Object.entries(TEAM_ALIASES).find(([alias]) => norm(alias) === norm(name));
  return found ? found[1] : null;
}

function makePairKey(a, b) {
  if (!a || !b) return null;
  return [a, b].sort().join("|");
}

function convertStatus(s) {
  if (s === "FINISHED") return "FT";
  if (s === "IN_PLAY" || s === "LIVE") return "LIVE";
  if (s === "PAUSED") return "HT";
  if (s === "EXTRA_TIME") return "ET";
  if (s === "PENALTY_SHOOTOUT") return "PEN";
  return "NS";
}

function normalizeRound(stage) {
  const map = {
    LEAGUE_STAGE: "League Phase",
    LAST_32: "Round of 32", LAST_16: "Round of 16",
    QUARTER_FINALS: "Quarter-finals", SEMI_FINALS: "Semi-finals",
    THIRD_PLACE: "Third place", FINAL: "Final",
    REGULAR_SEASON: "Regular Season",
    GROUP_STAGE: "Group Stage",
  };
  return map[stage] || stage || "Unknown";
}

export default async function handler(req, res) {
  try {
    const now = Date.now();
    const debug = req.query?.debug === "1";

    if (!debug && cachedResponse && now < nextRefreshAt) {
      return res.status(200).json({ ...cachedResponse, meta: { ...cachedResponse.meta, cached: true } });
    }

    const apiKey = process.env.FOOTBALL_DATA_TOKEN;
    if (!apiKey) return res.status(500).json({ error: "Missing FOOTBALL_DATA_TOKEN", matches: [] });

    // Fetch all competitions concurrently
    const fetches = await Promise.all(
      COMPETITIONS.map(async (comp) => {
        try {
          const url = `https://api.football-data.org/v4/competitions/${comp}/matches?season=${SEASON}`;
          const r = await fetch(url, { headers: { "X-Auth-Token": apiKey } });
          if (!r.ok) return { comp, error: `HTTP ${r.status}`, matches: [] };
          const data = await r.json();
          return { comp, matches: Array.isArray(data.matches) ? data.matches : [] };
        } catch (e) {
          return { comp, error: e.message, matches: [] };
        }
      })
    );

    const byKey = new Map();
    const unmapped = [];
    const compErrors = {};
    let seen = 0;

    for (const { comp, matches, error } of fetches) {
      if (error) { compErrors[comp] = error; continue; }
      for (const m of matches) {
        const hc = teamCode(m.homeTeam?.name);
        const ac = teamCode(m.awayTeam?.name);

        if (!hc || !ac) {
          if (unmapped.length < 100) unmapped.push({ comp, home: m.homeTeam?.name, away: m.awayTeam?.name });
          continue;
        }
        seen++;

        const key = makePairKey(hc, ac);
        const status = convertStatus(m.status);
        const duration = m.score?.duration || null;
        const isET = duration === "EXTRA_TIME" || duration === "PENALTY_SHOOTOUT";

        const hg = isET
          ? (m.score?.extraTime?.home ?? m.score?.regularTime?.home ?? m.score?.fullTime?.home ?? null)
          : (m.score?.fullTime?.home ?? m.score?.regularTime?.home ?? null);
        const ag = isET
          ? (m.score?.extraTime?.away ?? m.score?.regularTime?.away ?? m.score?.fullTime?.away ?? null)
          : (m.score?.fullTime?.away ?? m.score?.regularTime?.away ?? null);

        const entry = {
          id: m.id,
          date: m.utcDate,
          comp,
          round: normalizeRound(m.stage),
          matchday: m.matchday || null,
          status,
          homeCode: hc, homeName: m.homeTeam?.name,
          awayCode: ac, awayName: m.awayTeam?.name,
          homeGoals: typeof hg === "number" ? hg : null,
          awayGoals: typeof ag === "number" ? ag : null,
          penaltyHomeGoals: typeof m.score?.penalties?.home === "number" ? m.score.penalties.home : null,
          penaltyAwayGoals: typeof m.score?.penalties?.away === "number" ? m.score.penalties.away : null,
          apiWinner: m.score?.winner && m.score.winner !== "DRAW" ? m.score.winner : null,
          duration,
          isFinished: ["FT", "AET", "PEN"].includes(status),
          isLive: ["LIVE", "HT", "ET"].includes(status),
        };

        // If same fixture appears in multiple comps (shouldn't happen), prefer finished
        if (!byKey.has(key) || (entry.isFinished && !byKey.get(key).isFinished)) {
          byKey.set(key, entry);
        }
      }
    }

    const matches = [...byKey.values()].sort((a, b) => new Date(a.date) - new Date(b.date));

    const response = {
      matches,
      meta: {
        source: "football-data-org-v4",
        cached: false,
        season: SEASON,
        competitions: COMPETITIONS,
        checkedAt: new Date().toISOString(),
        count: matches.length,
        seen,
        compErrors: Object.keys(compErrors).length ? compErrors : undefined,
        unmappedCount: unmapped.length,
        unmapped,
      },
    };

    cachedResponse = response;
    nextRefreshAt = now + CACHE_MS;
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message || "sync failed", matches: [] });
  }
}
