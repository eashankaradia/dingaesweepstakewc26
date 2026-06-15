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
  SCO: ["Scotland", "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "C"],
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
  ENG: ["England", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "L"],
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
  Scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
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
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
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

function channelLogoSrc(ch) {
  if (!ch) return null;
  const lower = ch.toLowerCase();
  if (lower.startsWith("bbc")) return "/bbc-logo.svg";
  if (lower.startsWith("itv")) return "/itv-logo.svg";
  return null;
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
  const [expandedMatch, setExpandedMatch] = useState(null);
  const [drawerPlayer, setDrawerPlayer] = useState(null);

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

  // Load shared matches cache from GitHub so everyone sees the same data
  useEffect(() => {
    const RAW = "https://raw.githubusercontent.com/eashankaradia/dingaesweepstakewc26/main/public/matches-cache.json";
    fetch(`${RAW}?t=${Date.now()}`, { headers: { "Cache-Control": "no-cache" } })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.matches) && data.matches.length > 0) {
          setState((s) => ({
            ...s,
            apiMatches: data.matches,
            apiMeta: data.meta || null,
            lastSync: data.cachedAt ? new Date(data.cachedAt).getTime() : s.lastSync,
            nextRefreshAt: data.nextRefreshAt ? new Date(data.nextRefreshAt).getTime() : s.nextRefreshAt,
          }));
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
    ctx.fillText(`Updated ${fmtDateTime(new Date())}`, 34, 90);

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
    ctx.fillText("dingaesweepstakewc26.vercel.app", 34, height - 22);

    const leader = board[0];
    const second = board[1];
    const gap = leader && second ? leader.pts - second.pts : 0;
    let leaderLine = "";
    if (leader) {
      if (gap === 0) leaderLine = `${leader.name} and ${second?.name} are level on points.`;
      else leaderLine = `${leader.name} is winning by ${gap} point${gap === 1 ? "" : "s"}.`;
    }

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], "dingae-sweepstake-table.png", { type: "image/png" });
      const shareText = `${leaderLine}\n\nFollow the live table: https://dingaesweepstakewc26.vercel.app`;
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "Dingae Sweepstake table", text: shareText });
        return;
      }
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "dingae-sweepstake-table.png";
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
          background: `${PLAYER_COLORS[p.id]}18`,
          color: PLAYER_COLORS[p.id],
          border: `1px solid ${PLAYER_COLORS[p.id]}55`,
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
    const isExp = expandedMatch === m.id;
    const homeFlag = flagForTeam(m.homeCode, m.homeName);
    const awayFlag = flagForTeam(m.awayCode, m.awayName);
    const statusClass = isFinished(m) ? "done" : isLive(m) ? "live" : "future";
    const hScore = typeof m.homeGoals === "number" ? m.homeGoals : "–";
    const aScore = typeof m.awayGoals === "number" ? m.awayGoals : "–";
    const winnerCode = winningTeamCode(m);
    const winnerOwner = winnerCode ? ownerOf(winnerCode) : null;
    const homeOwner = ownerOf(m.homeCode);
    const awayOwner = ownerOf(m.awayCode);
    const homeExp = m.homeCode && m.awayCode ? expectedPointsFromRanks(m.homeCode, m.awayCode).toFixed(1) : "—";
    const awayExp = m.homeCode && m.awayCode ? expectedPointsFromRanks(m.awayCode, m.homeCode).toFixed(1) : "—";
    const channel = matchChannel(m);
    const kickoffTime = m.date ? new Date(m.date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }) : "";
    return (
      <div
        className={`match ${isExp ? "match-expanded" : ""} ${winnerOwner ? "managerwin" : ""}`}
        style={winnerOwner ? { borderColor: winnerOwner.color, background: `${winnerOwner.color}0E` } : undefined}
        onClick={() => setExpandedMatch(isExp ? null : m.id)}
      >
        <div className="matchrow1">
          <span className={`grpbadge ${statusClass}`}>{m.status || "NS"}</span>
          <div className="matchteams">
            <span className="mteam home">
              <span className="mflag">{homeFlag}</span>
              <span className="mname">{nameFor(m.homeCode, m.homeName)}</span>
            </span>
            <span className="mscore">
              <span>{hScore}</span>
              <span className="mcolon">:</span>
              <span>{aScore}</span>
            </span>
            <span className="mteam away">
              <span className="mname">{nameFor(m.awayCode, m.awayName)}</span>
              <span className="mflag">{awayFlag}</span>
            </span>
          </div>
          {kickoffTime && <span className="matchtime">{kickoffTime}</span>}
        </div>
        <div className="matchrow2">
          <span className="mmanager">
            {homeOwner ? <ManagerPill player={homeOwner} small /> : <span className="owner none">—</span>}
          </span>
          <span className="mxpts">{homeExp} · {awayExp} xPts</span>
          <span className="mmanager away">
            {awayOwner ? <ManagerPill player={awayOwner} small /> : <span className="owner none">—</span>}
          </span>
        </div>
        {isExp && (
          <div className="matchdetail">
            <div className="matchdetailrow">
              <span className="city">{matchDisplayRound(m)}</span>
              {m.date && <span className="city">{fmtDateTime(m.date)}</span>}
              {channel && (channelLogoSrc(channel)
                ? <img src={channelLogoSrc(channel)} alt={fmtChannel(channel)} className="channellogo" />
                : <span className="channelpill">{fmtChannel(channel)}</span>
              )}
            </div>
            {(!m.homeCode || !m.awayCode) && (
              <span className="city">Unmapped: {m.homeName} vs {m.awayName}</span>
            )}
          </div>
        )}
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

  const ScoreTicker = () => {
    const live = state.apiMatches.filter((m) => isLive(m) && m.homeCode && m.awayCode);
    const recent = state.apiMatches
      .filter((m) => isFinished(m) && m.homeCode && m.awayCode && typeof m.homeGoals === "number")
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
      .slice(0, 12);
    const items = live.length > 0 ? [...live, ...recent.slice(0, 6)] : recent;
    if (items.length === 0) return null;
    return (
      <div className="scoreticker">
        <div className="tickertrack">
          {items.map((m) => (
            <button
              key={m.id}
              className={`tickeritem ${isLive(m) ? "live" : ""}`}
              onClick={(e) => { e.stopPropagation(); setTab("results"); setExpandedMatch(m.id); }}
            >
              <span className="tickerflag">{flagForTeam(m.homeCode, m.homeName)}</span>
              <span className="tickerscore">
                {typeof m.homeGoals === "number" ? m.homeGoals : "–"}
                {"–"}
                {typeof m.awayGoals === "number" ? m.awayGoals : "–"}
              </span>
              <span className="tickerflag">{flagForTeam(m.awayCode, m.awayName)}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const PointsRaceChart = () => {
    const [hl, setHl] = useState(null);
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
                const active = hl === null || hl === p.id;
                return (
                  <g key={p.id} style={{ cursor: "pointer" }} onClick={() => setHl(hl === p.id ? null : p.id)}>
                    <polyline
                      points={points}
                      fill="none"
                      stroke={PLAYER_COLORS[p.id]}
                      strokeWidth={active ? "3" : "1.5"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={active ? 1 : 0.18}
                    />
                    <circle
                      cx={xFor(last.game)}
                      cy={yFor(last.scores[p.id] || 0)}
                      r={active ? 4 : 2}
                      fill={PLAYER_COLORS[p.id]}
                      opacity={active ? 1 : 0.18}
                    />
                  </g>
                );
              })}
            </svg>
            <div className="chartlegend">
              {players.map((p) => (
                <span key={p.id} style={{ cursor: "pointer", opacity: hl === null || hl === p.id ? 1 : 0.35 }} onClick={() => setHl(hl === p.id ? null : p.id)}><ManagerPill player={p} small /></span>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };


  const PositionRaceChart = () => {
    const [hl, setHl] = useState(null);
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
        <div className="charthead"><div><div className="glabel">POSITION RACE</div><div className="subtle">League position after each completed game · tap a line to highlight</div></div></div>
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
                const active = hl === null || hl === p.id;
                return (
                  <g key={p.id} style={{ cursor: "pointer" }} onClick={() => setHl(hl === p.id ? null : p.id)}>
                    <polyline points={points} fill="none" stroke={PLAYER_COLORS[p.id]} strokeWidth={active ? "3" : "1.5"} strokeLinecap="round" strokeLinejoin="round" opacity={active ? 1 : 0.18} />
                    <circle cx={xFor(last.game)} cy={yFor(last.positions[p.id] || players.length)} r={active ? 4 : 2} fill={PLAYER_COLORS[p.id]} opacity={active ? 1 : 0.18} />
                  </g>
                );
              })}
            </svg>
            <div className="chartlegend">{players.map((p) => <span key={p.id} style={{ cursor: "pointer", opacity: hl === null || hl === p.id ? 1 : 0.35 }} onClick={() => setHl(hl === p.id ? null : p.id)}><ManagerPill player={p} small /></span>)}</div>
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
                        <em key={i} className={`oppchip ${o.result}`} title={nameFor(o.opp)}>
                          {TEAMS[o.opp]?.[1] || "🏳️"}
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
          <h1>DINGAE <span>SWEEPSTAKE</span></h1>
          <div className="herosync">
            <span className="syncmsg">
              {syncMsg ||
                (!canRefresh
                  ? `Next refresh in ${refreshMinutesLeft}m`
                  : state.lastSync
                  ? fmtDateTime(state.lastSync)
                  : "")}
            </span>
            <button className="syncbtn herorefresh" onClick={runSync} disabled={!canRefresh} title={refreshButtonText} aria-label={refreshButtonText}>
              {syncing ? "⟳" : "↻"}
            </button>
          </div>
        </div>
        <ScoreTicker />
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
            <button className="editdraftbtn" onClick={shareTableImageToWhatsApp}>Share table image</button>
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
          ["draft", "Draft", "📋"],
          ["results", "Results", "⚽"],
          ["table", "Table", "🏆"],
          ["tournament", "Tourney", "🗂"],
          ["stats", "My Stats", "📊"],
        ].map(([k, l, icon]) => (
          <button
            key={k}
            className={tab === k ? "on" : ""}
            onClick={() => setTab(k)}
          >
            <span className="tabicon">{icon}</span>
            <span className="tablabel">{l}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;800&family=Inter:wght@400;500;600;700&display=swap');

/* ── Reset & base ── */
*{box-sizing:border-box;margin:0;padding:0}
.app{min-height:100vh;background:#091611;color:#F0EDE2;font-family:Inter,system-ui,sans-serif;font-size:14px;padding-bottom:80px}

/* ── Hero header ── */
.hero{background:linear-gradient(160deg,#0F2318 0%,#0A1812 100%);padding:12px 14px 0;border-bottom:1px solid #1E3528;position:sticky;top:0;z-index:100}
.herofoot{display:flex;align-items:center;justify-content:space-between;gap:8px;padding-bottom:10px}
h1{font-family:'Saira Condensed';font-weight:800;font-size:28px;line-height:1;color:#E8B33B;letter-spacing:.02em;text-shadow:0 0 30px #E8B33B33}
h1 span{color:#E8B33B88;font-size:22px}
.herosync{display:flex;align-items:center;gap:6px;flex-shrink:0}
.herosync .syncmsg{font-size:10px;color:#4A6A56;white-space:nowrap;max-width:120px;overflow:hidden;text-overflow:ellipsis}
.herorefresh{font-size:17px;padding:5px 11px;background:#E8B33B;color:#0A1812;border:0;border-radius:9px;cursor:pointer;line-height:1;font-weight:900;box-shadow:0 2px 10px #E8B33B44}
.herorefresh:disabled{background:#1A2E20;color:#3A5A48;cursor:not-allowed;box-shadow:none}

/* ── Score Ticker ── */
.scoreticker{overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:none;border-top:1px solid #1E3528;margin:0 -14px}
.scoreticker::-webkit-scrollbar{display:none}
.tickertrack{display:flex;gap:0;padding:0 14px;align-items:stretch;min-width:max-content}
.tickeritem{display:flex;align-items:center;gap:5px;padding:7px 10px;background:transparent;border:0;border-right:1px solid #1A2E20;color:#8BA898;cursor:pointer;font-size:12px;white-space:nowrap;flex-shrink:0;transition:background .12s}
.tickeritem:last-child{border-right:0}
.tickeritem:hover{background:#0F2019}
.tickeritem.live{color:#E0635C}
.tickerflag{font-size:14px;line-height:1}
.tickerscore{font-family:'Saira Condensed';font-weight:800;font-size:14px;color:#E8B33B;min-width:28px;text-align:center}
.tickeritem.live .tickerscore{color:#E0635C;animation:livepulse 1.8s ease-in-out infinite}

/* ── Pane & headings ── */
.pane{padding:12px 14px}
.panehead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
h2{font-family:'Saira Condensed';font-weight:800;font-size:20px;text-transform:uppercase;color:#F0EDE2;letter-spacing:.06em}
.subtle,.hintline,.city{font-size:11px;color:#5A7A68}

/* ── Cards base ── */
.lockcard,.board,.bracketbox,.chartbox{background:#0F2019;border:1px solid #1E3528;border-radius:12px;padding:12px;margin-bottom:8px;box-shadow:0 2px 12px rgba(0,0,0,0.3)}
.groupbox{background:#0F2019;border:1px solid #1E3528;border-radius:12px;overflow:hidden;margin-bottom:8px}

/* ── Buttons ── */
.editdraftbtn{background:#E8B33B;color:#0A1812;border:0;border-radius:9px;padding:8px 14px;font-weight:800;cursor:pointer;font-size:12px;box-shadow:0 2px 6px #E8B33B33;white-space:nowrap}
.syncbtn{background:#E8B33B;color:#0A1812;border:0;border-radius:9px;padding:8px 14px;font-weight:800;cursor:pointer}
.syncbtn:disabled{opacity:0.4;cursor:not-allowed;background:#1E3528;color:#4A6A56;box-shadow:none}
.clearfilterbtn{background:transparent;border:1px solid #1E3528;color:#8BA898;border-radius:9px;padding:8px 11px;font-size:12px;cursor:pointer;white-space:nowrap}

/* ── Manager pills ── */
.managerpill{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:3px 9px;font-weight:800;font-size:11px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;letter-spacing:.02em;text-transform:uppercase}
.managerpill.small{font-size:10px;padding:2px 7px}
.managerpill.none{background:#1A2E20;color:#4A6A56;border:1px solid #1E3528}

/* ── Match cards (new compact design) ── */
.match{background:#0F2019;border:1px solid #1E3528;border-radius:10px;padding:10px 12px;margin-bottom:6px;cursor:pointer;transition:border-color .12s,background .12s;-webkit-tap-highlight-color:transparent}
.match:hover,.match:active{border-color:#2A4A38;background:#112219}
.match.match-expanded{border-color:#2A4A38}
.match.managerwin{box-shadow:0 2px 14px rgba(0,0,0,0.35)}
.matchrow1{display:flex;align-items:center;gap:7px;min-width:0}
.matchteams{flex:1;display:flex;align-items:center;gap:6px;min-width:0}
.mteam{display:flex;align-items:center;gap:4px;min-width:0;flex:1}
.mteam.away{flex-direction:row-reverse}
.mflag{font-size:15px;flex-shrink:0;line-height:1}
.mname{font-size:12px;font-weight:700;color:#F0EDE2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.mscore{font-family:'Saira Condensed';font-weight:800;font-size:20px;color:#E8B33B;display:flex;align-items:center;gap:3px;flex-shrink:0;min-width:44px;justify-content:center}
.mcolon{color:#4A6A56;font-size:14px}
.matchtime{font-size:10px;color:#4A6A56;flex-shrink:0;white-space:nowrap;font-weight:600}
.matchrow2{display:flex;align-items:center;justify-content:space-between;margin-top:6px;gap:4px}
.mmanager{flex:1;display:flex;align-items:center}
.mmanager.away{justify-content:flex-end}
.mxpts{font-size:10px;color:#3A5A48;text-align:center;flex-shrink:0;white-space:nowrap}
.matchdetail{margin-top:8px;padding-top:8px;border-top:1px solid #1A2E20;display:flex;flex-direction:column;gap:5px}
.matchdetailrow{display:flex;flex-wrap:wrap;align-items:center;gap:8px}

/* ── Status badges ── */
.grpbadge{font-family:'Saira Condensed';font-size:10px;letter-spacing:.12em;background:#1E3528;color:#4A6A56;border-radius:4px;padding:2px 6px;font-weight:800;flex-shrink:0}
.grpbadge.done{background:#1A3018;color:#4AB865}
.grpbadge.live{background:#3A1A18;color:#E0635C;animation:livepulse 1.8s ease-in-out infinite}
@keyframes livepulse{0%,100%{box-shadow:0 0 0 0 #E0635C44}50%{box-shadow:0 0 0 4px #E0635C00}}
.grpbadge.future{background:#1E3528;color:#4A6A56}
.owner{font-size:10px;display:inline-flex;align-items:center;color:#4A6A56}
.owner.none{color:#2A4A38}

/* ── Compact match rows ── */
.compactmatch{display:grid;grid-template-columns:38px 1fr 48px 1fr;gap:4px 8px;align-items:center;padding:8px 10px;border:1px solid #1E3528;border-radius:8px;margin-bottom:5px;background:#0F2019}
.compacthome{display:flex;flex-direction:column;gap:1px;align-items:flex-end;min-width:0;overflow:hidden}
.compactaway{display:flex;flex-direction:column;gap:1px;min-width:0;overflow:hidden}
.compactteam{font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;color:#F0EDE2}
.compactowner{font-size:9.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;color:#5A7A68}
.compactscore{font-family:'Saira Condensed';font-weight:800;font-size:20px;color:#E8B33B;text-align:center;white-space:nowrap}

/* ── Tab bar ── */
.tabbar{position:fixed;bottom:0;left:0;right:0;display:flex;background:#09160EF8;border-top:1px solid #1E3528;backdrop-filter:blur(12px)}
.tabbar button{flex:1;background:transparent;border:0;color:#4A6A56;padding:8px 0 12px;cursor:pointer;transition:color .15s;display:flex;flex-direction:column;align-items:center;gap:2px}
.tabbar button.on{color:#E8B33B;box-shadow:inset 0 3px 0 #E8B33B}
.tabicon{font-size:18px;line-height:1}
.tablabel{font-family:'Saira Condensed';font-weight:700;letter-spacing:.08em;font-size:9px;text-transform:uppercase}

/* ── League table ── */
.leaguebox{padding:0;background:#0F2019;border:1px solid #1E3528;border-radius:12px;margin-bottom:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.3)}
.leaguegrow{display:grid;grid-template-columns:24px minmax(86px,1.2fr) 30px 26px 26px 26px 36px 42px 38px 42px!important;gap:7px;align-items:center;border-left:4px solid transparent;border-bottom:1px solid #0D1E14;padding:9px 10px;font-size:12px;color:#F0EDE2;width:100%;text-align:left}
.leaguegrow.leaguehead{background:#0C1A10;color:#4A6A56;text-transform:uppercase;font-size:9px;letter-spacing:.1em;border-left-color:transparent;padding:7px 10px}
.leaguename{font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.leaguerow{cursor:pointer;transition:background .1s}
.leaguerow.lead{background:linear-gradient(90deg,#E8B33B14,transparent 70%)}
.leaguesquad{border-left:4px solid #0D1E14}
.squad{background:#091611;border-bottom:1px solid #0D1E14;padding:3px 0}
.squadrow{display:flex;justify-content:space-between;padding:5px 13px;font-size:11px;color:#6B8A78}
.exppts{color:#3A5A48;font-weight:600}

/* ── Groups and tournament ── */
.groupsview{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:8px}
.glabel{font-family:'Saira Condensed';font-weight:800;letter-spacing:.2em;font-size:10px;color:#E8B33B;margin-bottom:0;text-transform:uppercase;padding:8px 10px;border-bottom:1px solid #1A2E20}
.grow{display:grid;grid-template-columns:1.15fr .8fr 28px 34px 34px 58px;gap:8px;align-items:center;border-left:4px solid transparent;border-bottom:1px solid #0D1E14;padding:7px 8px;font-size:12px;color:#F0EDE2}
.grow:last-child{border-bottom:0}
.grow span{min-width:0;overflow:hidden;text-overflow:ellipsis}
.grow.ghead{color:#4A6A56;text-transform:uppercase;font-size:9px;background:#0C1A10;border-left-color:transparent;letter-spacing:.08em}
.grow.qualrow,.grow.ghead{grid-template-columns:1.15fr .8fr 28px 34px 34px 58px}
.qualpill{font-size:9.5px;border-radius:999px;padding:2px 7px;text-align:center;background:#1E3528;color:#4A6A56;font-weight:700}
.qualpill.alive{background:#142B1A;color:#2FB865}
.qualpill.out{background:#2A1210;color:#C04840}
.out{opacity:0.32;filter:grayscale(0.4)}

/* ── Chart sections ── */
.chartbox{margin-top:12px}
.charthead{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #1A2E20}
.racechart{width:100%;height:auto;display:block;background:#091611;border:1px solid #1A2E20;border-radius:8px}
.gridline{stroke:#1A2E20;stroke-width:1}
.axisline{stroke:#1E3528;stroke-width:1}
.axistext{fill:#3A5A48;font-size:11px;font-family:Inter,system-ui,sans-serif}
.axislabel{fill:#3A5A48;font-size:10px;font-family:Inter,system-ui,sans-serif;letter-spacing:.04em}
.chartlegend{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;font-size:11px}

/* ── Dots ── */
.dotsgrid{display:flex;flex-direction:column;gap:6px}
.dotrow{display:grid;grid-template-columns:auto 1fr;gap:8px;align-items:center}
.dotlabel{font-size:12px;font-weight:700;color:#F0EDE2;min-width:80px}
.dotsline{display:flex;flex-wrap:wrap;gap:3px;align-items:center}
.outcomedot{width:9px;height:9px;border-radius:50%;display:inline-block;background:#1E3528}
.outcomedot.w{background:#2DB860}
.outcomedot.d{background:#D4941A}
.outcomedot.l{background:#C84040}
.outcomedot.future{background:#1E3528}
.managerdotrow{border:1px solid #1E3528;border-radius:9px;padding:7px 10px;grid-template-columns:minmax(70px,.42fr) 1fr}
.managerdotrow .dotlabel{font-weight:900;color:#F0EDE2}

/* ── Draft cards ── */
.lockcard.draftmanagercard{border-radius:10px;border:1px solid #1E3528;padding:11px 12px}
.lockname{font-family:'Saira Condensed';font-size:18px;font-weight:800;display:flex;align-items:center;color:#F0EDE2}
.lockrow{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
.lockteam{font-size:11px;background:#091611;border:1px solid #1A2E20;border-radius:999px;padding:4px 10px;display:inline-flex;align-items:center;gap:5px;color:#B0C8B8}
.lockteam.editing{border-radius:8px;padding:5px 8px}
.lockteam.out{opacity:0.32}
.draftnameinput{background:#091611;border:1px solid #E8B33B44;border-radius:7px;color:#F0EDE2;padding:5px 8px;font-family:Inter,system-ui,sans-serif;font-size:14px;font-weight:700;min-width:120px}
.ownerselect{background:#0F2019;border:1px solid #1E3528;color:#F0EDE2;border-radius:6px;padding:3px 5px;font-size:11px;max-width:100px}

/* ── Ranking list ── */
.rankinglist{display:grid;grid-template-columns:1fr;gap:4px}
.rankingrow{display:grid;grid-template-columns:38px minmax(120px,1fr) 58px minmax(72px,.7fr);gap:8px;align-items:center;background:#0F2019;border:1px solid #1E3528;border-left:4px solid #1E3528;border-radius:9px;padding:7px 9px;font-size:12px;color:#F0EDE2}
.rankingrow.rankinghead{border-left-color:transparent;background:transparent;color:#4A6A56;text-transform:uppercase;font-size:9px;letter-spacing:.1em;padding-top:2px;padding-bottom:2px}
.ranknum{font-family:'Saira Condensed';font-weight:800;color:#E8B33B;font-size:15px}
.rankteam{font-weight:700;color:#F0EDE2}
.rankfifa{font-family:'Saira Condensed';font-weight:800;color:#C8D8CC;font-size:14px}
.rankowner{font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.playerrow{border-left:4px solid transparent;border-radius:9px;color:#F0EDE2}
.playerrowname{font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* ── Stat cards ── */
.mystatcards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:8px 0 12px}
.mystatcard{border:1px solid #1E3528;border-radius:12px;padding:12px 10px;display:flex;flex-direction:column;gap:4px;background:#0F2019;box-shadow:0 2px 10px rgba(0,0,0,0.25)}
.mystatcard span{font-size:9.5px;color:#4A6A56;text-transform:uppercase;letter-spacing:.08em;font-weight:600}
.mystatcard b{font-family:'Saira Condensed';font-size:28px;line-height:1;color:#E8B33B}

/* ── Trophy chances ── */
.trophygrid{display:flex;flex-direction:column;gap:5px}
.trophyrow{display:grid;grid-template-columns:minmax(90px,1fr) minmax(70px,.9fr) 44px;gap:6px 8px;align-items:center;font-size:12px}
.trophyrow.compact,.trophyrow.trophyhead{display:grid;grid-template-columns:minmax(90px,1fr) minmax(70px,.9fr) 44px;gap:8px;align-items:center;padding:8px 9px;border:1px solid #1E3528;border-radius:9px;background:#0F2019;font-size:12px;color:#F0EDE2}
.trophyrow.trophyhead{background:#0C1A10;color:#4A6A56;text-transform:uppercase;font-size:9px;letter-spacing:.1em}
.trophyrow.compact b{font-family:'Saira Condensed';font-size:16px;color:#E8B33B;text-align:right}
.trophybar{height:6px;background:#1A2E20;border-radius:999px;overflow:hidden;min-width:44px}
.trophybar i{display:block;height:100%;border-radius:999px}
.trophyrow.compact.playerrow{grid-template-columns:minmax(76px,1fr) minmax(54px,.85fr) 42px;border:1px solid #1E3528;border-left:4px solid transparent}

/* ── Heatmap ── */
.heatmapgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(165px,1fr));gap:7px}
.heatgroup{display:flex;flex-direction:column;gap:5px;background:#0F2019;border:1px solid #1E3528;border-radius:10px;overflow:hidden}
.heatgroup b{font-family:'Saira Condensed';color:#E8B33B;letter-spacing:.1em;font-size:11px;padding:7px 8px;border-bottom:1px solid #1A2E20;display:block}
.heatteam{border-bottom:1px solid #0D1E14;padding:5px 8px;display:flex;justify-content:space-between;gap:6px;font-size:11px;color:#B0C8B8}
.heatteam:last-child{border-bottom:0}
.heatteam.mutedheat{background:#091611;color:#3A5A48}
.heatteam small{font-size:10px;color:#4A6A56}

/* ── Brackets ── */
.bracketgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px}
.bracketround{background:#091611;border:1px solid #1E3528;border-radius:10px;padding:9px;display:flex;flex-direction:column;gap:7px}
.bracketround>b{font-family:'Saira Condensed';color:#E8B33B;text-transform:uppercase;letter-spacing:.12em;font-size:11px}
.bracketmatch{background:#0F2019;border:1px solid #1E3528;border-radius:8px;padding:8px;font-size:11px;display:grid;grid-template-columns:1fr auto 1fr;gap:5px;align-items:center;color:#F0EDE2}
.bracketmatch span:last-of-type{text-align:right}
.bracketmatch strong{font-family:'Saira Condensed';font-size:18px;color:#E8B33B;text-align:center}
.bracketmatch small{grid-column:1/-1;color:#4A6A56;font-size:9.5px}

/* ── Opponents (flags only) ── */
.opponentrow{grid-template-columns:minmax(105px,.75fr) minmax(170px,1fr)!important}
.opponentchips{display:flex;flex-wrap:wrap;gap:4px}
.oppchip{font-style:normal;border:0;border-radius:6px;padding:4px 6px;font-size:14px;background:#1A2E20;display:inline-flex;align-items:center;line-height:1}
.oppchip.w{background:rgba(45,184,96,.2)}
.oppchip.d{background:rgba(212,148,26,.2)}
.oppchip.l{background:rgba(200,64,64,.2)}
.oppchip.future{background:#141F17}

/* ── Rivalries ── */
.rivalstable .rivalryrow{grid-template-columns:minmax(94px,1fr) 56px 56px 48px!important}
.rivalryrow b{font-family:'Saira Condensed';font-size:15px;color:#E8B33B}

/* ── Country performance rows ── */
.countryperfrow{grid-template-columns:minmax(90px,1.2fr) minmax(58px,.75fr) 32px 34px 38px 48px 48px 44px!important;gap:6px!important;padding:5px 7px!important;font-size:12px!important;color:#F0EDE2}
.countryperfrow .plainowner{font-weight:700;color:#B0C8B8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.countryperfrow b:last-child{font-family:'Saira Condensed';font-size:15px;color:#E8B33B}
.mysteamrow{grid-template-columns:minmax(94px,1.25fr) 38px 30px 34px 38px 48px 48px 44px!important;gap:6px!important;padding:6px 8px!important;font-size:12px!important;border-left:4px solid transparent;color:#F0EDE2}
.mysteamrow b:last-child{font-family:'Saira Condensed';font-size:15px;color:#E8B33B}
.mysteamtable .rankinghead,.countryperf .rankinghead{background:transparent!important;color:#4A6A56!important;text-transform:uppercase;font-size:9px!important;letter-spacing:.1em!important;border-left-color:transparent!important}

/* ── Filters ── */
.filterrow{display:grid;gap:6px;margin-bottom:8px}
.filterrow-status{grid-template-columns:repeat(4,1fr);border:1px solid #1E3528;border-radius:9px;overflow:hidden;background:#0F2019}
.statusbtn{background:transparent;border:0;border-right:1px solid #1A2E20;color:#4A6A56;font-size:11px;padding:10px 4px;cursor:pointer;width:100%;text-align:center;font-weight:700;transition:all .12s}
.statusbtn:last-child{border-right:0}
.statusbtn.on{background:#E8B33B;color:#0A1812;font-weight:800}
.filterpanel{background:#0F2019;border:1px solid #1E3528;border-radius:10px;padding:11px;margin:0 0 8px;display:grid;grid-template-columns:1fr;gap:7px;font-size:12px}
.filterpanel label{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#4A6A56;font-weight:700}
.filterpanel .filterselect{width:100%;min-width:0}
.filterselect{background:#091611;border:1px solid #1E3528;color:#F0EDE2;border-radius:8px;padding:8px 10px;font-size:13px;min-width:160px}
.filterselect.small{min-width:110px}

/* ── Toggle ── */
.togglelabel{display:inline-flex;align-items:center;gap:7px;font-size:11px;color:#6B8A78;cursor:pointer;user-select:none;padding:4px 0}
.toggleswitch{display:inline-block;width:38px;height:21px;background:#1E3528;border-radius:999px;position:relative;transition:background .2s;cursor:pointer;flex-shrink:0}
.toggleswitch.on{background:#E8B33B}
.toggleknob{position:absolute;top:3px;left:3px;width:15px;height:15px;background:#fff;border-radius:50%;transition:transform .2s;box-shadow:0 1px 4px rgba(0,0,0,0.4)}
.toggleswitch.on .toggleknob{transform:translateX(17px)}

/* ── Modal ── */
.modalOverlay{position:fixed;inset:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999;padding:18px}
.modalCard{width:340px;max-width:100%;background:#0F2019;border:1px solid #E8B33B33;border-radius:16px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,0.75)}
.modalCard h3{font-family:'Saira Condensed';font-size:22px;font-weight:800;text-transform:uppercase;color:#E8B33B;margin:0 0 7px;letter-spacing:.06em}
.modalText{font-size:13px;color:#A0B8A8;margin:0 0 12px;line-height:1.4}
.modalCard input{width:100%;background:#091611;border:1px solid #1E3528;border-radius:8px;color:#F0EDE2;padding:11px;font-size:14px}
.modalCard input:focus{outline:2px solid #E8B33B;border-color:transparent}
.modalError{color:#E0635C;font-size:12px;margin-top:7px}
.modalButtons{display:flex;gap:7px;margin-top:12px}
.modalButtons button{flex:1;border:0;border-radius:9px;padding:10px 12px;font-weight:800;cursor:pointer;font-size:14px}
.modalUnlock{background:#E8B33B;color:#0A1812}
.modalCancel{background:#1E3528;color:#A0B8A8;border:1px solid #2A3A28!important}

/* ── Swap log ── */
.swaplog{margin-top:20px;padding-top:16px;border-top:1px solid #1A2E20}
.swaplog-hd{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#4A6A56;margin-bottom:8px}
.swaprow{display:flex;align-items:center;gap:7px;padding:8px 11px;background:#091611;border:1px solid #1A2E20;border-radius:9px;margin-bottom:5px;min-width:0}
.swapdate{font-size:10px;font-weight:700;color:#4A6A56;flex-shrink:0}
.swaptext{font-size:11px;color:#B0C8B8;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.swapnet{font-size:11px;font-weight:800;flex-shrink:0;white-space:nowrap;padding:2px 8px;border-radius:6px}
.swapnet.pos{color:#2DB860;background:rgba(45,184,96,.15)}
.swapnet.zero{color:#4A6A56;background:#1A2E20}

/* ── Good/bad text ── */
.goodtext{color:#2DB860!important;font-weight:700}
.badtext{color:#C84040!important;font-weight:700}

/* ── Channel logo ── */
.channelpill{border:1px solid #1E3528;background:#112218;color:#8BA898;border-radius:999px;padding:2px 7px;font-size:10px;font-weight:700;white-space:nowrap;display:inline-flex;align-items:center}
.channellogo{height:12px;width:auto;display:block}

/* ── Misc ── */
.tableintro{margin:-4px 0 8px;color:#4A6A56;font-size:11px}
.empty{text-align:center;color:#4A6A56;padding:20px;font-size:13px}
.empty.small{padding:8px}
.draftsavemsg{font-size:10px;color:#4A6A56;min-height:14px}
.pdot.solo{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;flex:0 0 auto}
.mystatsrow{border-left-width:4px!important}
.rivalstable .rivalryrow.playerrow{border-left-width:4px!important}
.rankinglist.compact>.rankingrow:not(.countryperfrow):not(.mysteamrow):not(.opponentrow){grid-template-columns:34px minmax(104px,1.25fr) 44px 50px minmax(70px,.8fr)}

/* ── Mobile ── */
@media(max-width:560px){
  .pane{padding:9px 10px}
  .hero{padding:10px 12px 0}
  h1{font-size:24px}
  h1 span{font-size:18px}
  .match,.lockcard,.chartbox,.board{padding:9px 10px;margin-bottom:5px}
  .mname{font-size:11px}
  .mscore{font-size:18px;min-width:38px}
  .groupsview{grid-template-columns:1fr}
  .mystatcards{gap:6px}
  .mystatcard{padding:10px 8px}
  .mystatcard b{font-size:24px}
  .mystatcard span{font-size:9px}
  .tabbar button{padding:7px 0 10px}
  .tabicon{font-size:16px}
  .tablabel{font-size:8px}
  .leaguegrow{grid-template-columns:20px minmax(70px,1.05fr) 23px 20px 20px 20px 28px 31px 30px 32px!important;gap:3px!important;padding:7px 5px!important;font-size:9.8px!important}
  .leaguegrow.leaguehead{font-size:7.5px!important}
  .countryperfrow{grid-template-columns:minmax(98px,1.3fr) minmax(52px,.65fr) 28px 31px 46px!important;gap:4px!important;padding:4px 5px!important;font-size:10px!important}
  .mysteamrow{grid-template-columns:minmax(94px,1.3fr) 36px 26px 31px 46px!important;gap:4px!important;padding:5px 5px!important;font-size:10px!important}
  .compactmatch{padding:6px 8px;gap:3px 5px;grid-template-columns:30px 1fr 38px 1fr}
  .compactteam{font-size:10px}
  .compactscore{font-size:17px}
  .dotrow{grid-template-columns:1fr}
  .managerdotrow{grid-template-columns:1fr;padding:6px 8px}
  .rivalstable .rivalryrow{grid-template-columns:minmax(80px,1fr) 46px 46px 38px!important;font-size:10px}
  .opponentrow{grid-template-columns:1fr!important}
  .opponentchips{margin-top:5px}
  .grow,.grow.qualrow,.grow.ghead{grid-template-columns:1.05fr .72fr 24px 28px 28px 48px;font-size:10px}
  .filterpanel{gap:5px;padding:9px}
  .rankinglist.compact>.rankingrow:not(.countryperfrow):not(.mysteamrow):not(.opponentrow){grid-template-columns:28px minmax(88px,1.1fr) 36px 42px minmax(54px,.7fr);font-size:9.5px!important}
  .rankowner .managerpill{font-size:8px!important;padding:1px 4px!important}
  .oppchip{font-size:13px!important;padding:3px 5px!important}
  .trophyrow.compact,.trophyrow.trophyhead{grid-template-columns:minmax(82px,1fr) minmax(54px,.8fr) 38px;gap:5px;padding:7px}
  .trophyrow.compact b{font-size:14px}
  .trophyrow.compact.playerrow{grid-template-columns:minmax(70px,1fr) minmax(42px,.75fr) 36px;gap:5px;padding:5px;font-size:10px}
  .trophyrow.compact.playerrow b{font-size:13px}
  .playerrowname{font-size:10px}
  .countryperf .countryperfrow>*:nth-child(5),.countryperf .countryperfrow>*:nth-child(6){display:none!important}
  .countryperf .countryperfrow{grid-template-columns:minmax(88px,1.35fr) minmax(48px,.7fr) 26px 28px 44px 38px!important}
  .mxpts{display:none}
}
`;
