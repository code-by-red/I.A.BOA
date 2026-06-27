export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = process.env.APPSCRIPT_URL;

  if (!url) {
    return res.status(500).json({ error: 'APPSCRIPT_URL not configured' });
  }

  try {
    if (req.method === 'GET') {
      // Fetch events from Google Apps Script
      const response = await fetch(url);
      const data = await response.json();
      return res.status(200).json(data);
    } else if (req.method === 'POST') {
      // Add event or report to Google Apps Script
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });
      return res.status(200).json({ success: true });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error fetching from Apps Script:', error);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}
