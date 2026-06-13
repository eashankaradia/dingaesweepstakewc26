// @ts-nocheck

import React, { useEffect, useMemo, useState } from "react";

const TEAMS = {
  MEX: ["Mexico", "🇲🇽", "A"],
  RSA: ["South Africa", "🇿🇦", "A"],
  KOR: ["South Korea", "🇰🇷", "A"],
  CZE: ["Czechia", "🇨🇿", "A"],
  CAN: ["Canada", "🇨🇦", "B"],
  SUI: ["Switzerland", "🇨🇭", "B"],
  QAT: ["Qatar", "🇶🇦", "B"],
  BIH: ["Bosnia & Herz.", "🇧🇦", "B"],
  BRA: ["Brazil", "🇧🇷", "C"],
  MAR: ["Morocco", "🇲🇦", "C"],
  SCO: ["Scotland", "🏴", "C"],
  HAI: ["Haiti", "🇭🇹", "C"],
  USA: ["United States", "🇺🇸", "D"],
  AUS: ["Australia", "🇦🇺", "D"],
  PAR: ["Paraguay", "🇵🇾", "D"],
  TUR: ["Türkiye", "🇹🇷", "D"],
  GER: ["Germany", "🇩🇪", "E"],
  ECU: ["Ecuador", "🇪🇨", "E"],
  CIV: ["Ivory Coast", "🇨🇮", "E"],
  CUW: ["Curaçao", "🇨🇼", "E"],
  NED: ["Netherlands", "🇳🇱", "F"],
  JPN: ["Japan", "🇯🇵", "F"],
  TUN: ["Tunisia", "🇹🇳", "F"],
  SWE: ["Sweden", "🇸🇪", "F"],
  BEL: ["Belgium", "🇧🇪", "G"],
  IRN: ["Iran", "🇮🇷", "G"],
  EGY: ["Egypt", "🇪🇬", "G"],
  NZL: ["New Zealand", "🇳🇿", "G"],
  ESP: ["Spain", "🇪🇸", "H"],
  URU: ["Uruguay", "🇺🇾", "H"],
  KSA: ["Saudi Arabia", "🇸🇦", "H"],
  CPV: ["Cape Verde", "🇨🇻", "H"],
  FRA: ["France", "🇫🇷", "I"],
  SEN: ["Senegal", "🇸🇳", "I"],
  NOR: ["Norway", "🇳🇴", "I"],
  IRQ: ["Iraq", "🇮🇶", "I"],
  ARG: ["Argentina", "🇦🇷", "J"],
  AUT: ["Austria", "🇦🇹", "J"],
  ALG: ["Algeria", "🇩🇿", "J"],
  JOR: ["Jordan", "🇯🇴", "J"],
  POR: ["Portugal", "🇵🇹", "K"],
  COL: ["Colombia", "🇨🇴", "K"],
  UZB: ["Uzbekistan", "🇺🇿", "K"],
  COD: ["DR Congo", "🇨🇩", "K"],
  ENG: ["England", "🏴", "L"],
  CRO: ["Croatia", "🇭🇷", "L"],
  PAN: ["Panama", "🇵🇦", "L"],
  GHA: ["Ghana", "🇬🇭", "L"],
};

const COUNTRY_NAME_FLAGS = {
  Mexico: "🇲🇽",
  "South Africa": "🇿🇦",
  "Korea Republic": "🇰🇷",
  "Republic of Korea": "🇰🇷",
  "South Korea": "🇰🇷",
  Czechia: "🇨🇿",
  "Czech Republic": "🇨🇿",
  Canada: "🇨🇦",
  Switzerland: "🇨🇭",
  Qatar: "🇶🇦",
  "Bosnia and Herzegovina": "🇧🇦",
  "Bosnia & Herzegovina": "🇧🇦",
  "Bosnia & Herz.": "🇧🇦",
  Brazil: "🇧🇷",
  Morocco: "🇲🇦",
  Scotland: "🏴",
  Haiti: "🇭🇹",
  USA: "🇺🇸",
  "United States": "🇺🇸",
  "United States of America": "🇺🇸",
  Australia: "🇦🇺",
  Paraguay: "🇵🇾",
  Turkey: "🇹🇷",
  Türkiye: "🇹🇷",
  Germany: "🇩🇪",
  Ecuador: "🇪🇨",
  "Ivory Coast": "🇨🇮",
  "Côte d'Ivoire": "🇨🇮",
  Curacao: "🇨🇼",
  Curaçao: "🇨🇼",
  Netherlands: "🇳🇱",
  Japan: "🇯🇵",
  Tunisia: "🇹🇳",
  Sweden: "🇸🇪",
  Belgium: "🇧🇪",
  Iran: "🇮🇷",
  "IR Iran": "🇮🇷",
  Egypt: "🇪🇬",
  "New Zealand": "🇳🇿",
  Spain: "🇪🇸",
  Uruguay: "🇺🇾",
  "Saudi Arabia": "🇸🇦",
  "Cape Verde": "🇨🇻",
  France: "🇫🇷",
  Senegal: "🇸🇳",
  Norway: "🇳🇴",
  Iraq: "🇮🇶",
  Argentina: "🇦🇷",
  Austria: "🇦🇹",
  Algeria: "🇩🇿",
  Jordan: "🇯🇴",
  Portugal: "🇵🇹",
  Colombia: "🇨🇴",
  Uzbekistan: "🇺🇿",
  "DR Congo": "🇨🇩",
  "Congo DR": "🇨🇩",
  England: "🏴",
  Croatia: "🇭🇷",
  Panama: "🇵🇦",
  Ghana: "🇬🇭",
};



const FIFA_RANKINGS = {
  // Exact global FIFA/Coca-Cola Men's World Ranking positions, not World Cup-only ordering.
  // Source update used: 11 June 2026.
  ARG: 1,
  ESP: 2,
  FRA: 3,
  ENG: 4,
  POR: 5,
  BRA: 6,
  MAR: 7,
  NED: 8,
  BEL: 9,
  GER: 10,
  CRO: 11,
  COL: 13,
  MEX: 14,
  SEN: 15,
  URU: 16,
  USA: 17,
  JPN: 18,
  SUI: 19,
  IRN: 20,
  TUR: 22,
  ECU: 23,
  AUT: 24,
  KOR: 25,
  AUS: 27,
  ALG: 28,
  EGY: 29,
  CAN: 30,
  NOR: 31,
  CIV: 33,
  PAN: 34,
  SWE: 38,
  CZE: 40,
  PAR: 41,
  SCO: 42,
  TUN: 45,
  COD: 46,
  UZB: 50,
  QAT: 56,
  IRQ: 57,
  RSA: 60,
  KSA: 61,
  JOR: 63,
  BIH: 64,
  CPV: 67,
  GHA: 73,
  CUW: 82,
  HAI: 83,
  NZL: 85,
};

function fifaRankScore(tid) {
  const rank = FIFA_RANKINGS[tid] || 211;
  return Math.max(1, 212 - rank);
}

function fifaStrengthScore(tid) {
  const rank = FIFA_RANKINGS[tid] || 211;
  // 100 = best team in the world, ~1 = lowest ranked teams.
  return Math.max(1, Math.round(((212 - rank) / 211) * 100));
}

const TEAM_IDS = Object.keys(TEAMS);
const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
const PLAYER_COLORS = [
  "#E8B33B",
  "#6FB8E8",
  "#E0635C",
  "#B08FE0",
  "#7CCB8F",
  "#E889B8",
];
const DEFAULT_PLAYERS = [
  "Eashan",
  "Vishal",
  "Dillan",
  "Shivam",
  "Adam",
  "Tarnraj",
];
const DEFAULT_OWNERSHIP = {
  GHA: 0,
  ESP: 0,
  MAR: 0,
  SWE: 0,
  COD: 0,
  URU: 0,
  NED: 0,
  BIH: 0,
  NOR: 1,
  CPV: 1,
  FRA: 1,
  QAT: 1,
  POR: 1,
  AUT: 1,
  SCO: 1,
  CAN: 1,
  PAN: 2,
  IRN: 2,
  TUR: 2,
  ECU: 2,
  NZL: 2,
  BEL: 2,
  EGY: 2,
  SEN: 2,
  SUI: 3,
  AUS: 3,
  ARG: 3,
  UZB: 3,
  USA: 3,
  IRQ: 3,
  RSA: 3,
  KOR: 3,
  HAI: 4,
  COL: 4,
  CIV: 4,
  JPN: 4,
  CZE: 4,
  ENG: 4,
  CUW: 4,
  CRO: 4,
  KSA: 5,
  GER: 5,
  ALG: 5,
  TUN: 5,
  PAR: 5,
  MEX: 5,
  BRA: 5,
  JOR: 5,
};
const STORE_KEY = "dingae-sweepstake-api-source-v1";

const blankState = () => ({
  players: DEFAULT_PLAYERS.map((name, id) => ({ id, name })),
  ownership: { ...DEFAULT_OWNERSHIP },
  locked: true,
  apiMatches: [],
  apiMeta: null,
  lastSync: 0,
  nextRefreshAt: 0,
});

