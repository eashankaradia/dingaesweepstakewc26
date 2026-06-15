const OWNER = "eashankaradia";
const REPO = "dingaesweepstakewc26";
const FILE_PATH = "public/draft.json";
const BRANCH = "main";
const RAW_URL = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${FILE_PATH}`;

const DEFAULT_OWNERSHIP = {
  GHA:0,ESP:0,MAR:0,EGY:0,COD:0,URU:0,NED:0,BIH:0,
  NOR:1,CPV:1,FRA:1,QAT:1,POR:1,AUT:1,SCO:1,CAN:1,
  PAN:2,IRN:2,TUR:2,ECU:2,NZL:2,BEL:2,SWE:2,SEN:2,
  SUI:3,AUS:3,ARG:3,UZB:3,USA:3,IRQ:3,RSA:3,KOR:3,
  HAI:4,COL:4,CIV:4,JPN:4,CZE:4,ENG:4,CUW:4,CRO:4,
  KSA:5,GER:5,ALG:5,TUN:5,PAR:5,MEX:5,BRA:5,JOR:5,
};

async function readDraft() {
  try {
    const res = await fetch(`${RAW_URL}?t=${Date.now()}`, {
      headers: { "Cache-Control": "no-cache" },
    });
    if (!res.ok) return DEFAULT_OWNERSHIP;
    const data = await res.json();
    return data.ownership || DEFAULT_OWNERSHIP;
  } catch {
    return DEFAULT_OWNERSHIP;
  }
}

async function writeDraft(ownership) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not set");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": "dingae-sweepstake",
    Accept: "application/vnd.github+json",
  };

  // Get current file SHA
  const metaRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
    { headers }
  );
  if (!metaRes.ok) throw new Error("Could not read file metadata from GitHub");
  const { sha } = await metaRes.json();

  const content = Buffer.from(JSON.stringify({ ownership }, null, 2) + "\n").toString("base64");

  const putRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: "Update draft ownership",
        content,
        sha,
        branch: BRANCH,
      }),
    }
  );
  if (!putRes.ok) {
    const err = await putRes.text();
    throw new Error(`GitHub write failed: ${err}`);
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    const ownership = await readDraft();
    return res.status(200).json({ ownership });
  }

  if (req.method === "POST") {
    const { password, ownership } = req.body || {};
    if (password !== "dingus") return res.status(403).json({ error: "Unauthorized" });
    if (!ownership || typeof ownership !== "object") return res.status(400).json({ error: "Invalid data" });
    try {
      await writeDraft(ownership);
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
