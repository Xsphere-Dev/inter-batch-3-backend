const db = require("../db/db");

const getAllUsers = () => new Promise((resolve, reject) => {
  db.all(
    `SELECT id, phone_number, name, email, created_at, updated_at
     FROM users
     ORDER BY id`,
    (error, rows) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(rows);
    }
  );
});

const getUserById = (id) => new Promise((resolve, reject) => {
  db.get(
    `SELECT id, phone_number, name, email, created_at, updated_at
     FROM users
     WHERE id = ?`,
    [id],
    (error, user) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(user);
    }
  );
});

const createUser = ({ phone_number, name, email, password }) => new Promise((resolve, reject) => {
  db.run(
    `INSERT INTO users (phone_number, name, email, password)
     VALUES (?, ?, ?, ?)`,
    [phone_number, name, email, password],
    function (error) {
      if (error) {
        reject(error);
        return;
      }

      getUserById(this.lastID).then(resolve).catch(reject);
    }
  );
});

const updateUser = (id, updates) => new Promise((resolve, reject) => {
  const allowedFields = ["phone_number", "name", "email", "password"];
  const fields = allowedFields.filter((field) => updates[field] !== undefined);

  if (fields.length === 0) {
    resolve(null);
    return;
  }

  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => updates[field]);

  db.run(
    `UPDATE users
     SET ${assignments}, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [...values, id],
    function (error) {
      if (error) {
        reject(error);
        return;
      }

      getUserById(id).then(resolve).catch(reject);
    }
  );
});

const deleteUser = (id) => new Promise((resolve, reject) => {
  db.run("DELETE FROM users WHERE id = ?", [id], function (error) {
    if (error) {
      reject(error);
      return;
    }
    resolve(this.changes > 0);
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};