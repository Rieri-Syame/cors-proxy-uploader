// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/upload', async (req, res) => {
  const targetUrl = 'https://script.google.com/macros/s/AKfycby1eepW4cUzuvWjM_r61A848NLQmXI9PumEW0j6mxdPQgAmLelaQOZolrKkB83cx_b0/exec';
  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const rawText = await response.text();
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (err) {
      console.error('Failed to parse JSON from Apps Script:', rawText);
      return res.status(500).json({ status: 'error', message: 'Invalid JSON returned from script' });
    }

    // Forward exactly what the Apps Script sent (including id + name)
    res.json(parsed);

  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy running on http://localhost:${PORT}`));
