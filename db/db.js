const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '../data');

fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, 'app.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }

  console.log('SQLite connected:', dbPath);
});

db.run('PRAGMA foreign_keys = ON');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone_number TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.all('PRAGMA table_info(users)', (tableError, columns) => {
    if (tableError) {
      console.error('Failed to inspect users table:', tableError.message);
      return;
    }

    const columnNames = columns.map((column) => column.name);
    const needsMigration = !['phone_number', 'password', 'updated_at'].every(
      (column) => columnNames.includes(column),
    );

    if (!needsMigration) {
      return;
    }

    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS users_crud_migration (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          phone_number TEXT NOT NULL UNIQUE,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);
      db.run(`
        INSERT INTO users_crud_migration
          (id, phone_number, name, email, password, created_at, updated_at)
        SELECT
          id,
          'legacy-' || id,
          name,
          email,
          'legacy-password',
          COALESCE(created_at, CURRENT_TIMESTAMP),
          COALESCE(created_at, CURRENT_TIMESTAMP)
        FROM users
      `);
      db.run('DROP TABLE users');
      db.run('ALTER TABLE users_crud_migration RENAME TO users');
    });
  });
});

module.exports = db;
