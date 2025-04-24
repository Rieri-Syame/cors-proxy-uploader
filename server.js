// server.js (ES Module format)
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
    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.status(500).send('Proxy error: ' + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));
