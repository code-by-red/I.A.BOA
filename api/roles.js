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

  console.log('APPSCRIPT_URL:', url ? 'configured' : 'NOT configured');

  if (!url) {
    console.error('APPSCRIPT_URL environment variable is not set');
    return res.status(500).json({ error: 'APPSCRIPT_URL not configured' });
  }

  try {
    if (req.method === 'GET') {
      console.log('Fetching events from Apps Script...');
      // Fetch events from Google Apps Script
      const response = await fetch(url);
      console.log('Apps Script response status:', response.status);
      
      const text = await response.text();
      console.log('Apps Script response text:', text.substring(0, 200));
      
      const data = JSON.parse(text);
      console.log('Parsed data:', Array.isArray(data) ? `Array with ${data.length} items` : typeof data);
      
      return res.status(200).json(data);
    } else if (req.method === 'POST') {
      console.log('Posting to Apps Script...', req.body);
      // Add event or report to Google Apps Script
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });
      console.log('POST response status:', response.status);
      return res.status(200).json({ success: true });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in API handler:', error);
    return res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
}
