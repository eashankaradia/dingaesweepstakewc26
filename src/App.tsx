// @ts-nocheck

import React, { useState, useEffect, useRef, useMemo } from "react";

/* ---------------- DATA ---------------- */

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
const STORE_KEY = "dingae-sweepstake-v2-api-source";

const blankState = () => ({
  players: DEFAULT_PLAYERS.map((n, i) => ({ id: i, name: n })),
  ownership: { ...DEFAULT_OWNERSHIP },
  locked: true,
  lastSync: 0,
  apiMatches: [],
});

const isFinished = m => ["FT", "AET", "PEN"].includes(m.status);
const scoreNum = v => typeof v === "number" ? v : null;

export default function App() {
  const [state, setState] = useState(blankState);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("draft");
  const [activePlayer, setActivePlayer] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmUnlock, setConfirmUnlock] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");
  const saveTimer = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setState(s => ({ ...blankState(), ...JSON.parse(raw) }));
    } catch (e) {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
      catch (e) { console.error("save failed", e); }
    }, 400);
    return () => clearTimeout(saveTimer.current);
  }, [state, loaded]);

  const counts = useMemo(() => {
    const c = {};
    state.players.forEach(p => (c[p.id] = 0));
    Object.values(state.ownership).forEach(pid => { if (c[pid] != null) c[pid]++; });
    return c;
  }, [state.ownership, state.players]);

  const board = useMemo(() => {
    const rows = state.players.map(p => ({ ...p, pts: 0, w: 0, d: 0, l: 0, gp: 0, teams: {} }));
    const byId = {}; rows.forEach(r => (byId[r.id] = r));
    Object.entries(state.ownership).forEach(([tid, pid]) => {
      if (byId[pid]) byId[pid].teams[tid] = { pts: 0, w: 0, d: 0, l: 0 };
    });

    const credit = (tid, res) => {
      const pid = state.ownership[tid];
      if (pid == null || !byId[pid]) return;
      const row = byId[pid], t = row.teams[tid];
      row.gp++;
      if (res === "w") { row.pts += 3; row.w++; if (t) { t.pts += 3; t.w++; } }
      else if (res === "d") { row.pts += 1; row.d++; if (t) { t.pts += 1; t.d++; } }
      else { row.l++; if (t) t.l++; }
    };

    state.apiMatches.forEach(m => {
      if (!isFinished(m)) return;
      const h = scoreNum(m.homeGoals), a = scoreNum(m.awayGoals);
      if (h == null || a == null || !m.homeCode || !m.awayCode) return;
      if (h > a) { credit(m.homeCode, "w"); credit(m.awayCode, "l"); }
      else if (a > h) { credit(m.homeCode, "l"); credit(m.awayCode, "w"); }
      else { credit(m.homeCode, "d"); credit(m.awayCode, "d"); }
    });

    return rows.sort((x, y) => y.pts - x.pts || y.w - x.w || x.name.localeCompare(y.name));
  }, [state]);

  const assignTeam = tid => setState(s => {
    const own = { ...s.ownership };
    if (own[tid] === activePlayer) { delete own[tid]; return { ...s, ownership: own }; }
    const cnt = Object.values(own).filter(p => p === activePlayer).length;
    if (cnt >= 8) return s;
    own[tid] = activePlayer;
    return { ...s, ownership: own };
  });

  const randomRemaining = () => setState(s => {
    const own = { ...s.ownership };
    const free = TEAM_IDS.filter(t => own[t] == null);
    for (let i = free.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [free[i], free[j]] = [free[j], free[i]]; }
    const cnt = {}; s.players.forEach(p => (cnt[p.id] = 0));
    Object.values(own).forEach(p => cnt[p]++);
    free.forEach(t => {
      const target = s.players.map(p => p.id).sort((a, b) => cnt[a] - cnt[b])[0];
      if (cnt[target] < 8) { own[t] = target; cnt[target]++; }
    });
    return { ...s, ownership: own };
  });

  const renamePlayer = (pid, name) => setState(s => ({
    ...s, players: s.players.map(p => (p.id === pid ? { ...p, name } : p))
  }));
  const doReset = () => {
    if (!confirmReset) { setConfirmReset(true); setTimeout(() => setConfirmReset(false), 3000); return; }
    setState(blankState()); setConfirmReset(false);
  };
  const lockDraft = () => setState(s => ({ ...s, locked: true }));
  const doUnlock = () => {
    if (!confirmUnlock) { setConfirmUnlock(true); setTimeout(() => setConfirmUnlock(false), 3000); return; }
    setState(s => ({ ...s, locked: false })); setConfirmUnlock(false);
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
      const finished = matches.filter(isFinished).length;
      setSyncMsg(finished ? `Loaded ${finished} finished result(s) ✓` : `Loaded ${matches.length} API fixture(s), no finished results yet`);
    } catch (err) {
      console.error("sync failed", err);
      setSyncMsg("Sync failed — check /api/sync-scores");
    }
    setSyncing(false);
  };

  const ownerOf = tid => {
    const pid = state.ownership[tid];
    if (pid == null) return null;
    const p = state.players.find(x => x.id === pid);
    return p ? { ...p, color: PLAYER_COLORS[p.id] } : null;
  };

  const OwnerTag = ({ tid }) => {
    const o = ownerOf(tid);
    if (!tid) return <span className="owner none">unmapped</span>;
    if (!o) return <span className="owner none">unclaimed</span>;
    return <span className="owner" style={{ color: o.color }}><span className="dot" style={{ background: o.color }} />{o.name}</span>;
  };

  const TeamCell = ({ tid, name, flag, align }) => (
    <div className={"teamcell " + align}>
      <span className="tname">{align === "r" ? <>{name} {flag}</> : <>{flag} {name}</>}</span>
      <OwnerTag tid={tid} />
    </div>
  );

  const ApiMatchRow = ({ m }) => {
    const hFlag = m.homeCode && TEAMS[m.homeCode] ? TEAMS[m.homeCode][1] : "";
    const aFlag = m.awayCode && TEAMS[m.awayCode] ? TEAMS[m.awayCode][1] : "";
    const live = ["1H","HT","2H","ET","P","LIVE"].includes(m.status);
    return (
      <div className="match">
        <div className="matchmeta">
          <span className={"grpbadge" + (live ? " ko" : "")}>{m.status || "TBD"}</span>
          <span className="city">{m.date || ""}</span>
          {m.league ? <span className="city">{m.league}</span> : null}
        </div>
        <div className="scoreline">
          <TeamCell tid={m.homeCode} name={m.homeName} flag={hFlag} align="l" />
          <div className="scorebox">
            <input readOnly value={m.homeGoals ?? ""} placeholder="–" aria-label="home score" />
            <span className="colon">:</span>
            <input readOnly value={m.awayGoals ?? ""} placeholder="–" aria-label="away score" />
          </div>
          <TeamCell tid={m.awayCode} name={m.awayName} flag={aFlag} align="r" />
        </div>
      </div>
    );
  };

  const matchesByDate = useMemo(() => {
    const by = {};
    [...state.apiMatches].sort((a,b) => String(a.date).localeCompare(String(b.date)) || String(a.time||"").localeCompare(String(b.time||""))).forEach(m => {
      const d = m.date || "Unknown date";
      (by[d] = by[d] || []).push(m);
    });
    return Object.entries(by);
  }, [state.apiMatches]);

  const unassigned = TEAM_IDS.filter(t => state.ownership[t] == null).length;
  const leaderPts = board.length ? board[0].pts : 0;

  return (
    <div className="app">
      <style>{CSS}</style>
      <header className="hero">
        <div className="eyebrow">WORLD CUP ’26 — API-FOOTBALL LIVE RESULTS</div>
        <h1>DINGAE<br /><span>SWEEPSTAKE</span></h1>
        <div className="rules">6 managers · 8 teams each · API results decide the table · Win 3 — Draw 1 — Loss 0</div>
      </header>

      {tab === "draft" && state.locked && (
        <section className="pane">
          <div className="panehead"><h2>Draft — Locked 🔒</h2><div className="subtle">Squads are set for the tournament</div></div>
          {state.players.map(p => (
            <div key={p.id} className="lockcard">
              <div className="lockname"><span className="pdot solo" style={{ background: PLAYER_COLORS[p.id] }} />{p.name}</div>
              <div className="lockrow">
                {TEAM_IDS.filter(t => state.ownership[t] === p.id).map(t => <span key={t} className="lockteam">{TEAMS[t][1]} {TEAMS[t][0]}</span>)}
              </div>
            </div>
          ))}
          <div className="draftactions"><button className="ghost danger" onClick={doUnlock}>{confirmUnlock ? "Tap again to unlock" : "Unlock draft"}</button></div>
        </section>
      )}

      {tab === "draft" && !state.locked && (
        <section className="pane">
          <div className="panehead"><h2>The Draft</h2><div className="subtle">{unassigned === 0 ? "All 48 teams claimed ✓" : unassigned + " teams unclaimed"}</div></div>
          <div className="playerstrip">
            {state.players.map(p => <button key={p.id} className={"pchip" + (activePlayer === p.id ? " on" : "")} style={{ "--pc": PLAYER_COLORS[p.id] }} onClick={() => setActivePlayer(p.id)}><span className="pdot" />{p.name}<span className="pcount">{counts[p.id]}/8</span></button>)}
          </div>
          <div className="hintline">Tap a manager, then tap teams to hand them out. Tap again to release.</div>
          <div className="groupsgrid">
            {GROUPS.map(g => <div key={g} className="groupcard"><div className="glabel">GROUP {g}</div>
              {TEAM_IDS.filter(t => TEAMS[t][2] === g).map(t => {
                const o = ownerOf(t);
                return <button key={t} className={"teambtn" + (o ? " owned" : "")} style={o ? { "--oc": o.color } : null} onClick={() => assignTeam(t)}><span className="tflag">{TEAMS[t][1]}</span><span className="tlbl">{TEAMS[t][0]}</span>{o && <span className="oinit">{o.name.slice(0,3).toUpperCase()}</span>}</button>;
              })}
            </div>)}
          </div>
          <div className="draftactions">
            <button className="lockbtn" onClick={lockDraft}>Lock draft 🔒</button>
            <button className="ghost" onClick={randomRemaining} disabled={unassigned === 0}>Randomly assign the rest</button>
            <button className="ghost danger" onClick={doReset}>{confirmReset ? "Tap again to wipe everything" : "Reset game"}</button>
          </div>
          <div className="namesedit"><div className="glabel">Manager names</div>{state.players.map(p => <div key={p.id} className="namerow"><span className="pdot solo" style={{ background: PLAYER_COLORS[p.id] }} /><input value={p.name} maxLength={14} onChange={e => renamePlayer(p.id, e.target.value)} /></div>)}</div>
        </section>
      )}

      {tab === "fixtures" && (
        <section className="pane">
          <div className="panehead"><h2>Live Results</h2><div className="subtle">Direct from API-Football</div></div>
          <div className="syncbar">
            <button className="syncbtn" onClick={runSync} disabled={syncing}>{syncing ? "Syncing…" : "Update scores"}</button>
            <span className="syncmsg">{syncMsg || (state.lastSync ? "Last check " + new Date(state.lastSync).toLocaleString([], { month:"short", day:"numeric", hour:"2-digit", minute:"2-digit" }) : "Tap Update scores to load API results")}</span>
          </div>
          <div className="hintline">The app now uses whatever fixtures API-Football returns. Your ownership map is applied to each returned country.</div>
          {matchesByDate.length === 0 && <div className="hintline center">No API results loaded yet.</div>}
          {matchesByDate.map(([date, matches]) => <div key={date} className="daysec"><div className="dayhead"><span className="daytitle">{date}</span><span className="daysub">{matches.length} fixture(s)</span></div>{matches.map(m => <ApiMatchRow key={m.apiFixtureId || `${m.date}-${m.homeName}-${m.awayName}`} m={m} />)}</div>)}
        </section>
      )}

      {tab === "table" && (
        <section className="pane">
          <div className="panehead"><h2>League Table</h2><div className="subtle">Built from API-Football finished results</div></div>
          <div className="board">
            <div className="brow bhead"><span className="rk">#</span><span className="bn">Manager</span><span className="st">GP</span><span className="st">W</span><span className="st">D</span><span className="st">L</span><span className="bp">PTS</span></div>
            {board.map((p, i) => <div key={p.id}><button className={"brow" + (i === 0 && p.pts > 0 ? " lead" : "")} onClick={() => setExpanded(expanded === p.id ? null : p.id)}><span className="rk">{i+1}</span><span className="bn"><span className="pdot solo" style={{ background: PLAYER_COLORS[p.id] }} />{p.name}{i === 0 && p.pts > 0 && p.pts > (board[1] ? board[1].pts : 0) ? " 🏆" : ""}</span><span className="st">{p.gp}</span><span className="st">{p.w}</span><span className="st">{p.d}</span><span className="st">{p.l}</span><span className="bp">{p.pts}</span></button>
              {expanded === p.id && <div className="squad">{Object.entries(p.teams).sort((a,b) => b[1].pts - a[1].pts).map(([tid,t]) => <div key={tid} className="squadrow"><span>{TEAMS[tid][1]} {TEAMS[tid][0]}</span><span className="squadstat">{t.w}-{t.d}-{t.l} · <b>{t.pts}</b> pts</span></div>)}</div>}
            </div>)}
          </div>
          {leaderPts === 0 && <div className="hintline center">Tap Update scores in Live Results and the table builds itself.</div>}
        </section>
      )}

      <nav className="tabbar">{[["draft","Draft"],["fixtures","Results"],["table","Table"]].map(([k,l]) => <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>)}</nav>
    </div>
  );
}

