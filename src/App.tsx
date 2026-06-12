// @ts-nocheck

import React, { useState, useEffect, useRef, useMemo } from "react";

/* ---------------- DATA ---------------- */

const TEAMS = {
  MEX:["Mexico","🇲🇽","A"], RSA:["South Africa","🇿🇦","A"], KOR:["South Korea","🇰🇷","A"], CZE:["Czechia","🇨🇿","A"],
  CAN:["Canada","🇨🇦","B"], SUI:["Switzerland","🇨🇭","B"], QAT:["Qatar","🇶🇦","B"], BIH:["Bosnia & Herz.","🇧🇦","B"],
  BRA:["Brazil","🇧🇷","C"], MAR:["Morocco","🇲🇦","C"], SCO:["Scotland","🏴󠁧󠁢󠁳󠁣󠁴󠁿","C"], HAI:["Haiti","🇭🇹","C"],
  USA:["United States","🇺🇸","D"], AUS:["Australia","🇦🇺","D"], PAR:["Paraguay","🇵🇾","D"], TUR:["Türkiye","🇹🇷","D"],
  GER:["Germany","🇩🇪","E"], ECU:["Ecuador","🇪🇨","E"], CIV:["Ivory Coast","🇨🇮","E"], CUW:["Curaçao","🇨🇼","E"],
  NED:["Netherlands","🇳🇱","F"], JPN:["Japan","🇯🇵","F"], TUN:["Tunisia","🇹🇳","F"], SWE:["Sweden","🇸🇪","F"],
  BEL:["Belgium","🇧🇪","G"], IRN:["Iran","🇮🇷","G"], EGY:["Egypt","🇪🇬","G"], NZL:["New Zealand","🇳🇿","G"],
  ESP:["Spain","🇪🇸","H"], URU:["Uruguay","🇺🇾","H"], KSA:["Saudi Arabia","🇸🇦","H"], CPV:["Cape Verde","🇨🇻","H"],
  FRA:["France","🇫🇷","I"], SEN:["Senegal","🇸🇳","I"], NOR:["Norway","🇳🇴","I"], IRQ:["Iraq","🇮🇶","I"],
  ARG:["Argentina","🇦🇷","J"], AUT:["Austria","🇦🇹","J"], ALG:["Algeria","🇩🇿","J"], JOR:["Jordan","🇯🇴","J"],
  POR:["Portugal","🇵🇹","K"], COL:["Colombia","🇨🇴","K"], UZB:["Uzbekistan","🇺🇿","K"], COD:["DR Congo","🇨🇩","K"],
  ENG:["England","🏴󠁧󠁢󠁥󠁮󠁧󠁿","L"], CRO:["Croatia","🇭🇷","L"], PAN:["Panama","🇵🇦","L"], GHA:["Ghana","🇬🇭","L"],
};
const TEAM_IDS = Object.keys(TEAMS);
const GROUPS = ["A","B","C","D","E","F","G","H","I","J","K","L"];

