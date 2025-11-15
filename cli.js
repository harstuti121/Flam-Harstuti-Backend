#!/usr/bin/env node
const { program } = require('commander');
const { enqueue, list, dlqList, dlqRetry, setConfig } = require('./queue/jobQueue');
const { startWorker, stopWorker } = require('./queue/worker');

program
  .command('enqueue <command>')
  .description('Add a new job')
  .action(async (command) => {
    await enqueue(command);
  });

program
  .command('list [state]')
  .description('List jobs optionally by state')
  .action(async (state) => {
    await list(state);
  });

program
  .command('worker:start')
  .description('Start worker process')
  .action(async () => {
    await startWorker();
  });

program
  .command('worker:stop')
  .description('Stop worker process')
  .action(() => {
    stopWorker();
  });

program
  .command('dlq:list')
  .description('List dead letter queue jobs')
  .action(async () => {
    await dlqList();
  });

program
  .command('dlq:retry <jobId>')
  .description('Retry job from DLQ')
  .action(async (jobId) => {
    await dlqRetry(jobId);
  });

program
  .command('config:set <key> <value>')
  .description('Set configuration value')
  .action(async (key, value) => {
    await setConfig(key, isNaN(value) ? value : Number(value));
  });

program.parse(process.argv);
