// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";

// ── Teams ─────────────────────────────────────────────────────────────────────
// [name, flag, league]
const TEAMS = {
  // Premier League
  ARS: ["Arsenal",          "🔴", "PL"], AVL: ["Aston Villa",      "🟣", "PL"],
  BOU: ["Bournemouth",      "🍒", "PL"], BRE: ["Brentford",        "🐝", "PL"],
  BHA: ["Brighton",         "🔵", "PL"], CHE: ["Chelsea",          "💙", "PL"],
  CRY: ["Crystal Palace",   "🦅", "PL"], EVE: ["Everton",          "💎", "PL"],
  FUL: ["Fulham",           "⚫", "PL"], IPS: ["Ipswich",          "🔵", "PL"],
  LEI: ["Leicester",        "🦊", "PL"], LIV: ["Liverpool",        "❤️", "PL"],
  MCI: ["Man City",         "🔵", "PL"], MUN: ["Man United",       "🔴", "PL"],
  NEW: ["Newcastle",        "⚫", "PL"], NFO: ["Nottm Forest",     "🌲", "PL"],
  SOU: ["Southampton",      "🔴", "PL"], TOT: ["Tottenham",        "🐓", "PL"],
  WHU: ["West Ham",         "⚒️", "PL"], WOL: ["Wolves",           "🐺", "PL"],
  // La Liga
  ALA: ["Alavés",           "🔵", "PD"], ATH: ["Athletic Club",    "🔴", "PD"],
  ATM: ["Atlético Madrid",  "🔴", "PD"], BAR: ["Barcelona",        "🔵", "PD"],
  BET: ["Real Betis",       "💚", "PD"], CEL: ["Celta Vigo",       "🔵", "PD"],
  ESY: ["Espanyol",         "🔵", "PD"], GET: ["Getafe",           "💙", "PD"],
  GIR: ["Girona",           "🔴", "PD"], LEG: ["Leganés",          "💙", "PD"],
  MAL: ["Mallorca",         "🔴", "PD"], OSA: ["Osasuna",          "🔴", "PD"],
  RAY: ["Rayo Vallecano",   "⚪", "PD"], RMA: ["Real Madrid",      "⚪", "PD"],
  RSO: ["Real Sociedad",    "🔵", "PD"], SEV: ["Sevilla",          "⚪", "PD"],
  VAL: ["Valencia",         "🦇", "PD"], VLD: ["Valladolid",       "🟣", "PD"],
  VIL: ["Villarreal",       "🟡", "PD"], LPA: ["Las Palmas",       "🟡", "PD"],
  // Bundesliga
  AUG: ["Augsburg",         "🔴", "BL1"], B04: ["Leverkusen",      "🔴", "BL1"],
  FCB: ["Bayern Munich",    "🔴", "BL1"], BOC: ["Bochum",          "🔵", "BL1"],
  BVB: ["Dortmund",         "🟡", "BL1"], BMG: ["M'gladbach",      "⚫", "BL1"],
  SGE: ["Eint. Frankfurt",  "🦅", "BL1"], SCF: ["Freiburg",        "🔴", "BL1"],
  HDH: ["Heidenheim",       "🔴", "BL1"], TSG: ["Hoffenheim",      "🔵", "BL1"],
  KIE: ["Holstein Kiel",    "🔵", "BL1"], M05: ["Mainz",           "🔴", "BL1"],
  RBL: ["RB Leipzig",       "🔴", "BL1"], PAU: ["St. Pauli",       "⚫", "BL1"],
  VFB: ["Stuttgart",        "🔴", "BL1"], FCU: ["Union Berlin",    "🔴", "BL1"],
  SVW: ["Werder Bremen",    "💚", "BL1"], WOB: ["Wolfsburg",       "💚", "BL1"],
  // Serie A
  MIL: ["AC Milan",         "🔴", "SA"], ROM: ["Roma",             "🔴", "SA"],
  ATA: ["Atalanta",         "⚫", "SA"], BOL: ["Bologna",          "🔵", "SA"],
  CAG: ["Cagliari",         "🔴", "SA"], CMO: ["Como",             "🔵", "SA"],
  EMP: ["Empoli",           "🔵", "SA"], FIO: ["Fiorentina",       "🟣", "SA"],
  GEN: ["Genoa",            "🔴", "SA"], VER: ["Verona",           "🟡", "SA"],
  INT: ["Inter Milan",      "⚫", "SA"], JUV: ["Juventus",         "⚫", "SA"],
  LAZ: ["Lazio",            "🔵", "SA"], LEC: ["Lecce",            "🟡", "SA"],
  MNZ: ["Monza",            "⚪", "SA"], NAP: ["Napoli",           "🔵", "SA"],
  PRM: ["Parma",            "🟡", "SA"], TOR: ["Torino",           "🐂", "SA"],
  UDI: ["Udinese",          "⚫", "SA"], VEN: ["Venezia",          "🦁", "SA"],
  // Ligue 1
  AJA: ["Auxerre",          "⚪", "FL1"], ANG: ["Angers",          "⚫", "FL1"],
  ASM: ["Monaco",           "🔴", "FL1"], STE: ["Saint-Étienne",   "💚", "FL1"],
  BRS: ["Brest",            "🔴", "FL1"], LHV: ["Le Havre",        "🔵", "FL1"],
  RCL: ["Lens",             "🟡", "FL1"], LIL: ["Lille",           "🔴", "FL1"],
  OLY: ["Lyon",             "🔴", "FL1"], OM:  ["Marseille",       "🔵", "FL1"],
  MPL: ["Montpellier",      "🔵", "FL1"], NAN: ["Nantes",          "🟡", "FL1"],
  NCE: ["Nice",             "🔴", "FL1"], PSG: ["PSG",             "🔵", "FL1"],
  REI: ["Reims",            "🔴", "FL1"], REN: ["Rennes",          "🔴", "FL1"],
  STR: ["Strasbourg",       "🔵", "FL1"], TLS: ["Toulouse",        "🟣", "FL1"],
};

