const { getJobs, saveJobs } = require('./jobStore');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs-extra');
const path = require('path');

const configPath = path.join(__dirname, '../config.json');

async function getConfig() {
  if (!await fs.pathExists(configPath)) return { max_retries: 3, backoff_base: 2 };
  return fs.readJSON(configPath);
}

async function enqueue(command) {
  const jobs = await getJobs();
  const job = {
    id: uuidv4(),
    command,
    state: 'pending',
    attempts: 0,
    max_retries: (await getConfig()).max_retries,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  jobs.push(job);
  await saveJobs(jobs);
  console.log('Job enqueued:', job.id);
}

async function list(state) {
  const jobs = await getJobs();
  const filtered = state ? jobs.filter(j => j.state === state) : jobs;
  console.table(filtered, ['id', 'command', 'state', 'attempts', 'max_retries']);
}

async function dlqList() {
  const jobs = await getJobs();
  const deadJobs = jobs.filter(j => j.state === 'dead');
  console.table(deadJobs, ['id', 'command', 'attempts', 'updated_at']);
}

async function dlqRetry(jobId) {
  const jobs = await getJobs();
  const job = jobs.find(j => j.id === jobId && j.state === 'dead');
  if (!job) return console.log('No such job in DLQ');
  job.state = 'pending';
  job.attempts = 0;
  job.updated_at = new Date().toISOString();
  await saveJobs(jobs);
  console.log('Job retried:', job.id);
}

async function setConfig(key, value) {
  let config = await getConfig();
  config[key] = value;
  await fs.writeJSON(configPath, config);
  console.log(`Config updated: ${key} = ${value}`);
}

module.exports = { enqueue, list, dlqList, dlqRetry, setConfig, getConfig };
