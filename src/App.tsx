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
  BIH: ["Bosnia-Herzegovina", "🇧🇦", "B"],
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

const BASE_WORLD_CUP_ODDS = {
  FRA: 17.0,
  ESP: 16.1,
  ENG: 13.0,
  ARG: 11.5,
  BRA: 9.5,
  POR: 8.0,
  GER: 5.5,
  NED: 3.5,
  BEL: 2.5,
  COL: 2.2,
  MAR: 1.8,
  URU: 1.8,
  USA: 1.5,
  JPN: 1.3,
  SUI: 1.2,
  CRO: 0.9,
  MEX: 0.6,
  SEN: 0.5,
  NOR: 0.5,
  SWE: 0.3,
  AUT: 0.3,
  TUR: 0.3,
  IRN: 0.2,
  EGY: 0.2,
  SCO: 0.2,
  KOR: 0.2,
  AUS: 0.2,
  ECU: 0.2,
  CIV: 0.2,
  CAN: 0.1,
  GHA: 0.1,
  ALG: 0.1,
  PAR: 0.1,
  TUN: 0.05,
  NZL: 0.05,
  KSA: 0.05,
  IRQ: 0.05,
  JOR: 0.05,
  BIH: 0.05,
  UZB: 0.05,
  PAN: 0.05,
  QAT: 0.03,
  CZE: 0.03,
  COD: 0.03,
  RSA: 0.02,
  CPV: 0.02,
  HAI: 0.01,
  CUW: 0.01,
};

function rawAdjustedCountryOdds(tid, stats, alive, scheduleEase = 0.5) {
  if (!alive) return 0;
  const base = BASE_WORLD_CUP_ODDS[tid] ?? 0.01;
  const pts = stats?.pts || 0;
  const gd = stats?.gd || 0;
  const w = stats?.w || 0;
  const l = stats?.l || 0;
  const performanceFactor = pts * 0.08 + gd * 0.04 + w * 0.05 - l * 0.07;
  const scheduleFactor = (scheduleEase - 0.5) * 0.5;
  const multiplier = Math.max(0.3, Math.min(2.5, 1 + performanceFactor + scheduleFactor));
  return base * multiplier;
}


function fifaRankScore(tid) {
  const rank = FIFA_RANKINGS[tid] || 211;
  return Math.max(1, 212 - rank);
}

function matchOutcomeProbabilities(homeCode, awayCode) {
  const diff = fifaRankScore(homeCode) - fifaRankScore(awayCode);
  const winProb = Math.max(0.12, Math.min(0.78, 0.45 + diff / 320));
  const drawProb = Math.max(0.16, Math.min(0.32, 0.26 - Math.abs(diff) / 1000));
  return { winProb, drawProb, lossProb: 1 - winProb - drawProb };
}

function expectedPointsFromRanks(teamCode, opponentCode) {
  const { winProb, drawProb } = matchOutcomeProbabilities(teamCode, opponentCode);
  return winProb * 3 + drawProb;
}

