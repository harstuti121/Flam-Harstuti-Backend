# 🧰 QueueCTL - Background Job Queue System


## 🎥 Demo Video  
Watch a complete CLI demo showing enqueueing, worker processing, retries, and DLQ.

🔗 Demo Link: https://drive.google.com/file/d/1vfLtcbVPtJg5Nd2Ca55VYxVIrmfkyHEx/view?usp=drive_link

## 📌 Overview
QueueCTL is a CLI-based background job queue system built using Node.js.  
It allows you to queue, execute, retry, and track background jobs efficiently.

---

## 🚀 Features
- Add background jobs with commands (e.g., `echo "Hello World"`)
- Process jobs asynchronously
- Retry failed jobs with configurable limits
- View job states (`pending`, `running`, `completed`, `dead`)
- JSON-based job storage
- CLI commands for managing queue

---

## ⚙️ Tech Stack
- **Node.js**
- **File System (JSON storage)**
- **UUID for unique job IDs**
- **Commander.js** for CLI interface

---

## 💻 Setup Instructions
```bash
# Clone the repo
git clone https://github.com/harstuti121/Flam-Harstuti-Backend.git
cd Flam Harstuti Backend

# Install dependencies
npm install

# Run CLI tool
node queuectl.js add "echo 'Hello World'"
node queuectl.js list
node queuectl.js process

Job Queue CLI – Simple Task Runner

This project is a simple Job Queue system with retry logic, dead letter queue, and CLI commands.

It allows you to:

Add jobs

Run jobs

Retry failed jobs

Move jobs to DLQ (Dead Letter Queue)

View all jobs

Jobs are saved in a JSON database, so they don’t get lost after restart.

📂 Project Structure
project/
 ├── jobs.json          # Main job storage (persistent)
 ├── dead_jobs.json     # DLQ storage
 ├── jobQueue.js        # Core job queue logic
 ├── cli.js             # CLI commands
 ├── package.json       # Scripts + dependencies
 └── README.md

🚀 Setup
Install dependencies
npm install

🛠️ Available CLI Commands
➕ Add a new job
node cli.js add "YOUR_COMMAND_HERE"


Example:

node cli.js add "echo Hello World"

▶️ Run all pending jobs
node cli.js run

🔁 Retry failed jobs
node cli.js retry

💀 View Dead Letter Queue (DLQ)
node cli.js dlq

📋 List all jobs
node cli.js list

🧪 Job Object Structure

Each job stored looks like this:

{
  "id": "unique-job-id",
  "command": "echo 'Hello World'",
  "state": "pending",
  "attempts": 0,
  "max_retries": 3,
  "created_at": "2025-11-04T10:30:00Z",
  "updated_at": "2025-11-04T10:30:00Z"
}

⭐ Features

✔ Persistent job storage
✔ Retry mechanism
✔ Dead letter queue
✔ CLI based
✔ Backoff logic

✔ Clean modular code

