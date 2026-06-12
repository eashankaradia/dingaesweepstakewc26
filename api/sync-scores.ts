export default async function handler(req, res) {
  try {
    const API_KEY = process.env.FOOTBALL_API_KEY;

    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?season=2026",
      {
        headers: {
          "x-apisports-key": API_KEY,
        },
      }
    );

    const data = await response.json();

    const matches = data.response.map((m) => ({
      id: String(m.fixture.id),
      home: m.teams.home.code,
      away: m.teams.away.code,
      homeGoals: m.goals.home,
      awayGoals: m.goals.away,
      status: m.fixture.status.short,
    }));

    res.status(200).json({ matches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to fetch scores" });
  }
}