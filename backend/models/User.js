// models/User.js

const pool = require("../getPool"); // Import MySQL connection pool

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static async createUser(username, password) {
    try {
      const query = "INSERT INTO user_login (username, password) VALUES (?, ?)";
      await pool.query(query, [username, password]);
    } catch (error) {
      throw error;
    }
  }

  static async getUserByUsername(username) {
    try {
      const query = "SELECT * FROM user_login WHERE username = ?";
      const results = await pool.query(query, [username]);
      return results[0]; // Assuming there's only one user with the given username
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const query = "SELECT * FROM user_login WHERE id = ?";
      const results = await pool.query(query, [id]);
      return results[0]; // Assuming there's only one user with the given ID
    } catch (error) {
      throw error;
    }
  }

  static async verifyUser(username, password) {
    try {
      const query =
        "SELECT * FROM user_login WHERE username = ? AND password = ?";
      const results = await pool.query(query, [username, password]);
      return results[0]; // If user is found, return user details; otherwise, return undefined
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