const LEAGUES = {
  PL:  { name: "Premier League",  flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", country: "England" },
  PD:  { name: "La Liga",         flag: "🇪🇸", country: "Spain" },
  BL1: { name: "Bundesliga",      flag: "🇩🇪", country: "Germany" },
  SA:  { name: "Serie A",         flag: "🇮🇹", country: "Italy" },
  FL1: { name: "Ligue 1",         flag: "🇫🇷", country: "France" },
  CL:  { name: "Champions League",flag: "⭐", country: "Europe" },
};

const TEAM_IDS = Object.keys(TEAMS);
const LEAGUE_IDS = Object.keys(LEAGUES);

const PLAYER_COLORS = ["#E8B33B","#6FB8E8","#E0635C","#B08FE0","#7CCB8F","#E889B8"];

const DEFAULT_PLAYERS = [
  { id: 0, name: "Player 1" }, { id: 1, name: "Player 2" },
  { id: 2, name: "Player 3" }, { id: 3, name: "Player 4" },
  { id: 4, name: "Player 5" }, { id: 5, name: "Player 6" },
];

// ── Local storage ─────────────────────────────────────────────────────────────
const LS_KEY = "club-sweepstake-v1";
function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}
function saveState(s) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch {}
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function isFinished(m) { return m?.isFinished; }
function isLive(m) { return m?.isLive; }

function resultFor(m, side) {
  if (m.apiWinner === "HOME_TEAM") return side === "home" ? "w" : "l";
  if (m.apiWinner === "AWAY_TEAM") return side === "away" ? "w" : "l";
  if (typeof m.penaltyHomeGoals === "number" && typeof m.penaltyAwayGoals === "number"
      && m.homeGoals === m.awayGoals) {
    const homeWon = m.penaltyHomeGoals > m.penaltyAwayGoals;
    return side === "home" ? (homeWon ? "w" : "l") : (homeWon ? "l" : "w");
  }
  if (m.homeGoals === m.awayGoals) return "d";
  if (side === "home") return m.homeGoals > m.awayGoals ? "w" : "l";
  return m.awayGoals > m.homeGoals ? "w" : "l";
}

function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function fmtTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function gdText(v) { return v > 0 ? `+${v}` : String(v ?? 0); }

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0A1A0F;color:#F0EDE2;font-family:'Inter',system-ui,sans-serif;min-height:100vh}
.app{max-width:480px;margin:0 auto;padding-bottom:80px}

