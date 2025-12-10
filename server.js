// server.js

const express = require('express');
const path = require('path');
const poll = require('./src/services/pollService');

const app = express();

// parse json bodies
app.use(express.json());

// serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// record vote
app.post('/api/vote', (req, res) => {
  const { name, flavor } = req.body;
  if (!flavor) {
    return res.status(400).json({ error: 'missing flavor' });
  }

  try {
    poll.addVote(name || 'anonymous', flavor);
    res.json({ success: true });
  } catch (err) {
    console.error('save error', err);
    res.status(500).json({ error: 'internal error' });
  }
});

// return tally
app.get('/api/results', (req, res) => {
  try {
    res.json(poll.getResults());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

// return voters
app.get('/api/voters', (req, res) => {
  try {
    res.json(poll.getVoters());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));
