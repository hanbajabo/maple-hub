// =============================================================================
// create_hexa_db.js – generate SQLite DB with 6th‑skill priority per job
// =============================================================================
// This script reads `hexa_job_priority.json` (full sorted list per job) and
// creates a SQLite database `hexa_skills.db` containing two tables:
//   1) jobs   – id, name
//   2) skills – id, job_id, name, avgLevel, rank
// The script uses the built‑in `sqlite3` package (npm install sqlite3).
// Run with: `node scripts/create_hexa_db.js`

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const INPUT_JSON = path.resolve(__dirname, '..', 'hexa_job_priority.json');
const DB_PATH = path.resolve(__dirname, '..', 'hexa_skills.db');

// Load data
const raw = fs.readFileSync(INPUT_JSON, 'utf-8');
const jobData = JSON.parse(raw); // { jobName: [{name, averageLevel}, ...], ... }

// Remove existing DB if any
if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
    console.log('🗑️ Existing DB removed');
}

const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
    // Create tables
    db.run(`CREATE TABLE jobs (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );`);

    db.run(`CREATE TABLE skills (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id    INTEGER NOT NULL,
    name      TEXT NOT NULL,
    avgLevel  REAL NOT NULL,
    rank      INTEGER NOT NULL,
    FOREIGN KEY(job_id) REFERENCES jobs(id)
  );`);

    const insertJob = db.prepare('INSERT INTO jobs (name) VALUES (?)');
    const insertSkill = db.prepare('INSERT INTO skills (job_id, name, avgLevel, rank) VALUES (?,?,?,?)');

    db.run('BEGIN TRANSACTION');

    for (const [jobName, skills] of Object.entries(jobData)) {
        insertJob.run(jobName, function (err) {
            if (err) throw err;
            const jobId = this.lastID;
            // Insert each skill with its rank (1‑based)
            skills.forEach((skill, idx) => {
                insertSkill.run(jobId, skill.name, skill.averageLevel, idx + 1);
            });
        });
    }

    db.run('COMMIT');

    insertJob.finalize();
    insertSkill.finalize();
});

db.close(err => {
    if (err) console.error('❌ DB close error', err);
    else console.log('✅ SQLite DB created at', DB_PATH);
});
