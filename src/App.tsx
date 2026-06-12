// @ts-nocheck

import React, { useEffect, useMemo, useState } from "react";

const TEAMS = {
  MEX:["Mexico","🇲🇽","A"], RSA:["South Africa","🇿🇦","A"], KOR:["South Korea","🇰🇷","A"], CZE:["Czechia","🇨🇿","A"],
  CAN:["Canada","🇨🇦","B"], SUI:["Switzerland","🇨🇭","B"], QAT:["Qatar","🇶🇦","B"], BIH:["Bosnia & Herz.","🇧🇦","B"],
  BRA:["Brazil","🇧🇷","C"], MAR:["Morocco","🇲🇦","C"], SCO:["Scotland","🏴","C"], HAI:["Haiti","🇭🇹","C"],
  USA:["United States","🇺🇸","D"], AUS:["Australia","🇦🇺","D"], PAR:["Paraguay","🇵🇾","D"], TUR:["Türkiye","🇹🇷","D"],
  GER:["Germany","🇩🇪","E"], ECU:["Ecuador","🇪🇨","E"], CIV:["Ivory Coast","🇨🇮","E"], CUW:["Curaçao","🇨🇼","E"],
  NED:["Netherlands","🇳🇱","F"], JPN:["Japan","🇯🇵","F"], TUN:["Tunisia","🇹🇳","F"], SWE:["Sweden","🇸🇪","F"],
  BEL:["Belgium","🇧🇪","G"], IRN:["Iran","🇮🇷","G"], EGY:["Egypt","🇪🇬","G"], NZL:["New Zealand","🇳🇿","G"],
  ESP:["Spain","🇪🇸","H"], URU:["Uruguay","🇺🇾","H"], KSA:["Saudi Arabia","🇸🇦","H"], CPV:["Cape Verde","🇨🇻","H"],
  FRA:["France","🇫🇷","I"], SEN:["Senegal","🇸🇳","I"], NOR:["Norway","🇳🇴","I"], IRQ:["Iraq","🇮🇶","I"],
  ARG:["Argentina","🇦🇷","J"], AUT:["Austria","🇦🇹","J"], ALG:["Algeria","🇩🇿","J"], JOR:["Jordan","🇯🇴","J"],
  POR:["Portugal","🇵🇹","K"], COL:["Colombia","🇨🇴","K"], UZB:["Uzbekistan","🇺🇿","K"], COD:["DR Congo","🇨🇩","K"],
  ENG:["England","🏴","L"], CRO:["Croatia","🇭🇷","L"], PAN:["Panama","🇵🇦","L"], GHA:["Ghana","🇬🇭","L"],
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

const TEAM_IDS = Object.keys(TEAMS);
const GROUPS = ["A","B","C","D","E","F","G","H","I","J","K","L"];
const PLAYER_COLORS = ["#E8B33B","#6FB8E8","#E0635C","#B08FE0","#7CCB8F","#E889B8"];
const DEFAULT_PLAYERS = ["Eashan","Vishal","Dillan","Shivam","Adam","Tarnraj"];
const DEFAULT_OWNERSHIP = {
  GHA:0, ESP:0, MAR:0, SWE:0, COD:0, URU:0, NED:0, BIH:0,
  NOR:1, CPV:1, FRA:1, QAT:1, POR:1, AUT:1, SCO:1, CAN:1,
  PAN:2, IRN:2, TUR:2, ECU:2, NZL:2, BEL:2, EGY:2, SEN:2,
  SUI:3, AUS:3, ARG:3, UZB:3, USA:3, IRQ:3, RSA:3, KOR:3,
  HAI:4, COL:4, CIV:4, JPN:4, CZE:4, ENG:4, CUW:4, CRO:4,
  KSA:5, GER:5, ALG:5, TUN:5, PAR:5, MEX:5, BRA:5, JOR:5,
};
const STORE_KEY = "dingae-sweepstake-api-source-v1";

const blankState = () => ({
  players: DEFAULT_PLAYERS.map((name, id) => ({ id, name })),
  ownership: { ...DEFAULT_OWNERSHIP },
  locked: true,
  apiMatches: [],
  lastSync: 0,
});

function flagFor(code, fallback = "🏳️") {
  return TEAMS[code]?.[1] || fallback;
}

function flagForTeam(code, name, fallback = "🏳️") {
  return TEAMS[code]?.[1] || COUNTRY_NAME_FLAGS[name] || fallback;
}

function nameFor(code, fallback) {
  return TEAMS[code]?.[0] || fallback || code || "Unknown";
}

function resultFor(match, side) {
  if (match.homeGoals === match.awayGoals) return "d";
  if (side === "home") return match.homeGoals > match.awayGoals ? "w" : "l";
  return match.awayGoals > match.homeGoals ? "w" : "l";
}


function isFinishedMatch(match) {
  return match?.isFinished || ["FT", "AET", "PEN"].includes(match?.status) ||
    (typeof match?.homeGoals === "number" && typeof match?.awayGoals === "number" && !["NS", "TBD"].includes(match?.status));
}

function isGroupStageMatch(match) {
  const hg = TEAMS[match.homeCode]?.[2];
  const ag = TEAMS[match.awayCode]?.[2];
  if (!hg || !ag || hg !== ag) return false;
  const d = new Date(match.date || 0);
  return d < new Date("2026-06-28T00:00:00Z");
}

function gdText(v) {
  return v > 0 ? `+${v}` : String(v || 0);
}

export default function App() {
  const [state, setState] = useState(blankState);
  const [tab, setTab] = useState("draft");
  const [activePlayer, setActivePlayer] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setState(s => ({ ...blankState(), ...JSON.parse(raw) }));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }, [state]);

  const ownerOf = (tid) => {
    const pid = state.ownership[tid];
    if (pid == null) return null;
    const p = state.players.find(x => x.id === pid);
    return p ? { ...p, color: PLAYER_COLORS[p.id] } : null;
  };

  const tournamentState = useMemo(() => {
    const groupStats = {};
    TEAM_IDS.forEach(tid => {
      groupStats[tid] = { tid, pts: 0, w: 0, d: 0, l: 0, gp: 0, gf: 0, ga: 0, gd: 0 };
    });

    const applyGroupResult = (tid, res, gf, ga) => {
      const row = groupStats[tid];
      if (!row) return;
      row.gp++;
      row.gf += gf;
      row.ga += ga;
      row.gd = row.gf - row.ga;
      if (res === "w") { row.pts += 3; row.w++; }
      else if (res === "d") { row.pts += 1; row.d++; }
      else { row.l++; }
    };

    state.apiMatches.forEach(m => {
      if (!m.homeCode || !m.awayCode) return;
      if (!isFinishedMatch(m)) return;
      if (typeof m.homeGoals !== "number" || typeof m.awayGoals !== "number") return;
      if (!isGroupStageMatch(m)) return;
      applyGroupResult(m.homeCode, resultFor(m, "home"), m.homeGoals, m.awayGoals);
      applyGroupResult(m.awayCode, resultFor(m, "away"), m.awayGoals, m.homeGoals);
    });

    const rankedGroups = Object.fromEntries(GROUPS.map(group => {
      const rows = TEAM_IDS
        .filter(tid => TEAMS[tid]?.[2] === group)
        .map(tid => groupStats[tid])
        .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || nameFor(a.tid).localeCompare(nameFor(b.tid)));
      return [group, rows];
    }));

    const allGroupsComplete = GROUPS.every(group => rankedGroups[group].every(t => t.gp >= 3));
    const aliveTeams = new Set(TEAM_IDS);

    if (allGroupsComplete) {
      aliveTeams.clear();
      GROUPS.forEach(group => {
        rankedGroups[group].slice(0, 2).forEach(t => aliveTeams.add(t.tid));
      });
      const thirds = GROUPS
        .map(group => rankedGroups[group][2])
        .filter(Boolean)
        .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || nameFor(a.tid).localeCompare(nameFor(b.tid)));
      thirds.slice(0, 8).forEach(t => aliveTeams.add(t.tid));
    }

    state.apiMatches.forEach(m => {
      if (!m.homeCode || !m.awayCode) return;
      if (!isFinishedMatch(m)) return;
      if (typeof m.homeGoals !== "number" || typeof m.awayGoals !== "number") return;
      if (isGroupStageMatch(m)) return;
      const loser = resultFor(m, "home") === "l" ? m.homeCode : resultFor(m, "away") === "l" ? m.awayCode : null;
      if (loser) aliveTeams.delete(loser);
    });

    const knockoutMatches = state.apiMatches
      .filter(m => !isGroupStageMatch(m) && (m.round || m.league || new Date(m.date || 0) >= new Date("2026-06-28T00:00:00Z")))
      .slice()
      .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));

    return { groupStats, rankedGroups, aliveTeams, allGroupsComplete, knockoutMatches };
  }, [state.apiMatches]);

  const board = useMemo(() => {
    const rows = state.players.map(p => ({ ...p, pts: 0, w: 0, d: 0, l: 0, gp: 0, gf: 0, ga: 0, gd: 0, teamsAlive: 0, teams: {} }));
    const byId = Object.fromEntries(rows.map(r => [r.id, r]));

    Object.entries(state.ownership).forEach(([tid, pid]) => {
      if (byId[pid]) {
        byId[pid].teams[tid] = { pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, alive: tournamentState.aliveTeams.has(tid) };
        if (tournamentState.aliveTeams.has(tid)) byId[pid].teamsAlive++;
      }
    });

    const credit = (tid, res, goalsFor, goalsAgainst) => {
      const pid = state.ownership[tid];
      const row = byId[pid];
      if (!row) return;
      if (!row.teams[tid]) row.teams[tid] = { pts: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, alive: tournamentState.aliveTeams.has(tid) };
      const t = row.teams[tid];
      row.gp++;
      row.gf += goalsFor;
      row.ga += goalsAgainst;
      row.gd = row.gf - row.ga;
      t.gf += goalsFor;
      t.ga += goalsAgainst;
      t.gd = t.gf - t.ga;
      if (res === "w") { row.pts += 3; row.w++; t.pts += 3; t.w++; }
      else if (res === "d") { row.pts += 1; row.d++; t.pts += 1; t.d++; }
      else { row.l++; t.l++; }
    };

    state.apiMatches.forEach(m => {
      if (!m.homeCode || !m.awayCode) return;
      if (!isFinishedMatch(m)) return;
      if (typeof m.homeGoals !== "number" || typeof m.awayGoals !== "number") return;
      credit(m.homeCode, resultFor(m, "home"), m.homeGoals, m.awayGoals);
      credit(m.awayCode, resultFor(m, "away"), m.awayGoals, m.homeGoals);
    });

    return rows.sort((a,b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.name.localeCompare(b.name));
  }, [state.players, state.ownership, state.apiMatches, tournamentState]);



  const progressChart = useMemo(() => {
    const players = state.players.map(p => ({ ...p, color: PLAYER_COLORS[p.id] }));
    const totals = Object.fromEntries(players.map(p => [p.id, 0]));

    const finishedMatches = state.apiMatches
      .filter(m =>
        m.homeCode &&
        m.awayCode &&
        typeof m.homeGoals === "number" &&
        typeof m.awayGoals === "number"
      )
      .slice()
      .sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));

    const rows = [
      {
        game: 0,
        label: "Start",
        points: { ...totals },
      },
    ];

    const addPoints = (teamCode, result) => {
      const pid = state.ownership[teamCode];
      if (pid == null || totals[pid] == null) return;
      if (result === "w") totals[pid] += 3;
      else if (result === "d") totals[pid] += 1;
    };

    finishedMatches.forEach((m, index) => {
      addPoints(m.homeCode, resultFor(m, "home"));
      addPoints(m.awayCode, resultFor(m, "away"));

      rows.push({
        game: index + 1,
        label: `Game ${index + 1}`,
        points: { ...totals },
      });
    });

    return { players, rows };
  }, [state.players, state.ownership, state.apiMatches]);

  const PointsProgressChart = () => {
    const { players, rows } = progressChart;

    if (!rows || rows.length <= 1) {
      return (
        <div className="chartcard">
          <div className="charthead">
            <h3>Points race</h3>
            <span>No finished games yet</span>
          </div>
          <div className="empty small">The chart will appear once scores are loaded.</div>
        </div>
      );
    }

    const width = 520;
    const height = 250;
    const padL = 34;
    const padR = 12;
    const padT = 18;
    const padB = 34;
    const plotW = width - padL - padR;
    const plotH = height - padT - padB;
    const maxGame = Math.max(...rows.map(r => r.game), 1);
    const maxPoints = Math.max(1, ...rows.flatMap(r => players.map(p => r.points[p.id] || 0)));
    const yMax = Math.max(3, Math.ceil(maxPoints / 3) * 3);

    const x = game => padL + (game / maxGame) * plotW;
    const y = pts => padT + plotH - (pts / yMax) * plotH;
    const yTicks = Array.from({ length: Math.min(6, yMax + 1) }, (_, i) => Math.round((yMax / (Math.min(5, yMax))) * i));
    const xTicks = rows.length <= 8
      ? rows
      : rows.filter((_, i) => i === 0 || i === rows.length - 1 || i % Math.ceil(rows.length / 6) === 0);

    return (
      <div className="chartcard">
        <div className="charthead">
          <h3>Points race</h3>
          <span>After each finished game</span>
        </div>
        <svg className="linechart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Points race by game number">
          {yTicks.map(t => (
            <g key={t}>
              <line x1={padL} x2={width - padR} y1={y(t)} y2={y(t)} className="gridline" />
              <text x={padL - 8} y={y(t) + 4} className="axislabel" textAnchor="end">{t}</text>
            </g>
          ))}

          <line x1={padL} x2={width - padR} y1={height - padB} y2={height - padB} className="axisline" />
          <line x1={padL} x2={padL} y1={padT} y2={height - padB} className="axisline" />

          {xTicks.map(r => (
            <text key={r.game} x={x(r.game)} y={height - 12} className="axislabel" textAnchor="middle">{r.game}</text>
          ))}

          <text x={width / 2} y={height - 1} className="axiscaption" textAnchor="middle">Game number</text>
          <text x={8} y={padT + 8} className="axiscaption">Pts</text>

          {players.map(p => {
            const points = rows.map(r => `${x(r.game)},${y(r.points[p.id] || 0)}`).join(" ");
            const last = rows[rows.length - 1];
            return (
              <g key={p.id}>
                <polyline className="playerline" points={points} style={{ stroke: p.color }} />
                <circle cx={x(last.game)} cy={y(last.points[p.id] || 0)} r="3.5" style={{ fill: p.color }} />
              </g>
            );
          })}
        </svg>
        <div className="chartlegend">
          {players.map(p => (
            <span key={p.id}><i style={{ background: p.color }} />{p.name}</span>
          ))}
        </div>
      </div>
    );
  };

  const runSync = async () => {
    if (syncing) return;
    setSyncing(true);
    setSyncMsg("Fetching API-Football results…");

    try {
      const resp = await fetch("/api/sync-scores", { cache: "no-store" });
      const data = await resp.json();
      if (!resp.ok || data.error) throw new Error(data.error || "API failed");

      const matches = Array.isArray(data.matches) ? data.matches : [];
      setState(s => ({ ...s, apiMatches: matches, lastSync: Date.now() }));
      setSyncMsg(
        matches.length
          ? `Loaded ${matches.length} API fixture(s) ✓`
          : "Loaded 0 API fixture(s)"
      );
    } catch (err) {
      console.error(err);
      setSyncMsg("Sync failed — check /api/sync-scores");
    }

    setSyncing(false);
  };

  const updateName = (pid, name) => setState(s => ({
    ...s,
    players: s.players.map(p => p.id === pid ? { ...p, name } : p),
  }));

  const OwnerTag = ({ tid }) => {
    const o = ownerOf(tid);
    if (!o) return <span className="owner none">unclaimed</span>;
    return <span className="owner" style={{ color: o.color }}><span className="dot" style={{ background: o.color }} />{o.name}</span>;
  };

  const TeamStatRow = ({ tid, stat, rank }) => {
    const owner = ownerOf(tid);
    const alive = tournamentState.aliveTeams.has(tid);
    return (
      <div className={"teamstatrow" + (!alive ? " out" : "") }>
        <span className="rank">{rank}</span>
        <span className="teamstatname">{TEAMS[tid]?.[1]} {TEAMS[tid]?.[0]}</span>
        <span className="teamowner">{owner ? owner.name : "unclaimed"}</span>
        <span>{stat.gp}</span>
        <span>{stat.pts}</span>
        <span>{gdText(stat.gd)}</span>
      </div>
    );
  };

  const TournamentView = () => {
    return (
      <section className="pane">
        <div className="panehead"><h2>Tournament</h2><div className="subtle">Groups, bracket, managers and team status</div></div>
        <div className="hintline">Teams are greyed out once they are no longer alive. Before the group stage is complete, all teams remain active unless they lose a knockout match.</div>
        <div className="groupsview">
          {GROUPS.map(group => (
            <div key={group} className="groupstandings">
              <div className="ghead">Group {group}</div>
              <div className="teamstatrow head"><span>#</span><span>Team</span><span>Manager</span><span>GP</span><span>Pts</span><span>GD</span></div>
              {tournamentState.rankedGroups[group].map((stat, i) => <TeamStatRow key={stat.tid} tid={stat.tid} stat={stat} rank={i + 1} />)}
            </div>
          ))}
        </div>
        <div className="bracketcard">
          <div className="charthead"><h3>Knockout bracket</h3><span>{tournamentState.knockoutMatches.length} API knockout fixture(s)</span></div>
          {tournamentState.knockoutMatches.length === 0 && <div className="empty small">Knockout fixtures will appear here when the API publishes the actual teams.</div>}
          {tournamentState.knockoutMatches.map(m => <ResultRow key={m.id || `${m.homeCode}-${m.awayCode}-${m.date}`} m={m} />)}
        </div>
      </section>
    );
  };

  const ResultRow = ({ m }) => {
    const homeFlag = flagForTeam(m.homeCode, m.homeName);
    const awayFlag = flagForTeam(m.awayCode, m.awayName);
    return (
      <div className={"match" + ((m.homeCode && !tournamentState.aliveTeams.has(m.homeCode)) && (m.awayCode && !tournamentState.aliveTeams.has(m.awayCode)) ? " out" : "")}>
        <div className="matchmeta">
          <span className="grpbadge">{m.status}</span>
          <span className="city">{m.league || "API-Football"}</span>
          {m.date && <span className="city">{new Date(m.date).toLocaleString()}</span>}
        </div>
        <div className="scoreline">
          <div className="teamcell">
            <span className="tname">{homeFlag} {nameFor(m.homeCode, m.homeName)}</span>
            {m.homeCode ? <OwnerTag tid={m.homeCode} /> : <span className="owner none">unmapped: {m.homeName}</span>}
          </div>
          <div className="scorebox readonly"><span>{m.homeGoals}</span><b>:</b><span>{m.awayGoals}</span></div>
          <div className="teamcell r">
            <span className="tname">{nameFor(m.awayCode, m.awayName)} {awayFlag}</span>
            {m.awayCode ? <OwnerTag tid={m.awayCode} /> : <span className="owner none">unmapped: {m.awayName}</span>}
          </div>
        </div>
      </div>
    );
  };

  const leaderPts = board[0]?.pts || 0;

  return (
    <div className="app">
      <style>{CSS}</style>
      <header className="hero">
        <div className="eyebrow">WORLD CUP ’26 — API RESULTS SOURCE</div>
        <h1>DINGAE<br /><span>SWEEPSTAKE</span></h1>
        <div className="rules">6 managers · 8 teams each · API-Football results drive the table</div>
      </header>

      {tab === "draft" && (
        <section className="pane">
          <div className="panehead"><h2>Draft</h2><div className="subtle">Ownership is mapped to API countries</div></div>
          {state.players.map(p => (
            <div key={p.id} className="lockcard">
              <div className="lockname"><span className="pdot solo" style={{ background: PLAYER_COLORS[p.id] }} />{p.name}</div>
              <div className="lockrow">
                {TEAM_IDS.filter(t => state.ownership[t] === p.id).map(t => (
                  <span key={t} className="lockteam">{TEAMS[t][1]} {TEAMS[t][0]}</span>
                ))}
              </div>
            </div>
          ))}
          <div className="namesedit">
            <div className="glabel">Manager names</div>
            {state.players.map(p => (
              <div key={p.id} className="namerow">
                <span className="pdot solo" style={{ background: PLAYER_COLORS[p.id] }} />
                <input value={p.name} maxLength={14} onChange={e => updateName(p.id, e.target.value)} />
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "results" && (
        <section className="pane">
          <div className="panehead"><h2>Fixtures & Results</h2><div className="subtle">{state.apiMatches.length} fixtures loaded</div></div>
          <div className="syncbar">
            <button className="syncbtn" onClick={runSync} disabled={syncing}>{syncing ? "Syncing…" : "Update scores"}</button>
            <span className="syncmsg">{syncMsg || (state.lastSync ? "Last check " + new Date(state.lastSync).toLocaleString() : "Tap update to fetch scores")}</span>
          </div>
           {state.apiMatches.length === 0 && <div className="empty">No API results loaded yet.</div>}
          {state.apiMatches.map(m => <ResultRow key={m.id} m={m} />)}
        </section>
      )}

      {tab === "table" && (
        <section className="pane">
          <div className="panehead"><h2>League Table</h2><div className="subtle">Built from API results</div></div>
          <div className="board">
            <div className="brow bhead"><span>#</span><span>Manager</span><span>Alive</span><span>GP</span><span>W</span><span>D</span><span>L</span><span>GD</span><span>PTS</span></div>
            {board.map((p, i) => (
              <div key={p.id}>
                <button className={"brow" + (i === 0 && p.pts > 0 ? " lead" : "")} onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
                  <span>{i + 1}</span><span><span className="pdot solo" style={{ background: PLAYER_COLORS[p.id] }} />{p.name}{i === 0 && leaderPts > 0 ? " 🏆" : ""}</span><span>{p.teamsAlive}</span><span>{p.gp}</span><span>{p.w}</span><span>{p.d}</span><span>{p.l}</span><span>{gdText(p.gd)}</span><b>{p.pts}</b>
                </button>
                {expanded === p.id && <div className="squad">
                  {Object.entries(p.teams).sort((a,b) => b[1].pts - a[1].pts).map(([tid, t]) => (
                    <div key={tid} className={"squadrow" + (!t.alive ? " out" : "")}><span>{TEAMS[tid]?.[1]} {TEAMS[tid]?.[0]}</span><span>{t.w}-{t.d}-{t.l} · GD {gdText(t.gd)} · <b>{t.pts}</b> pts</span></div>
                  ))}
                </div>}
              </div>
            ))}
          </div>
          <PointsProgressChart />
        </section>
      )}

      {tab === "tournament" && <TournamentView />}

      <nav className="tabbar">
        {[["draft","Draft"],["results","Results"],["table","Table"],["tournament","Tournament"]].map(([k,l]) => <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>)}
      </nav>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;800&family=Inter:wght@400;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}.app{min-height:100vh;background:#0C1F15;color:#F0EDE2;font-family:Inter,system-ui,sans-serif;font-size:14px;padding-bottom:76px;max-width:560px;margin:0 auto}.hero{padding:26px 18px 18px;border-bottom:1px solid #ffffff14}.eyebrow{font-family:'Saira Condensed';letter-spacing:.22em;font-size:11px;color:#9FBFA8}h1{font-family:'Saira Condensed';font-weight:800;font-size:44px;line-height:.95;margin:6px 0 8px}h1 span{color:#E8B33B}.rules,.subtle,.hintline,.syncmsg,.city{font-size:12px;color:#9FBFA8}.pane{padding:16px 14px}.panehead{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:10px}h2{font-family:'Saira Condensed';font-weight:800;font-size:24px;text-transform:uppercase}.lockcard,.match,.board,.namesedit{background:#10271A;border:1px solid #ffffff12;border-radius:10px;padding:10px;margin-bottom:9px}.lockname{font-family:'Saira Condensed';font-size:18px;font-weight:800}.lockrow{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}.lockteam{font-size:11.5px;background:#0C1F15;border:1px solid #ffffff14;border-radius:999px;padding:4px 9px}.pdot.solo{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px}.syncbar{display:flex;gap:10px;align-items:center;margin:2px 0 10px;flex-wrap:wrap}.syncbtn{background:#E8B33B;color:#0C1F15;border:0;border-radius:8px;padding:8px 14px;font-weight:700;cursor:pointer}.syncbtn:disabled{opacity:.55}.matchmeta{display:flex;gap:8px;align-items:center;margin-bottom:7px;flex-wrap:wrap}.grpbadge{font-family:'Saira Condensed';font-size:11px;letter-spacing:.14em;color:#0C1F15;background:#E8B33B;border-radius:4px;padding:2px 6px}.scoreline{display:flex;align-items:center;gap:8px}.teamcell{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.teamcell.r{text-align:right;align-items:flex-end}.tname{font-weight:600;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.owner{font-size:10.5px;display:inline-flex;align-items:center;gap:5px}.owner .dot{width:6px;height:6px;border-radius:50%}.owner.none{color:#5d7a66}.scorebox.readonly{display:flex;align-items:center;gap:6px;font-family:'Saira Condensed';font-weight:800;font-size:24px;color:#E8B33B}.brow{display:grid;grid-template-columns:24px 1fr 38px 30px 26px 26px 26px 34px 46px;align-items:center;width:100%;padding:11px 12px;background:transparent;border:0;border-bottom:1px solid #ffffff0d;color:#F0EDE2;text-align:left}.brow.bhead{font-size:10px;color:#9FBFA8;text-transform:uppercase}.brow.lead{background:linear-gradient(90deg,#E8B33B22,transparent 70%)}.squad{background:#0C1F15;border-bottom:1px solid #ffffff0d;padding:4px 0}.squadrow{display:flex;justify-content:space-between;padding:6px 14px;font-size:12.5px;color:#C8D8CC}.namerow{display:flex;align-items:center;margin:6px 0}.namerow input{flex:1;background:#0C1F15;border:1px solid #ffffff1c;border-radius:7px;color:#F0EDE2;padding:7px 9px}.glabel{font-family:'Saira Condensed';letter-spacing:.18em;font-size:11px;color:#E8B33B;margin-bottom:6px}.empty{text-align:center;color:#9FBFA8;padding:18px}.chartcard{background:#10271A;border:1px solid #ffffff12;border-radius:10px;padding:12px;margin-top:12px}.charthead{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:8px}.charthead h3{font-family:'Saira Condensed';font-weight:800;font-size:19px;text-transform:uppercase;color:#F0EDE2}.charthead span{font-size:11px;color:#9FBFA8}.linechart{width:100%;height:auto;display:block;background:#0C1F15;border:1px solid #ffffff0d;border-radius:8px}.gridline{stroke:#ffffff12;stroke-width:1}.axisline{stroke:#ffffff35;stroke-width:1}.axislabel{fill:#9FBFA8;font-size:10px;font-family:Inter,system-ui,sans-serif}.axiscaption{fill:#9FBFA8;font-size:10px;font-family:Inter,system-ui,sans-serif}.playerline{fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}.chartlegend{display:flex;flex-wrap:wrap;gap:8px 12px;margin-top:9px}.chartlegend span{display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#C8D8CC}.chartlegend i{width:9px;height:9px;border-radius:50%;display:inline-block}.empty.small{padding:10px}.groupsview{display:grid;grid-template-columns:1fr;gap:10px}.groupstandings,.bracketcard{background:#10271A;border:1px solid #ffffff12;border-radius:10px;padding:10px;margin-bottom:10px}.ghead{font-family:'Saira Condensed';font-weight:800;font-size:17px;color:#E8B33B;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px}.teamstatrow{display:grid;grid-template-columns:22px 1fr 74px 28px 34px 34px;gap:6px;align-items:center;padding:6px 0;border-top:1px solid #ffffff0d;font-size:11.5px}.teamstatrow.head{color:#9FBFA8;text-transform:uppercase;font-size:10px;border-top:0}.teamstatrow.out,.squadrow.out,.match.out{opacity:.38;filter:grayscale(1)}.teamstatname{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.teamowner{color:#9FBFA8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}@media(min-width:520px){.groupsview{grid-template-columns:1fr 1fr}}.tabbar{position:fixed;bottom:0;left:0;right:0;max-width:560px;margin:0 auto;display:flex;background:#0A1A11F2;border-top:1px solid #ffffff1a}.tabbar button{flex:1;background:transparent;border:0;color:#9FBFA8;font-family:'Saira Condensed';font-weight:600;letter-spacing:.14em;font-size:14px;text-transform:uppercase;padding:15px 0;cursor:pointer}.tabbar button.on{color:#E8B33B;box-shadow:inset 0 3px 0 #E8B33B}
`;
