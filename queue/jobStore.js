const fs = require('fs-extra');
const path = require('path');

const dbPath = path.join(__dirname, 'jobs.json');

async function getJobs() {
  if (!await fs.pathExists(dbPath)) await fs.writeJSON(dbPath, []);
  return fs.readJSON(dbPath);
}

async function saveJobs(jobs) {
  return fs.writeJSON(dbPath, jobs);
}

module.exports = { getJobs, saveJobs };