// [date, group, home, away, city]
const GROUP_FIXTURES = [
  ["Jun 11","A","MEX","RSA","Mexico City"], ["Jun 11","A","KOR","CZE","Guadalajara"],
  ["Jun 12","B","CAN","BIH","Toronto"], ["Jun 12","D","USA","PAR","Los Angeles"],
  ["Jun 13","C","BRA","MAR","New York/NJ"], ["Jun 13","D","AUS","TUR","Vancouver"], ["Jun 13","C","HAI","SCO","Boston"], ["Jun 13","B","QAT","SUI","SF Bay Area"],
  ["Jun 14","E","GER","CUW","Houston"], ["Jun 14","E","CIV","ECU","Philadelphia"], ["Jun 14","F","NED","JPN","Dallas"], ["Jun 14","F","SWE","TUN","Monterrey"],
  ["Jun 15","H","ESP","CPV","Atlanta"], ["Jun 15","G","BEL","EGY","Seattle"], ["Jun 15","H","KSA","URU","Miami"], ["Jun 15","G","IRN","NZL","Los Angeles"],
  ["Jun 16","I","FRA","SEN","New York/NJ"], ["Jun 16","I","IRQ","NOR","Boston"], ["Jun 16","J","ARG","ALG","Kansas City"], ["Jun 16","J","AUT","JOR","SF Bay Area"],
  ["Jun 17","K","POR","COD","Houston"], ["Jun 17","L","ENG","CRO","Dallas"], ["Jun 17","L","GHA","PAN","Toronto"], ["Jun 17","K","UZB","COL","Mexico City"],
  ["Jun 18","A","CZE","RSA","Atlanta"], ["Jun 18","B","SUI","BIH","Los Angeles"], ["Jun 18","B","CAN","QAT","Vancouver"], ["Jun 18","A","MEX","KOR","Guadalajara"],
  ["Jun 19","D","USA","AUS","Seattle"], ["Jun 19","C","SCO","MAR","Boston"], ["Jun 19","C","BRA","HAI","Philadelphia"], ["Jun 19","D","TUR","PAR","SF Bay Area"],
  ["Jun 20","F","NED","SWE","Houston"], ["Jun 20","E","GER","CIV","Toronto"], ["Jun 20","E","ECU","CUW","Kansas City"], ["Jun 20","F","TUN","JPN","Monterrey"],
  ["Jun 21","H","ESP","KSA","Atlanta"], ["Jun 21","G","BEL","IRN","Los Angeles"], ["Jun 21","H","URU","CPV","Miami"], ["Jun 21","G","NZL","EGY","Vancouver"],
  ["Jun 22","J","ARG","AUT","Dallas"], ["Jun 22","I","FRA","IRQ","Philadelphia"], ["Jun 22","I","NOR","SEN","Toronto"], ["Jun 22","J","JOR","ALG","SF Bay Area"],
  ["Jun 23","K","POR","UZB","Houston"], ["Jun 23","L","ENG","GHA","Boston"], ["Jun 23","L","PAN","CRO","Boston"], ["Jun 23","K","COL","COD","Guadalajara"],
  ["Jun 24","A","CZE","MEX",""], ["Jun 24","A","RSA","KOR",""], ["Jun 24","B","SUI","CAN",""], ["Jun 24","B","BIH","QAT",""], ["Jun 24","C","SCO","BRA","Miami"], ["Jun 24","C","MAR","HAI",""],
  ["Jun 25","D","TUR","USA",""], ["Jun 25","D","PAR","AUS",""], ["Jun 25","E","GER","ECU",""], ["Jun 25","E","CUW","CIV",""], ["Jun 25","F","NED","TUN",""], ["Jun 25","F","JPN","SWE",""],
  ["Jun 26","G","EGY","IRN","Seattle"], ["Jun 26","G","NZL","BEL","Vancouver"], ["Jun 26","H","ESP","URU",""], ["Jun 26","H","CPV","KSA",""], ["Jun 26","I","FRA","NOR",""], ["Jun 26","I","SEN","IRQ",""],
  ["Jun 27","L","PAN","ENG","New York/NJ"], ["Jun 27","L","CRO","GHA","Philadelphia"], ["Jun 27","K","COL","POR","Miami"], ["Jun 27","K","COD","UZB","Atlanta"], ["Jun 27","J","ALG","AUT","Kansas City"], ["Jun 27","J","JOR","ARG","Dallas"],
].map((m, i) => ({ id: "g" + (i + 1), type: "group", date: m[0], group: m[1], h: m[2], a: m[3], city: m[4] }));

