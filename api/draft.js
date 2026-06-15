// Canonical draft ownership (updated to reflect all trades to date)
const DEFAULT_OWNERSHIP = {
  GHA: 0, ESP: 0, MAR: 0, EGY: 0, COD: 0, URU: 0, NED: 0, BIH: 0,
  NOR: 1, CPV: 1, FRA: 1, QAT: 1, POR: 1, AUT: 1, SCO: 1, CAN: 1,
  PAN: 2, IRN: 2, TUR: 2, ECU: 2, NZL: 2, BEL: 2, SWE: 2, SEN: 2,
  SUI: 3, AUS: 3, ARG: 3, UZB: 3, USA: 3, IRQ: 3, RSA: 3, KOR: 3,
  HAI: 4, COL: 4, CIV: 4, JPN: 4, CZE: 4, ENG: 4, CUW: 4, CRO: 4,
  KSA: 5, GER: 5, ALG: 5, TUN: 5, PAR: 5, MEX: 5, BRA: 5, JOR: 5,
};

async function kvGet(key) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const { result } = await res.json();
    return result ? JSON.parse(result) : null;
  } catch {
    return null;
  }
}

async function kvSet(key, value) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("KV not configured");
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(["SET", key, JSON.stringify(value)]),
  });
  if (!res.ok) throw new Error(`KV write failed: ${await res.text()}`);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    const ownership = (await kvGet("dingae-ownership")) || DEFAULT_OWNERSHIP;
    return res.status(200).json({ ownership });
  }

  if (req.method === "POST") {
    const { password, ownership } = req.body || {};
    if (password !== "dingus") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    if (!ownership || typeof ownership !== "object") {
      return res.status(400).json({ error: "Invalid ownership data" });
    }
    try {
      await kvSet("dingae-ownership", ownership);
      return res.status(200).json({ ok: true });
    } catch {
      // KV not configured — fall through, localStorage still holds changes
      return res.status(200).json({ ok: true, warning: "no-kv" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
