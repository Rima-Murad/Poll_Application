const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const poll = require('./services/pollService');

const app = express();

// lowercase comments: allow json in requests
app.use(bodyParser.json());

// lowercase comments: serve html/js/css from public folder
app.use(express.static(path.join(__dirname, 'public')));

// lowercase comments: record vote (called by question.html)
app.post('/api/vote', (req, res) => {
  const { name, flavor } = req.body;

  if (!flavor) {
    return res.status(400).json({ error: 'missing flavor' });
  }

  poll.addVote(name || 'anonymous', flavor);
  res.json({ success: true });
});

// lowercase comments: provide results for tv.html
app.get('/api/results', (req, res) => {
  res.json(poll.getResults());
});

// lowercase comments: provide voter list for tv.html
app.get('/api/voters', (req, res) => {
  res.json(poll.getVoters());
});

// lowercase comments: run server
const PORT = 3000;
app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));