// [matchNo, round, date, city, hint]
const KO_DEF = [
  [73,"R32","Jun 28","Los Angeles","Runner-up A v Runner-up B"],
  [74,"R32","Jun 29","Boston","Winner E v 3rd place"],
  [75,"R32","Jun 29","Monterrey","Winner F v Runner-up C"],
  [76,"R32","Jun 29","Houston","Winner C v Runner-up F"],
  [77,"R32","Jun 30","New York/NJ","Winner I v 3rd place"],
  [78,"R32","Jun 30","Dallas","Runner-up E v Runner-up I"],
  [79,"R32","Jun 30","Mexico City","Winner A v 3rd place"],
  [80,"R32","Jul 1","",""], [81,"R32","Jul 1","",""], [82,"R32","Jul 1","",""],
  [83,"R32","Jul 2","",""], [84,"R32","Jul 2","",""], [85,"R32","Jul 2","",""],
  [86,"R32","Jul 3","",""], [87,"R32","Jul 3","",""], [88,"R32","Jul 3","",""],
  [89,"R16","Jul 4","",""], [90,"R16","Jul 4","",""],
  [91,"R16","Jul 5","",""], [92,"R16","Jul 5","",""],
  [93,"R16","Jul 6","",""], [94,"R16","Jul 6","",""],
  [95,"R16","Jul 7","",""], [96,"R16","Jul 7","",""],
  [97,"QF","Jul 9","Boston",""], [98,"QF","Jul 10","Los Angeles",""],
  [99,"QF","Jul 11","Miami",""], [100,"QF","Jul 11","Kansas City",""],
  [101,"SF","Jul 14","Dallas",""], [102,"SF","Jul 15","Atlanta",""],
  [103,"3RD","Jul 18","Miami",""],
  [104,"FINAL","Jul 19","New York/NJ",""],
];
const KO_FIXTURES = KO_DEF.map(k => ({ id: "m" + k[0], type: "ko", no: k[0], round: k[1], date: k[2], city: k[3], hint: k[4] }));
const ROUND_NAMES = { R32: "Round of 32", R16: "Round of 16", QF: "Quarter-finals", SF: "Semi-finals", "3RD": "Third place", FINAL: "Final" };

const PLAYER_COLORS = ["#E8B33B","#6FB8E8","#E0635C","#B08FE0","#7CCB8F","#E889B8"];
const DEFAULT_PLAYERS = ["Eashan","Vishal","Dillan","Shivam","Adam","Tarnraj"];
// The official Dingae draw — baked in and locked. Player ids: 0 Eashan, 1 Vishal, 2 Dillan, 3 Shivam, 4 Adam, 5 Tarnraj
const DEFAULT_OWNERSHIP = {
  GHA:0, ESP:0, MAR:0, SWE:0, COD:0, URU:0, NED:0, BIH:0,
  NOR:1, CPV:1, FRA:1, QAT:1, POR:1, AUT:1, SCO:1, CAN:1,
  PAN:2, IRN:2, TUR:2, ECU:2, NZL:2, BEL:2, EGY:2, SEN:2,
  SUI:3, AUS:3, ARG:3, UZB:3, USA:3, IRQ:3, RSA:3, KOR:3,
  HAI:4, COL:4, CIV:4, JPN:4, CZE:4, ENG:4, CUW:4, CRO:4,
  KSA:5, GER:5, ALG:5, TUN:5, PAR:5, MEX:5, BRA:5, JOR:5,
};
const STORE_KEY = "dingae-sweepstake-v1";

/* ---------------- HELPERS ---------------- */

const blankState = () => ({
  players: DEFAULT_PLAYERS.map((n, i) => ({ id: i, name: n })),
  ownership: { ...DEFAULT_OWNERSHIP },   // teamId -> playerId (official draw)
  results: {},            // matchId -> { h:"", a:"", et:null }  et: "h"|"a"
  koTeams: {},            // matchId -> { h:teamId|null, a:teamId|null }
  locked: true,           // draft locked in from the start
  lastSync: 0,            // last auto score sync
});

const num = v => (v === "" || v == null ? null : parseInt(v, 10));

const dateMs = m => new Date(m.date + ", 2026 00:00:00").getTime();
const filled = (m, results) => {
  const r = results[m.id];
  if (!r || r.h === "" || r.a === "" || r.h == null || r.a == null) return false;
  if (m.type === "ko" && num(r.h) === num(r.a) && !r.et) return false;
  return true;
};

function matchOutcome(match, results) {
  const r = results[match.id];
  if (!r) return null;
  const h = num(r.h), a = num(r.a);
  if (h == null || a == null || isNaN(h) || isNaN(a)) return null;
  if (h > a) return { winner: "h" };
  if (a > h) return { winner: "a" };
  if (match.type === "group") return { winner: "draw" };
  if (r.et === "h" || r.et === "a") return { winner: r.et, et: true };
  return { pendingET: true };
}

/* ---------------- APP ---------------- */

