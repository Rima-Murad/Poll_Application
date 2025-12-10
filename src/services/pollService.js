// src/services/pollService.js
const fs = require('fs');
const path = require('path');

// helper to load json synchronously
function loadJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// helper to write json synchronously (atomic-ish)
function saveJSON(filePath, data) {
  // write to tmp file then rename for atomicity
  const tmp = filePath + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, filePath);
}

// compute paths relative to this file's dir
// go to src/services 
const votesPath = path.join(__dirname, '../../data/votes.json');
const votersPath = path.join(__dirname, '../../data/voters.json');

// add a vote and persist
function addVote(name, flavor) {
  const votes = loadJSON(votesPath);
  const voters = loadJSON(votersPath);

  // ensure flavor key exists
  votes[flavor] = (votes[flavor] || 0) + 1;

  // append voter record (oldest first). tv.html reverses list for newest-first display
  voters.push({ name: name || 'anonymous', flavor });

  saveJSON(votesPath, votes);
  saveJSON(votersPath, voters);
}

// return current tallies
function getResults() {
  return loadJSON(votesPath);
}

// return voter array
function getVoters() {
  return loadJSON(votersPath);
}

module.exports = { addVote, getResults, getVoters };