function teamChanceQuality(tid, aliveSet) {
  if (!aliveSet.has(tid)) return 0;
  const rank = FIFA_RANKINGS[tid] || 211;
  return Math.max(0, 100 - ((rank - 1) / 210) * 100);
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
  EGY: 0,
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
  SWE: 2,
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

const SWAP_LOG = [
  {
    id: "s1",
    date: "2026-06-10",
    parties: [
      { player: "Vishal", pid: 1, gave: "ARG", received: "SCO" },
      { player: "Shivam", pid: 3, gave: "SCO", received: "ARG" },
    ],
  },
  {
    id: "s2",
    date: "2026-06-14",
    parties: [
      { player: "Eashan", pid: 0, gave: "SWE", received: "EGY" },
      { player: "Dillan", pid: 2, gave: "EGY", received: "SWE" },
    ],
  },
];

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

function teamPtsSince(teamCode, dateStr, matches) {
  const cutoff = new Date(dateStr).getTime();
  let pts = 0;
  for (const m of matches) {
    if (!m.date || new Date(m.date).getTime() < cutoff) continue;
    if (!isFinished(m)) continue;
    if (typeof m.homeGoals !== "number" || typeof m.awayGoals !== "number") continue;
    const isHome = m.homeCode === teamCode;
    const isAway = m.awayCode === teamCode;
    if (!isHome && !isAway) continue;
    const scored = isHome ? m.homeGoals : m.awayGoals;
    const conceded = isHome ? m.awayGoals : m.homeGoals;
    if (scored > conceded) pts += 3;
    else if (scored === conceded) pts += 1;
  }
  return pts;
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

function fmtDateTime(value) {
  if (!value) return "";
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit", month: "2-digit", year: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  });
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


function matchDisplayRound(match) {
  const raw = String(match?.round || match?.league || "World Cup");
  if (raw === "GROUP_STAGE" || raw.toLowerCase() === "group stage" || raw.toLowerCase().includes("group")) {
    const g = groupForMatch(match);
    return g && g !== "KO" ? `Group ${g}` : "Group stage";
  }
  return raw.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function matchChannel(match) {
  return match?.channel || match?.tvChannel || "";
}

function fmtChannel(ch) {
  if (!ch) return "";
  const lower = ch.toLowerCase();
  if (lower.startsWith("bbc")) return "BBC";
  if (lower.startsWith("itv")) return "ITV";
  return ch;
}

function winningTeamCode(match) {
  if (!isFinished(match)) return null;
  if (typeof match.homeGoals !== "number" || typeof match.awayGoals !== "number") return null;
  if (match.homeGoals === match.awayGoals) return null;
  return match.homeGoals > match.awayGoals ? match.homeCode : match.awayCode;
}

function resultFor(match, side) {
  if (match.homeGoals === match.awayGoals) return "d";
  if (side === "home") return match.homeGoals > match.awayGoals ? "w" : "l";
  return match.awayGoals > match.homeGoals ? "w" : "l";
}


function resultClassForTeam(match, tid) {
  if (!match || !tid) return "future";
  if (!isFinished(match) || typeof match.homeGoals !== "number" || typeof match.awayGoals !== "number") return "future";
  if (match.homeGoals === match.awayGoals) return "d";
  return winningTeamCode(match) === tid ? "w" : "l";
}

function resultLabelForTeam(match, tid) {
  const cls = resultClassForTeam(match, tid);
  if (cls === "w") return "W";
  if (cls === "d") return "D";
  if (cls === "l") return "L";
  return isLive(match) ? "Live" : "NS";
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
  const [resultStatusFilter, setResultStatusFilter] = useState("all");
  const [compactResults, setCompactResults] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [nowTick, setNowTick] = useState(Date.now());
  const [editingDraft, setEditingDraft] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [statsPlayer, setStatsPlayer] = useState("0");
  const [editPassword, setEditPassword] = useState("");
  const [savingDraft, setSavingDraft] = useState(false);
  const [draftSaveMsg, setDraftSaveMsg] = useState("");
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setState((s) => ({ ...blankState(), ...JSON.parse(raw) }));
    } catch {}
  }, []);

  // Load canonical ownership from server (overrides localStorage)
  useEffect(() => {
    fetch("/api/draft")
      .then((r) => r.json())
      .then((data) => {
        if (data.ownership && typeof data.ownership === "object") {
          setState((s) => ({ ...s, ownership: data.ownership }));
        }
      })
      .catch(() => {});
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


  const countryOddsByTeam = useMemo(() => {
    const remainingOpponents: Record<string, string[]> = {};
    state.apiMatches
      .filter((m) => m.homeCode && m.awayCode && !isFinished(m))
      .forEach((m) => {
        (remainingOpponents[m.homeCode] ||= []).push(m.awayCode);
        (remainingOpponents[m.awayCode] ||= []).push(m.homeCode);
      });

    const scheduleEaseForTeam = (tid) => {
      const opps = remainingOpponents[tid] || [];
      if (!opps.length) return 0.5;
      const avgRank = opps.reduce((sum, opp) => sum + (FIFA_RANKINGS[opp] || 150), 0) / opps.length;
      return (avgRank - 1) / 210;
    };

    const rawRows = TEAM_IDS.map((tid) => {
      const stats = tournamentData.teamStats[tid] || { pts: 0, gd: 0, gf: 0, w: 0, l: 0 };
      const alive = tournamentData.alive.has(tid);
      return {
        tid,
        rawOdds: rawAdjustedCountryOdds(tid, stats, alive, scheduleEaseForTeam(tid)),
      };
    });
    const totalRaw = rawRows.reduce((sum, row) => sum + row.rawOdds, 0) || 1;
    return Object.fromEntries(
      rawRows.map((row) => [
        row.tid,
        row.rawOdds > 0 ? (row.rawOdds / totalRaw) * 100 : 0,
      ]),
    );
  }, [tournamentData, state.apiMatches]);

  const expectedRemainingPointsForTeam = (tid) => {
    return state.apiMatches.reduce((sum, m) => {
      if (!m.homeCode || !m.awayCode || isFinished(m)) return sum;
      if (m.homeCode === tid) return sum + expectedPointsFromRanks(m.homeCode, m.awayCode);
      if (m.awayCode === tid) return sum + expectedPointsFromRanks(m.awayCode, m.homeCode);
      return sum;
    }, 0);
  };

  const baseOddsForTeam = (tid) => BASE_WORLD_CUP_ODDS[tid] ?? 0.01;
  const oddsChangeForTeam = (tid) => (countryOddsByTeam[tid] || 0) - baseOddsForTeam(tid);

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
    const N = 2000;
    const remainingMatches = state.apiMatches.filter(
      (m) => m.homeCode && m.awayCode && !isFinished(m),
    );

    // Monte Carlo: simulate the rest of the tournament N times and count wins
    const winCounts: Record<string, number> = {};
    board.forEach((p) => { winCounts[p.id] = 0; });

    for (let sim = 0; sim < N; sim++) {
      const simPts: Record<string, number> = {};
      board.forEach((p) => { simPts[p.id] = p.pts; });

      for (const m of remainingMatches) {
        const homeOwner = state.ownership[m.homeCode];
        const awayOwner = state.ownership[m.awayCode];
        if (homeOwner == null && awayOwner == null) continue;

        const { winProb, drawProb } = matchOutcomeProbabilities(m.homeCode, m.awayCode);
        const rand = Math.random();

        if (rand < winProb) {
          if (homeOwner != null) simPts[homeOwner] = (simPts[homeOwner] || 0) + 3;
        } else if (rand < winProb + drawProb) {
          if (homeOwner != null) simPts[homeOwner] = (simPts[homeOwner] || 0) + 1;
          if (awayOwner != null) simPts[awayOwner] = (simPts[awayOwner] || 0) + 1;
        } else {
          if (awayOwner != null) simPts[awayOwner] = (simPts[awayOwner] || 0) + 3;
        }
      }

      // Award win fractionally in case of tie
      const maxPts = Math.max(...Object.values(simPts));
      const tied = Object.keys(simPts).filter((id) => simPts[id] === maxPts);
      const share = 1 / tied.length;
      tied.forEach((id) => { winCounts[id] += share; });
    }

    return board
      .map((p) => {
        const ownedTeams = Object.keys(p.teams || {});
        const aliveTeams = ownedTeams.filter((tid) => tournamentData.alive.has(tid));
        const aliveRanks = aliveTeams
          .map((tid) => FIFA_RANKINGS[tid] || 211)
          .sort((a, b) => a - b);
        const avgRank = aliveRanks.length
          ? Math.round(aliveRanks.reduce((sum, r) => sum + r, 0) / aliveRanks.length)
          : null;
        const projectedFixturePoints = remainingMatches.reduce((sum, m) => {
          if (state.ownership[m.homeCode] === p.id) return sum + expectedPointsFromRanks(m.homeCode, m.awayCode);
          if (state.ownership[m.awayCode] === p.id) return sum + expectedPointsFromRanks(m.awayCode, m.homeCode);
          return sum;
        }, 0);
        return {
          ...p,
          chance: Math.round((winCounts[p.id] / N) * 100),
          avgRank,
          projectedFixturePoints,
        };
      })
      .sort(
        (a, b) =>
          b.chance - a.chance ||
          b.pts - a.pts ||
          (a.avgRank || 999) - (b.avgRank || 999) ||
          a.name.localeCompare(b.name),
      );
  }, [board, tournamentData.alive, state.apiMatches, state.ownership]);

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

  const SHAREABLE_VISUALS = [
    { key: "league", label: "League Table", group: "Tournament" },
    { key: "trophy", label: "Trophy Chances", group: "Tournament" },
    { key: "country", label: "Country Performance", group: "Tournament" },
    { key: "points", label: "Points Race", group: "Tournament" },
    { key: "position", label: "Position Race", group: "Tournament" },
    { key: "dots", label: "Result Dots", group: "Tournament" },
    { key: "heatmap", label: "Ownership Heatmap", group: "Tournament" },
    { key: "myteams", label: "My Teams", group: "MyStats" },
    { key: "myopponents", label: "My Opponents", group: "MyStats" },
    { key: "rivalries", label: "Manager Rivalries", group: "MyStats" },
    { key: "mydots", label: "My Result Dots", group: "MyStats" },
  ];

  const shareImageToWhatsApp = async (view = "league") => {
    const width = 900;
    const headerH = 118;
    const footerH = 52;
    const selectedId = Number(statsPlayer);
    const selected = state.players.find((p) => p.id === selectedId) || state.players[0];
    const selectedColor = PLAYER_COLORS[selected.id];
    const selectedTeams = TEAM_IDS.filter((tid) => state.ownership[tid] === selected.id);

    const makeCanvas = (h) => {
      const c = document.createElement("canvas");
      c.width = width;
      c.height = h;
      return { c, cctx: c.getContext("2d") };
    };

    const drawHeaderFooter = (cctx, h, t) => {
      cctx.fillStyle = "#0C1F15";
      cctx.fillRect(0, 0, width, h);
      cctx.fillStyle = "#E8B33B";
      cctx.font = "800 40px Arial";
      cctx.fillText(t, 34, 58);
      cctx.fillStyle = "#9FBFA8";
      cctx.font = "20px Arial";
      cctx.fillText(`Updated ${fmtDateTime(new Date())}`, 34, 90);
      cctx.fillStyle = "#9FBFA8";
      cctx.font = "18px Arial";
      cctx.fillText("dingaesweepstakewc26.vercel.app", 34, h - 22);
    };

    let canvas, ctx, height, title = "", leaderLine = "";

    if (view === "league" || view === "trophy") {
      const isTrophy = view === "trophy";
      const rowH = 58;
      const rows = (isTrophy ? trophyChances : board).slice(0, 6);
      title = isTrophy ? "TROPHY CHANCES" : "DINGAE SWEEPSTAKE";
      height = headerH + rows.length * rowH + footerH;
      ({ c: canvas, cctx: ctx } = makeCanvas(height));
      drawHeaderFooter(ctx, height, title);
      ctx.fillStyle = "#10271A";
      ctx.fillRect(24, 108, width - 48, rows.length * rowH + 12);
      rows.forEach((p, i) => {
        const y = headerH + i * rowH;
        if (i === 0 && (isTrophy ? p.chance > 0 : p.pts > 0)) {
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
        if (isTrophy) ctx.fillText(`Pts ${p.pts}   Alive ${p.alive}`, 280, y + 31);
        else ctx.fillText(`GP ${p.gp}   W ${p.w}   D ${p.d}   L ${p.l}   GD ${gdText(p.gd)}   Alive ${p.alive}`, 280, y + 31);
        ctx.fillStyle = "#E8B33B";
        ctx.font = "800 30px Arial";
        ctx.textAlign = "right";
        ctx.fillText(isTrophy ? `${p.chance}%` : `${p.pts} pts`, width - 42, y + 34);
        ctx.textAlign = "left";
      });
      const leader = rows[0], second = rows[1];
      if (isTrophy) {
        if (leader) leaderLine = `${leader.name} has the best shot at the title, at ${leader.chance}%.`;
      } else {
        const gap = leader && second ? leader.pts - second.pts : 0;
        if (leader) leaderLine = gap === 0 ? `${leader.name} and ${second?.name} are level on points.` : `${leader.name} is winning by ${gap} point${gap === 1 ? "" : "s"}.`;
      }
    } else if (view === "country") {
      title = "COUNTRY PERFORMANCE";
      const rowH = 54;
      const rows = TEAM_IDS.map((tid) => ({
        tid,
        stats: tournamentData.teamStats[tid] || { pts: 0, gd: 0 },
        owner: ownerOf(tid),
        odds: countryOddsByTeam[tid] || 0,
      })).sort((a, b) => b.stats.pts - a.stats.pts || b.stats.gd - a.stats.gd || b.odds - a.odds).slice(0, 10);
      height = headerH + rows.length * rowH + footerH;
      ({ c: canvas, cctx: ctx } = makeCanvas(height));
      drawHeaderFooter(ctx, height, title);
      ctx.fillStyle = "#10271A";
      ctx.fillRect(24, 108, width - 48, rows.length * rowH + 12);
      rows.forEach((r, i) => {
        const y = headerH + i * rowH;
        if (r.owner) {
          ctx.fillStyle = `${r.owner.color}22`;
          ctx.fillRect(24, y - 4, width - 48, rowH);
        }
        ctx.fillStyle = "#F0EDE2";
        ctx.font = "700 22px Arial";
        ctx.fillText(`${TEAMS[r.tid][1]} ${TEAMS[r.tid][0]}`, 40, y + 24);
        ctx.fillStyle = "#9FBFA8";
        ctx.font = "15px Arial";
        ctx.fillText(`${r.owner ? r.owner.name : "Unclaimed"}  ·  Pts ${r.stats.pts}  ·  GD ${gdText(r.stats.gd)}`, 40, y + 44);
        ctx.fillStyle = "#E8B33B";
        ctx.font = "800 24px Arial";
        ctx.textAlign = "right";
        ctx.fillText(`${r.odds.toFixed(1)}%`, width - 42, y + 32);
        ctx.textAlign = "left";
      });
      leaderLine = rows[0] ? `${TEAMS[rows[0].tid][0]} leads the table with ${rows[0].stats.pts} points.` : "";
    } else if (view === "points" || view === "position") {
      const isPoints = view === "points";
      title = isPoints ? "POINTS RACE" : "POSITION RACE";
      const players = state.players;
      const data = isPoints ? pointsRace : rankRace;
      const finishedCount = Math.max(0, data.length - 1);
      const chartH = 380;
      const legendH = 90;
      height = headerH + chartH + legendH + footerH;
      ({ c: canvas, cctx: ctx } = makeCanvas(height));
      drawHeaderFooter(ctx, height, title);
      const padL = 50, padR = 30;
      const padT = headerH + 16;
      const padB = headerH + chartH - 16;
      const innerW = width - padL - padR;
      const innerH = padB - padT;
      const maxPts = isPoints ? Math.max(3, ...data.flatMap((row) => players.map((p) => row.scores[p.id] || 0))) : Math.max(1, players.length);
      const xFor = (game) => padL + (finishedCount === 0 ? 0 : (game / finishedCount) * innerW);
      const yFor = (v) => isPoints ? padT + innerH - (v / maxPts) * innerH : padT + ((v - 1) / Math.max(1, players.length - 1)) * innerH;
      ctx.strokeStyle = "#ffffff2a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, padB);
      ctx.lineTo(width - padR, padB);
      ctx.stroke();
      players.forEach((p) => {
        const points = data.map((row) => [xFor(row.game), yFor(isPoints ? (row.scores[p.id] || 0) : (row.positions[p.id] || players.length))]);
        ctx.strokeStyle = PLAYER_COLORS[p.id];
        ctx.lineWidth = 4;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.beginPath();
        points.forEach(([x, y], idx) => (idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
        ctx.stroke();
        const last = points[points.length - 1];
        if (last) {
          ctx.fillStyle = PLAYER_COLORS[p.id];
          ctx.beginPath();
          ctx.arc(last[0], last[1], 6, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      let lx = padL, ly = padB + 46;
      players.forEach((p) => {
        ctx.fillStyle = PLAYER_COLORS[p.id];
        ctx.beginPath();
        ctx.arc(lx, ly, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#F0EDE2";
        ctx.font = "700 16px Arial";
        ctx.fillText(p.name, lx + 12, ly + 5);
        lx += 12 + ctx.measureText(p.name).width + 28;
        if (lx > width - 110) {
          lx = padL;
          ly += 28;
        }
      });
    } else if (view === "dots" || view === "mydots") {
      const isMine = view === "mydots";
      const players = isMine ? [selected] : state.players;
      title = isMine ? `${selected.name.toUpperCase()}'S RESULTS` : "RESULT DOTS";
      const rowH = 50;
      height = headerH + players.length * rowH + footerH + 10;
      ({ c: canvas, cctx: ctx } = makeCanvas(height));
      drawHeaderFooter(ctx, height, title);
      const colorFor = { w: "#31c46b", d: "#e8a23b", l: "#df5548", future: "#68736b" };
      players.forEach((p, i) => {
        const y = headerH + i * rowH + 20;
        ctx.fillStyle = "#F0EDE2";
        ctx.font = "700 20px Arial";
        ctx.fillText(p.name, 34, y + 6);
        let dx = 220;
        (outcomeMatrix[p.id] || []).forEach((o) => {
          ctx.fillStyle = colorFor[o.result] || colorFor.future;
          ctx.beginPath();
          ctx.arc(dx, y, 7, 0, Math.PI * 2);
          ctx.fill();
          dx += 18;
        });
      });
    } else if (view === "heatmap") {
      title = "OWNERSHIP HEATMAP";
      const cols = 3;
      const colW = 280;
      const rowH = 24;
      const groupH = 22 + 4 * rowH + 18;
      const rowsOfGroups = Math.ceil(GROUPS.length / cols);
      height = headerH + rowsOfGroups * groupH + footerH;
      ({ c: canvas, cctx: ctx } = makeCanvas(height));
      drawHeaderFooter(ctx, height, title);
      GROUPS.forEach((g, gi) => {
        const col = gi % cols;
        const row = Math.floor(gi / cols);
        const baseX = 34 + col * colW;
        let y = headerH + row * groupH + 16;
        ctx.fillStyle = "#E8B33B";
        ctx.font = "800 16px Arial";
        ctx.fillText(`Group ${g}`, baseX, y);
        y += 22;
        TEAM_IDS.filter((tid) => TEAMS[tid][2] === g).forEach((tid) => {
          const o = ownerOf(tid);
          ctx.fillStyle = o ? o.color : "#5d665e";
          ctx.fillRect(baseX, y - 13, 8, 15);
          ctx.fillStyle = "#F0EDE2";
          ctx.font = "13px Arial";
          ctx.fillText(`${TEAMS[tid][1]} ${nameFor(tid)} — ${o ? o.name : "—"}`, baseX + 14, y);
          y += rowH;
        });
      });
    } else if (view === "myteams") {
      title = `${selected.name.toUpperCase()}'S TEAMS`;
      const rowH = 54;
      const rows = selectedTeams
        .slice()
        .sort((a, b) => (countryOddsByTeam[b] || 0) - (countryOddsByTeam[a] || 0))
        .map((tid) => ({ tid, stats: tournamentData.teamStats[tid], odds: countryOddsByTeam[tid] || 0 }));
      height = headerH + Math.max(1, rows.length) * rowH + footerH;
      ({ c: canvas, cctx: ctx } = makeCanvas(height));
      drawHeaderFooter(ctx, height, title);
      ctx.fillStyle = "#10271A";
      ctx.fillRect(24, 108, width - 48, Math.max(1, rows.length) * rowH + 12);
      rows.forEach((r, i) => {
        const y = headerH + i * rowH;
        ctx.fillStyle = `${selectedColor}22`;
        ctx.fillRect(24, y - 4, width - 48, rowH);
        ctx.fillStyle = "#F0EDE2";
        ctx.font = "700 22px Arial";
        ctx.fillText(`${TEAMS[r.tid][1]} ${TEAMS[r.tid][0]}`, 40, y + 24);
        ctx.fillStyle = "#9FBFA8";
        ctx.font = "15px Arial";
        ctx.fillText(`#${FIFA_RANKINGS[r.tid] || "—"}  ·  Pts ${r.stats.pts}  ·  GD ${gdText(r.stats.gd)}`, 40, y + 44);
        ctx.fillStyle = selectedColor;
        ctx.font = "800 24px Arial";
        ctx.textAlign = "right";
        ctx.fillText(`${r.odds.toFixed(1)}%`, width - 42, y + 32);
        ctx.textAlign = "left";
      });
      leaderLine = `${selected.name} owns ${rows.length} team${rows.length === 1 ? "" : "s"}.`;
    } else if (view === "myopponents") {
      title = `${selected.name.toUpperCase()}'S OPPONENTS`;
      const rowH = 50;
      const rows = selectedTeams.slice().sort((a, b) => (FIFA_RANKINGS[a] || 999) - (FIFA_RANKINGS[b] || 999)).map((tid) => ({
        tid,
        opponents: state.apiMatches
          .filter((m) => m.homeCode === tid || m.awayCode === tid)
          .slice()
          .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0))
          .map((m) => ({ opp: m.homeCode === tid ? m.awayCode : m.homeCode, result: resultClassForTeam(m, tid) })),
      }));
      height = headerH + Math.max(1, rows.length) * rowH + footerH + 10;
      ({ c: canvas, cctx: ctx } = makeCanvas(height));
      drawHeaderFooter(ctx, height, title);
      const colorFor = { w: "#31c46b", d: "#e8a23b", l: "#df5548", future: "#68736b" };
      rows.forEach((r, i) => {
        const y = headerH + i * rowH + 16;
        ctx.fillStyle = "#F0EDE2";
        ctx.font = "700 18px Arial";
        ctx.fillText(`${TEAMS[r.tid][1]} ${nameFor(r.tid)}`, 34, y + 5);
        let dx = 320;
        r.opponents.forEach((o) => {
          ctx.fillStyle = colorFor[o.result] || colorFor.future;
          ctx.beginPath();
          ctx.arc(dx, y, 7, 0, Math.PI * 2);
          ctx.fill();
          dx += 18;
        });
      });
    } else if (view === "rivalries") {
      title = "MANAGER RIVALRIES";
      const rowH = 56;
      const rows = board.filter((p) => p.id !== selected.id);
      height = headerH + Math.max(1, rows.length) * rowH + footerH;
      ({ c: canvas, cctx: ctx } = makeCanvas(height));
      drawHeaderFooter(ctx, height, title);
      ctx.fillStyle = "#9FBFA8";
      ctx.font = "18px Arial";
      ctx.fillText(`Head-to-head vs ${selected.name}`, 34, 110);
      rows.forEach((b, i) => {
        const y = headerH + i * rowH + 14;
        ctx.fillStyle = `${PLAYER_COLORS[b.id]}22`;
        ctx.fillRect(24, y - 4, width - 48, rowH - 10);
        ctx.fillStyle = "#F0EDE2";
        ctx.font = "700 20px Arial";
        ctx.fillText(`vs ${b.name}`, 40, y + 24);
        const selectedRow = board.find((p) => p.id === selected.id);
        ctx.fillStyle = "#9FBFA8";
        ctx.font = "16px Arial";
        ctx.fillText(`${selectedRow.pts} - ${b.pts} pts  ·  ${selectedRow.alive} - ${b.alive} alive`, 280, y + 24);
        const diff = selectedRow.pts - b.pts;
        ctx.fillStyle = diff === 0 ? "#9FBFA8" : diff > 0 ? "#31c46b" : "#df5548";
        ctx.font = "800 22px Arial";
        ctx.textAlign = "right";
        ctx.fillText(diff === 0 ? "Level" : `${diff > 0 ? "+" : ""}${diff}`, width - 42, y + 24);
        ctx.textAlign = "left";
      });
    }

    if (!ctx) return;

    const fileName = `dingae-sweepstake-${view}.png`;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], fileName, { type: "image/png" });
      const shareText = `${leaderLine ? leaderLine + "\n\n" : ""}Follow the live table: https://dingaesweepstakewc26.vercel.app`;
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title, text: shareText });
        return;
      }
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.open("https://wa.me/?text=" + encodeURIComponent(shareText), "_blank", "noopener,noreferrer");
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

      if (resultStatusFilter === "finished" && !isFinished(m)) return false;
      if (resultStatusFilter === "live" && !isLive(m)) return false;
      if (resultStatusFilter === "future" && (isFinished(m) || isLive(m))) return false;

      return true;
    });
  }, [state.apiMatches, resultFilter, resultGroupFilter, resultDateFilter, resultCountryFilter, resultStatusFilter, state.ownership]);

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


  const ManagerPill = ({ player, pid, children, small = false }) => {
    const p = player || state.players.find((x) => x.id === Number(pid));
    if (!p) return <span className="managerpill none">—</span>;
    return (
      <span
        className={`managerpill ${small ? "small" : ""}`}
        style={{
          background: `${PLAYER_COLORS[p.id]}33`,
        }}
      >
        {children || p.name}
      </span>
    );
  };

  const OwnerTag = ({ tid, children }) => {
    const o = ownerOf(tid);
    if (!o) return <span className="owner none">unclaimed</span>;
    return <ManagerPill player={o} small>{children || o.name}</ManagerPill>;
  };

  const ResultRow = ({ m }) => {
    const homeFlag = flagForTeam(m.homeCode, m.homeName);
    const awayFlag = flagForTeam(m.awayCode, m.awayName);
    const statusClass = isFinished(m) ? "done" : isLive(m) ? "live" : "future";
    const hScore = typeof m.homeGoals === "number" ? m.homeGoals : "";
    const aScore = typeof m.awayGoals === "number" ? m.awayGoals : "";
    const winnerCode = winningTeamCode(m);
    const winnerOwner = winnerCode ? ownerOf(winnerCode) : null;
    const homeOwner = ownerOf(m.homeCode);
    const awayOwner = ownerOf(m.awayCode);
    const homeExp = m.homeCode && m.awayCode ? expectedPointsFromRanks(m.homeCode, m.awayCode).toFixed(1) : "—";
    const awayExp = m.homeCode && m.awayCode ? expectedPointsFromRanks(m.awayCode, m.homeCode).toFixed(1) : "—";
    const channel = matchChannel(m);
    return (
      <div
        className={`match ${winnerOwner ? "managerwin" : ""}`}
        style={winnerOwner ? { borderColor: winnerOwner.color, background: `${winnerOwner.color}20` } : undefined}
      >
        <div className="matchmeta">
          <span className={`grpbadge ${statusClass}`}>{m.status || "NS"}</span>
          <span className="city">{matchDisplayRound(m)}</span>
          {m.date && (
            <span className="city">{fmtDateTime(m.date)}</span>
          )}
          {channel && <span className="channelpill">{fmtChannel(channel)}</span>}
        </div>
        <div className="scoreline">
          <div className="teamcell">
            <span className="tname">
              {homeFlag} {nameFor(m.homeCode, m.homeName)}
            </span>
            {m.homeCode ? (
              <OwnerTag tid={m.homeCode}>{homeOwner ? `${homeOwner.name} - Exp pts ${homeExp}` : ""}</OwnerTag>
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
              <OwnerTag tid={m.awayCode}>{awayOwner ? `${awayOwner.name} - Exp pts ${awayExp}` : ""}</OwnerTag>
            ) : (
              <span className="owner none">unmapped: {m.awayName}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CompactResultRow = ({ m }) => {
    const homeFlag = flagForTeam(m.homeCode, m.homeName);
    const awayFlag = flagForTeam(m.awayCode, m.awayName);
    const homeOwner = ownerOf(m.homeCode);
    const awayOwner = ownerOf(m.awayCode);
    const hScore = typeof m.homeGoals === "number" ? m.homeGoals : "–";
    const aScore = typeof m.awayGoals === "number" ? m.awayGoals : "–";
    const statusClass = isFinished(m) ? "done" : isLive(m) ? "live" : "future";
    const winnerCode = winningTeamCode(m);
    const winnerOwner = winnerCode ? ownerOf(winnerCode) : null;
    return (
      <div
        className="compactmatch"
        style={winnerOwner ? { borderColor: winnerOwner.color } : undefined}
      >
        <span className={`grpbadge ${statusClass}`}>{m.status || "NS"}</span>
        <span className="compacthome">
          <span className="compactteam">{homeFlag} {nameFor(m.homeCode, m.homeName)}</span>
          {homeOwner && <span className="compactowner" style={{ color: homeOwner.color }}>{homeOwner.name}</span>}
        </span>
        <span className="compactscore">{hScore}:{aScore}</span>
        <span className="compactaway">
          <span className="compactteam">{nameFor(m.awayCode, m.awayName)} {awayFlag}</span>
          {awayOwner && <span className="compactowner" style={{ color: awayOwner.color }}>{awayOwner.name}</span>}
        </span>
      </div>
    );
  };

  const PointsRaceChart = () => {
    const [highlighted, setHighlighted] = useState(null);
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
                const active = highlighted === null || highlighted === p.id;
                return (
                  <g key={p.id} style={{ opacity: active ? 1 : 0.18, cursor: 'pointer', transition: 'opacity .15s' }} onClick={() => setHighlighted(highlighted === p.id ? null : p.id)}>
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
              {players.map((p) => {
                const active = highlighted === null || highlighted === p.id;
                return (
                  <span key={p.id} style={{ opacity: active ? 1 : 0.18, cursor: 'pointer', transition: 'opacity .15s' }} onClick={() => setHighlighted(highlighted === p.id ? null : p.id)}>
                    <ManagerPill player={p} small />
                  </span>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  };


  const PositionRaceChart = () => {
    const [highlighted, setHighlighted] = useState(null);
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
                const active = highlighted === null || highlighted === p.id;
                return <g key={p.id} style={{ opacity: active ? 1 : 0.18, cursor: 'pointer', transition: 'opacity .15s' }} onClick={() => setHighlighted(highlighted === p.id ? null : p.id)}><polyline points={points} fill="none" stroke={PLAYER_COLORS[p.id]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><circle cx={xFor(last.game)} cy={yFor(last.positions[p.id] || players.length)} r="4" fill={PLAYER_COLORS[p.id]} /></g>;
              })}
            </svg>
            <div className="chartlegend">{players.map((p) => { const active = highlighted === null || highlighted === p.id; return <span key={p.id} style={{ opacity: active ? 1 : 0.18, cursor: 'pointer', transition: 'opacity .15s' }} onClick={() => setHighlighted(highlighted === p.id ? null : p.id)}><ManagerPill player={p} small /></span>; })}</div>
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
            <div
              key={p.id}
              className="dotrow managerdotrow"
              style={{ background: `${PLAYER_COLORS[p.id]}22` }}
            >
              <span className="dotlabel">{p.name}</span>
              <span className="dotsline">{(outcomeMatrix[p.id] || []).map((o, idx) => <span key={idx} title={`${labelFor[o.result]} — ${nameFor(o.team)}`} className={`outcomedot ${o.result}`} />)}</span>
            </div>
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
            <span>Base</span>
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
                <span>{baseOddsForTeam(tid).toFixed(2)}%</span>
                <span className="rankowner">{owner ? <ManagerPill player={owner} small /> : "—"}</span>
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
        <div className="charthead"><div><div className="glabel">MANAGER RIVALRIES</div><div className="subtle">Head-to-head against {selected.name}</div></div></div>
        <div className="rankinglist rivalstable">
          <div className="rankingrow rankinghead rivalryrow">
            <span>Vs</span>
            <span>Pts</span>
            <span>Alive</span>
            <span>Gap</span>
          </div>
          {rivals.map((b) => (
            <div
              key={`${selected.id}-${b.id}`}
              className="rankingrow rivalryrow playerrow"
              style={{ background: `${PLAYER_COLORS[b.id]}22`, borderLeftColor: PLAYER_COLORS[b.id] }}
            >
              <span className="playerrowname">vs {b.name}</span>
              <span>{selected.pts} - {b.pts}</span>
              <span>{selected.alive} - {b.alive}</span>
              <b>{selected.pts === b.pts ? "Level" : `${selected.pts > b.pts ? "+" : "-"}${Math.abs(selected.pts - b.pts)}`}</b>
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
                  <small>{m.status || "NS"}{matchChannel(m) ? ` · ${fmtChannel(matchChannel(m))}` : ""}</small>
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
      <div className="charthead"><div><div className="glabel">TROPHY CHANCES</div><div className="subtle">Manager chance of winning the sweepstake league</div></div></div>
      <div className="trophygrid compact">
        <div className="trophyrow trophyhead">
          <span>Manager</span>
          <span>Chance</span>
        </div>
        {trophyChances.map((p) => (
          <div
            key={p.id}
            className="trophyrow compact playerrow"
            style={{ background: `${PLAYER_COLORS[p.id]}22`, borderLeftColor: PLAYER_COLORS[p.id] }}
          >
            <span className="playerrowname">{p.name}</span>
            <div className="trophybar"><i style={{ width: `${Math.max(3, p.chance)}%`, background: PLAYER_COLORS[p.id] }} /></div>
            <b>{p.chance}%</b>
          </div>
        ))}
      </div>
    </div>
  );


  const CountryPerformanceTable = () => {
    const rows = TEAM_IDS.map((tid) => {
      const stats = tournamentData.teamStats[tid] || { pts: 0, gd: 0, gf: 0 };
      const alive = tournamentData.alive.has(tid);
      return {
        tid,
        stats,
        alive,
        owner: ownerOf(tid),
        odds: countryOddsByTeam[tid] || 0,
        baseOdds: baseOddsForTeam(tid),
        oddsChange: oddsChangeForTeam(tid),
        expPts: expectedRemainingPointsForTeam(tid),
      };
    }).sort(
      (a, b) =>
        b.stats.pts - a.stats.pts ||
        b.stats.gd - a.stats.gd ||
        b.odds - a.odds ||
        TEAMS[a.tid][0].localeCompare(TEAMS[b.tid][0]),
    );

    return (
      <div className="chartbox countryperformancebox">
        <div className="charthead">
          <div>
            <div className="glabel">COUNTRY PERFORMANCE</div>
            <div className="subtle">Ordered by points won · row coloured by manager</div>
          </div>
        </div>
        <div className="rankinglist compact countryperf">
          <div className="rankingrow rankinghead countryperfrow">
            <span>Team</span>
            <span>Manager</span>
            <span>Pts</span>
            <span>GD</span>
            <span>Exp</span>
            <span>Base</span>
            <span>Odds</span>
            <span>Chg</span>
          </div>
          {rows.map(({ tid, stats, owner, odds, baseOdds, oddsChange, expPts, alive }) => (
            <div
              key={tid}
              className={`rankingrow countryperfrow ${alive ? "" : "out"}`}
              style={owner ? { borderLeftColor: owner.color, background: `${owner.color}18` } : undefined}
            >
              <span className="rankteam">{TEAMS[tid][1]} {TEAMS[tid][0]}</span>
              <span className="plainowner">{owner ? owner.name : "—"}</span>
              <b>{stats.pts}</b>
              <span>{gdText(stats.gd)}</span>
              <span>{expPts.toFixed(1)}</span>
              <span>{baseOdds.toFixed(2)}%</span>
              <b>{odds.toFixed(2)}%</b>
              <span className={oddsChange >= 0 ? "goodtext" : "badtext"}>{oddsChange >= 0 ? "+" : ""}{oddsChange.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
    const selectedChance = trophyChances.find((p) => p.id === selected.id)?.chance || 0;

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
            <span>Chance to win</span>
            <b>{Number(selectedChance).toFixed(2)}%</b>
          </div>
        </div>

        <div className="chartbox">
          <div className="charthead"><div><div className="glabel">{selected.name}'S TEAMS</div><div className="subtle">World Cup odds, FIFA ranking, points and goal difference</div></div></div>
          <div className="rankinglist compact mysteamtable">
            <div className="rankingrow rankinghead mysteamrow">
              <span>Team</span>
              <span>FIFA</span>
              <span>Pts</span>
              <span>GD</span>
              <span>Exp</span>
              <span>Base</span>
              <span>Odds</span>
              <span>Chg</span>
            </div>
            {teams
              .slice()
              .sort((a, b) => (countryOddsByTeam[b] || 0) - (countryOddsByTeam[a] || 0) || (FIFA_RANKINGS[a] || 999) - (FIFA_RANKINGS[b] || 999))
              .map((tid) => {
                const t = tournamentData.teamStats[tid];
                const alive = tournamentData.alive.has(tid);
                const odds = countryOddsByTeam[tid] || 0;
                const baseOdds = baseOddsForTeam(tid);
                const oddsChange = oddsChangeForTeam(tid);
                const expPts = expectedRemainingPointsForTeam(tid);
                return (
                  <div
                    key={tid}
                    className={`rankingrow mysteamrow ${alive ? "" : "out"}`}
                    style={{ background: `${playerColor}18`, borderLeftColor: playerColor }}
                  >
                    <span className="rankteam">{TEAMS[tid][1]} {TEAMS[tid][0]}</span>
                    <span>#{FIFA_RANKINGS[tid] || "—"}</span>
                    <b>{t.pts}</b>
                    <span>{gdText(t.gd)}</span>
                    <span>{expPts.toFixed(1)}</span>
                    <span>{baseOdds.toFixed(2)}%</span>
                    <b>{odds.toFixed(2)}%</b>
                    <span className={oddsChange >= 0 ? "goodtext" : "badtext"}>{oddsChange >= 0 ? "+" : ""}{oddsChange.toFixed(2)}%</span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="chartbox">
          <div className="charthead"><div><div className="glabel">MY OPPONENTS</div><div className="subtle">Past and upcoming opponents for each of {selected.name}'s teams</div></div></div>
          <div className="rankinglist opponentslist">
            <div className="rankingrow rankinghead opponentrow">
              <span>Team</span>
              <span>Opponents</span>
            </div>
            {teams
              .slice()
              .sort((a, b) => (FIFA_RANKINGS[a] || 999) - (FIFA_RANKINGS[b] || 999))
              .map((tid) => {
                const opponents = state.apiMatches
                  .filter((m) => m.homeCode === tid || m.awayCode === tid)
                  .slice()
                  .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0))
                  .map((m) => {
                    const opp = m.homeCode === tid ? m.awayCode : m.homeCode;
                    return { match: m, opp, result: resultClassForTeam(m, tid), label: resultLabelForTeam(m, tid) };
                  });
                return (
                  <div key={tid} className={`rankingrow opponentrow ${tournamentData.alive.has(tid) ? "" : "out"}`}>
                    <span>{TEAMS[tid][1]} {TEAMS[tid][0]}</span>
                    <span className="opponentchips">
                      {opponents.length ? opponents.map((o, i) => (
                        <em key={i} className={`oppchip ${o.result}`}>
                          {TEAMS[o.opp]?.[1] || "🏳️"} {nameFor(o.opp)}
                        </em>
                      )) : <em className="oppchip future">None loaded</em>}
                    </span>
                  </div>
                );
              })}
          </div>
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
              <span>GP</span>
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
                  <span>{owner ? <ManagerPill player={owner} small /> : "—"}</span>
                  <span>{row.gp}</span>
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

  const saveDraft = async (ownership) => {
    setSavingDraft(true);
    setDraftSaveMsg("");
    try {
      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: editPassword, ownership }),
      });
      setDraftSaveMsg(res.ok ? "Draft saved ✓" : "Save failed");
    } catch {
      setDraftSaveMsg("Could not reach server");
    }
    setSavingDraft(false);
  };

  const openEditDraft = () => {
    if (editingDraft) {
      saveDraft(state.ownership);
      setEditingDraft(false);
      setEditPassword("");
      return;
    }
    setPasswordInput("");
    setPasswordError("");
    setDraftSaveMsg("");
    setShowPasswordModal(true);
  };

  const unlockDraftEditing = () => {
    if (passwordInput === "dingus") {
      setEditPassword(passwordInput);
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
        <div className="herofoot">
          <div className="herosync">
            <span className="syncmsg">
              {syncMsg ||
                (!canRefresh
                  ? `Next refresh in ${refreshMinutesLeft}m`
                  : state.lastSync
                  ? "Last check " + fmtDateTime(state.lastSync)
                  : "")}
            </span>
            <button className="syncbtn herorefresh" onClick={runSync} disabled={!canRefresh} title={refreshButtonText}>
              ↻
            </button>
          </div>
        </div>
        <h1>
          DINGAE
          <br />
          <span>SWEEPSTAKE</span>
        </h1>
      </header>

      {tab === "draft" && (
        <section className="pane">
          <div className="panehead">
            <h2>Draft</h2>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
              <button className="editdraftbtn" onClick={openEditDraft}>
                {savingDraft ? "Saving…" : editingDraft ? "Done editing" : "Edit draft"}
              </button>
              {draftSaveMsg && <span className="draftsavemsg">{draftSaveMsg}</span>}
            </div>
          </div>
          {state.players.map((p) => (
            <div key={p.id} className="lockcard draftmanagercard" style={{ background: `${PLAYER_COLORS[p.id]}18`, borderLeft: `4px solid ${PLAYER_COLORS[p.id]}` }}>
              <div className="lockname">
                {editingDraft ? (
                  <input
                    className="draftnameinput"
                    value={p.name}
                    maxLength={14}
                    onChange={(e) => updateName(p.id, e.target.value)}
                    aria-label={`Edit ${p.name} name`}
                  />
                ) : (
                  <ManagerPill player={p} />
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

          <div className="swaplog">
            <div className="swaplog-hd">Trade History</div>
            {SWAP_LOG.map((swap) => {
              const [p1, p2] = swap.parties;
              const p1Pts = teamPtsSince(p1.gave, swap.date, state.apiMatches);
              const p2Pts = teamPtsSince(p2.gave, swap.date, state.apiMatches);
              const diff = p1Pts - p2Pts;
              const winner = diff > 0 ? p2 : diff < 0 ? p1 : null;
              const absNet = Math.abs(diff);
              const d = new Date(swap.date);
              const fmtDate = `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}`;
              return (
                <div key={swap.id} className="swaprow">
                  <span className="swapdate">{fmtDate}</span>
                  <span className="swaptext">
                    <span style={{ color: PLAYER_COLORS[p1.pid], fontWeight: 800 }}>{p1.player}</span>
                    {" swapped "}{TEAMS[p1.gave]?.[1]}{" with "}
                    <span style={{ color: PLAYER_COLORS[p2.pid], fontWeight: 800 }}>{p2.player}</span>
                    {" for "}{TEAMS[p1.received]?.[1]}
                  </span>
                  {winner
                    ? <span className="swapnet pos">{winner.player} +{absNet}</span>
                    : <span className="swapnet zero">+0</span>
                  }
                </div>
              );
            })}
          </div>
        </section>
      )}

      {tab === "results" && (
        <section className="pane">
          <div className="panehead">
            <h2>Fixtures & Results</h2>
            <div className="subtle">{filteredMatches.length} shown</div>
          </div>
          {(() => {
            const hasActive = resultFilter !== "all" || resultGroupFilter !== "all" || resultDateFilter || resultCountryFilter !== "all" || resultStatusFilter !== "all";
            const clearAll = () => { setResultFilter("all"); setResultGroupFilter("all"); setResultDateFilter(""); setResultCountryFilter("all"); setResultStatusFilter("all"); };
            const today = localDateKey(new Date());
            return (
              <>
                <div className="filterrow" style={{ gridTemplateColumns: hasActive ? "1fr 1fr auto" : "1fr auto" }}>
                  <button className="clearfilterbtn" onClick={() => setFiltersOpen(!filtersOpen)}>
                    {filtersOpen ? "Hide filters" : "Show filters"}
                  </button>
                  {hasActive && <button className="clearfilterbtn" onClick={clearAll}>Clear filters</button>}
                  <label className="togglelabel">
                    <span>Compact</span>
                    <span className={`toggleswitch ${compactResults ? "on" : ""}`} onClick={() => setCompactResults((v) => !v)} role="switch" aria-checked={compactResults}>
                      <span className="toggleknob" />
                    </span>
                  </label>
                </div>
                <div className="filterrow filterrow-status">
                  <button className={`statusbtn ${resultDateFilter === today ? "on" : ""}`} onClick={() => setResultDateFilter(resultDateFilter === today ? "" : today)}>Today</button>
                  <button className={`statusbtn ${resultStatusFilter === "finished" ? "on" : ""}`} onClick={() => setResultStatusFilter(resultStatusFilter === "finished" ? "all" : "finished")}>Done</button>
                  <button className={`statusbtn ${resultStatusFilter === "live" ? "on" : ""}`} onClick={() => setResultStatusFilter(resultStatusFilter === "live" ? "all" : "live")}>Live</button>
                  <button className={`statusbtn ${resultStatusFilter === "future" ? "on" : ""}`} onClick={() => setResultStatusFilter(resultStatusFilter === "future" ? "all" : "future")}>Upcoming</button>
                </div>
              </>
            );
          })()}
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
          {filteredMatches.map((m) =>
            compactResults ? <CompactResultRow key={m.id} m={m} /> : <ResultRow key={m.id} m={m} />
          )}
        </section>
      )}

      {tab === "table" && (
        <section className="pane">
          <div className="panehead">
            <h2>League Table</h2>
            <button className="editdraftbtn" onClick={() => setShareModalOpen(true)}>Share a visual</button>
          </div>
          <div className="subtle tableintro">Points · GD · alive teams</div>
          <div className="leaguebox groupbox">
            <div className="leaguegrow leaguehead">
              <span>#</span>
              <span>Manager</span>
              <span>GP</span>
              <span>W</span>
              <span>D</span>
              <span>L</span>
              <span>GD</span>
              <span>Alive</span>
              <span>Exp</span>
              <span>Pts</span>
            </div>
            {board.map((p, i) => (
              <div key={p.id}>
                <button
                  className={`leaguegrow leaguerow ${i === 0 && p.pts > 0 ? "lead" : ""}`}
                  style={{ borderLeftColor: PLAYER_COLORS[p.id], background: `${PLAYER_COLORS[p.id]}18` }}
                  onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                >
                  <span>{i + 1}</span>
                  <span className="leaguename">{p.name}{i === 0 && leaderPts > 0 ? " 🏆" : ""}</span>
                  <span>{p.gp}</span>
                  <span>{p.w}</span>
                  <span>{p.d}</span>
                  <span>{p.l}</span>
                  <span>{gdText(p.gd)}</span>
                  <span>{p.alive}</span>
                  <span className="exppts">{Math.round(p.pts + (trophyChances.find((x) => x.id === p.id)?.projectedFixturePoints || 0))}</span>
                  <b>{p.pts}</b>
                </button>
                {expanded === p.id && (
                  <div className="squad leaguesquad">
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
          <CountryPerformanceTable />
        </section>
      )}

      {tab === "tournament" && <TournamentTab />}
      {tab === "stats" && <StatsTab />}

      {shareModalOpen && (
        <div className="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="share-modal-title" onClick={() => setShareModalOpen(false)}>
          <div className="modalCard sharemodal" onClick={(e) => e.stopPropagation()}>
            <h3 id="share-modal-title">Share a visual</h3>
            <p className="modalText">Pick a visual to render as an image and share to WhatsApp.</p>
            <div className="sharelist">
              <div className="sharelisthead">Tournament</div>
              {SHAREABLE_VISUALS.filter((v) => v.group === "Tournament").map((v) => (
                <button
                  key={v.key}
                  className="shareitem"
                  onClick={() => {
                    shareImageToWhatsApp(v.key);
                    setShareModalOpen(false);
                  }}
                >
                  {v.label}
                </button>
              ))}
              <div className="sharelisthead">
                My stats — {state.players.find((p) => p.id === Number(statsPlayer))?.name || state.players[0].name}
              </div>
              {SHAREABLE_VISUALS.filter((v) => v.group === "MyStats").map((v) => (
                <button
                  key={v.key}
                  className="shareitem"
                  onClick={() => {
                    shareImageToWhatsApp(v.key);
                    setShareModalOpen(false);
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
            <div className="modalButtons">
              <button className="modalCancel" onClick={() => setShareModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

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
*{box-sizing:border-box;margin:0;padding:0}.app{min-height:100vh;background:#0C1F15;color:#F0EDE2;font-family:Inter,system-ui,sans-serif;font-size:14px;padding-bottom:76px;width:100%;max-width:none;margin:0}.hero{position:sticky;top:0;z-index:200;background:#0C1F15;padding:18px 18px 18px;border-bottom:1px solid #ffffff14}.eyebrow{font-family:'Saira Condensed';letter-spacing:.22em;font-size:11px;color:#9FBFA8}h1{font-family:'Saira Condensed';font-weight:800;font-size:44px;line-height:.95;margin:6px 0 8px;color:#E8B33B}h1 span{color:#E8B33B}.rules,.subtle,.hintline,.syncmsg,.city{font-size:12px;color:#9FBFA8}.pane{padding:16px 14px}.panehead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}h2{font-family:'Saira Condensed';font-weight:800;font-size:24px;text-transform:uppercase;color:#E8B33B}.lockcard,.match,.board,.groupbox,.bracketbox,.chartbox{background:#10271A;border:1px solid #ffffff12;border-radius:10px;padding:10px;margin-bottom:9px}.lockname{font-family:'Saira Condensed';font-size:18px;font-weight:800;display:flex;align-items:center}.lockrow{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}.lockteam{font-size:11.5px;background:#0C1F15;border:1px solid #ffffff14;border-radius:999px;padding:4px 9px;display:inline-flex;align-items:center;gap:6px}.lockteam.editing{border-radius:8px;padding:6px 7px}.editdraftbtn{background:#E8B33B;color:#0C1F15;border:0;border-radius:8px;padding:8px 13px;font-weight:800;cursor:pointer;font-size:12px}.draftnameinput{background:#0C1F15;border:1px solid #E8B33B66;border-radius:7px;color:#F0EDE2;padding:6px 8px;font-family:Inter,system-ui,sans-serif;font-size:14px;font-weight:700;min-width:130px}.ownerselect{background:#10271A;border:1px solid #ffffff24;color:#F0EDE2;border-radius:6px;padding:3px 5px;font-size:11px;max-width:110px}.pdot.solo{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px;flex:0 0 auto}.syncbar{display:flex;gap:10px;align-items:center;margin:2px 0 10px;flex-wrap:wrap}.syncbtn{background:#E8B33B;color:#0C1F15;border:0;border-radius:8px;padding:8px 14px;font-weight:700;cursor:pointer}.syncbtn:disabled{opacity:.45;cursor:not-allowed;background:#5d665e;color:#C8D8CC}.filterbar{display:flex;align-items:center;gap:8px;margin:0 0 10px;color:#9FBFA8;font-size:12px;flex-wrap:wrap}.filtercollapse{display:flex;gap:8px;align-items:center;margin:0 0 10px;flex-wrap:wrap}.filtertoggle{min-width:116px}.filterpanel{background:#10271A;border:1px solid #ffffff12;border-radius:10px;padding:10px;margin:0 0 10px;display:grid;grid-template-columns:1fr;gap:7px;color:#9FBFA8;font-size:12px}.filterpanel label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9FBFA8}.filterpanel .filterselect{width:100%;min-width:0}.filterselect{background:#0C1F15;border:1px solid #ffffff24;color:#F0EDE2;border-radius:8px;padding:8px 10px;font-size:13px;min-width:190px}.filterselect.small{min-width:130px}.filterselect.date{min-width:145px}.clearfilterbtn{background:transparent;border:1px solid #ffffff2a;color:#F0EDE2;border-radius:8px;padding:8px 10px;font-size:12px;cursor:pointer}.matchmeta{display:flex;gap:8px;align-items:center;margin-bottom:7px;flex-wrap:wrap}.grpbadge{font-family:'Saira Condensed';font-size:11px;letter-spacing:.14em;color:#0C1F15;background:#9FBFA8;border-radius:4px;padding:2px 6px}.grpbadge.done{background:#E8B33B}.grpbadge.live{background:#E0635C}.grpbadge.future{background:#9FBFA8}.scoreline{display:flex;align-items:center;gap:8px}.teamcell{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.teamcell.r{text-align:right;align-items:flex-end}.tname{font-weight:600;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.owner{font-size:10.5px;display:inline-flex;align-items:center;gap:5px}.owner .dot{width:6px;height:6px;border-radius:50%}.owner.none{color:#5d7a66}.scorebox.readonly{display:flex;align-items:center;gap:6px;font-family:'Saira Condensed';font-weight:800;font-size:24px;color:#E8B33B}.brow{display:grid;grid-template-columns:24px 1fr 28px 24px 24px 24px 34px 42px 44px;align-items:center;width:100%;padding:11px 10px;background:transparent;border:0;border-bottom:1px solid #ffffff0d;color:#F0EDE2;text-align:left;font-size:12.5px}.brow.bhead{font-size:9px;color:#9FBFA8;text-transform:uppercase}.brow.lead{background:linear-gradient(90deg,#E8B33B22,transparent 70%)}.squad{background:#0C1F15;border-bottom:1px solid #ffffff0d;padding:4px 0}.squadrow{display:flex;justify-content:space-between;padding:6px 14px;font-size:12.5px;color:#C8D8CC}.glabel{font-family:Inter,system-ui,sans-serif;font-weight:800;letter-spacing:.18em;font-size:11px;color:#E8B33B;margin-bottom:6px;text-transform:uppercase}.empty{text-align:center;color:#9FBFA8;padding:18px}.empty.small{padding:8px}.groupsview{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px}.grow{display:grid;grid-template-columns:1.3fr .9fr 34px 34px;gap:8px;align-items:center;border-left:4px solid transparent;border-bottom:1px solid #ffffff0c;padding:7px 8px;font-size:12px}.grow.ghead{color:#9FBFA8;text-transform:uppercase;font-size:9px;background:transparent;border-left-color:transparent}.out{opacity:.38;filter:grayscale(1)}.chartbox{margin-top:14px}.charthead{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding-bottom:6px;border-bottom:1px solid #ffffff10}.racechart{width:100%;height:auto;display:block;background:#0C1F15;border:1px solid #ffffff10;border-radius:8px}.gridline{stroke:#ffffff14;stroke-width:1}.axisline{stroke:#ffffff2a;stroke-width:1}.axistext{fill:#9FBFA8;font-size:11px;font-family:Inter,system-ui,sans-serif}.axislabel{fill:#9FBFA8;font-size:10px;font-family:Inter,system-ui,sans-serif;letter-spacing:.04em}.chartlegend{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px;font-size:11.5px;color:#C8D8CC}.legenddot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:5px}.modalOverlay{position:fixed;inset:0;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;z-index:9999;padding:18px}.modalCard{width:340px;max-width:100%;background:#10271A;border:1px solid #E8B33B66;border-radius:14px;padding:18px;box-shadow:0 18px 60px #0008}.modalCard h3{font-family:'Saira Condensed';font-size:24px;font-weight:800;text-transform:uppercase;color:#E8B33B;margin:0 0 8px}.modalText{font-size:13px;color:#F0EDE2;margin:0 0 12px;line-height:1.35}.modalCard input{width:100%;background:#0C1F15;border:1px solid #ffffff24;border-radius:8px;color:#F0EDE2;padding:10px 11px;font-size:14px}.modalCard input:focus{outline:2px solid #E8B33B;border-color:transparent}.modalError{color:#E0635C;font-size:12px;margin-top:8px}.modalButtons{display:flex;gap:8px;margin-top:12px}.modalButtons button{flex:1;border:0;border-radius:8px;padding:9px 12px;font-weight:800;cursor:pointer}.modalUnlock{background:#E8B33B;color:#0C1F15}.modalCancel{background:transparent;color:#F0EDE2;border:1px solid #ffffff2a!important}.tabbar{position:fixed;bottom:0;left:0;right:0;width:100%;max-width:none;margin:0;display:flex;background:#0A1A11F2;border-top:1px solid #ffffff1a}.tabbar button{flex:1;background:transparent;border:0;color:#9FBFA8;font-family:'Saira Condensed';font-weight:600;letter-spacing:.1em;font-size:12px;text-transform:uppercase;padding:15px 0;cursor:pointer}.tabbar button.on{color:#E8B33B;box-shadow:inset 0 3px 0 #E8B33B}.tableintro{margin:-5px 0 10px}.statcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin:12px 0}.statcard,.rivalcard,.teamstatcard,.pathcard,.heatgroup{background:#0C1F15;border:1px solid #ffffff12;border-radius:10px;padding:10px}.statcard{display:flex;flex-direction:column;gap:4px}.statcard b{font-size:16px;color:#F0EDE2}.statcard span,.rivalcard span,.rivalcard em,.teamstatcard span,.teamstatcard small,.pathcard span,.heatteam small{font-size:12px;color:#9FBFA8}.rivalgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px}.rivalcard{display:flex;flex-direction:column;gap:3px}.rivalcard em{font-style:normal;color:#E8B33B}.dotsgrid{display:flex;flex-direction:column;gap:8px}.dotrow{display:grid;grid-template-columns:120px 1fr;gap:8px;align-items:center}.dotlabel{font-size:12px;font-weight:700}.dotsline{display:flex;flex-wrap:wrap;gap:4px}.outcomedot{width:10px;height:10px;border-radius:50%;display:inline-block;background:#73796f}.outcomedot.w{background:#31c46b}.outcomedot.d{background:#e8a23b}.outcomedot.l{background:#df5548}.outcomedot.future{background:#68736b}.heatmapgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:8px}.heatgroup{display:flex;flex-direction:column;gap:6px}.heatgroup b{font-family:'Saira Condensed';color:#E8B33B;letter-spacing:.08em}.heatteam{border:1px solid #ffffff22;border-radius:8px;padding:6px 7px;display:flex;justify-content:space-between;gap:6px;font-size:12px}.heatteam.mutedheat{background:#0C1F15;border-color:#ffffff14;color:#9FBFA8}.pathgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px}.pathcard{border-left:4px solid #ffffff22}.pathcard b{display:block;margin-bottom:2px}.pathsteps{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}.pathsteps span{border:1px solid #ffffff18;border-radius:999px;padding:3px 7px;background:#10271A}.qualrow,.grow.qualrow{grid-template-columns:1.2fr .8fr 34px 34px 58px}.grow{grid-template-columns:1.2fr .8fr 34px 34px 58px}.qualpill{font-size:10px;border-radius:999px;padding:3px 6px;text-align:center;background:#5d665e;color:#F0EDE2}.qualpill.alive{background:#2f7d4f}.qualpill.out{background:#6b403c}.teamstatgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px}.teamstatcard{display:flex;flex-direction:column;gap:4px}.teamstatcard b{font-size:14px}.tabbar button{font-size:11px}.trophygrid{display:flex;flex-direction:column;gap:8px}.trophyrow{display:grid;grid-template-columns:120px 1fr 44px;gap:6px 8px;align-items:center;font-size:12px}.trophyrow small{grid-column:2/4;color:#9FBFA8;font-size:10.5px}.trophybar{height:10px;background:#0C1F15;border:1px solid #ffffff18;border-radius:999px;overflow:hidden}.trophybar i{display:block;height:100%;border-radius:999px}.bracketgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px}.bracketround{background:#0C1F15;border:1px solid #ffffff12;border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px}.bracketround>b{font-family:'Saira Condensed';color:#E8B33B;text-transform:uppercase;letter-spacing:.08em}.bracketmatch{background:#10271A;border:1px solid #ffffff14;border-radius:8px;padding:7px;font-size:12px;display:grid;grid-template-columns:1fr auto 1fr;gap:6px;align-items:center}.bracketmatch span:last-of-type{text-align:right}.bracketmatch strong{font-family:'Saira Condensed';font-size:18px;color:#E8B33B}.bracketmatch small{grid-column:1/-1;color:#9FBFA8;font-size:10px}@media(max-width:560px){.dotrow{grid-template-columns:1fr}.grow{grid-template-columns:1.1fr .8fr 30px 30px 54px}.brow{grid-template-columns:22px 1fr 25px 22px 22px 22px 30px 36px 38px;font-size:11px}}

.rankinglist{display:grid;grid-template-columns:1fr;gap:5px}.rankingrow{display:grid;grid-template-columns:38px minmax(120px,1fr) 58px minmax(72px,.7fr);gap:8px;align-items:center;background:#0C1F15;border:1px solid #ffffff12;border-left:4px solid #ffffff22;border-radius:8px;padding:7px 8px;font-size:12px}.rankingrow.rankinghead{border-left-color:transparent;background:transparent;color:#9FBFA8;text-transform:uppercase;font-size:9px;letter-spacing:.08em;padding-top:2px;padding-bottom:2px}.ranknum{font-family:'Saira Condensed';font-weight:800;color:#E8B33B;font-size:15px}.rankteam{font-weight:700}.rankfifa{font-family:'Saira Condensed';font-weight:800;color:#F0EDE2;font-size:15px}.rankowner{font-size:11px;color:#C8D8CC;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mystatcards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:10px 0 12px}.mystatcard{border:1px solid #ffffff22;border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:4px}.mystatcard span{font-size:11px;color:#C8D8CC;text-transform:uppercase;letter-spacing:.08em}.mystatcard b{font-family:'Saira Condensed';font-size:30px;line-height:1;color:#F0EDE2}.calendarlist{display:flex;flex-direction:column;gap:8px}.calendarday{background:#0C1F15;border:1px solid #ffffff12;border-radius:10px;padding:9px}.calendarday>b{display:block;font-family:'Saira Condensed';color:#E8B33B;font-size:17px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}.calendarday>div{display:flex;flex-wrap:wrap;gap:6px}.calendarpill{border:1px solid #ffffff18;background:#10271A;border-radius:999px;padding:5px 8px;font-size:11.5px;color:#C8D8CC}.calendarpill.done{border-color:#E8B33B66}.calendarpill.live{border-color:#E0635C88;color:#F0EDE2}.calendarpill.future{opacity:.8}@media(max-width:560px){.mystatcards{grid-template-columns:repeat(3,minmax(0,1fr))}.rankingrow{grid-template-columns:30px minmax(92px,1fr) 46px minmax(54px,.7fr);gap:5px;font-size:11px}.rankowner{grid-column:auto}.rankfifa{font-size:14px}.mystatcard{padding:9px 7px}.mystatcard b{font-size:24px}.mystatcard span{font-size:9px}}

/* requested compact updates */
.teamstatgrid{grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:6px}.teamstatcard.compact{display:grid;grid-template-columns:1fr auto;gap:3px 7px;padding:8px;border-left:4px solid #ffffff22}.teamstatcard.compact b{grid-column:1/-1;font-size:12.5px}.teamstatcard.compact span{font-size:11px}.teamstatcard.rag-green{border-left-color:#31c46b;background:rgba(49,196,107,.10)}.teamstatcard.rag-amber{border-left-color:#e8a23b;background:rgba(232,162,59,.10)}.teamstatcard.rag-red{border-left-color:#df5548;background:rgba(223,85,72,.10)}.trophygrid.compact{gap:5px}.trophyrow.compact,.trophyrow.trophyhead{display:grid;grid-template-columns:1fr 58px 66px;gap:8px;align-items:center;padding:7px 8px;border:1px solid #ffffff12;border-radius:8px;background:#0C1F15;font-size:12px}.trophyrow.trophyhead{background:transparent;color:#9FBFA8;text-transform:uppercase;font-size:9px;letter-spacing:.08em}.trophyrow.compact b{font-family:'Saira Condensed';font-size:18px;color:#E8B33B}.grow,.grow.qualrow{grid-template-columns:1.15fr .8fr 28px 34px 34px 58px}.grow.ghead{grid-template-columns:1.15fr .8fr 28px 34px 34px 58px}@media(max-width:560px){.grow,.grow.qualrow,.grow.ghead{grid-template-columns:1.05fr .72fr 24px 28px 28px 48px;font-size:10.5px}.trophyrow.compact,.trophyrow.trophyhead{grid-template-columns:1fr 50px 54px 44px;font-size:11px}.teamstatgrid{grid-template-columns:repeat(2,minmax(0,1fr))}}

/* mobile cleanup overrides */
.managerpill{display:inline-flex;align-items:center;justify-content:center;border:1px solid;border-radius:999px;padding:3px 8px;color:#F0EDE2;font-weight:800;font-size:11px;line-height:1.1;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis}.managerpill.small{font-size:10px;padding:2px 6px}.managerpill.none{border-color:#5d665e;background:#5d665e22;color:#C8D8CC}.owner .dot,.legenddot{display:none}.match.managerwin{box-shadow:0 0 0 1px #ffffff0d inset}.trophyrow.compact,.trophyrow.trophyhead{grid-template-columns:minmax(90px,1fr) minmax(70px,.9fr) 44px}.trophyrow.compact .trophybar{height:8px;min-width:60px}.trophyrow.compact b{font-size:16px;text-align:right}.dotrow{grid-template-columns:auto 1fr;align-items:center}.dotlabel{min-width:82px}.dotsline{align-items:center}.outcomedot{width:9px;height:9px}.teamstatgrid{grid-template-columns:repeat(auto-fit,minmax(135px,1fr))}.teamstatcard.compact{padding:7px;gap:2px}.teamstatcard.compact b{font-size:12px}.teamstatcard.compact span,.teamstatcard.compact small{font-size:10.5px}.todaybtn.on{background:#E8B33B;color:#0C1F15;border-color:#E8B33B;font-weight:800}.filtercollapse{align-items:stretch}.filtercollapse .clearfilterbtn{min-height:34px}.scoreline{gap:6px}.teamcell{min-width:0}.grpbadge{letter-spacing:.08em}.grow{min-width:0}.grow span{min-width:0;overflow:hidden;text-overflow:ellipsis}.brow span{min-width:0;overflow:hidden;text-overflow:ellipsis}@media(max-width:560px){.pane{padding:12px 10px}.hero{padding:20px 14px 14px}h1{font-size:38px}.panehead{align-items:flex-start}.match,.lockcard,.chartbox,.groupbox,.board{padding:8px;border-radius:9px}.matchmeta{gap:5px}.city{font-size:10.5px}.tname{font-size:12px}.scorebox.readonly{font-size:20px;gap:4px}.brow{grid-template-columns:20px minmax(72px,1fr) 23px 20px 20px 20px 28px 34px 36px;padding:9px 6px;font-size:10.5px}.brow.bhead{font-size:8px}.managerpill{font-size:10px;padding:3px 6px}.managerpill.small{font-size:9.5px}.trophyrow.compact,.trophyrow.trophyhead{grid-template-columns:minmax(82px,1fr) minmax(54px,.8fr) 38px;gap:5px;padding:6px}.trophyrow.compact b{font-size:15px}.dotrow{grid-template-columns:1fr}.dotsline{gap:3px}.outcomedot{width:8px;height:8px}.teamstatgrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.mystatcards{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.mystatcard{padding:8px}.mystatcard span{font-size:9px}.mystatcard b{font-size:18px}.filtercollapse{display:grid;grid-template-columns:1fr 1fr;gap:7px}.filtercollapse .clearfilterbtn{width:100%}.filterpanel{gap:6px;padding:8px}.groupsview{grid-template-columns:1fr}.charthead{align-items:flex-start}.calendarpill{font-size:10.5px}}


/* mobile-first polish */
.managerpill{border:0!important;box-shadow:none!important;background-clip:padding-box;min-width:0}.managerpill.small{min-width:0}.owner.none{border:0}.teamcell .managerpill{width:auto!important;min-width:0!important;max-width:118px!important;justify-content:flex-start}.teamcell.r .managerpill{justify-content:flex-end}.draftmanagercard{border-top:0!important;border-right:1px solid #ffffff12!important;border-bottom:1px solid #ffffff12!important}.managerdotrow{border:0;border-radius:10px;padding:7px 9px;grid-template-columns:minmax(72px,.45fr) 1fr}.managerdotrow .dotlabel{font-weight:900;color:#F0EDE2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rivalstable .rivalryrow{grid-template-columns:minmax(94px,1fr) 56px 56px 48px!important}.rivalryrow b{font-family:'Saira Condensed';font-size:15px;color:#E8B33B}.opponentrow{grid-template-columns:minmax(105px,.75fr) minmax(170px,1fr)!important}.opponentchips{display:flex;flex-wrap:wrap;gap:5px}.oppchip{font-style:normal;border:0;border-radius:999px;padding:4px 7px;font-size:10.5px;color:#F0EDE2;background:#68736b33;display:inline-flex;align-items:center;gap:4px}.oppchip b{font-family:'Saira Condensed';font-size:12px;letter-spacing:.04em}.oppchip.w{background:rgba(49,196,107,.30)}.oppchip.d{background:rgba(232,162,59,.30)}.oppchip.l{background:rgba(223,85,72,.32)}.oppchip.future{background:rgba(104,115,107,.35)}.lockcard.draftmanagercard .managerpill{background:rgba(12,31,21,.36)!important}.scoreline{align-items:stretch}.teamcell{justify-content:center}.teamcell .managerpill{font-size:9.5px;padding:4px 6px;line-height:1.15}.teamcell.r .managerpill{text-align:right}.outcomedot{box-shadow:none!important;border:0!important}
@media(max-width:560px){.app{font-size:13px}.pane{padding:10px 8px}.hero{padding:18px 12px 12px}.match,.lockcard,.chartbox,.groupbox,.board{padding:8px;margin-bottom:8px}.scoreline{gap:5px}.teamcell .managerpill{max-width:104px!important;font-size:8.8px}.tname{font-size:11.5px}.scorebox.readonly{font-size:19px;min-width:42px;justify-content:center}.managerdotrow{grid-template-columns:70px 1fr;padding:6px 7px}.dotsline{gap:3px}.outcomedot{width:8px;height:8px}.rivalstable .rivalryrow{grid-template-columns:minmax(80px,1fr) 46px 46px 38px!important;font-size:10px}.opponentrow{grid-template-columns:1fr!important}.opponentchips{margin-top:5px}.oppchip{font-size:9.5px;padding:3px 6px}.mystatcards{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.mystatcard{padding:7px}.mystatcard span{font-size:8.5px}.mystatcard b{font-size:17px}.lockteam{font-size:10.5px;padding:4px 7px}.charthead{margin-bottom:6px}.glabel{font-size:10px}.tabbar button{font-size:10px;letter-spacing:.06em;padding:13px 0}}


/* final requested table/stat formatting */
.managerpill{border:0!important;box-shadow:none!important}
.leaguebox{padding:10px;background:#10271A;border:1px solid #ffffff12;border-radius:10px;margin-bottom:14px}.leaguegrow{display:grid;grid-template-columns:24px minmax(92px,1.25fr) 30px 26px 26px 26px 36px 42px 42px;gap:7px;align-items:center;border-left:4px solid transparent;border-bottom:1px solid #ffffff0c;padding:8px 8px;font-size:12px;color:#F0EDE2;width:100%;text-align:left}.leaguegrow.leaguehead{background:transparent!important;color:#9FBFA8;text-transform:uppercase;font-size:9px;letter-spacing:.08em;border-left-color:transparent!important}.leaguerow{border-top:0;border-right:0;border-bottom:1px solid #ffffff0c;cursor:pointer;border-radius:0}.leaguerow.lead{box-shadow:inset 0 0 0 1px #E8B33B33}.leaguename{font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.leaguesquad{border-left:4px solid #ffffff10}.playerrow{border-left:4px solid transparent;border-radius:8px;color:#F0EDE2}.playerrowname{font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.trophyrow.compact.playerrow{grid-template-columns:minmax(76px,1fr) minmax(54px,.85fr) 42px;border:1px solid #ffffff12;border-left:4px solid transparent}.trophyrow.compact.playerrow .trophybar{height:8px;min-width:48px}.mystatsrow{border-left-width:4px!important}.rivalstable .rivalryrow.playerrow{border-left-width:4px!important}.teamstatcard.mystatsrow.rag-green,.teamstatcard.mystatsrow.rag-red{background-blend-mode:normal}.teamstatcard.mystatsrow.rag-green{box-shadow:inset 0 0 0 1px rgba(49,196,107,.18)}.teamstatcard.mystatsrow.rag-red{box-shadow:inset 0 0 0 1px rgba(223,85,72,.18)}
@media(max-width:560px){.leaguebox{padding:7px}.leaguegrow{grid-template-columns:20px minmax(78px,1.1fr) 24px 21px 21px 21px 28px 32px 34px;gap:4px;padding:7px 5px;font-size:10.5px}.leaguegrow.leaguehead{font-size:8px}.trophyrow.compact.playerrow{grid-template-columns:minmax(70px,1fr) minmax(42px,.75fr) 36px;gap:5px;padding:6px 5px;font-size:10.5px}.trophyrow.compact.playerrow b{font-size:14px}.playerrowname{font-size:10.5px}.leaguebox .managerpill{display:none}}


/* compact country/team tables + expected points column */
.leaguegrow{grid-template-columns:24px minmax(86px,1.2fr) 30px 26px 26px 26px 36px 42px 38px 42px!important}.leaguegrow .exppts{color:#C8D8CC;font-weight:700;opacity:.78}.countryperfrow{grid-template-columns:minmax(118px,1.35fr) minmax(62px,.75fr) 34px 38px 54px!important;gap:6px!important;padding:6px 7px!important;font-size:11.5px!important}.countryperfrow .plainowner{font-weight:800;color:#F0EDE2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.countryperfrow b:last-child{font-family:'Saira Condensed';font-size:16px;color:#E8B33B}.mysteamrow{grid-template-columns:minmax(116px,1.35fr) 44px 34px 38px 58px!important;gap:6px!important;padding:7px 8px!important;font-size:11.5px!important;border-left:4px solid transparent}.mysteamrow b:last-child{font-family:'Saira Condensed';font-size:16px;color:#E8B33B}.mysteamtable .rankinghead,.countryperf .rankinghead{background:transparent!important;color:#9FBFA8!important;text-transform:uppercase;font-size:9px!important;letter-spacing:.08em!important;border-left-color:transparent!important}@media(max-width:560px){.leaguegrow{grid-template-columns:20px minmax(70px,1.05fr) 23px 20px 20px 20px 28px 31px 30px 32px!important;gap:3px!important;padding:7px 4px!important;font-size:9.8px!important}.leaguegrow.leaguehead{font-size:7.5px!important}.countryperfrow{grid-template-columns:minmax(98px,1.3fr) minmax(52px,.65fr) 28px 31px 46px!important;gap:4px!important;padding:5px 5px!important;font-size:10px!important}.countryperfrow b:last-child{font-size:13px!important}.mysteamrow{grid-template-columns:minmax(94px,1.3fr) 36px 26px 31px 46px!important;gap:4px!important;padding:6px 5px!important;font-size:10px!important}.mysteamrow b:last-child{font-size:13px!important}}

.countryperfrow{grid-template-columns:minmax(90px,1.2fr) minmax(58px,.75fr) 32px 34px 38px 48px 48px 44px!important}
.mysteamrow{grid-template-columns:minmax(94px,1.25fr) 38px 30px 34px 38px 48px 48px 44px!important}
.rankinglist.compact>.rankingrow:not(.countryperfrow):not(.mysteamrow):not(.opponentrow){grid-template-columns:34px minmax(104px,1.25fr) 44px 50px minmax(70px,.8fr)}
.goodtext{color:#31c46b!important;font-weight:800}.badtext{color:#df5548!important;font-weight:800}
.oppchip b{display:none!important}
@media(max-width:560px){.countryperfrow{grid-template-columns:minmax(80px,1.1fr) 42px 26px 30px 34px 40px 42px 36px!important;font-size:9.5px!important}.mysteamrow{grid-template-columns:minmax(76px,1.1fr) 32px 26px 28px 32px 38px 40px 36px!important;font-size:9.5px!important}.rankinglist.compact>.rankingrow:not(.countryperfrow):not(.mysteamrow):not(.opponentrow){grid-template-columns:28px minmax(88px,1.1fr) 36px 42px minmax(54px,.7fr);font-size:9.5px!important}.rankowner .managerpill{font-size:8.5px!important;padding:2px 4px!important}.oppchip{font-size:9.5px!important;padding:4px 6px!important}}

.charthead{margin-left:0!important;padding-left:0!important}.glabel{margin-left:0!important;padding-left:0!important}

.filterrow{display:grid;gap:6px;margin-bottom:6px}
.filterrow-status{grid-template-columns:repeat(4,1fr);border:1px solid #ffffff24;border-radius:8px;overflow:hidden}
.statusbtn{background:transparent;border:0;border-right:1px solid #ffffff18;color:#9FBFA8;font-size:11px;padding:8px 4px;cursor:pointer;white-space:nowrap;width:100%;text-align:center}
.statusbtn:last-child{border-right:0}
.statusbtn.on{background:#E8B33B;color:#0C1F15;font-weight:800}
.syncbar .syncmsg{min-width:0}

.togglelabel{display:inline-flex;align-items:center;gap:7px;font-size:12px;color:#9FBFA8;cursor:pointer;user-select:none;padding:4px 0}
.toggleswitch{display:inline-block;width:40px;height:22px;background:#2a3d32;border-radius:999px;position:relative;transition:background .2s;cursor:pointer;flex-shrink:0}
.toggleswitch.on{background:#E8B33B}
.toggleknob{position:absolute;top:3px;left:3px;width:16px;height:16px;background:#fff;border-radius:50%;transition:transform .2s;box-shadow:0 1px 3px #0004}
.toggleswitch.on .toggleknob{transform:translateX(18px)}

.channelpill{border:1px solid #E8B33B55;background:#E8B33B14;color:#F0EDE2;border-radius:999px;padding:3px 8px;font-size:11px;font-weight:800;white-space:nowrap}
.compactmatch{display:grid;grid-template-columns:38px 1fr 48px 1fr;gap:4px 8px;align-items:center;padding:7px 10px;border:1px solid #ffffff12;border-radius:8px;margin-bottom:5px;background:#10271A}
.compacthome{display:flex;flex-direction:column;gap:1px;align-items:flex-end;min-width:0;overflow:hidden}
.compactaway{display:flex;flex-direction:column;gap:1px;min-width:0;overflow:hidden}
.compactteam{font-size:12.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.compactowner{font-size:10px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;opacity:.9}
.compactscore{font-family:'Saira Condensed';font-weight:800;font-size:20px;color:#E8B33B;text-align:center;white-space:nowrap}
.compactchannel{grid-column:1/-1;color:#C8D8CC;font-size:10.5px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
@media(max-width:560px){
  .compactmatch{padding:5px 8px;gap:2px 5px;grid-template-columns:32px 1fr 42px 1fr}
  .compacthome{flex-direction:row;align-items:center;justify-content:flex-end;gap:3px}
  .compactaway{flex-direction:row;align-items:center;gap:3px}
  .compactteam{font-size:11px}
  .compactowner{font-size:9.5px}
  .compactscore{font-size:16px}
  .channelpill{font-size:10px;padding:2px 6px}
}

@media(max-width:560px){
  .countryperf .countryperfrow>*:nth-child(5),
  .countryperf .countryperfrow>*:nth-child(6){display:none!important}
  .countryperf .countryperfrow{grid-template-columns:minmax(88px,1.35fr) minmax(48px,.7fr) 26px 28px 44px 38px!important}
}

.draftsavemsg{font-size:11px;color:#8BA898;min-height:16px}
.herofoot{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:6px}
.sharemodal{width:360px}
.sharelist{display:flex;flex-direction:column;gap:5px;max-height:54vh;overflow-y:auto;margin:4px 0 8px}
.sharelisthead{font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:#8BA898;margin:8px 0 2px}
.sharelisthead:first-child{margin-top:0}
.shareitem{display:block;width:100%;text-align:left;background:#0C1F15;border:1px solid #ffffff18;border-radius:8px;color:#F0EDE2;padding:9px 11px;font-size:13px;font-weight:600;cursor:pointer}
.shareitem:hover{border-color:#E8B33B66;background:#E8B33B14}
.herosync{display:flex;align-items:center;gap:8px;flex-shrink:0}
.herosync .syncmsg{font-size:11px;color:#9FBFA8;white-space:nowrap}
.herorefresh{font-size:20px;padding:3px 10px;flex-shrink:0;line-height:1}
.swaplog{margin-top:28px;padding-top:20px;border-top:1px solid #ffffff14}
.swaplog-hd{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#8BA898;margin-bottom:10px}
.swaprow{display:flex;align-items:center;gap:8px;padding:7px 10px;background:#0E2318;border:1px solid #ffffff10;border-radius:8px;margin-bottom:6px;min-width:0}
.swaprow:last-child{margin-bottom:0}
.swapdate{font-size:11px;font-weight:700;color:#8BA898;flex-shrink:0}
.swaptext{font-size:12px;color:#C8D8CC;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.swapnet{font-size:12px;font-weight:900;flex-shrink:0;white-space:nowrap;padding:3px 8px;border-radius:6px}
.swapnet.pos{color:#6BC17A;background:#6BC17A18}
.swapnet.zero{color:#8BA898;background:#ffffff08}
`;