export default function App() {
  const [state, setState] = useState(blankState);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("draft");
  const [activePlayer, setActivePlayer] = useState(0);
  const [fixFilter, setFixFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmUnlock, setConfirmUnlock] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");
  const saveTimer = useRef(null);
  const didAuto = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(s => ({ ...blankState(), ...parsed }));
      }
    } catch (e) {
      console.error("load failed", e);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error("save failed", e);
      }
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [state, loaded]);

  /* ---- derived ---- */
  const counts = useMemo(() => {
    const c = {};
    state.players.forEach(p => (c[p.id] = 0));
    Object.values(state.ownership).forEach(pid => { if (c[pid] != null) c[pid]++; });
    return c;
  }, [state.ownership, state.players]);

  const allMatches = useMemo(() => [...GROUP_FIXTURES, ...KO_FIXTURES], []);

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
    allMatches.forEach(m => {
      const out = matchOutcome(m, state.results);
      if (!out || out.pendingET) return;
      let hT = m.h, aT = m.a;
      if (m.type === "ko") {
        const kt = state.koTeams[m.id] || {};
        hT = kt.h; aT = kt.a;
        if (!hT || !aT) return;
      }
      if (out.winner === "draw") { credit(hT, "d"); credit(aT, "d"); }
      else if (out.winner === "h") { credit(hT, "w"); credit(aT, "l"); }
      else { credit(hT, "l"); credit(aT, "w"); }
    });
    return rows.sort((x, y) => y.pts - x.pts || y.w - x.w || x.name.localeCompare(y.name));
  }, [state, allMatches]);

  /* ---- actions ---- */
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

  const setScore = (mid, side, val) => {
    if (!/^\d{0,2}$/.test(val)) return;
    setState(s => {
      const r = { ...(s.results[mid] || { h: "", a: "", et: null }), [side]: val };
      const h = num(r.h), a = num(r.a);
      if (h == null || a == null || h !== a) r.et = null;
      return { ...s, results: { ...s.results, [mid]: r } };
    });
  };
  const setET = (mid, side) => setState(s => ({
    ...s, results: { ...s.results, [mid]: { ...(s.results[mid] || { h: "", a: "" }), et: s.results[mid] && s.results[mid].et === side ? null : side } }
  }));
  const setKoTeam = (mid, side, tid) => setState(s => ({
    ...s, koTeams: { ...s.koTeams, [mid]: { ...(s.koTeams[mid] || { h: null, a: null }), [side]: tid || null } }
  }));
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

  /* ---- live score sync ---- */
  const runSync = async (auto) => {
    if (syncing) return;

    const now = Date.now();
    const past = allMatches.filter(m => dateMs(m) <= now);

    const pendingG = past.filter(m => m.type === "group" && !filled(m, state.results));
    const pendingK = past.filter(m => {
      if (m.type !== "ko") return false;
      const kt = state.koTeams[m.id];
      return !kt || !kt.h || !kt.a || !filled(m, state.results);
    });

    if (pendingG.length === 0 && pendingK.length === 0) {
      setState(s => ({ ...s, lastSync: now }));
      setSyncMsg("All played matches are up to date ✓");
      return;
    }

    setSyncing(true);
    setSyncMsg("Fetching live scores…");

    try {
      const payload = {
        pendingGroup: pendingG.map(m => ({
          id: m.id,
          date: m.date,
          homeCode: m.h,
          awayCode: m.a,
          homeName: TEAMS[m.h]?.[0],
          awayName: TEAMS[m.a]?.[0],
        })),
        pendingKnockout: pendingK.map(m => ({
          id: m.id,
          date: m.date,
          round: m.round,
          city: m.city,
          hint: m.hint,
        })),
      };

      const resp = await fetch("/api/sync-scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const parsed = await resp.json();

      if (!resp.ok || parsed.error) {
        throw new Error(parsed.error || "Score API failed");
      }

      let applied = 0;

      setState(s => {
        const results = { ...s.results };
        const koTeams = { ...s.koTeams };

        (parsed.g || []).forEach(([id, h, a]) => {
          const m = GROUP_FIXTURES.find(x => x.id === id);
          if (!m) return;

          const cur = results[id];
          if (cur && cur.h !== "" && cur.a !== "") return; // never overwrite manual entries

          if (Number.isInteger(h) && Number.isInteger(a) && h >= 0 && a >= 0) {
            results[id] = { h: String(h), a: String(a), et: null };
            applied++;
          }
        });

        (parsed.k || []).forEach(([id, hT, aT, h, a, et]) => {
          const m = KO_FIXTURES.find(x => x.id === id);
          if (!m || !TEAMS[hT] || !TEAMS[aT]) return;

          const slot = koTeams[id] || { h: null, a: null };
          if (!slot.h && !slot.a) koTeams[id] = { h: hT, a: aT };

          const cur = results[id];
          if (cur && cur.h !== "" && cur.a !== "") return; // never overwrite manual entries

          if (Number.isInteger(h) && Number.isInteger(a) && h >= 0 && a >= 0) {
            results[id] = {
              h: String(h),
              a: String(a),
              et: et === "h" || et === "a" ? et : null,
            };
            applied++;
          }
        });

        return { ...s, results, koTeams, lastSync: Date.now() };
      });

      setSyncMsg(
        applied > 0
          ? "Filled in " + applied + " result" + (applied === 1 ? "" : "s") + " ✓"
          : (parsed.message || "No new finished matches found")
      );
    } catch (e) {
      console.error("sync failed", e);
      setSyncMsg(auto ? "Auto-update failed — tap Update scores to retry" : "Couldn't fetch scores — try again shortly");
    } finally {
      setSyncing(false);
    }
  };

  // Auto-sync once per visit, at most every 6 hours
  useEffect(() => {
    if (!loaded || didAuto.current) return;
    didAuto.current = true;
    if (Date.now() - (state.lastSync || 0) > 6 * 3600 * 1000) runSync(true);
  }, [loaded]); // eslint-disable-line

  /* ---- render bits ---- */
  const ownerOf = tid => {
    const pid = state.ownership[tid];
    if (pid == null) return null;
    const p = state.players.find(x => x.id === pid);
    return p ? { ...p, color: PLAYER_COLORS[p.id] } : null;
  };

  const OwnerTag = ({ tid }) => {
    const o = ownerOf(tid);
    if (!o) return <span className="owner none">unclaimed</span>;
    return <span className="owner" style={{ color: o.color }}><span className="dot" style={{ background: o.color }} />{o.name}</span>;
  };

  const TeamCell = ({ tid, align }) => {
    if (!tid) return <div className={"teamcell " + align}><span className="tname tbd">TBD</span></div>;
    const [name, flag] = TEAMS[tid];
    return (
      <div className={"teamcell " + align}>
        <span className="tname">{align === "r" ? <>{name} {flag}</> : <>{flag} {name}</>}</span>
        <OwnerTag tid={tid} />
      </div>
    );
  };

  const MatchRow = ({ m }) => {
    const r = state.results[m.id] || { h: "", a: "", et: null };
    const kt = state.koTeams[m.id] || { h: null, a: null };
    const hT = m.type === "ko" ? kt.h : m.h;
    const aT = m.type === "ko" ? kt.a : m.a;
    const out = matchOutcome(m, state.results);
    const needsET = m.type === "ko" && out && out.pendingET && hT && aT;
    return (
      <div className="match">
        <div className="matchmeta">
          {m.type === "group" ? <span className="grpbadge">GRP {m.group}</span> : <span className="grpbadge ko">M{m.no}</span>}
          {m.city ? <span className="city">{m.city}</span> : null}
          {m.type === "ko" && m.hint ? <span className="city">{m.hint}</span> : null}
        </div>
        {m.type === "ko" && (
          <div className="koselects">
            <select value={kt.h || ""} onChange={e => setKoTeam(m.id, "h", e.target.value)}>
              <option value="">Pick team…</option>
              {TEAM_IDS.map(t => <option key={t} value={t}>{TEAMS[t][1]} {TEAMS[t][0]}</option>)}
            </select>
            <select value={kt.a || ""} onChange={e => setKoTeam(m.id, "a", e.target.value)}>
              <option value="">Pick team…</option>
              {TEAM_IDS.map(t => <option key={t} value={t}>{TEAMS[t][1]} {TEAMS[t][0]}</option>)}
            </select>
          </div>
        )}
        <div className="scoreline">
          <TeamCell tid={hT} align="l" />
          <div className="scorebox">
            <input inputMode="numeric" value={r.h} placeholder="–" onChange={e => setScore(m.id, "h", e.target.value)} aria-label="home score" />
            <span className="colon">:</span>
            <input inputMode="numeric" value={r.a} placeholder="–" onChange={e => setScore(m.id, "a", e.target.value)} aria-label="away score" />
          </div>
          <TeamCell tid={aT} align="r" />
        </div>
        {needsET && (
          <div className="etrow">
            <span>Went to ET/pens — winner:</span>
            <button className={"etbtn" + (r.et === "h" ? " on" : "")} onClick={() => setET(m.id, "h")}>{TEAMS[hT][1]} {TEAMS[hT][0]}</button>
            <button className={"etbtn" + (r.et === "a" ? " on" : "")} onClick={() => setET(m.id, "a")}>{TEAMS[aT][1]} {TEAMS[aT][0]}</button>
          </div>
        )}
        {m.type === "ko" && r.et && hT && aT && !needsET && (
          <div className="etnote">Won in ET/pens by {TEAMS[r.et === "h" ? hT : aT][0]} — counts as a full win</div>
        )}
      </div>
    );
  };

  /* ---- fixtures grouping ---- */
  const fixtureSections = useMemo(() => {
    const secs = [];
    if (fixFilter === "all" || fixFilter === "groups") {
      const byDate = {};
      GROUP_FIXTURES.forEach(m => { (byDate[m.date] = byDate[m.date] || []).push(m); });
      Object.entries(byDate).forEach(([d, ms]) => secs.push({ title: d, sub: "Group stage", matches: ms }));
    }
    if (fixFilter === "all" || fixFilter === "ko") {
      const byRound = {};
      KO_FIXTURES.forEach(m => { (byRound[m.round] = byRound[m.round] || []).push(m); });
      ["R32","R16","QF","SF","3RD","FINAL"].forEach(rd => {
        if (byRound[rd]) secs.push({ title: ROUND_NAMES[rd], sub: byRound[rd][0].date + (byRound[rd].length > 1 ? " – " + byRound[rd][byRound[rd].length - 1].date : ""), matches: byRound[rd] });
      });
    }
    return secs;
  }, [fixFilter]);

  const unassigned = TEAM_IDS.filter(t => state.ownership[t] == null).length;
  const leaderPts = board.length ? board[0].pts : 0;

  return (
    <div className="app">
      <style>{CSS}</style>
      <header className="hero">
        <div className="eyebrow">WORLD CUP ’26 — USA · MEXICO · CANADA — JUN 11 → JUL 19</div>
        <h1>DINGAE<br /><span>SWEEPSTAKE</span></h1>
        <div className="rules">6 managers · 8 teams each · Win 3 — Draw 1 — Loss 0 · ET/pens wins count in full</div>
      </header>

      {tab === "draft" && state.locked && (
        <section className="pane">
          <div className="panehead">
            <h2>Draft — Locked 🔒</h2>
            <div className="subtle">Squads are set for the tournament</div>
          </div>
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
          <div className="draftactions">
            <button className="ghost danger" onClick={doUnlock}>{confirmUnlock ? "Tap again to unlock" : "Unlock draft"}</button>
          </div>
        </section>
      )}

      {tab === "draft" && !state.locked && (
        <section className="pane">
          <div className="panehead">
            <h2>The Draft</h2>
            <div className="subtle">{unassigned === 0 ? "All 48 teams claimed ✓" : unassigned + " teams unclaimed"}</div>
          </div>
          <div className="playerstrip">
            {state.players.map(p => (
              <button key={p.id} className={"pchip" + (activePlayer === p.id ? " on" : "")}
                style={{ "--pc": PLAYER_COLORS[p.id] }} onClick={() => setActivePlayer(p.id)}>
                <span className="pdot" />{p.name}<span className="pcount">{counts[p.id]}/8</span>
              </button>
            ))}
          </div>
          <div className="hintline">Tap a manager, then tap teams to hand them out. Tap again to release.</div>
          <div className="groupsgrid">
            {GROUPS.map(g => (
              <div key={g} className="groupcard">
                <div className="glabel">GROUP {g}</div>
                {TEAM_IDS.filter(t => TEAMS[t][2] === g).map(t => {
                  const o = ownerOf(t);
                  return (
                    <button key={t} className={"teambtn" + (o ? " owned" : "")}
                      style={o ? { "--oc": o.color } : null} onClick={() => assignTeam(t)}>
                      <span className="tflag">{TEAMS[t][1]}</span>
                      <span className="tlbl">{TEAMS[t][0]}</span>
                      {o && <span className="oinit">{o.name.slice(0, 3).toUpperCase()}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="draftactions">
            <button className="lockbtn" onClick={lockDraft}>Lock draft 🔒</button>
            <button className="ghost" onClick={randomRemaining} disabled={unassigned === 0}>Randomly assign the rest</button>
            <button className="ghost danger" onClick={doReset}>{confirmReset ? "Tap again to wipe everything" : "Reset game"}</button>
          </div>
          <div className="namesedit">
            <div className="glabel">Manager names</div>
            {state.players.map(p => (
              <div key={p.id} className="namerow">
                <span className="pdot solo" style={{ background: PLAYER_COLORS[p.id] }} />
                <input value={p.name} maxLength={14} onChange={e => renamePlayer(p.id, e.target.value)} />
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "fixtures" && (
        <section className="pane">
          <div className="panehead">
            <h2>Fixtures — all 104</h2>
            <div className="filterstrip">
              {[["all","All"],["groups","Groups"],["ko","Knockouts"]].map(([k, l]) => (
                <button key={k} className={"fchip" + (fixFilter === k ? " on" : "")} onClick={() => setFixFilter(k)}>{l}</button>
              ))}
            </div>
          </div>
          <div className="syncbar">
            <button className="syncbtn" onClick={() => runSync(false)} disabled={syncing}>{syncing ? "Syncing…" : "Update scores"}</button>
            <span className="syncmsg">
              {syncMsg || (state.lastSync
                ? "Auto-updates when you open the app · last check " + new Date(state.lastSync).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                : "Auto-updates when you open the app")}
            </span>
          </div>
          <div className="hintline">Scores you type in by hand are kept — auto-update only fills the blanks. Knockout slots: pick the two teams once they’re known.</div>
          {fixtureSections.map(sec => (
            <div key={sec.title + sec.sub} className="daysec">
              <div className="dayhead"><span className="daytitle">{sec.title}</span><span className="daysub">{sec.sub}</span></div>
              {sec.matches.map(m => <MatchRow key={m.id} m={m} />)}
            </div>
          ))}
        </section>
      )}

      {tab === "table" && (
        <section className="pane">
          <div className="panehead"><h2>League Table</h2><div className="subtle">3 for a win · 1 for a draw</div></div>
          <div className="board">
            <div className="brow bhead">
              <span className="rk">#</span><span className="bn">Manager</span>
              <span className="st">GP</span><span className="st">W</span><span className="st">D</span><span className="st">L</span><span className="bp">PTS</span>
            </div>
            {board.map((p, i) => (
              <div key={p.id}>
                <button className={"brow" + (i === 0 && p.pts > 0 ? " lead" : "")} onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
                  <span className="rk">{i + 1}</span>
                  <span className="bn"><span className="pdot solo" style={{ background: PLAYER_COLORS[p.id] }} />{p.name}{i === 0 && p.pts > 0 && p.pts > (board[1] ? board[1].pts : 0) ? " 🏆" : ""}</span>
                  <span className="st">{p.gp}</span><span className="st">{p.w}</span><span className="st">{p.d}</span><span className="st">{p.l}</span>
                  <span className="bp">{p.pts}</span>
                </button>
                {expanded === p.id && (
                  <div className="squad">
                    {Object.keys(p.teams).length === 0 && <div className="subtle pad">No teams drafted yet.</div>}
                    {Object.entries(p.teams).sort((a, b) => b[1].pts - a[1].pts).map(([tid, t]) => (
                      <div key={tid} className="squadrow">
                        <span>{TEAMS[tid][1]} {TEAMS[tid][0]}</span>
                        <span className="squadstat">{t.w}-{t.d}-{t.l} · <b>{t.pts}</b> pts</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {leaderPts === 0 && <div className="hintline center">Enter results in Fixtures and the table builds itself.</div>}
        </section>
      )}

      <nav className="tabbar">
        {[["draft","Draft"],["fixtures","Fixtures"],["table","Table"]].map(([k, l]) => (
          <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>
        ))}
      </nav>
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
