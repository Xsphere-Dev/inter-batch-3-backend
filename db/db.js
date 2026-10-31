const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dataDir = path.join(__dirname, "../data");

fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "app.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }

  console.log("SQLite connected:", dbPath);
});

db.run("PRAGMA foreign_keys = ON");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
