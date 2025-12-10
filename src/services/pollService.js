const fs = require('fs');
const path = require('path');

// lowercase comments: load json helper
function loadJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// lowercase comments: save json helper
function saveJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const votesPath = path.join(__dirname, '../data/votes.json');
const votersPath = path.join(__dirname, '../data/voters.json');

// lowercase comments: record a vote
function addVote(name, flavor) {
  const votes = loadJSON(votesPath);
  const voters = loadJSON(votersPath);

  // increment vote count
  votes[flavor] = (votes[flavor] || 0) + 1;

  // add voter record (most recent at end)
  voters.push({ name, flavor });

  saveJSON(votesPath, votes);
  saveJSON(votersPath, voters);
}

// lowercase comments: get tally of votes
function getResults() {
  return loadJSON(votesPath);
}

// lowercase comments: get list of all voters
function getVoters() {
  return loadJSON(votersPath);
}

module.exports = { addVote, getResults, getVoters };