/* ---------------- STYLE ---------------- */

const CSS = `

@import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;800&family=Inter:wght@400;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
.app{min-height:100vh;background:#0C1F15;color:#F0EDE2;font-family:'Inter',system-ui,sans-serif;font-size:14px;
  background-image:radial-gradient(ellipse 120% 60% at 50% -10%, #16382575 0%, transparent 60%),
    repeating-linear-gradient(90deg, transparent 0 79px, #ffffff05 79px 80px);
  padding-bottom:76px;max-width:560px;margin:0 auto}
.hero{padding:26px 18px 18px;border-bottom:1px solid #ffffff14}
.eyebrow{font-family:'Saira Condensed';font-weight:600;letter-spacing:.22em;font-size:11px;color:#9FBFA8}
h1{font-family:'Saira Condensed';font-weight:800;font-size:44px;line-height:.95;letter-spacing:.01em;margin:6px 0 8px}
h1 span{color:#E8B33B}
.rules{font-size:12px;color:#9FBFA8}
.pane{padding:16px 14px 8px}
.panehead{display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:10px}
h2{font-family:'Saira Condensed';font-weight:800;font-size:24px;letter-spacing:.03em;text-transform:uppercase}
.subtle{font-size:12px;color:#9FBFA8}
.subtle.pad{padding:8px 12px}
.hintline{font-size:12px;color:#9FBFA8;margin:2px 0 12px}
.hintline.center{text-align:center;margin-top:14px}
/* draft */
.playerstrip{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px}
.pchip{display:flex;align-items:center;gap:7px;background:#13291C;border:1px solid #ffffff1c;color:#F0EDE2;
  border-radius:999px;padding:8px 12px;font-family:'Inter';font-weight:600;font-size:13px;cursor:pointer}
.pchip .pdot{width:9px;height:9px;border-radius:50%;background:var(--pc)}
.pchip .pcount{font-size:11px;color:#9FBFA8}
.pchip.on{border-color:var(--pc);box-shadow:0 0 0 1px var(--pc);background:#18331F}
.pdot.solo{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px}
.groupsgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.groupcard{background:#10271A;border:1px solid #ffffff12;border-radius:10px;padding:8px}
.glabel{font-family:'Saira Condensed';font-weight:600;letter-spacing:.18em;font-size:11px;color:#E8B33B;margin-bottom:6px}
.teambtn{display:flex;align-items:center;gap:7px;width:100%;text-align:left;background:transparent;border:1px solid transparent;
  border-radius:7px;padding:6px 7px;color:#F0EDE2;font-size:12.5px;cursor:pointer}
.teambtn:hover{background:#ffffff0a}
.teambtn.owned{border-color:var(--oc);background:#ffffff08}
.teambtn .tlbl{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.teambtn .oinit{font-size:9.5px;font-weight:700;letter-spacing:.08em;color:var(--oc)}
.draftactions{display:flex;gap:8px;margin:14px 0;flex-wrap:wrap}
.lockbtn{background:#E8B33B;color:#0C1F15;border:0;border-radius:8px;padding:9px 14px;font-weight:700;font-size:13px;cursor:pointer;font-family:'Inter'}
.lockcard{background:#10271A;border:1px solid #E8B33B3d;border-radius:10px;padding:11px 12px;margin-bottom:9px}
.lockname{display:flex;align-items:center;font-family:'Saira Condensed';font-weight:800;font-size:18px;letter-spacing:.04em}
.lockrow{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}
.lockteam{font-size:11.5px;background:#0C1F15;border:1px solid #ffffff14;border-radius:999px;padding:4px 9px}
.syncbar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:2px 0 8px}
.syncbtn{background:#E8B33B;color:#0C1F15;border:0;border-radius:8px;padding:8px 14px;font-weight:700;font-size:13px;cursor:pointer;font-family:'Inter'}
.syncbtn:disabled{opacity:.55;cursor:default}
.syncmsg{font-size:11.5px;color:#9FBFA8;flex:1;min-width:160px}
.ghost{background:transparent;border:1px solid #ffffff2a;color:#F0EDE2;border-radius:8px;padding:9px 12px;font-size:13px;cursor:pointer}
.ghost.danger{border-color:#D94A3866;color:#E0635C}
.ghost:disabled{opacity:.4;cursor:default}
.namesedit{margin:6px 0 16px;background:#10271A;border:1px solid #ffffff12;border-radius:10px;padding:10px}
.namerow{display:flex;align-items:center;margin:6px 0}
.namerow input{flex:1;background:#0C1F15;border:1px solid #ffffff1c;border-radius:7px;color:#F0EDE2;padding:7px 9px;font-size:13px}
/* fixtures */
.filterstrip{display:flex;gap:6px}
.fchip{background:transparent;border:1px solid #ffffff24;color:#9FBFA8;border-radius:999px;padding:6px 12px;font-size:12px;cursor:pointer}
.fchip.on{color:#0C1F15;background:#E8B33B;border-color:#E8B33B;font-weight:700}
.daysec{margin-bottom:16px}
.dayhead{display:flex;align-items:baseline;gap:10px;padding:6px 2px;border-bottom:2px solid #E8B33B55;margin-bottom:8px}
.daytitle{font-family:'Saira Condensed';font-weight:800;font-size:19px;letter-spacing:.05em;text-transform:uppercase}
.daysub{font-size:11px;color:#9FBFA8;letter-spacing:.08em}
.match{background:#10271A;border:1px solid #ffffff10;border-radius:10px;padding:9px 10px;margin-bottom:8px}
.matchmeta{display:flex;gap:8px;align-items:center;margin-bottom:7px}
.grpbadge{font-family:'Saira Condensed';font-weight:600;font-size:10.5px;letter-spacing:.16em;color:#0C1F15;background:#9FBFA8;border-radius:4px;padding:2px 6px}
.grpbadge.ko{background:#E8B33B}
.city{font-size:11px;color:#9FBFA8}
.scoreline{display:flex;align-items:center;gap:8px}
.teamcell{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.teamcell.r{align-items:flex-end;text-align:right}
.tname{font-weight:600;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.tname.tbd{color:#5d7a66}
.owner{font-size:10.5px;display:inline-flex;align-items:center;gap:5px}
.owner .dot{width:6px;height:6px;border-radius:50%}
.owner.none{color:#5d7a66}
.scorebox{display:flex;align-items:center;gap:4px}
.scorebox input{width:36px;height:38px;text-align:center;font-family:'Saira Condensed';font-weight:800;font-size:21px;
  background:#0C1F15;border:1px solid #ffffff24;border-radius:8px;color:#F0EDE2}
.scorebox input:focus{outline:2px solid #E8B33B;border-color:transparent}
.colon{color:#9FBFA8;font-weight:700}
.koselects{display:flex;gap:6px;margin-bottom:8px}
.koselects select{flex:1;min-width:0;background:#0C1F15;border:1px solid #ffffff1c;color:#F0EDE2;border-radius:7px;padding:7px 6px;font-size:12.5px}
.etrow{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:8px;font-size:11.5px;color:#9FBFA8}
.etbtn{background:transparent;border:1px solid #E8B33B66;color:#F0EDE2;border-radius:999px;padding:5px 10px;font-size:11.5px;cursor:pointer}
.etbtn.on{background:#E8B33B;color:#0C1F15;font-weight:700}
.etnote{margin-top:7px;font-size:11px;color:#E8B33B}
/* table */
.board{background:#10271A;border:1px solid #ffffff12;border-radius:12px;overflow:hidden}
.brow{display:grid;grid-template-columns:26px 1fr 30px 26px 26px 26px 52px;align-items:center;width:100%;
  padding:11px 12px;background:transparent;border:0;border-bottom:1px solid #ffffff0d;color:#F0EDE2;font-size:13px;text-align:left;cursor:pointer}
.brow.bhead{font-size:10.5px;letter-spacing:.12em;color:#9FBFA8;text-transform:uppercase;cursor:default}
.brow.lead{background:linear-gradient(90deg,#E8B33B22,transparent 70%)}
.rk{color:#9FBFA8}
.bn{display:flex;align-items:center;font-weight:600;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.st{text-align:center;color:#C8D8CC;font-variant-numeric:tabular-nums}
.bp{text-align:right;font-family:'Saira Condensed';font-weight:800;font-size:22px;color:#E8B33B;font-variant-numeric:tabular-nums}
.squad{background:#0C1F15;border-bottom:1px solid #ffffff0d;padding:4px 0}
.squadrow{display:flex;justify-content:space-between;padding:6px 14px;font-size:12.5px}
.squadstat{color:#9FBFA8}
.squadstat b{color:#F0EDE2}
/* tabbar */
.tabbar{position:fixed;bottom:0;left:0;right:0;max-width:560px;margin:0 auto;display:flex;
  background:#0A1A11F2;backdrop-filter:blur(8px);border-top:1px solid #ffffff1a}
.tabbar button{flex:1;background:transparent;border:0;color:#9FBFA8;font-family:'Saira Condensed';font-weight:600;
  letter-spacing:.14em;font-size:14px;text-transform:uppercase;padding:15px 0;cursor:pointer}
.tabbar button.on{color:#E8B33B;box-shadow:inset 0 3px 0 #E8B33B}
@media (max-width:420px){h1{font-size:38px}.groupsgrid{grid-template-columns:repeat(2,1fr)}}

`;