function flagForTeam(code, name, fallback = "🏳️") {
  return TEAMS[code]?.[1] || COUNTRY_NAME_FLAGS[name] || fallback;
}

function nameFor(code, fallback) {
  return TEAMS[code]?.[0] || fallback || code || "Unknown";
}

function gdText(value) {
  return value > 0 ? `+${value}` : String(value || 0);
}

function isFinished(match) {
  return match?.isFinished || ["FT", "AET", "PEN"].includes(match?.status);
}

function isLive(match) {
  return (
    match?.isLive ||
    ["1H", "HT", "2H", "ET", "P", "LIVE"].includes(match?.status)
  );
}

function isGroupMatch(match) {
  return String(match?.round || match?.league || "")
    .toLowerCase()
    .includes("group");
}

function groupForMatch(match) {
  const round = String(match?.round || "");
  const direct = round.match(/Group\s+([A-L])/i);
  if (direct) return direct[1].toUpperCase();

  const homeGroup = TEAMS[match?.homeCode]?.[2];
  const awayGroup = TEAMS[match?.awayCode]?.[2];
  if (homeGroup && homeGroup === awayGroup) return homeGroup;

  return "KO";
}

function localDateKey(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function minutesUntil(value) {
  const ts = typeof value === "number" ? value : new Date(value || 0).getTime();
  if (!ts || Number.isNaN(ts)) return 0;
  return Math.max(0, Math.ceil((ts - Date.now()) / 60000));
}

function resultFor(match, side) {
  if (match.homeGoals === match.awayGoals) return "d";
  if (side === "home") return match.homeGoals > match.awayGoals ? "w" : "l";
  return match.awayGoals > match.homeGoals ? "w" : "l";
}

function baseTeamStats() {
  return Object.fromEntries(
    TEAM_IDS.map((tid) => [
      tid,
      { tid, gp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    ]),
  );
}

export default function App() {
  const [state, setState] = useState(blankState);
  const [tab, setTab] = useState("draft");
  const [expanded, setExpanded] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");
  const [resultFilter, setResultFilter] = useState("all");
  const [resultGroupFilter, setResultGroupFilter] = useState("all");
  const [resultDateFilter, setResultDateFilter] = useState("");
  const [resultCountryFilter, setResultCountryFilter] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [nowTick, setNowTick] = useState(Date.now());
  const [editingDraft, setEditingDraft] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statsPlayer, setStatsPlayer] = useState("0");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setState((s) => ({ ...blankState(), ...JSON.parse(raw) }));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const timer = setInterval(() => setNowTick(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  const ownerOf = (tid) => {
    const pid = state.ownership[tid];
    if (pid == null) return null;
    const p = state.players.find((x) => x.id === pid);
    return p ? { ...p, color: PLAYER_COLORS[p.id] } : null;
  };

  const tournamentData = useMemo(() => {
    const teamStats = baseTeamStats();
    const futureOrLive = new Set();
    const knockedOutByKo = new Set();

    state.apiMatches.forEach((m) => {
      if (!m.homeCode || !m.awayCode) return;

      if (!isFinished(m)) {
        if (m.homeCode) futureOrLive.add(m.homeCode);
        if (m.awayCode) futureOrLive.add(m.awayCode);
        return;
      }

      if (typeof m.homeGoals !== "number" || typeof m.awayGoals !== "number")
        return;

      const h = teamStats[m.homeCode];
      const a = teamStats[m.awayCode];
      if (!h || !a) return;

      h.gp++;
      a.gp++;
      h.gf += m.homeGoals;
      h.ga += m.awayGoals;
      a.gf += m.awayGoals;
      a.ga += m.homeGoals;
      h.gd = h.gf - h.ga;
      a.gd = a.gf - a.ga;

      if (m.homeGoals > m.awayGoals) {
        h.pts += 3;
        h.w++;
        a.l++;
      } else if (m.awayGoals > m.homeGoals) {
        a.pts += 3;
        a.w++;
        h.l++;
      } else {
        h.pts += 1;
        a.pts += 1;
        h.d++;
        a.d++;
      }

      if (!isGroupMatch(m) && m.homeGoals !== m.awayGoals) {
        knockedOutByKo.add(m.homeGoals > m.awayGoals ? m.awayCode : m.homeCode);
      }
    });

    const groupTables = Object.fromEntries(
      GROUPS.map((g) => {
        const rows = TEAM_IDS.filter((tid) => TEAMS[tid][2] === g)
          .map((tid) => ({
            ...teamStats[tid],
            name: TEAMS[tid][0],
            flag: TEAMS[tid][1],
            owner: ownerOf(tid),
          }))
          .sort(
            (a, b) =>
              b.pts - a.pts ||
              b.gd - a.gd ||
              b.gf - a.gf ||
              a.name.localeCompare(b.name),
          );
        return [g, rows];
      }),
    );

    const alive = new Set();
    GROUPS.forEach((g) => {
      const rows = groupTables[g];
      const complete = rows.every((r) => r.gp >= 3);
      rows.forEach((r, idx) => {
        if (knockedOutByKo.has(r.tid)) return;
        if (futureOrLive.has(r.tid)) alive.add(r.tid);
        else if (!complete) alive.add(r.tid);
        else if (idx < 3) alive.add(r.tid); // top 2 plus possible best 3rd-place until bracket resolves
      });
    });

    return { teamStats, groupTables, alive, knockedOutByKo };
  }, [state.apiMatches, state.ownership, state.players]);

  const board = useMemo(() => {
    const rows = state.players.map((p) => ({
      ...p,
      pts: 0,
      w: 0,
      d: 0,
      l: 0,
      gp: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      alive: 0,
      teams: {},
    }));
    const byId = Object.fromEntries(rows.map((r) => [r.id, r]));

    Object.entries(state.ownership).forEach(([tid, pid]) => {
      if (byId[pid]) {
        byId[pid].teams[tid] = {
          pts: 0,
          w: 0,
          d: 0,
          l: 0,
          gf: 0,
          ga: 0,
          gd: 0,
        };
        if (tournamentData.alive.has(tid)) byId[pid].alive++;
      }
    });

    const credit = (tid, res, goalsFor, goalsAgainst) => {
      const pid = state.ownership[tid];
      const row = byId[pid];
      if (!row) return;
      if (!row.teams[tid])
        row.teams[tid] = { pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0 };
      const t = row.teams[tid];

      row.gp++;
      row.gf += goalsFor;
      row.ga += goalsAgainst;
      row.gd = row.gf - row.ga;

      t.gf += goalsFor;
      t.ga += goalsAgainst;
      t.gd = t.gf - t.ga;

      if (res === "w") {
        row.pts += 3;
        row.w++;
        t.pts += 3;
        t.w++;
      } else if (res === "d") {
        row.pts += 1;
        row.d++;
        t.pts += 1;
        t.d++;
      } else {
        row.l++;
        t.l++;
      }
    };

    state.apiMatches.forEach((m) => {
      if (!m.homeCode || !m.awayCode) return;
      if (!isFinished(m)) return;
      if (typeof m.homeGoals !== "number" || typeof m.awayGoals !== "number")
        return;
      credit(m.homeCode, resultFor(m, "home"), m.homeGoals, m.awayGoals);
      credit(m.awayCode, resultFor(m, "away"), m.awayGoals, m.homeGoals);
    });

    return rows.sort(
      (a, b) =>
        b.pts - a.pts ||
        b.gd - a.gd ||
        b.gf - a.gf ||
        a.name.localeCompare(b.name),
    );

  }, [state.players, state.ownership, state.apiMatches, tournamentData.alive]);

  const trophyChances = useMemo(() => {
    const scores = board.map((p) => {
      const aliveTeams = Object.keys(p.teams || {}).filter((tid) =>
        tournamentData.alive.has(tid),
      );

      const fifaStrength = aliveTeams.reduce(
        (sum, tid) => sum + fifaStrengthScore(tid),
        0,
      );

      const bestRank = aliveTeams.reduce(
        (best, tid) => Math.min(best, FIFA_RANKINGS[tid] || 211),
        211,
      );

      const averageRank =
        aliveTeams.length > 0
          ? Math.round(
              aliveTeams.reduce(
                (sum, tid) => sum + (FIFA_RANKINGS[tid] || 211),
                0,
              ) / aliveTeams.length,
            )
          : null;

      const bestTeamBoost = bestRank <= 5 ? 18 : bestRank <= 10 ? 12 : bestRank <= 20 ? 7 : 0;

      const raw = Math.max(
        0,
        p.pts * 4.5 +
          p.gd * 1.5 +
          p.gf * 0.75 +
          p.alive * 7 +
          fifaStrength * 0.8 +
          bestTeamBoost +
          1,
      );

      return {
        ...p,
        raw,
        fifaStrength,
        averageRank,
        bestRank: bestRank === 211 ? null : bestRank,
      };
    });

    const total = scores.reduce((sum, p) => sum + p.raw, 0) || 1;

    return scores
      .map((p) => ({ ...p, chance: Math.round((p.raw / total) * 100) }))
      .sort(
        (a, b) =>
          b.chance - a.chance ||
          b.pts - a.pts ||
          (a.averageRank || 999) - (b.averageRank || 999) ||
          a.name.localeCompare(b.name),
      );
  }, [board, tournamentData.alive]);

  const pointsRace = useMemo(() => {
    const finished = state.apiMatches
      .filter((m) => m.homeCode && m.awayCode && isFinished(m))
      .filter(
        (m) =>
          typeof m.homeGoals === "number" && typeof m.awayGoals === "number",
      )
      .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));

    const scores = Object.fromEntries(state.players.map((p) => [p.id, 0]));
    const rows = [{ game: 0, scores: { ...scores } }];

    finished.forEach((m, idx) => {
      const homeOwner = state.ownership[m.homeCode];
      const awayOwner = state.ownership[m.awayCode];
      const homeRes = resultFor(m, "home");
      const awayRes = resultFor(m, "away");

      if (homeOwner != null)
        scores[homeOwner] += homeRes === "w" ? 3 : homeRes === "d" ? 1 : 0;
      if (awayOwner != null)
        scores[awayOwner] += awayRes === "w" ? 3 : awayRes === "d" ? 1 : 0;

      rows.push({
        game: idx + 1,
        label: `${nameFor(m.homeCode, m.homeName)} v ${nameFor(m.awayCode, m.awayName)}`,
        scores: { ...scores },
      });
    });

    return rows;
  }, [state.apiMatches, state.players, state.ownership]);


  const completedMatches = useMemo(
    () =>
      state.apiMatches
        .filter((m) => m.homeCode && m.awayCode && isFinished(m))
        .filter((m) => typeof m.homeGoals === "number" && typeof m.awayGoals === "number")
        .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0)),
    [state.apiMatches],
  );

  const rankRace = useMemo(() => {
    const players = state.players;
    const scores = Object.fromEntries(players.map((p) => [p.id, { pts: 0, gf: 0, ga: 0, gd: 0, w: 0 }]));
    const rankSnapshot = (game, label = "Start") => {
      const ordered = players
        .map((p) => ({ ...p, ...scores[p.id] }))
        .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.name.localeCompare(b.name));
      const positions = {};
      ordered.forEach((p, idx) => (positions[p.id] = idx + 1));
      return { game, label, positions };
    };
    const rows = [rankSnapshot(0)];
    completedMatches.forEach((m, idx) => {
      const hOwner = state.ownership[m.homeCode];
      const aOwner = state.ownership[m.awayCode];
      const hRes = resultFor(m, "home");
      const aRes = resultFor(m, "away");
      if (hOwner != null) {
        scores[hOwner].pts += hRes === "w" ? 3 : hRes === "d" ? 1 : 0;
        scores[hOwner].gf += m.homeGoals;
        scores[hOwner].ga += m.awayGoals;
        scores[hOwner].gd = scores[hOwner].gf - scores[hOwner].ga;
        if (hRes === "w") scores[hOwner].w++;
      }
      if (aOwner != null) {
        scores[aOwner].pts += aRes === "w" ? 3 : aRes === "d" ? 1 : 0;
        scores[aOwner].gf += m.awayGoals;
        scores[aOwner].ga += m.homeGoals;
        scores[aOwner].gd = scores[aOwner].gf - scores[aOwner].ga;
        if (aRes === "w") scores[aOwner].w++;
      }
      rows.push(rankSnapshot(idx + 1, `${nameFor(m.homeCode, m.homeName)} v ${nameFor(m.awayCode, m.awayName)}`));
    });
    return rows;
  }, [completedMatches, state.players, state.ownership]);

  const outcomeMatrix = useMemo(() => {
    const rows = Object.fromEntries(state.players.map((p) => [p.id, []]));
    state.apiMatches
      .slice()
      .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0))
      .forEach((m) => {
        const sides = [
          { code: m.homeCode, side: "home", goalsFor: m.homeGoals, goalsAgainst: m.awayGoals },
          { code: m.awayCode, side: "away", goalsFor: m.awayGoals, goalsAgainst: m.homeGoals },
        ];
        sides.forEach((s) => {
          const pid = state.ownership[s.code];
          if (pid == null || !rows[pid]) return;
          let result = "future";
          if (isFinished(m) && typeof m.homeGoals === "number" && typeof m.awayGoals === "number") result = resultFor(m, s.side);
          rows[pid].push({ match: m, result, team: s.code });
        });
      });
    return rows;
  }, [state.apiMatches, state.players, state.ownership]);

  const dailyAwards = useMemo(() => {
    const byDate = {};
    completedMatches.forEach((m) => {
      const d = localDateKey(m.date) || "Unknown";
      byDate[d] = byDate[d] || Object.fromEntries(state.players.map((p) => [p.id, 0]));
      const hOwner = state.ownership[m.homeCode];
      const aOwner = state.ownership[m.awayCode];
      const hRes = resultFor(m, "home");
      const aRes = resultFor(m, "away");
      if (hOwner != null) byDate[d][hOwner] += hRes === "w" ? 3 : hRes === "d" ? 1 : 0;
      if (aOwner != null) byDate[d][aOwner] += aRes === "w" ? 3 : aRes === "d" ? 1 : 0;
    });
    const dates = Object.keys(byDate).sort();
    const latest = dates[dates.length - 1];
    if (!latest) return null;
    const sorted = state.players.map((p) => ({ ...p, points: byDate[latest][p.id] || 0 })).sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
    return { date: latest, best: sorted[0], worst: sorted[sorted.length - 1], rows: sorted };
  }, [completedMatches, state.players, state.ownership]);

  const biggestMovers = useMemo(() => {
    if (rankRace.length < 2) return [];
    const prev = rankRace[rankRace.length - 2].positions;
    const curr = rankRace[rankRace.length - 1].positions;
    return state.players
      .map((p) => ({ ...p, movement: (prev[p.id] || 0) - (curr[p.id] || 0), position: curr[p.id] }))
      .sort((a, b) => Math.abs(b.movement) - Math.abs(a.movement) || a.name.localeCompare(b.name));
  }, [rankRace, state.players]);

  const shareTableImageToWhatsApp = async () => {
    const width = 900;
    const rowH = 58;
    const headerH = 118;
    const footerH = 52;
    const rows = board.slice(0, 6);
    const height = headerH + rows.length * rowH + footerH;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0C1F15";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#E8B33B";
    ctx.font = "800 44px Arial";
    ctx.fillText("DINGAE SWEEPSTAKE", 34, 58);
    ctx.fillStyle = "#9FBFA8";
    ctx.font = "20px Arial";
    ctx.fillText(`Updated ${new Date().toLocaleString()}`, 34, 90);

    ctx.fillStyle = "#10271A";
    ctx.fillRect(24, 108, width - 48, rows.length * rowH + 12);

    rows.forEach((p, i) => {
      const y = headerH + i * rowH;
      if (i === 0 && p.pts > 0) {
        ctx.fillStyle = "rgba(232,179,59,0.14)";
        ctx.fillRect(24, y - 4, width - 48, rowH);
      }
      ctx.fillStyle = PLAYER_COLORS[p.id] || "#E8B33B";
      ctx.beginPath();
      ctx.arc(52, y + 22, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#F0EDE2";
      ctx.font = "700 24px Arial";
      ctx.fillText(`${i + 1}. ${p.name}`, 76, y + 31);

      ctx.fillStyle = "#9FBFA8";
      ctx.font = "18px Arial";
      ctx.fillText(`GP ${p.gp}   W ${p.w}   D ${p.d}   L ${p.l}   GD ${gdText(p.gd)}   Alive ${p.alive}`, 280, y + 31);

      ctx.fillStyle = "#E8B33B";
      ctx.font = "800 30px Arial";
      ctx.textAlign = "right";
      ctx.fillText(`${p.pts} pts`, width - 42, y + 34);
      ctx.textAlign = "left";
    });

    ctx.fillStyle = "#9FBFA8";
    ctx.font = "18px Arial";
    ctx.fillText("Share image generated from the live table", 34, height - 22);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], "dingae-sweepstake-table.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "Dingae Sweepstake table" });
        return;
      }
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "dingae-sweepstake-table.png";
      link.click();
      window.open("https://wa.me/?text=" + encodeURIComponent("DINGAE SWEEPSTAKE table image downloaded — attach it here."), "_blank", "noopener,noreferrer");
    }, "image/png");
  };

  const filteredMatches = useMemo(() => {
    return state.apiMatches.filter((m) => {
      if (resultFilter !== "all") {
        const pid = Number(resultFilter);
        if (state.ownership[m.homeCode] !== pid && state.ownership[m.awayCode] !== pid) {
          return false;
        }
      }

      if (resultGroupFilter !== "all" && groupForMatch(m) !== resultGroupFilter) {
        return false;
      }

      if (resultDateFilter && localDateKey(m.date) !== resultDateFilter) {
        return false;
      }

      if (resultCountryFilter !== "all" && m.homeCode !== resultCountryFilter && m.awayCode !== resultCountryFilter) {
        return false;
      }

      return true;
    });
  }, [state.apiMatches, resultFilter, resultGroupFilter, resultDateFilter, resultCountryFilter, state.ownership]);

  const countryFilterOptions = useMemo(
    () => TEAM_IDS.slice().sort((a, b) => TEAMS[a][0].localeCompare(TEAMS[b][0])),
    [],
  );

  const refreshMinutesLeft = minutesUntil(state.nextRefreshAt);
  const canRefresh = !syncing && (!state.nextRefreshAt || nowTick >= state.nextRefreshAt || state.apiMatches.length === 0);
  const refreshButtonText = syncing
    ? "Syncing…"
    : canRefresh
    ? "Update scores"
    : `Refresh in ${refreshMinutesLeft}m`;

  const runSync = async () => {
    if (syncing) return;

    if (!canRefresh) {
      setSyncMsg(`Scores can refresh again in ${refreshMinutesLeft} minute${refreshMinutesLeft === 1 ? "" : "s"}`);
      return;
    }

    setSyncing(true);
    setSyncMsg("Fetching scores…");

    try {
      const resp = await fetch("/api/sync-scores", { cache: "no-store" });
      const data = await resp.json();
      if (!resp.ok || data.error) throw new Error(data.error || "API failed");

      const matches = Array.isArray(data.matches) ? data.matches : [];
      const nextRefreshAt = data.meta?.nextRefreshAt
        ? new Date(data.meta.nextRefreshAt).getTime()
        : Date.now() + 30 * 60 * 1000;
      const minutes = data.meta?.minutesUntilRefresh || minutesUntil(nextRefreshAt);

      setState((s) => ({
        ...s,
        apiMatches: matches,
        apiMeta: data.meta || null,
        lastSync: Date.now(),
        nextRefreshAt,
      }));

      setSyncMsg(
        matches.length
          ? `${data.meta?.cached ? "Using cached" : "Loaded"} ${matches.length} fixture(s) ✓ · next refresh in ${minutes}m`
          : "Loaded 0 fixtures",
      );
    } catch (err) {
      console.error(err);
      setSyncMsg("Sync failed — check /api/sync-scores");
    }

    setSyncing(false);
  };

  const updateName = (pid, name) =>
    setState((s) => ({
      ...s,
      players: s.players.map((p) => (p.id === pid ? { ...p, name } : p)),
    }));

  const updateTeamOwner = (tid, pid) =>
    setState((s) => ({
      ...s,
      ownership: {
        ...s.ownership,
        [tid]: Number(pid),
      },
    }));

  const OwnerTag = ({ tid }) => {
    const o = ownerOf(tid);
    if (!o) return <span className="owner none">unclaimed</span>;
    return (
      <span className="owner" style={{ color: o.color }}>
        <span className="dot" style={{ background: o.color }} />
        {o.name}
      </span>
    );
  };

  const ResultRow = ({ m }) => {
    const homeFlag = flagForTeam(m.homeCode, m.homeName);
    const awayFlag = flagForTeam(m.awayCode, m.awayName);
    const statusClass = isFinished(m) ? "done" : isLive(m) ? "live" : "future";
    const hScore = typeof m.homeGoals === "number" ? m.homeGoals : "";
    const aScore = typeof m.awayGoals === "number" ? m.awayGoals : "";
    return (
      <div className="match">
        <div className="matchmeta">
          <span className={`grpbadge ${statusClass}`}>{m.status || "NS"}</span>
          <span className="city">{m.round || m.league || "World Cup"}</span>
          {m.date && (
            <span className="city">{new Date(m.date).toLocaleString()}</span>
          )}
        </div>
        <div className="scoreline">
          <div className="teamcell">
            <span className="tname">
              {homeFlag} {nameFor(m.homeCode, m.homeName)}
            </span>
            {m.homeCode ? (
              <OwnerTag tid={m.homeCode} />
            ) : (
              <span className="owner none">unmapped: {m.homeName}</span>
            )}
          </div>
          <div className="scorebox readonly">
            <span>{hScore}</span>
            <b>:</b>
            <span>{aScore}</span>
          </div>
          <div className="teamcell r">
            <span className="tname">
              {nameFor(m.awayCode, m.awayName)} {awayFlag}
            </span>
            {m.awayCode ? (
              <OwnerTag tid={m.awayCode} />
            ) : (
              <span className="owner none">unmapped: {m.awayName}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const PointsRaceChart = () => {
    const players = state.players;
    const data = pointsRace;
    const finishedCount = Math.max(0, data.length - 1);
    const maxPts = Math.max(
      3,
      ...data.flatMap((row) => players.map((p) => row.scores[p.id] || 0)),
    );

    const width = 640;
    const height = 260;
    const padL = 34;
    const padR = 14;
    const padT = 18;
    const padB = 34;
    const innerW = width - padL - padR;
    const innerH = height - padT - padB;
    const xFor = (game) =>
      padL + (finishedCount === 0 ? 0 : (game / finishedCount) * innerW);
    const yFor = (pts) => padT + innerH - (pts / maxPts) * innerH;
    const yTicks = Array.from(new Set([0, Math.ceil(maxPts / 2), maxPts]));

    return (
      <div className="chartbox">
        <div className="charthead">
          <div>
            <div className="glabel">POINTS RACE</div>
            <div className="subtle">
              Cumulative points after each completed game
            </div>
          </div>
        </div>
        {finishedCount === 0 ? (
          <div className="empty small">
            The points race will appear after finished games are loaded.
          </div>
        ) : (
          <>
            <svg
              className="racechart"
              viewBox={`0 0 ${width} ${height}`}
              role="img"
              aria-label="Points race chart"
            >
              {yTicks.map((t) => (
                <g key={t}>
                  <line
                    x1={padL}
                    x2={width - padR}
                    y1={yFor(t)}
                    y2={yFor(t)}
                    className="gridline"
                  />
                  <text
                    x={padL - 8}
                    y={yFor(t) + 4}
                    className="axistext"
                    textAnchor="end"
                  >
                    {t}
                  </text>
                </g>
              ))}
              <line
                x1={padL}
                x2={width - padR}
                y1={height - padB}
                y2={height - padB}
                className="axisline"
              />
              <line
                x1={padL}
                x2={padL}
                y1={padT}
                y2={height - padB}
                className="axisline"
              />
              {[0, Math.ceil(finishedCount / 2), finishedCount].map((t) => (
                <text
                  key={t}
                  x={xFor(t)}
                  y={height - 10}
                  className="axistext"
                  textAnchor="middle"
                >
                  {t}
                </text>
              ))}
              <text
                x={width / 2}
                y={height - 1}
                className="axislabel"
                textAnchor="middle"
              >
                Game number
              </text>
              <text
                x={10}
                y={height / 2}
                className="axislabel"
                textAnchor="middle"
                transform={`rotate(-90 10 ${height / 2})`}
              >
                Points
              </text>
              {players.map((p) => {
                const points = data
                  .map(
                    (row) => `${xFor(row.game)},${yFor(row.scores[p.id] || 0)}`,
                  )
                  .join(" ");
                const last = data[data.length - 1];
                return (
                  <g key={p.id}>
                    <polyline
                      points={points}
                      fill="none"
                      stroke={PLAYER_COLORS[p.id]}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx={xFor(last.game)}
                      cy={yFor(last.scores[p.id] || 0)}
                      r="4"
                      fill={PLAYER_COLORS[p.id]}
                    />
                  </g>
                );
              })}
            </svg>
            <div className="chartlegend">
              {players.map((p) => (
                <span key={p.id}>
                  <span
                    className="legenddot"
                    style={{ background: PLAYER_COLORS[p.id] }}
                  />
                  {p.name}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };


  const PositionRaceChart = () => {
    const players = state.players;
    const data = rankRace;
    const finishedCount = Math.max(0, data.length - 1);
    const width = 640, height = 260, padL = 34, padR = 14, padT = 18, padB = 34;
    const innerW = width - padL - padR;
    const innerH = height - padT - padB;
    const xFor = (game) => padL + (finishedCount === 0 ? 0 : (game / finishedCount) * innerW);
    const yFor = (pos) => padT + ((pos - 1) / Math.max(1, players.length - 1)) * innerH;
    return (
      <div className="chartbox">
        <div className="charthead"><div><div className="glabel">POSITION RACE</div><div className="subtle">League position after each completed game</div></div></div>
        {finishedCount === 0 ? <div className="empty small">Position race appears after completed games.</div> : (
          <>
            <svg className="racechart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Position race chart">
              {players.map((_, idx) => (
                <g key={idx + 1}>
                  <line x1={padL} x2={width - padR} y1={yFor(idx + 1)} y2={yFor(idx + 1)} className="gridline" />
                  <text x={padL - 8} y={yFor(idx + 1) + 4} className="axistext" textAnchor="end">{idx + 1}</text>
                </g>
              ))}
              <line x1={padL} x2={width - padR} y1={height - padB} y2={height - padB} className="axisline" />
              <line x1={padL} x2={padL} y1={padT} y2={height - padB} className="axisline" />
              {[0, Math.ceil(finishedCount / 2), finishedCount].map((t) => <text key={t} x={xFor(t)} y={height - 10} className="axistext" textAnchor="middle">{t}</text>)}
              <text x={width / 2} y={height - 1} className="axislabel" textAnchor="middle">Game number</text>
              <text x={10} y={height / 2} className="axislabel" textAnchor="middle" transform={`rotate(-90 10 ${height / 2})`}>Position</text>
              {players.map((p) => {
                const points = data.map((row) => `${xFor(row.game)},${yFor(row.positions[p.id] || players.length)}`).join(" ");
                const last = data[data.length - 1];
                return <g key={p.id}><polyline points={points} fill="none" stroke={PLAYER_COLORS[p.id]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><circle cx={xFor(last.game)} cy={yFor(last.positions[p.id] || players.length)} r="4" fill={PLAYER_COLORS[p.id]} /></g>;
              })}
            </svg>
            <div className="chartlegend">{players.map((p) => <span key={p.id}><span className="legenddot" style={{ background: PLAYER_COLORS[p.id] }} />{p.name}</span>)}</div>
          </>
        )}
      </div>
    );
  };

  const OutcomeDots = ({ playerId = null }) => {
    const players = playerId == null ? state.players : state.players.filter((p) => p.id === Number(playerId));
    const labelFor = { w: "Win", d: "Draw", l: "Loss", future: "Not played" };
    return (
      <div className="chartbox">
        <div className="charthead"><div><div className="glabel">RESULT DOTS</div><div className="subtle">Green win · orange draw · red loss · grey not played</div></div></div>
        <div className="dotsgrid">
          {players.map((p) => (
            <div key={p.id} className="dotrow"><span className="dotlabel"><span className="pdot solo" style={{ background: PLAYER_COLORS[p.id] }} />{p.name}</span><span className="dotsline">{(outcomeMatrix[p.id] || []).map((o, idx) => <span key={idx} title={`${labelFor[o.result]} — ${nameFor(o.team)}`} className={`outcomedot ${o.result}`} />)}</span></div>
          ))}
        </div>
      </div>
    );
  };

  const DraftRankingVisual = () => {
    const ranked = TEAM_IDS.slice().sort(
      (a, b) => (FIFA_RANKINGS[a] || 999) - (FIFA_RANKINGS[b] || 999),
    );

    return (
      <div className="chartbox">
        <div className="charthead">
          <div>
            <div className="glabel">DRAFT BY FIFA RANKING</div>
            <div className="subtle">Teams ranked by world ranking and highlighted by manager colour</div>
          </div>
        </div>
        <div className="rankinglist compact">
          <div className="rankingrow rankinghead">
            <span>No.</span>
            <span>Team</span>
            <span>FIFA</span>
            <span>Owner</span>
          </div>
          {ranked.map((tid, idx) => {
            const owner = ownerOf(tid);
            return (
              <div
                key={tid}
                className={`rankingrow ${tournamentData.alive.has(tid) ? "" : "out"}`}
                style={owner ? { borderLeftColor: owner.color, background: `${owner.color}18` } : undefined}
              >
                <span className="ranknum">{idx + 1}</span>
                <span className="rankteam">{TEAMS[tid][1]} {TEAMS[tid][0]}</span>
                <span className="rankfifa">#{FIFA_RANKINGS[tid] || "—"}</span>
                <span className="rankowner">{owner ? owner.name : "—"}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const ManagerRivalries = ({ playerId = null }) => {
    const selected = board.find((p) => p.id === Number(playerId)) || board[0];
    const rivals = board.filter((p) => !selected || p.id !== selected.id);
    if (!selected) return null;
    return (
      <div className="chartbox">
        <div className="charthead"><div><div className="glabel">MANAGER RIVALRIES</div><div className="subtle">{selected.name} versus everyone else</div></div></div>
        <div className="rivalgrid">
          {rivals.map((b) => (
            <div key={`${selected.id}-${b.id}`} className="rivalcard">
              <b>{selected.name} v {b.name}</b>
              <span>{selected.pts} - {b.pts} pts</span>
              <span>{selected.alive} - {b.alive} alive</span>
              <em>{selected.pts === b.pts ? "Level" : `${selected.pts > b.pts ? selected.name : b.name} +${Math.abs(selected.pts - b.pts)}`}</em>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const OwnershipHeatmap = ({ playerId = null }) => {
    const selectedId = playerId == null ? null : Number(playerId);
    return (
      <div className="chartbox">
        <div className="charthead">
          <div>
            <div className="glabel">OWNERSHIP HEATMAP</div>
            <div className="subtle">
              {selectedId == null ? "Every country coloured by manager" : "Only selected manager teams are highlighted"}
            </div>
          </div>
        </div>
        <div className="heatmapgrid">
          {GROUPS.map((g) => (
            <div key={g} className="heatgroup">
              <b>Group {g}</b>
              {TEAM_IDS.filter((tid) => TEAMS[tid][2] === g).map((tid) => {
                const o = ownerOf(tid);
                const highlighted = o && (selectedId == null || o.id === selectedId);
                return (
                  <span
                    key={tid}
                    className={`heatteam ${tournamentData.alive.has(tid) ? "" : "out"} ${highlighted ? "" : "mutedheat"}`}
                    style={highlighted ? { borderColor: o.color, background: `${o.color}22` } : undefined}
                  >
                    {TEAMS[tid][1]} {TEAMS[tid][0]}
                    <small>{o?.name || "—"}</small>
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const WorldCupBracket = () => {
    const knockoutMatches = state.apiMatches
      .filter((m) => !isGroupMatch(m))
      .slice()
      .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
    const rounds = ["Round of 32", "Round of 16", "Quarter-finals", "Semi-finals", "Third place", "Final"];
    const grouped = Object.fromEntries(rounds.map((r) => [r, []]));
    knockoutMatches.forEach((m) => {
      const raw = String(m.round || "");
      const rd = rounds.find((r) => raw.toLowerCase().includes(r.toLowerCase())) || raw || "Knockout";
      grouped[rd] = grouped[rd] || [];
      grouped[rd].push(m);
    });
    return (
      <div className="chartbox">
        <div className="charthead"><div><div className="glabel">WORLD CUP BRACKET</div><div className="subtle">Knockout rounds update as the API publishes fixtures</div></div></div>
        <div className="bracketgrid">
          {Object.entries(grouped).filter(([, ms]) => ms.length > 0).map(([round, ms]) => (
            <div key={round} className="bracketround">
              <b>{round}</b>
              {ms.map((m) => (
                <div key={m.id} className="bracketmatch">
                  <span>{flagForTeam(m.homeCode, m.homeName)} {nameFor(m.homeCode, m.homeName)}</span>
                  <strong>{typeof m.homeGoals === "number" ? m.homeGoals : ""} : {typeof m.awayGoals === "number" ? m.awayGoals : ""}</strong>
                  <span>{nameFor(m.awayCode, m.awayName)} {flagForTeam(m.awayCode, m.awayName)}</span>
                  <small>{m.status || "NS"}</small>
                </div>
              ))}
            </div>
          ))}
          {knockoutMatches.length === 0 && <div className="empty small">Knockout bracket will appear when available.</div>}
        </div>
      </div>
    );
  };

  const TrophyChances = () => (
    <div className="chartbox">
      <div className="charthead">
        <div>
          <div className="glabel">TROPHY CHANCES</div>
          <div className="subtle">
            Weighted by current points, GD, goals, alive teams, and actual FIFA world ranking strength
          </div>
        </div>
      </div>
      <div className="trophygrid">
        {trophyChances.map((p) => (
          <div key={p.id} className="trophyrow">
            <span>
              <span className="pdot solo" style={{ background: PLAYER_COLORS[p.id] }} />
              {p.name}
            </span>
            <div className="trophybar">
              <i style={{ width: `${Math.max(3, p.chance)}%`, background: PLAYER_COLORS[p.id] }} />
            </div>
            <b>{p.chance}%</b>
            <small>
              Avg FIFA rank {p.averageRank ? `#${p.averageRank}` : "—"} · best {p.bestRank ? `#${p.bestRank}` : "—"}
            </small>
          </div>
        ))}
      </div>
    </div>
  );

  const StatsTab = () => {
    const selected = state.players.find((p) => p.id === Number(statsPlayer)) || state.players[0];
    const selectedRow = board.find((p) => p.id === selected.id) || {
      pts: 0,
      gd: 0,
      gp: 0,
      alive: 0,
      teams: {},
    };
    const leaguePosition = Math.max(1, board.findIndex((p) => p.id === selected.id) + 1);
    const teams = TEAM_IDS.filter((tid) => state.ownership[tid] === selected.id);
    const selectedMatches = state.apiMatches
      .filter((m) => state.ownership[m.homeCode] === selected.id || state.ownership[m.awayCode] === selected.id)
      .slice()
      .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
    const calendarDays = Object.entries(
      selectedMatches.reduce((acc, m) => {
        const key = localDateKey(m.date) || "TBC";
        (acc[key] = acc[key] || []).push(m);
        return acc;
      }, {}),
    ).sort((a, b) => new Date(a[0]) - new Date(b[0]));
    const playerColor = PLAYER_COLORS[selected.id];

    return (
      <section className="pane">
        <div className="panehead">
          <h2>My stats</h2>
          <select className="filterselect small" value={statsPlayer} onChange={(e) => setStatsPlayer(e.target.value)}>
            {state.players.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        <div className="mystatcards">
          <div className="mystatcard" style={{ background: `${playerColor}2f`, borderColor: playerColor }}>
            <span>Total points</span>
            <b>{selectedRow.pts}</b>
          </div>
          <div className="mystatcard" style={{ background: `${playerColor}2f`, borderColor: playerColor }}>
            <span>League position</span>
            <b>{leaguePosition}</b>
          </div>
          <div className="mystatcard" style={{ background: `${playerColor}2f`, borderColor: playerColor }}>
            <span>Goal difference</span>
            <b>{gdText(selectedRow.gd)}</b>
          </div>
        </div>

        <div className="chartbox">
          <div className="charthead"><div><div className="glabel">{selected.name}'S TEAMS</div><div className="subtle">Points, goal difference, FIFA ranking and survival status</div></div></div>
          <div className="teamstatgrid">
            {teams
              .slice()
              .sort((a, b) => (FIFA_RANKINGS[a] || 999) - (FIFA_RANKINGS[b] || 999))
              .map((tid) => {
                const t = tournamentData.teamStats[tid];
                return (
                  <div key={tid} className={`teamstatcard ${tournamentData.alive.has(tid) ? "" : "out"}`}>
                    <b>{TEAMS[tid][1]} {TEAMS[tid][0]}</b>
                    <span>{t.pts} pts · GD {gdText(t.gd)}</span>
                    <span>FIFA rank #{FIFA_RANKINGS[tid] || "—"}</span>
                    <small>{tournamentData.alive.has(tid) ? "Still alive" : "Knocked out"}</small>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="chartbox">
          <div className="charthead"><div><div className="glabel">MY FIXTURES</div><div className="subtle">Every fixture involving {selected.name}'s teams</div></div></div>
          {selectedMatches.length === 0 ? <div className="empty small">No fixtures loaded yet.</div> : selectedMatches.map((m) => <ResultRow key={m.id} m={m} />)}
        </div>

        <div className="chartbox">
          <div className="charthead"><div><div className="glabel">MY MATCH CALENDAR</div><div className="subtle">Grouped by match date</div></div></div>
          {calendarDays.length === 0 ? (
            <div className="empty small">Calendar appears when fixtures are loaded.</div>
          ) : (
            <div className="calendarlist">
              {calendarDays.map(([day, matches]) => (
                <div key={day} className="calendarday">
                  <b>{day === "TBC" ? "TBC" : new Date(day + "T00:00:00").toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}</b>
                  <div>
                    {matches.map((m) => (
                      <span key={m.id} className={`calendarpill ${isFinished(m) ? "done" : isLive(m) ? "live" : "future"}`}>
                        {flagForTeam(m.homeCode, m.homeName)} {nameFor(m.homeCode, m.homeName)} v {nameFor(m.awayCode, m.awayName)} {flagForTeam(m.awayCode, m.awayName)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <ManagerRivalries playerId={selected.id} />
        <OutcomeDots playerId={selected.id} />
        <OwnershipHeatmap playerId={selected.id} />
      </section>
    );
  };

  const TournamentTab = () => (
    <section className="pane">
      <div className="panehead">
        <h2>Tournament</h2>
        <div className="subtle">Groups & bracket</div>
      </div>
      <div className="groupsview">
        {GROUPS.map((g) => (
          <div key={g} className="groupbox">
            <div className="glabel">GROUP {g}</div>
            <div className="grow ghead qualrow">
              <span>Team</span>
              <span>Manager</span>
              <span>Pts</span>
              <span>GD</span>
              <span>Status</span>
            </div>
            {tournamentData.groupTables[g].map((row) => {
              const owner = row.owner;
              const alive = tournamentData.alive.has(row.tid);
              return (
                <div
                  key={row.tid}
                  className={`grow ${alive ? "" : "out"}`}
                  style={
                    owner
                      ? {
                          borderLeftColor: owner.color,
                          background: `${owner.color}18`,
                        }
                      : undefined
                  }
                >
                  <span>
                    {row.flag} {row.name}
                  </span>
                  <span>{owner ? owner.name : "—"}</span>
                  <b>{row.pts}</b>
                  <span>{gdText(row.gd)}</span>
                  <span className={`qualpill ${alive ? "alive" : "out"}`}>{alive ? "Alive" : "Out"}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <WorldCupBracket />
      <OwnershipHeatmap />
    </section>
  );

  const leaderPts = board[0]?.pts || 0;

  const openEditDraft = () => {
    if (editingDraft) {
      setEditingDraft(false);
      return;
    }
    setPasswordInput("");
    setPasswordError("");
    setShowPasswordModal(true);
  };

  const unlockDraftEditing = () => {
    if (passwordInput === "dingus") {
      setEditingDraft(true);
      setShowPasswordModal(false);
      setPasswordInput("");
      setPasswordError("");
      return;
    }
    setPasswordError("Wrong password");
  };

  return (
    <div className="app">
      <style>{CSS}</style>
      <header className="hero">
        <div className="eyebrow">WORLD CUP ’26</div>
        <h1>
          DINGAE
          <br />
          <span>SWEEPSTAKE</span>
        </h1>
        <div className="rules">
          6 managers · 8 teams each · Win 3 — Draw 1 — Loss 0
        </div>
      </header>

      {tab === "draft" && (
        <section className="pane">
          <div className="panehead">
            <h2>Draft</h2>
            <button
              className="editdraftbtn"
              onClick={openEditDraft}
            >
              {editingDraft ? "Done editing" : "Edit draft"}
            </button>
          </div>
          {state.players.map((p) => (
            <div key={p.id} className="lockcard">
              <div className="lockname">
                <span
                  className="pdot solo"
                  style={{ background: PLAYER_COLORS[p.id] }}
                />
                {editingDraft ? (
                  <input
                    className="draftnameinput"
                    value={p.name}
                    maxLength={14}
                    onChange={(e) => updateName(p.id, e.target.value)}
                    aria-label={`Edit ${p.name} name`}
                  />
                ) : (
                  p.name
                )}
              </div>
              <div className="lockrow">
                {TEAM_IDS.filter((t) => state.ownership[t] === p.id).map(
                  (t) => (
                    <span
                      key={t}
                      className={`lockteam ${editingDraft ? "editing" : ""} ${tournamentData.alive.has(t) ? "" : "out"}`}
                    >
                      <span>{TEAMS[t][1]} {TEAMS[t][0]}</span>
                      {editingDraft && (
                        <select
                          className="ownerselect"
                          value={state.ownership[t]}
                          onChange={(e) => updateTeamOwner(t, e.target.value)}
                          aria-label={`Move ${TEAMS[t][0]} to another manager`}
                        >
                          {state.players.map((manager) => (
                            <option key={manager.id} value={manager.id}>
                              {manager.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </span>
                  ),
                )}
              </div>
            </div>
          ))}
          <DraftRankingVisual />
        </section>
      )}

      {tab === "results" && (
        <section className="pane">
          <div className="panehead">
            <h2>Fixtures & Results</h2>
            <div className="subtle">{filteredMatches.length} shown</div>
          </div>
          <div className="syncbar">
            <button className="syncbtn" onClick={runSync} disabled={!canRefresh}>
              {refreshButtonText}
            </button>
            <span className="syncmsg">
              {syncMsg ||
                (!canRefresh
                  ? `Next refresh available in ${refreshMinutesLeft} minute${refreshMinutesLeft === 1 ? "" : "s"}`
                  : state.lastSync
                  ? "Last check " + new Date(state.lastSync).toLocaleString()
                  : "Tap update to fetch scores")}
            </span>
          </div>
          <div className="filtercollapse">
            <button className="clearfilterbtn filtertoggle" onClick={() => setFiltersOpen(!filtersOpen)}>
              {filtersOpen ? "Hide filters" : "Show filters"}
            </button>
            {(resultFilter !== "all" || resultGroupFilter !== "all" || resultDateFilter || resultCountryFilter !== "all") && (
              <button
                className="clearfilterbtn"
                onClick={() => {
                  setResultFilter("all");
                  setResultGroupFilter("all");
                  setResultDateFilter("");
                  setResultCountryFilter("all");
                }}
              >
                Clear filters
              </button>
            )}
          </div>
          {filtersOpen && (
            <div className="filterpanel">
              <label htmlFor="resultsFilter">Manager</label>
              <select
                id="resultsFilter"
                className="filterselect"
                value={resultFilter}
                onChange={(e) => setResultFilter(e.target.value)}
              >
                <option value="all">Everyone's teams</option>
                {state.players.map((p) => (
                  <option key={p.id} value={String(p.id)}>
                    {p.name}'s teams
                  </option>
                ))}
              </select>

              <label htmlFor="groupFilter">Group</label>
              <select
                id="groupFilter"
                className="filterselect"
                value={resultGroupFilter}
                onChange={(e) => setResultGroupFilter(e.target.value)}
              >
                <option value="all">All groups</option>
                {GROUPS.map((g) => (
                  <option key={g} value={g}>
                    Group {g}
                  </option>
                ))}
                <option value="KO">Knockouts</option>
              </select>

              <label htmlFor="countryFilter">Country</label>
              <select
                id="countryFilter"
                className="filterselect"
                value={resultCountryFilter}
                onChange={(e) => setResultCountryFilter(e.target.value)}
              >
                <option value="all">All countries</option>
                {countryFilterOptions.map((tid) => (
                  <option key={tid} value={tid}>
                    {TEAMS[tid][1]} {TEAMS[tid][0]}
                  </option>
                ))}
              </select>

              <label htmlFor="dateFilter">Date</label>
              <input
                id="dateFilter"
                className="filterselect"
                type="date"
                value={resultDateFilter}
                onChange={(e) => setResultDateFilter(e.target.value)}
              />
            </div>
          )}
          {filteredMatches.length === 0 && (
            <div className="empty">No fixtures loaded yet.</div>
          )}
          {filteredMatches.map((m) => (
            <ResultRow key={m.id} m={m} />
          ))}
        </section>
      )}

      {tab === "table" && (
        <section className="pane">
          <div className="panehead">
            <h2>League Table</h2>
            <button className="editdraftbtn" onClick={shareTableImageToWhatsApp}>Share table image</button>
          </div>
          <div className="subtle tableintro">Points · GD · alive teams</div>
          <div className="board">
            <div className="brow bhead">
              <span>#</span>
              <span>Manager</span>
              <span>GP</span>
              <span>W</span>
              <span>D</span>
              <span>L</span>
              <span>GD</span>
              <span>Alive</span>
              <span>PTS</span>
            </div>
            {board.map((p, i) => (
              <div key={p.id}>
                <button
                  className={"brow" + (i === 0 && p.pts > 0 ? " lead" : "")}
                  onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                >
                  <span>{i + 1}</span>
                  <span>
                    <span
                      className="pdot solo"
                      style={{ background: PLAYER_COLORS[p.id] }}
                    />
                    {p.name}
                    {i === 0 && leaderPts > 0 ? " 🏆" : ""}
                  </span>
                  <span>{p.gp}</span>
                  <span>{p.w}</span>
                  <span>{p.d}</span>
                  <span>{p.l}</span>
                  <span>{gdText(p.gd)}</span>
                  <span>{p.alive}</span>
                  <b>{p.pts}</b>
                </button>
                {expanded === p.id && (
                  <div className="squad">
                    {Object.entries(p.teams)
                      .sort((a, b) => b[1].pts - a[1].pts || b[1].gd - a[1].gd)
                      .map(([tid, t]) => (
                        <div
                          key={tid}
                          className={`squadrow ${tournamentData.alive.has(tid) ? "" : "out"}`}
                        >
                          <span>
                            {TEAMS[tid]?.[1]} {TEAMS[tid]?.[0]}
                          </span>
                          <span>
                            {t.w}-{t.d}-{t.l} · GD {gdText(t.gd)} ·{" "}
                            <b>{t.pts}</b> pts
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <PointsRaceChart />
          <PositionRaceChart />
          <OutcomeDots />
          <TrophyChances />
        </section>
      )}

      {tab === "tournament" && <TournamentTab />}
      {tab === "stats" && <StatsTab />}

      {showPasswordModal && (
        <div className="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="edit-draft-title">
          <div className="modalCard">
            <h3 id="edit-draft-title">Edit draft</h3>
            <p className="modalText">oi stop trying to cheat you dickhead</p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") unlockDraftEditing();
                if (e.key === "Escape") {
                  setShowPasswordModal(false);
                  setPasswordInput("");
                  setPasswordError("");
                }
              }}
              placeholder="Password"
              autoFocus
            />
            {passwordError && <div className="modalError">{passwordError}</div>}
            <div className="modalButtons">
              <button className="modalUnlock" onClick={unlockDraftEditing}>Unlock</button>
              <button
                className="modalCancel"
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordInput("");
                  setPasswordError("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="tabbar">
        {[
          ["draft", "Draft"],
          ["results", "Results"],
          ["table", "Table"],
          ["tournament", "Tournament"],
          ["stats", "My stats"],
        ].map(([k, l]) => (
          <button
            key={k}
            className={tab === k ? "on" : ""}
            onClick={() => setTab(k)}
          >
            {l}
          </button>
        ))}
      </nav>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;800&family=Inter:wght@400;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}.app{min-height:100vh;background:#0C1F15;color:#F0EDE2;font-family:Inter,system-ui,sans-serif;font-size:14px;padding-bottom:76px;width:100%;max-width:none;margin:0}.hero{padding:26px 18px 18px;border-bottom:1px solid #ffffff14}.eyebrow{font-family:'Saira Condensed';letter-spacing:.22em;font-size:11px;color:#9FBFA8}h1{font-family:'Saira Condensed';font-weight:800;font-size:44px;line-height:.95;margin:6px 0 8px;color:#E8B33B}h1 span{color:#E8B33B}.rules,.subtle,.hintline,.syncmsg,.city{font-size:12px;color:#9FBFA8}.pane{padding:16px 14px}.panehead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}h2{font-family:'Saira Condensed';font-weight:800;font-size:24px;text-transform:uppercase;color:#E8B33B}.lockcard,.match,.board,.groupbox,.bracketbox,.chartbox{background:#10271A;border:1px solid #ffffff12;border-radius:10px;padding:10px;margin-bottom:9px}.lockname{font-family:'Saira Condensed';font-size:18px;font-weight:800;display:flex;align-items:center}.lockrow{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}.lockteam{font-size:11.5px;background:#0C1F15;border:1px solid #ffffff14;border-radius:999px;padding:4px 9px;display:inline-flex;align-items:center;gap:6px}.lockteam.editing{border-radius:8px;padding:6px 7px}.editdraftbtn{background:#E8B33B;color:#0C1F15;border:0;border-radius:8px;padding:8px 13px;font-weight:800;cursor:pointer;font-size:12px}.draftnameinput{background:#0C1F15;border:1px solid #E8B33B66;border-radius:7px;color:#F0EDE2;padding:6px 8px;font-family:Inter,system-ui,sans-serif;font-size:14px;font-weight:700;min-width:130px}.ownerselect{background:#10271A;border:1px solid #ffffff24;color:#F0EDE2;border-radius:6px;padding:3px 5px;font-size:11px;max-width:110px}.pdot.solo{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px;flex:0 0 auto}.syncbar{display:flex;gap:10px;align-items:center;margin:2px 0 10px;flex-wrap:wrap}.syncbtn{background:#E8B33B;color:#0C1F15;border:0;border-radius:8px;padding:8px 14px;font-weight:700;cursor:pointer}.syncbtn:disabled{opacity:.45;cursor:not-allowed;background:#5d665e;color:#C8D8CC}.filterbar{display:flex;align-items:center;gap:8px;margin:0 0 10px;color:#9FBFA8;font-size:12px;flex-wrap:wrap}.filtercollapse{display:flex;gap:8px;align-items:center;margin:0 0 10px;flex-wrap:wrap}.filtertoggle{min-width:116px}.filterpanel{background:#10271A;border:1px solid #ffffff12;border-radius:10px;padding:10px;margin:0 0 10px;display:grid;grid-template-columns:1fr;gap:7px;color:#9FBFA8;font-size:12px}.filterpanel label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9FBFA8}.filterpanel .filterselect{width:100%;min-width:0}.filterselect{background:#0C1F15;border:1px solid #ffffff24;color:#F0EDE2;border-radius:8px;padding:8px 10px;font-size:13px;min-width:190px}.filterselect.small{min-width:130px}.filterselect.date{min-width:145px}.clearfilterbtn{background:transparent;border:1px solid #ffffff2a;color:#F0EDE2;border-radius:8px;padding:8px 10px;font-size:12px;cursor:pointer}.matchmeta{display:flex;gap:8px;align-items:center;margin-bottom:7px;flex-wrap:wrap}.grpbadge{font-family:'Saira Condensed';font-size:11px;letter-spacing:.14em;color:#0C1F15;background:#9FBFA8;border-radius:4px;padding:2px 6px}.grpbadge.done{background:#E8B33B}.grpbadge.live{background:#E0635C}.grpbadge.future{background:#9FBFA8}.scoreline{display:flex;align-items:center;gap:8px}.teamcell{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.teamcell.r{text-align:right;align-items:flex-end}.tname{font-weight:600;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.owner{font-size:10.5px;display:inline-flex;align-items:center;gap:5px}.owner .dot{width:6px;height:6px;border-radius:50%}.owner.none{color:#5d7a66}.scorebox.readonly{display:flex;align-items:center;gap:6px;font-family:'Saira Condensed';font-weight:800;font-size:24px;color:#E8B33B}.brow{display:grid;grid-template-columns:24px 1fr 28px 24px 24px 24px 34px 42px 44px;align-items:center;width:100%;padding:11px 10px;background:transparent;border:0;border-bottom:1px solid #ffffff0d;color:#F0EDE2;text-align:left;font-size:12.5px}.brow.bhead{font-size:9px;color:#9FBFA8;text-transform:uppercase}.brow.lead{background:linear-gradient(90deg,#E8B33B22,transparent 70%)}.squad{background:#0C1F15;border-bottom:1px solid #ffffff0d;padding:4px 0}.squadrow{display:flex;justify-content:space-between;padding:6px 14px;font-size:12.5px;color:#C8D8CC}.glabel{font-family:'Saira Condensed';font-weight:800;letter-spacing:.18em;font-size:11px;color:#E8B33B;margin-bottom:6px;text-transform:uppercase}.empty{text-align:center;color:#9FBFA8;padding:18px}.empty.small{padding:8px}.groupsview{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px}.grow{display:grid;grid-template-columns:1.3fr .9fr 34px 34px;gap:8px;align-items:center;border-left:4px solid transparent;border-bottom:1px solid #ffffff0c;padding:7px 8px;font-size:12px}.grow.ghead{color:#9FBFA8;text-transform:uppercase;font-size:9px;background:transparent;border-left-color:transparent}.out{opacity:.38;filter:grayscale(1)}.chartbox{margin-top:14px}.charthead{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.racechart{width:100%;height:auto;display:block;background:#0C1F15;border:1px solid #ffffff10;border-radius:8px}.gridline{stroke:#ffffff14;stroke-width:1}.axisline{stroke:#ffffff2a;stroke-width:1}.axistext{fill:#9FBFA8;font-size:11px;font-family:Inter,system-ui,sans-serif}.axislabel{fill:#9FBFA8;font-size:10px;font-family:Inter,system-ui,sans-serif;letter-spacing:.04em}.chartlegend{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px;font-size:11.5px;color:#C8D8CC}.legenddot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:5px}.modalOverlay{position:fixed;inset:0;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;z-index:9999;padding:18px}.modalCard{width:340px;max-width:100%;background:#10271A;border:1px solid #E8B33B66;border-radius:14px;padding:18px;box-shadow:0 18px 60px #0008}.modalCard h3{font-family:'Saira Condensed';font-size:24px;font-weight:800;text-transform:uppercase;color:#E8B33B;margin:0 0 8px}.modalText{font-size:13px;color:#F0EDE2;margin:0 0 12px;line-height:1.35}.modalCard input{width:100%;background:#0C1F15;border:1px solid #ffffff24;border-radius:8px;color:#F0EDE2;padding:10px 11px;font-size:14px}.modalCard input:focus{outline:2px solid #E8B33B;border-color:transparent}.modalError{color:#E0635C;font-size:12px;margin-top:8px}.modalButtons{display:flex;gap:8px;margin-top:12px}.modalButtons button{flex:1;border:0;border-radius:8px;padding:9px 12px;font-weight:800;cursor:pointer}.modalUnlock{background:#E8B33B;color:#0C1F15}.modalCancel{background:transparent;color:#F0EDE2;border:1px solid #ffffff2a!important}.tabbar{position:fixed;bottom:0;left:0;right:0;width:100%;max-width:none;margin:0;display:flex;background:#0A1A11F2;border-top:1px solid #ffffff1a}.tabbar button{flex:1;background:transparent;border:0;color:#9FBFA8;font-family:'Saira Condensed';font-weight:600;letter-spacing:.1em;font-size:12px;text-transform:uppercase;padding:15px 0;cursor:pointer}.tabbar button.on{color:#E8B33B;box-shadow:inset 0 3px 0 #E8B33B}.tableintro{margin:-5px 0 10px}.statcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin:12px 0}.statcard,.rivalcard,.teamstatcard,.pathcard,.heatgroup{background:#0C1F15;border:1px solid #ffffff12;border-radius:10px;padding:10px}.statcard{display:flex;flex-direction:column;gap:4px}.statcard b{font-size:16px;color:#F0EDE2}.statcard span,.rivalcard span,.rivalcard em,.teamstatcard span,.teamstatcard small,.pathcard span,.heatteam small{font-size:12px;color:#9FBFA8}.rivalgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px}.rivalcard{display:flex;flex-direction:column;gap:3px}.rivalcard em{font-style:normal;color:#E8B33B}.dotsgrid{display:flex;flex-direction:column;gap:8px}.dotrow{display:grid;grid-template-columns:120px 1fr;gap:8px;align-items:center}.dotlabel{font-size:12px;font-weight:700}.dotsline{display:flex;flex-wrap:wrap;gap:4px}.outcomedot{width:10px;height:10px;border-radius:50%;display:inline-block;background:#73796f}.outcomedot.w{background:#31c46b}.outcomedot.d{background:#e8a23b}.outcomedot.l{background:#df5548}.outcomedot.future{background:#68736b}.heatmapgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:8px}.heatgroup{display:flex;flex-direction:column;gap:6px}.heatgroup b{font-family:'Saira Condensed';color:#E8B33B;letter-spacing:.08em}.heatteam{border:1px solid #ffffff22;border-radius:8px;padding:6px 7px;display:flex;justify-content:space-between;gap:6px;font-size:12px}.heatteam.mutedheat{background:#0C1F15;border-color:#ffffff14;color:#9FBFA8}.pathgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px}.pathcard{border-left:4px solid #ffffff22}.pathcard b{display:block;margin-bottom:2px}.pathsteps{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}.pathsteps span{border:1px solid #ffffff18;border-radius:999px;padding:3px 7px;background:#10271A}.qualrow,.grow.qualrow{grid-template-columns:1.2fr .8fr 34px 34px 58px}.grow{grid-template-columns:1.2fr .8fr 34px 34px 58px}.qualpill{font-size:10px;border-radius:999px;padding:3px 6px;text-align:center;background:#5d665e;color:#F0EDE2}.qualpill.alive{background:#2f7d4f}.qualpill.out{background:#6b403c}.teamstatgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px}.teamstatcard{display:flex;flex-direction:column;gap:4px}.teamstatcard b{font-size:14px}.tabbar button{font-size:11px}.trophygrid{display:flex;flex-direction:column;gap:8px}.trophyrow{display:grid;grid-template-columns:120px 1fr 44px;gap:6px 8px;align-items:center;font-size:12px}.trophyrow small{grid-column:2/4;color:#9FBFA8;font-size:10.5px}.trophybar{height:10px;background:#0C1F15;border:1px solid #ffffff18;border-radius:999px;overflow:hidden}.trophybar i{display:block;height:100%;border-radius:999px}.bracketgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px}.bracketround{background:#0C1F15;border:1px solid #ffffff12;border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px}.bracketround>b{font-family:'Saira Condensed';color:#E8B33B;text-transform:uppercase;letter-spacing:.08em}.bracketmatch{background:#10271A;border:1px solid #ffffff14;border-radius:8px;padding:7px;font-size:12px;display:grid;grid-template-columns:1fr auto 1fr;gap:6px;align-items:center}.bracketmatch span:last-of-type{text-align:right}.bracketmatch strong{font-family:'Saira Condensed';font-size:18px;color:#E8B33B}.bracketmatch small{grid-column:1/-1;color:#9FBFA8;font-size:10px}@media(max-width:560px){.dotrow{grid-template-columns:1fr}.grow{grid-template-columns:1.1fr .8fr 30px 30px 54px}.brow{grid-template-columns:22px 1fr 25px 22px 22px 22px 30px 36px 38px;font-size:11px}}

.rankinglist{display:grid;grid-template-columns:1fr;gap:5px}.rankingrow{display:grid;grid-template-columns:38px minmax(120px,1fr) 58px minmax(72px,.7fr);gap:8px;align-items:center;background:#0C1F15;border:1px solid #ffffff12;border-left:4px solid #ffffff22;border-radius:8px;padding:7px 8px;font-size:12px}.rankingrow.rankinghead{border-left-color:transparent;background:transparent;color:#9FBFA8;text-transform:uppercase;font-size:9px;letter-spacing:.08em;padding-top:2px;padding-bottom:2px}.ranknum{font-family:'Saira Condensed';font-weight:800;color:#E8B33B;font-size:15px}.rankteam{font-weight:700}.rankfifa{font-family:'Saira Condensed';font-weight:800;color:#F0EDE2;font-size:15px}.rankowner{font-size:11px;color:#C8D8CC;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mystatcards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:10px 0 12px}.mystatcard{border:1px solid #ffffff22;border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:4px}.mystatcard span{font-size:11px;color:#C8D8CC;text-transform:uppercase;letter-spacing:.08em}.mystatcard b{font-family:'Saira Condensed';font-size:30px;line-height:1;color:#F0EDE2}.calendarlist{display:flex;flex-direction:column;gap:8px}.calendarday{background:#0C1F15;border:1px solid #ffffff12;border-radius:10px;padding:9px}.calendarday>b{display:block;font-family:'Saira Condensed';color:#E8B33B;font-size:17px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}.calendarday>div{display:flex;flex-wrap:wrap;gap:6px}.calendarpill{border:1px solid #ffffff18;background:#10271A;border-radius:999px;padding:5px 8px;font-size:11.5px;color:#C8D8CC}.calendarpill.done{border-color:#E8B33B66}.calendarpill.live{border-color:#E0635C88;color:#F0EDE2}.calendarpill.future{opacity:.8}@media(max-width:560px){.mystatcards{grid-template-columns:repeat(3,minmax(0,1fr))}.rankingrow{grid-template-columns:30px minmax(92px,1fr) 46px minmax(54px,.7fr);gap:5px;font-size:11px}.rankowner{grid-column:auto}.rankfifa{font-size:14px}.mystatcard{padding:9px 7px}.mystatcard b{font-size:24px}.mystatcard span{font-size:9px}}

`;
