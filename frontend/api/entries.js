// Vercel Serverless Function — Daily Entries
// Currently a placeholder. Plug in your DB here (Vercel Postgres, Supabase, etc.)
//
// GET  /api/entries         → returns all entries
// GET  /api/entries?date=X  → returns entry for specific date
// POST /api/entries         → upserts entry { date, ...fields }

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // TODO: Query DB for entries
    // const { date } = req.query;
    return res.status(200).json({
      message: 'API scaffold — connect a database to persist entries.',
      entries: [],
    });
  }

  if (req.method === 'POST') {
    // TODO: Upsert entry in DB
    // const { date, ...fields } = req.body;
    return res.status(200).json({
      message: 'API scaffold — entry would be saved here.',
      received: req.body,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
