// Vercel Serverless Function — Goals
// Currently a placeholder. Plug in your DB here.
//
// GET /api/goals  → returns current goals
// PUT /api/goals  → updates goals { calories, protein, steps, water }

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // TODO: Read goals from DB
    return res.status(200).json({
      message: 'API scaffold — connect a database to persist goals.',
      goals: { calories: 1750, protein: 145, steps: 8000, water: 2 },
    });
  }

  if (req.method === 'PUT') {
    // TODO: Save goals to DB
    return res.status(200).json({
      message: 'API scaffold — goals would be saved here.',
      received: req.body,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
