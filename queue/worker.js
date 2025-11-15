// const { getJobs, saveJobs } = require('./jobStore');
// const { exec } = require('child_process');

// async function startWorker() {
//   const jobs = await getJobs();
//   const pending = jobs.filter(j => j.state === 'pending');

//   for (const job of pending) {
//     job.state = 'processing';
//     await saveJobs(jobs);

//     exec(job.command, async (err, stdout, stderr) => {
//       if (err) {
//         job.attempts++;
//         job.state = job.attempts >= job.max_retries ? 'dead' : 'pending';
//       } else {
//         job.state = 'completed';
//       }
//       job.updated_at = new Date().toISOString();
//       await saveJobs(jobs);
//     });
//   }
// }

// module.exports = { startWorker };


const { getJobs, saveJobs } = require('./jobStore');
const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);

let running = false;

async function startWorker() {
  running = true;
  console.log('Worker started...');

  while (running) {
    const jobs = await getJobs();
    const pending = jobs.filter(j => j.state === 'pending');

    for (const job of pending) {
      // Lock job
      job.state = 'processing';
      await saveJobs(jobs);

      try {
        await execAsync(job.command);
        job.state = 'completed';
        console.log(`Job ${job.id} completed`);
      } catch (err) {
        job.attempts++;
        if (job.attempts >= job.max_retries) {
          job.state = 'dead';
          console.log(`Job ${job.id} moved to DLQ`);
        } else {
          job.state = 'pending';
          console.log(`Job ${job.id} failed, retrying... (attempt ${job.attempts})`);
        }
      }

      job.updated_at = new Date().toISOString();
      await saveJobs(jobs);
    }

    // wait 1 second before next check
    await new Promise(r => setTimeout(r, 1000));
  }
}

function stopWorker() {
  running = false;
  console.log('Worker stopping...');
}

module.exports = { startWorker, stopWorker };
