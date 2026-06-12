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

  const board = useMemo(() => {
    const rows = state.players.map(p => ({ ...p, pts: 0, w: 0, d: 0, l: 0, gp: 0, teams: {} }));
    const byId = Object.fromEntries(rows.map(r => [r.id, r]));

    Object.entries(state.ownership).forEach(([tid, pid]) => {
      if (byId[pid]) byId[pid].teams[tid] = { pts: 0, w: 0, d: 0, l: 0 };
    });

    const credit = (tid, res) => {
      const pid = state.ownership[tid];
      const row = byId[pid];
      if (!row) return;
      if (!row.teams[tid]) row.teams[tid] = { pts: 0, w: 0, d: 0, l: 0 };
      const t = row.teams[tid];
      row.gp++;
      if (res === "w") { row.pts += 3; row.w++; t.pts += 3; t.w++; }
      else if (res === "d") { row.pts += 1; row.d++; t.pts += 1; t.d++; }
      else { row.l++; t.l++; }
    };

    state.apiMatches.forEach(m => {
      if (!m.homeCode || !m.awayCode) return;
      if (typeof m.homeGoals !== "number" || typeof m.awayGoals !== "number") return;
      credit(m.homeCode, resultFor(m, "home"));
      credit(m.awayCode, resultFor(m, "away"));
    });

    return rows.sort((a,b) => b.pts - a.pts || b.w - a.w || a.name.localeCompare(b.name));
  }, [state.players, state.ownership, state.apiMatches]);

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

  const ResultRow = ({ m }) => {
    const homeFlag = flagForTeam(m.homeCode, m.homeName);
    const awayFlag = flagForTeam(m.awayCode, m.awayName);
    return (
      <div className="match">
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
            <div className="brow bhead"><span>#</span><span>Manager</span><span>GP</span><span>W</span><span>D</span><span>L</span><span>PTS</span></div>
            {board.map((p, i) => (
              <div key={p.id}>
                <button className={"brow" + (i === 0 && p.pts > 0 ? " lead" : "")} onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
                  <span>{i + 1}</span><span><span className="pdot solo" style={{ background: PLAYER_COLORS[p.id] }} />{p.name}{i === 0 && leaderPts > 0 ? " 🏆" : ""}</span><span>{p.gp}</span><span>{p.w}</span><span>{p.d}</span><span>{p.l}</span><b>{p.pts}</b>
                </button>
                {expanded === p.id && <div className="squad">
                  {Object.entries(p.teams).sort((a,b) => b[1].pts - a[1].pts).map(([tid, t]) => (
                    <div key={tid} className="squadrow"><span>{TEAMS[tid]?.[1]} {TEAMS[tid]?.[0]}</span><span>{t.w}-{t.d}-{t.l} · <b>{t.pts}</b> pts</span></div>
                  ))}
                </div>}
              </div>
            ))}
          </div>
        </section>
      )}

      <nav className="tabbar">
        {[["draft","Draft"],["results","Results"],["table","Table"]].map(([k,l]) => <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>)}
      </nav>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;800&family=Inter:wght@400;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}.app{min-height:100vh;background:#0C1F15;color:#F0EDE2;font-family:Inter,system-ui,sans-serif;font-size:14px;padding-bottom:76px;max-width:560px;margin:0 auto}.hero{padding:26px 18px 18px;border-bottom:1px solid #ffffff14}.eyebrow{font-family:'Saira Condensed';letter-spacing:.22em;font-size:11px;color:#9FBFA8}h1{font-family:'Saira Condensed';font-weight:800;font-size:44px;line-height:.95;margin:6px 0 8px}h1 span{color:#E8B33B}.rules,.subtle,.hintline,.syncmsg,.city{font-size:12px;color:#9FBFA8}.pane{padding:16px 14px}.panehead{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:10px}h2{font-family:'Saira Condensed';font-weight:800;font-size:24px;text-transform:uppercase}.lockcard,.match,.board,.namesedit{background:#10271A;border:1px solid #ffffff12;border-radius:10px;padding:10px;margin-bottom:9px}.lockname{font-family:'Saira Condensed';font-size:18px;font-weight:800}.lockrow{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}.lockteam{font-size:11.5px;background:#0C1F15;border:1px solid #ffffff14;border-radius:999px;padding:4px 9px}.pdot.solo{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px}.syncbar{display:flex;gap:10px;align-items:center;margin:2px 0 10px;flex-wrap:wrap}.syncbtn{background:#E8B33B;color:#0C1F15;border:0;border-radius:8px;padding:8px 14px;font-weight:700;cursor:pointer}.syncbtn:disabled{opacity:.55}.matchmeta{display:flex;gap:8px;align-items:center;margin-bottom:7px;flex-wrap:wrap}.grpbadge{font-family:'Saira Condensed';font-size:11px;letter-spacing:.14em;color:#0C1F15;background:#E8B33B;border-radius:4px;padding:2px 6px}.scoreline{display:flex;align-items:center;gap:8px}.teamcell{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.teamcell.r{text-align:right;align-items:flex-end}.tname{font-weight:600;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.owner{font-size:10.5px;display:inline-flex;align-items:center;gap:5px}.owner .dot{width:6px;height:6px;border-radius:50%}.owner.none{color:#5d7a66}.scorebox.readonly{display:flex;align-items:center;gap:6px;font-family:'Saira Condensed';font-weight:800;font-size:24px;color:#E8B33B}.brow{display:grid;grid-template-columns:26px 1fr 34px 28px 28px 28px 52px;align-items:center;width:100%;padding:11px 12px;background:transparent;border:0;border-bottom:1px solid #ffffff0d;color:#F0EDE2;text-align:left}.brow.bhead{font-size:10px;color:#9FBFA8;text-transform:uppercase}.brow.lead{background:linear-gradient(90deg,#E8B33B22,transparent 70%)}.squad{background:#0C1F15;border-bottom:1px solid #ffffff0d;padding:4px 0}.squadrow{display:flex;justify-content:space-between;padding:6px 14px;font-size:12.5px;color:#C8D8CC}.namerow{display:flex;align-items:center;margin:6px 0}.namerow input{flex:1;background:#0C1F15;border:1px solid #ffffff1c;border-radius:7px;color:#F0EDE2;padding:7px 9px}.glabel{font-family:'Saira Condensed';letter-spacing:.18em;font-size:11px;color:#E8B33B;margin-bottom:6px}.empty{text-align:center;color:#9FBFA8;padding:18px}.tabbar{position:fixed;bottom:0;left:0;right:0;max-width:560px;margin:0 auto;display:flex;background:#0A1A11F2;border-top:1px solid #ffffff1a}.tabbar button{flex:1;background:transparent;border:0;color:#9FBFA8;font-family:'Saira Condensed';font-weight:600;letter-spacing:.14em;font-size:14px;text-transform:uppercase;padding:15px 0;cursor:pointer}.tabbar button.on{color:#E8B33B;box-shadow:inset 0 3px 0 #E8B33B}
`;
