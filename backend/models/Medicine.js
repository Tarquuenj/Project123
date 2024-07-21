// models/Medicine.js

const pool = require("../getPool"); // Import MySQL connection pool

class Medicine {
  constructor(
    Medicine_Name,
    MedicineID,
    Group_Name,
    Quantity_in_number,
    Price,
    How_to_use,
    side_effects
  ) {
    this.Medicine_Name = Medicine_Name;
    this.MedicineID = MedicineID;
    this.Group_Name = Group_Name;
    this.Quantity_in_number = Quantity_in_number;
    this.Price = Price;
    this.How_to_use = How_to_use;
    this.side_effects = side_effects;
  }

  static async createMedicine(
    Medicine_Name,
    MedicineID,
    Group_Name,
    Quantity_in_number,
    Price,
    How_to_use,
    side_effects
  ) {
    try {
      const query =
        "INSERT INTO new_medicine ( Medicine_name, MedicineID, Group_Name ,quantity_in_number, Price,How_to_use, side_effects) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const result = await pool.query(query, [
        Medicine_Name,
        MedicineID,
        Group_Name,
        Quantity_in_number,
        Price,
        How_to_use,
        side_effects,
      ]);
      return {
        id: result.insertId,
        Medicine_Name,
        MedicineID,
        Group_Name,
        Quantity_in_number,
        Price,
        How_to_use,
        side_effects,
      };
    } catch (error) {
      throw error;
    }
  }

  static async updateMedicine(
    Medicine_Name,
    MedicineID,
    Group_Name,
    Quantity_in_number,
    Price,
    How_to_use,
    side_effects
  ) {
    try {
      const query =
        "UPDATE new_medicine SET Medicine_name = ?, MedicineID = ?, Group_Name = ?, Quantity_in_number = ?, Price = ?, How_to_use = ?, side_effects = ? WHERE id = ?";
      await pool.query(query, [
        Medicine_Name,
        MedicineID,
        Group_Name,
        Quantity_in_number,
        Price,
        How_to_use,
        side_effects,
      ]);
    } catch (error) {
      throw error;
    }
  }

  static async deleteMedicine(id) {
    try {
      const query = "DELETE FROM new_medicine WHERE id = ?";
      await pool.query(query, [id]);
    } catch (error) {
      throw error;
    }
  }

  static async AllMedicines() {
    try {
      const query = "SELECT * FROM new_medicine";
      const results = await pool.query(query);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getMedicineById(id) {
    try {
      const query = "SELECT * FROM new_medicine WHERE id = ?";
      const results = await pool.query(query, [id]);
      return results[0]; // Assuming there's only one medicine with the given ID
    } catch (error) {
      throw error;
    }
  }

  static async TopSellingMedicines(limit = 5) {
    try {
      const query = `
                SELECT medicine_id, SUM(quantity) AS totalQuantitySold
                FROM Sales
                GROUP BY medicine_id
                ORDER BY totalQuantitySold DESC
                LIMIT ?
            `;
      const results = await pool.query(query, [limit]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async MedicineShortage(threshold = 20) {
    try {
      const query = `
                SELECT Group_Name, Quantity_in_number
                FROM new_medicine
                WHERE stock < ?
            `;
      const results = await pool.query(query, [threshold]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async MedicineGroups() {
    try {
      const query = `
                SELECT medicine_group, Quantity_in_number
                FROM new_medicine
            `;
      const results = await pool.query(query);
      return results;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Medicine;
