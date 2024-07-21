// models/Supplier.js

const pool = require("../getPool"); // Import MySQL connection pool

class Supplier {
  static async getSuppliersList() {
    try {
      const query = `
                SELECT name AS supplierName, username AS supplierUsername, company AS supplierCompany, email AS supplierEmail, number AS supplierNumber, address AS supplierAddress
                FROM Suppliers
            `;
      const results = await pool.query(query);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async createSupplier(name, username, company, email, number, address) {
    try {
      const query = `
                INSERT INTO Suppliers (name, username, company, email, number, address)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
      const result = await pool.query(query, [
        name,
        username,
        company,
        email,
        number,
        address,
      ]);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Supplier;
