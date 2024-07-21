// models/Sale.js

const pool = require("../getPool"); // Import MySQL connection pool

class Sale {
  constructor(customerName, customerId, MedicineID, quantity, amount, date) {
    this.customerName = customerName;
    this.customerId = customerId;
    this.MedicineID = MedicineID;
    this.quantity = quantity;
    this.amount = amount;
    this.date = date;
  }

  static async createSale(
    customerName,
    customerId,
    MedicineID,
    quantity,
    amount,
    date
  ) {
    try {
      const query =
        "INSERT INTO Sales (customerName, customerId, MedicineID, quantity, amount, date) VALUES (?, ?, ?, ?, ?)";
      const result = await pool.query(query, [
        customerName,
        customerId,
        MedicineID,
        quantity,
        amount,
        date,
      ]);
      return {
        id: result.insertId,
        customerName,
        customerId,
        MedicineID,
        quantity,
        amount,
        date,
      };
    } catch (error) {
      throw error;
    }
  }

  static async getTotalSalesPerDay(startDate, endDate) {
    try {
      const query = `
                SELECT DATE(date) AS day, SUM(amount) AS totalSales
                FROM Sales
                WHERE date BETWEEN ? AND ?
                GROUP BY DATE(date)
            `;
      const results = await pool.query(query, [startDate, endDate]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getTotalOrdersPerDay(startDate, endDate) {
    try {
      const query = `
                SELECT DATE(date) AS day, COUNT(*) AS totalOrders
                FROM Sales
                WHERE date BETWEEN ? AND ?
                GROUP BY DATE(date)
            `;
      const results = await pool.query(query, [startDate, endDate]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getTotalProductsSold(startDate, endDate) {
    try {
      const query = `
                SELECT DATE(date) AS day, SUM(quantity) AS totalProductsSold
                FROM Sales
                WHERE date BETWEEN ? AND ?
                GROUP BY DATE(date)
            `;
      const results = await pool.query(query, [startDate, endDate]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getTotalNewCustomersPerDay(startDate, endDate) {
    try {
      const query = `
                SELECT DATE(date) AS day, COUNT(DISTINCT customerId) AS totalNewCustomers
                FROM Sales
                WHERE date BETWEEN ? AND ?
                GROUP BY DATE(date)
            `;
      const results = await pool.query(query, [startDate, endDate]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async TotalRevenue() {
    try {
      const currentDate = new Date();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      const query = `
                SELECT SUM(price * quantity) AS totalRevenue
                FROM Sales
                WHERE date BETWEEN ? AND ?
            `;
      const results = await pool.query(query, [
        firstDayOfMonth,
        lastDayOfMonth,
      ]);
      return results[0].totalRevenue || 0;
    } catch (error) {
      throw error;
    }
  }

  static async getAllSales() {
    try {
      const query = "SELECT * FROM Sales";
      const results = await pool.query(query);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getSaleById(id) {
    try {
      const query = "SELECT * FROM Sales WHERE id = ?";
      const results = await pool.query(query, [id]);
      return results[0];
    } catch (error) {
      throw error;
    }
  }

  static async updateSale(id, customerName, amount, date) {
    try {
      const query =
        "UPDATE Sales SET customerName = ?, amount = ?, date = ? WHERE id = ?";
      await pool.query(query, [customerName, amount, date, id]);
    } catch (error) {
      throw error;
    }
  }

  static async deleteSale(id) {
    try {
      const query = "DELETE FROM Sales WHERE id = ?";
      await pool.query(query, [id]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Sale;
