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
  lastSync: 0,
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
  const [editingDraft, setEditingDraft] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setState((s) => ({ ...blankState(), ...JSON.parse(raw) }));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }, [state]);

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

  const filteredMatches = useMemo(() => {
    if (resultFilter === "all") return state.apiMatches;
    const pid = Number(resultFilter);
    return state.apiMatches.filter(
      (m) =>
        state.ownership[m.homeCode] === pid ||
        state.ownership[m.awayCode] === pid,
    );
  }, [state.apiMatches, resultFilter, state.ownership]);

  const runSync = async () => {
    if (syncing) return;
    setSyncing(true);
    setSyncMsg("Fetching scores…");

    try {
      const resp = await fetch("/api/sync-scores", { cache: "no-store" });
      const data = await resp.json();
      if (!resp.ok || data.error) throw new Error(data.error || "API failed");

      const matches = Array.isArray(data.matches) ? data.matches : [];
      setState((s) => ({ ...s, apiMatches: matches, lastSync: Date.now() }));
      setSyncMsg(
        matches.length
          ? `Loaded ${matches.length} fixture(s) ✓`
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
            <div className="grow ghead">
              <span>Team</span>
              <span>Manager</span>
              <span>Pts</span>
              <span>GD</span>
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
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="bracketbox">
        <div className="glabel">KNOCKOUT BRACKET</div>
        {state.apiMatches.filter((m) => !isGroupMatch(m)).length === 0 && (
          <div className="empty small">
            Knockout fixtures will appear here when available.
          </div>
        )}
        {state.apiMatches
          .filter((m) => !isGroupMatch(m))
          .map((m) => (
            <ResultRow key={m.id} m={m} />
          ))}
      </div>
    </section>
  );

  const leaderPts = board[0]?.pts || 0;

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
              onClick={() => setEditingDraft((v) => !v)}
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
        </section>
      )}

      {tab === "results" && (
        <section className="pane">
          <div className="panehead">
            <h2>Fixtures & Results</h2>
            <div className="subtle">{filteredMatches.length} shown</div>
          </div>
          <div className="syncbar">
            <button className="syncbtn" onClick={runSync} disabled={syncing}>
              {syncing ? "Syncing…" : "Update scores"}
            </button>
            <span className="syncmsg">
              {syncMsg ||
                (state.lastSync
                  ? "Last check " + new Date(state.lastSync).toLocaleString()
                  : "Tap update to fetch scores")}
            </span>
          </div>
          <div className="filterbar">
            <label htmlFor="resultsFilter">Show</label>
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
          </div>
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
            <div className="subtle">Points · GD · alive teams</div>
          </div>
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
        </section>
      )}

      {tab === "tournament" && <TournamentTab />}

      <nav className="tabbar">
        {[
          ["draft", "Draft"],
          ["results", "Results"],
          ["table", "Table"],
          ["tournament", "Tournament"],
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
*{box-sizing:border-box;margin:0;padding:0}.app{min-height:100vh;background:#0C1F15;color:#F0EDE2;font-family:Inter,system-ui,sans-serif;font-size:14px;padding-bottom:76px;width:100%;max-width:none;margin:0}.hero{padding:26px 18px 18px;border-bottom:1px solid #ffffff14}.eyebrow{font-family:'Saira Condensed';letter-spacing:.22em;font-size:11px;color:#9FBFA8}h1{font-family:'Saira Condensed';font-weight:800;font-size:44px;line-height:.95;margin:6px 0 8px;color:#E8B33B}h1 span{color:#E8B33B}.rules,.subtle,.hintline,.syncmsg,.city{font-size:12px;color:#9FBFA8}.pane{padding:16px 14px}.panehead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}h2{font-family:'Saira Condensed';font-weight:800;font-size:24px;text-transform:uppercase;color:#E8B33B}.lockcard,.match,.board,.groupbox,.bracketbox,.chartbox{background:#10271A;border:1px solid #ffffff12;border-radius:10px;padding:10px;margin-bottom:9px}.lockname{font-family:'Saira Condensed';font-size:18px;font-weight:800;display:flex;align-items:center}.lockrow{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}.lockteam{font-size:11.5px;background:#0C1F15;border:1px solid #ffffff14;border-radius:999px;padding:4px 9px;display:inline-flex;align-items:center;gap:6px}.lockteam.editing{border-radius:8px;padding:6px 7px}.editdraftbtn{background:#E8B33B;color:#0C1F15;border:0;border-radius:8px;padding:8px 13px;font-weight:800;cursor:pointer;font-size:12px}.draftnameinput{background:#0C1F15;border:1px solid #E8B33B66;border-radius:7px;color:#F0EDE2;padding:6px 8px;font-family:Inter,system-ui,sans-serif;font-size:14px;font-weight:700;min-width:130px}.ownerselect{background:#10271A;border:1px solid #ffffff24;color:#F0EDE2;border-radius:6px;padding:3px 5px;font-size:11px;max-width:110px}.pdot.solo{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px;flex:0 0 auto}.syncbar{display:flex;gap:10px;align-items:center;margin:2px 0 10px;flex-wrap:wrap}.syncbtn{background:#E8B33B;color:#0C1F15;border:0;border-radius:8px;padding:8px 14px;font-weight:700;cursor:pointer}.syncbtn:disabled{opacity:.55}.filterbar{display:flex;align-items:center;gap:8px;margin:0 0 10px;color:#9FBFA8;font-size:12px}.filterselect{background:#0C1F15;border:1px solid #ffffff24;color:#F0EDE2;border-radius:8px;padding:8px 10px;font-size:13px;min-width:190px}.matchmeta{display:flex;gap:8px;align-items:center;margin-bottom:7px;flex-wrap:wrap}.grpbadge{font-family:'Saira Condensed';font-size:11px;letter-spacing:.14em;color:#0C1F15;background:#9FBFA8;border-radius:4px;padding:2px 6px}.grpbadge.done{background:#E8B33B}.grpbadge.live{background:#E0635C}.grpbadge.future{background:#9FBFA8}.scoreline{display:flex;align-items:center;gap:8px}.teamcell{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.teamcell.r{text-align:right;align-items:flex-end}.tname{font-weight:600;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.owner{font-size:10.5px;display:inline-flex;align-items:center;gap:5px}.owner .dot{width:6px;height:6px;border-radius:50%}.owner.none{color:#5d7a66}.scorebox.readonly{display:flex;align-items:center;gap:6px;font-family:'Saira Condensed';font-weight:800;font-size:24px;color:#E8B33B}.brow{display:grid;grid-template-columns:24px 1fr 28px 24px 24px 24px 34px 42px 44px;align-items:center;width:100%;padding:11px 10px;background:transparent;border:0;border-bottom:1px solid #ffffff0d;color:#F0EDE2;text-align:left;font-size:12.5px}.brow.bhead{font-size:9px;color:#9FBFA8;text-transform:uppercase}.brow.lead{background:linear-gradient(90deg,#E8B33B22,transparent 70%)}.squad{background:#0C1F15;border-bottom:1px solid #ffffff0d;padding:4px 0}.squadrow{display:flex;justify-content:space-between;padding:6px 14px;font-size:12.5px;color:#C8D8CC}.glabel{font-family:'Saira Condensed';font-weight:800;letter-spacing:.18em;font-size:11px;color:#E8B33B;margin-bottom:6px;text-transform:uppercase}.empty{text-align:center;color:#9FBFA8;padding:18px}.empty.small{padding:8px}.groupsview{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px}.grow{display:grid;grid-template-columns:1.3fr .9fr 34px 34px;gap:8px;align-items:center;border-left:4px solid transparent;border-bottom:1px solid #ffffff0c;padding:7px 8px;font-size:12px}.grow.ghead{color:#9FBFA8;text-transform:uppercase;font-size:9px;background:transparent;border-left-color:transparent}.out{opacity:.38;filter:grayscale(1)}.chartbox{margin-top:14px}.charthead{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.racechart{width:100%;height:auto;display:block;background:#0C1F15;border:1px solid #ffffff10;border-radius:8px}.gridline{stroke:#ffffff14;stroke-width:1}.axisline{stroke:#ffffff2a;stroke-width:1}.axistext{fill:#9FBFA8;font-size:11px;font-family:Inter,system-ui,sans-serif}.axislabel{fill:#9FBFA8;font-size:10px;font-family:Inter,system-ui,sans-serif;letter-spacing:.04em}.chartlegend{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px;font-size:11.5px;color:#C8D8CC}.legenddot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:5px}.tabbar{position:fixed;bottom:0;left:0;right:0;width:100%;max-width:none;margin:0;display:flex;background:#0A1A11F2;border-top:1px solid #ffffff1a}.tabbar button{flex:1;background:transparent;border:0;color:#9FBFA8;font-family:'Saira Condensed';font-weight:600;letter-spacing:.1em;font-size:12px;text-transform:uppercase;padding:15px 0;cursor:pointer}.tabbar button.on{color:#E8B33B;box-shadow:inset 0 3px 0 #E8B33B}
`;