.hero{background:linear-gradient(160deg,#0D2318 0%,#071510 100%);padding:18px 16px 14px;border-bottom:1px solid #1E3828}
.hero h1{font-size:26px;font-weight:900;letter-spacing:-.02em;color:#F0EDE2;line-height:1.1}
.hero h1 span{color:#E8B33B;font-size:14px;display:block;font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:2px}
.herofoot{display:flex;justify-content:flex-end;margin-bottom:6px}
.syncmsg{font-size:11px;color:#6B9278;margin-right:8px;align-self:center}
.syncbtn{background:#1A3025;border:1px solid #2E5040;color:#9FBFA8;border-radius:50%;width:28px;height:28px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center}
.syncbtn:disabled{opacity:.4;cursor:default}

.tabs{display:flex;background:#0D1F16;border-bottom:1px solid #1E3828;overflow-x:auto;scrollbar-width:none}
.tabs::-webkit-scrollbar{display:none}
.tab{flex:none;padding:10px 14px;font-size:12px;font-weight:600;color:#5A7A64;cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;letter-spacing:.04em;text-transform:uppercase}
.tab.on{color:#E8B33B;border-bottom-color:#E8B33B}

.pane{padding:14px 14px 0}
.panehead{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.panehead h2{font-size:16px;font-weight:800;letter-spacing:-.01em}

/* Board */
.boardtable{width:100%;border-collapse:collapse;font-size:13px}
.boardtable th{text-align:left;font-size:10px;font-weight:700;color:#6B9278;text-transform:uppercase;letter-spacing:.06em;padding:4px 6px;border-bottom:1px solid #1E3828}
.boardtable td{padding:7px 6px;border-bottom:1px solid #0F2018;vertical-align:middle}
.boardtable tr:last-child td{border-bottom:none}
.boardrow-hi td{background:#1A2E22}
.rank{font-size:11px;color:#6B9278;width:20px}
.pname{font-weight:700;font-size:14px}
.pts-big{font-family:'Saira Condensed',sans-serif;font-size:20px;font-weight:700;color:#E8B33B;text-align:right}
.wdl{font-size:11px;color:#9FBFA8;text-align:center}
.color-bar{width:3px;border-radius:2px;height:20px;display:inline-block}

/* League table */
.chartbox{background:#0C1F15;border:1px solid #1E3828;border-radius:12px;padding:12px;margin-bottom:12px}
.charthead{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px}
.glabel{font-size:9.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#6B9278}
.subtle{font-size:11px;color:#6B9278;margin-top:2px}

.ltable{width:100%;border-collapse:collapse;font-size:12px}
.ltable th{font-size:9px;font-weight:700;color:#6B9278;text-transform:uppercase;letter-spacing:.06em;padding:3px 4px;text-align:center;border-bottom:1px solid #1A3025}
.ltable th:first-child{text-align:left}
.ltable td{padding:5px 4px;text-align:center;border-bottom:1px solid #0F1E16;vertical-align:middle}
.ltable td:first-child{text-align:left}
.ltable tr:last-child td{border-bottom:none}
.lteam{display:flex;align-items:center;gap:5px;font-size:12px;font-weight:600}
.lptsb{font-family:'Saira Condensed',sans-serif;font-size:15px;font-weight:700;color:#E8B33B}
.owner-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}

/* Matches */
.matchlist{display:flex;flex-direction:column;gap:6px}
.matchcard{background:#0C1F15;border:1px solid #1A3028;border-radius:9px;padding:9px 10px}
.matchcard.live{border-color:#31c46b55;background:#0C2018}
.mrow{display:flex;align-items:center;justify-content:space-between;gap:6px}
.mteam{flex:1;font-size:12px;font-weight:600}
.mteam.away{text-align:right}
.mscore{font-family:'Saira Condensed',sans-serif;font-size:18px;font-weight:700;min-width:40px;text-align:center;color:#F0EDE2}
.mscore.ns{color:#4A6A54;font-size:12px}
.mdate{font-size:10px;color:#6B9278;text-align:center;margin-top:3px}
.mbadge{font-size:9px;color:#31c46b;text-transform:uppercase;letter-spacing:.06em;text-align:center}
.mcomp{font-size:9px;color:#4A6A54;text-align:center;margin-top:2px}
.w{color:#31c46b} .l{color:#E0635C} .d{color:#9FBFA8}

/* Filter row */
.filterrow{display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap}
.filterbtn{background:#1A3025;border:1px solid #2E5040;color:#9FBFA8;border-radius:16px;padding:4px 10px;font-size:11px;cursor:pointer;font-weight:600}
.filterbtn.on{background:#E8B33B22;border-color:#E8B33B;color:#E8B33B}

/* Team perf */
.teamperf{display:flex;flex-direction:column;gap:4px}
.tprow{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:7px;border-left:3px solid transparent;font-size:12px}
.tprank{width:18px;color:#6B9278;font-size:10px;text-align:right;flex-shrink:0}
.tpname{flex:1;font-weight:600}
.tpleague{font-size:10px;color:#6B9278;width:28px;flex-shrink:0}
.tppts{font-family:'Saira Condensed',sans-serif;font-size:16px;font-weight:700;color:#E8B33B;width:26px;text-align:right}
.tpgd{font-size:11px;color:#9FBFA8;width:30px;text-align:right}
.tpown{font-size:10px;color:#9FBFA8;width:60px;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* Draft */
.draftplayer{background:#0C1F15;border:1px solid #1A3028;border-radius:10px;padding:10px;margin-bottom:8px;border-left:4px solid}
.drafthead{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.draftname{font-weight:800;font-size:14px}
.draftpts{font-family:'Saira Condensed',sans-serif;font-size:22px;font-weight:700;color:#E8B33B}
.draftteams{display:flex;flex-wrap:wrap;gap:5px}
.draftteam{background:#1A3025;border-radius:6px;padding:4px 7px;font-size:11px;font-weight:600;display:flex;align-items:center;gap:4px}
.draftteam .league-tag{font-size:9px;color:#6B9278}
.draftteam.nocl{opacity:.45}
.editbtn{background:#1A3025;border:1px solid #2E5040;color:#9FBFA8;border-radius:6px;padding:3px 8px;font-size:11px;cursor:pointer}

/* Edit draft */
.ownerselect{background:#1A3025;border:1px solid #2E5040;color:#F0EDE2;border-radius:4px;font-size:10px;padding:1px 3px;margin-top:2px;max-width:80px}
.nameinput{background:#1A3025;border:1px solid #2E5040;color:#F0EDE2;border-radius:6px;padding:3px 7px;font-size:13px;font-weight:700;width:120px}

@media(prefers-color-scheme:light){
  body{background:#f5f7f5;color:#0A1A0F}
  .hero{background:linear-gradient(160deg,#e8f5ec 0%,#d4ecd9 100%);border-bottom-color:#c0d9c8}
  .hero h1{color:#0A1A0F} .chartbox{background:#fff;border-color:#dde8e1}
  .tabs{background:#eef5f0;border-bottom-color:#c0d9c8}
  .tab{color:#5A7A64} .matchcard{background:#fff;border-color:#dde8e1}
  .draftplayer{background:#fff;border-color:#dde8e1}
}
`;

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("board");
  const [leagueFilter, setLeagueFilter] = useState("all");
  const [matchComp, setMatchComp] = useState("PL");
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");
  const [lastSync, setLastSync] = useState(null);
  const [matches, setMatches] = useState([]);
  const [editingDraft, setEditingDraft] = useState(false);

  // Load persisted state
  const [state, setState] = useState(() => {
    const saved = loadState();
    return {
      players: saved?.players ?? DEFAULT_PLAYERS,
      ownership: saved?.ownership ?? {},
    };
  });

  useEffect(() => { saveState(state); }, [state]);

  // Auto-sync on load
  useEffect(() => { runSync(); }, []);

  async function runSync() {
    if (syncing) return;
    setSyncing(true);
    setSyncMsg("Fetching scores…");
    try {
      const resp = await fetch("/api/sync-scores", { cache: "no-store" });
      const data = await resp.json();
      if (!resp.ok || data.error) throw new Error(data.error || "API failed");
      setMatches(data.matches || []);
      setLastSync(data.meta?.checkedAt || new Date().toISOString());
      setSyncMsg("");
    } catch (err) {
      setSyncMsg("Sync failed — check /api/sync-scores");
    }
    setSyncing(false);
  }

  const ownerOf = (tid) => {
    const pid = state.ownership[tid];
    if (pid == null) return null;
    return state.players.find((p) => p.id === pid) || null;
  };

  // Per-team stats across all matches
  const teamStats = useMemo(() => {
    const stats = {};
    TEAM_IDS.forEach((tid) => { stats[tid] = { pts: 0, w: 0, d: 0, l: 0, gp: 0, gf: 0, ga: 0, gd: 0 }; });
    matches.forEach((m) => {
      if (!isFinished(m) || typeof m.homeGoals !== "number" || typeof m.awayGoals !== "number") return;
      const hRes = resultFor(m, "home");
      const aRes = resultFor(m, "away");
      const update = (tid, res, gf, ga) => {
        if (!stats[tid]) return;
        stats[tid].gp++;
        stats[tid].gf += gf;
        stats[tid].ga += ga;
        stats[tid].gd = stats[tid].gf - stats[tid].ga;
        if (res === "w") { stats[tid].pts += 3; stats[tid].w++; }
        else if (res === "d") { stats[tid].pts += 1; stats[tid].d++; }
        else stats[tid].l++;
      };
      update(m.homeCode, hRes, m.homeGoals, m.awayGoals);
      update(m.awayCode, aRes, m.awayGoals, m.homeGoals);
    });
    return stats;
  }, [matches]);

  // Manager leaderboard
  const board = useMemo(() => {
    return state.players.map((p) => {
      let pts = 0, w = 0, d = 0, l = 0, gp = 0;
      TEAM_IDS.filter((tid) => state.ownership[tid] === p.id).forEach((tid) => {
        const s = teamStats[tid];
        pts += s.pts; w += s.w; d += s.d; l += s.l; gp += s.gp;
      });
      return { ...p, pts, w, d, l, gp };
    }).sort((a, b) => b.pts - a.pts || b.w - a.w || a.name.localeCompare(b.name));
  }, [state.players, state.ownership, teamStats]);

  // League table for a given comp
  const leagueTable = useMemo(() => {
    const byLeague = {};
    LEAGUE_IDS.forEach((lid) => {
      byLeague[lid] = TEAM_IDS
        .filter((tid) => lid === "CL" ? true : TEAMS[tid][2] === lid)
        .filter((tid) => lid !== "CL" || matches.some((m) => m.comp === "CL" && (m.homeCode === tid || m.awayCode === tid)))
        .map((tid) => ({ tid, ...teamStats[tid], owner: ownerOf(tid) }))
        .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || TEAMS[a.tid][0].localeCompare(TEAMS[b.tid][0]));
    });
    return byLeague;
  }, [teamStats, state.ownership, matches]);

  const updateOwner = (tid, pid) => {
    setState((s) => ({ ...s, ownership: { ...s.ownership, [tid]: Number(pid) } }));
  };
  const updateName = (pid, name) => {
    setState((s) => ({ ...s, players: s.players.map((p) => p.id === pid ? { ...p, name } : p) }));
  };

  // ── Board tab ───────────────────────────────────────────────────────────────
  const BoardTab = () => (
    <section className="pane">
      <div className="panehead"><h2>Leaderboard</h2></div>
      <table className="boardtable">
        <thead>
          <tr>
            <th>#</th><th>Manager</th><th style={{textAlign:"right"}}>W</th>
            <th style={{textAlign:"right"}}>D</th><th style={{textAlign:"right"}}>L</th>
            <th style={{textAlign:"right"}}>Pts</th>
          </tr>
        </thead>
        <tbody>
          {board.map((p, i) => (
            <tr key={p.id}>
              <td className="rank">{i + 1}</td>
              <td>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span className="color-bar" style={{background:PLAYER_COLORS[p.id]}}/>
                  <span className="pname">{p.name}</span>
                </div>
              </td>
              <td className="wdl w">{p.w}</td>
              <td className="wdl d">{p.d}</td>
              <td className="wdl l">{p.l}</td>
              <td className="pts-big">{p.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );

  // ── Tables tab ──────────────────────────────────────────────────────────────
  const TablesTab = () => {
    const [comp, setComp] = useState("PL");
    const rows = leagueTable[comp] || [];
    return (
      <section className="pane">
        <div className="panehead"><h2>League Tables</h2></div>
        <div className="filterrow">
          {LEAGUE_IDS.map((lid) => (
            <button key={lid} className={`filterbtn${comp === lid ? " on" : ""}`} onClick={() => setComp(lid)}>
              {LEAGUES[lid].flag} {lid}
            </button>
          ))}
        </div>
        <div className="chartbox">
          <div className="charthead">
            <div>
              <div className="glabel">{LEAGUES[comp].flag} {LEAGUES[comp].name}</div>
              <div className="subtle">All competitions combined · W=3 D=1</div>
            </div>
          </div>
          <table className="ltable">
            <thead>
              <tr><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const col = r.owner ? PLAYER_COLORS[r.owner.id] : null;
                return (
                  <tr key={r.tid} style={col ? {background:`${col}18`} : undefined}>
                    <td>
                      <div className="lteam">
                        {col && <span className="owner-dot" style={{background:col}}/>}
                        <span>{TEAMS[r.tid][1]}</span>
                        <span style={{fontWeight:600}}>{TEAMS[r.tid][0]}</span>
                      </div>
                    </td>
                    <td>{r.gp}</td><td className="w">{r.w}</td><td className="d">{r.d}</td>
                    <td className="l">{r.l}</td><td>{gdText(r.gd)}</td>
                    <td><b className="lptsb">{r.pts}</b></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  // ── Matches tab ─────────────────────────────────────────────────────────────
  const MatchesTab = () => {
    const [comp, setComp] = useState("PL");
    const compMatches = useMemo(() => {
      return matches
        .filter((m) => m.comp === comp)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [comp]);

    const MatchCard = ({ m }) => {
      const hRes = isFinished(m) ? resultFor(m, "home") : null;
      const aRes = isFinished(m) ? resultFor(m, "away") : null;
      const hOwner = ownerOf(m.homeCode);
      const aOwner = ownerOf(m.awayCode);
      const isPen = m.duration === "PENALTY_SHOOTOUT";
      const isET = m.duration === "EXTRA_TIME" || isPen;
      const statusLabel = isPen ? "PENS" : isET ? "AET" : m.status === "FT" ? "FT" : null;

      return (
        <div className={`matchcard${isLive(m) ? " live" : ""}`}>
          <div className="mrow">
            <span className="mteam" style={hOwner ? {color:PLAYER_COLORS[hOwner.id]} : undefined}>
              {TEAMS[m.homeCode]?.[1]} {TEAMS[m.homeCode]?.[0] || m.homeName}
            </span>
            {isFinished(m) || isLive(m) ? (
              <span className="mscore">
                <span className={hRes === "w" ? "w" : hRes === "l" ? "l" : "d"}>{m.homeGoals}</span>
                {" – "}
                <span className={aRes === "w" ? "w" : aRes === "l" ? "l" : "d"}>{m.awayGoals}</span>
              </span>
            ) : (
              <span className="mscore ns">{fmtTime(m.date)}</span>
            )}
            <span className="mteam away" style={aOwner ? {color:PLAYER_COLORS[aOwner.id]} : undefined}>
              {TEAMS[m.awayCode]?.[0] || m.awayName} {TEAMS[m.awayCode]?.[1]}
            </span>
          </div>
          {isPen && (
            <div className="mdate">({m.penaltyHomeGoals}–{m.penaltyAwayGoals} pens)</div>
          )}
          <div className="mdate">
            {isLive(m) ? <span style={{color:"#31c46b"}}>● LIVE</span> : fmtDate(m.date)}
            {statusLabel && <span style={{marginLeft:4,color:"#9FBFA8"}}>{statusLabel}</span>}
            {m.matchday && <span style={{marginLeft:6,color:"#4A6A54"}}>MD{m.matchday}</span>}
          </div>
        </div>
      );
    };

    return (
      <section className="pane">
        <div className="panehead"><h2>Matches</h2></div>
        <div className="filterrow">
          {LEAGUE_IDS.map((lid) => (
            <button key={lid} className={`filterbtn${comp === lid ? " on" : ""}`} onClick={() => setComp(lid)}>
              {LEAGUES[lid].flag} {lid}
            </button>
          ))}
        </div>
        <div className="matchlist">
          {compMatches.length === 0
            ? <div style={{color:"#4A6A54",fontSize:13,textAlign:"center",padding:"20px 0"}}>No matches loaded yet — hit sync</div>
            : compMatches.map((m) => <MatchCard key={`${m.id}-${m.comp}`} m={m}/>)
          }
        </div>
      </section>
    );
  };

  // ── Teams tab ───────────────────────────────────────────────────────────────
  const TeamsTab = () => {
    const [filter, setFilter] = useState("all");
    const rows = useMemo(() => {
      return TEAM_IDS
        .filter((tid) => filter === "all" || TEAMS[tid][2] === filter)
        .map((tid) => ({ tid, stats: teamStats[tid], owner: ownerOf(tid) }))
        .sort((a, b) => b.stats.pts - a.stats.pts || b.stats.gd - a.stats.gd || TEAMS[a.tid][0].localeCompare(TEAMS[b.tid][0]));
    }, [filter, teamStats]);

    return (
      <section className="pane">
        <div className="panehead"><h2>Country Performance</h2></div>
        <div className="filterrow">
          <button className={`filterbtn${filter === "all" ? " on" : ""}`} onClick={() => setFilter("all")}>All</button>
          {["PL","PD","BL1","SA","FL1"].map((lid) => (
            <button key={lid} className={`filterbtn${filter === lid ? " on" : ""}`} onClick={() => setFilter(lid)}>
              {LEAGUES[lid].flag} {lid}
            </button>
          ))}
        </div>
        <div className="teamperf">
          {rows.map((r, i) => {
            const col = r.owner ? PLAYER_COLORS[r.owner.id] : null;
            return (
              <div key={r.tid} className="tprow" style={col ? {borderLeftColor:col,background:`${col}14`} : {borderLeftColor:"#1A3025"}}>
                <span className="tprank">{i + 1}</span>
                <span style={{fontSize:15}}>{TEAMS[r.tid][1]}</span>
                <span className="tpname">{TEAMS[r.tid][0]}</span>
                <span className="tpleague">{TEAMS[r.tid][2]}</span>
                <span className="tpgd">{gdText(r.stats.gd)}</span>
                <span className="tppts">{r.stats.pts}</span>
                <span className="tpown">{r.owner?.name ?? "—"}</span>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  // ── Draft tab ───────────────────────────────────────────────────────────────
  const DraftTab = () => (
    <section className="pane">
      <div className="panehead">
        <h2>Draft</h2>
        <button className="editbtn" onClick={() => setEditingDraft((e) => !e)}>
          {editingDraft ? "Done" : "Edit"}
        </button>
      </div>
      {state.players.map((p) => {
        const myTeams = TEAM_IDS.filter((tid) => state.ownership[tid] === p.id);
        const s = teamStats;
        const pts = myTeams.reduce((sum, tid) => sum + s[tid].pts, 0);
        const col = PLAYER_COLORS[p.id];
        return (
          <div key={p.id} className="draftplayer" style={{borderLeftColor:col,background:`${col}10`}}>
            <div className="drafthead">
              {editingDraft
                ? <input className="nameinput" value={p.name} maxLength={16} onChange={(e) => updateName(p.id, e.target.value)}/>
                : <span className="draftname" style={{color:col}}>{p.name}</span>
              }
              <span className="draftpts">{pts}</span>
            </div>
            <div className="draftteams">
              {(editingDraft ? TEAM_IDS : myTeams).map((tid) => {
                const owned = state.ownership[tid] === p.id;
                if (!editingDraft && !owned) return null;
                return (
                  <div key={tid} className={`draftteam${!owned && editingDraft ? " nocl" : ""}`}>
                    <span>{TEAMS[tid][1]} {TEAMS[tid][0]}</span>
                    <span className="league-tag">{TEAMS[tid][2]}</span>
                    {editingDraft && (
                      <select className="ownerselect" value={state.ownership[tid] ?? ""} onChange={(e) => updateOwner(tid, e.target.value)}>
                        <option value="">—</option>
                        {state.players.map((pl) => <option key={pl.id} value={pl.id}>{pl.name}</option>)}
                      </select>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="app">
      <style>{CSS}</style>
      <header className="hero">
        <div className="herofoot">
          <span className="syncmsg">
            {syncMsg || (lastSync ? `Updated ${new Date(lastSync).toLocaleTimeString("en-GB", {hour:"2-digit",minute:"2-digit"})}` : "")}
          </span>
          <button className="syncbtn" onClick={runSync} disabled={syncing} title="Refresh scores">↻</button>
        </div>
        <h1><span>Club Sweepstake</span>2025/26</h1>
      </header>

      <nav className="tabs">
        {[
          ["board",   "🏆 Board"],
          ["tables",  "📊 Tables"],
          ["matches", "⚽ Matches"],
          ["teams",   "📋 Teams"],
          ["draft",   "✏️ Draft"],
        ].map(([key, label]) => (
          <button key={key} className={`tab${tab === key ? " on" : ""}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </nav>

      {tab === "board"   && <BoardTab/>}
      {tab === "tables"  && <TablesTab/>}
      {tab === "matches" && <MatchesTab/>}
      {tab === "teams"   && <TeamsTab/>}
      {tab === "draft"   && <DraftTab/>}
    </div>
  );
}
