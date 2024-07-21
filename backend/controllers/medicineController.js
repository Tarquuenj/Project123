// controllers/medicineController.js
const pool = require("../getPool");

async function AllMedicines(req, res) {
  // Implement logic to retrieve all medicines from the database
  try {
    // Query to retrieve all medicines from the database
    const query = "SELECT * FROM new_medicine";
    const results = await pool.query(query);

    res.json({ medicines: results });
  } catch (error) {
    console.error("Error retrieving medicines:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function addMedicine(req, res) {
  // Implement logic to add a new medicine to the database
  try {
    // Insert the new medicine into the database
    const query =
      "INSERT INTO new_medicine ( Medicine_Name, MedicineID, Group_Name,Quantity_in_number, Price, How_to_use, side_effects) VALUES (?, ?, ?, ?, ?, ?, ?)";

    await pool.query(query, [
      Medicine_Name,
      Medicine_ID,
      Medicine_Group,
      Quantity_in_number,
      Price,
      How_to_use,
      side_effects,
    ]);

    res.status(201).json({ message: "Medicine added successfully" });
  } catch (error) {
    console.error("Error adding medicine:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateMedicine(req, res) {
  // Implement logic to update an existing medicine in the database
  const medicineId = req.params.id;
  const { name, price, quantity } = req.body;

  try {
    // Update the existing medicine in the database
    const query =
      "UPDATE new_medicine SET Medicine_name = ?, MedicineID = ?, Medicine_Group = ?, Quantity_in_number = ?, Price = ?, How_to_use = ?, side_effects = ? WHERE id = ?";
    await pool.query(query, [
      Medicine_Name,
      MedicineID,
      Medicine_Group,
      Quantity_in_number,
      Price,
      How_to_use,
      side_effects,
    ]);

    res.json({ message: "Medicine updated successfully" });
  } catch (error) {
    console.error("Error updating medicine:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteMedicine(req, res) {
  // Implement logic to delete a medicine from the database
  const medicineId = req.params.id;

  try {
    // Delete the medicine from the database
    const query = "DELETE FROM new_medicine WHERE id = ?";
    await pool.query(query, [medicineId]);

    res.json({ message: "Medicine deleted successfully" });
  } catch (error) {
    console.error("Error deleting medicine:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function TopSellingMedicines(req, res) {
  try {
    const limit = req.query.limit || 5; // Default limit to 5 if not specified
    const topMedicines = await Medicine.TopSellingMedicines(limit);
    res.json(topMedicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching top selling medicines",
    });
  }
}

async function MedicineShortage(req, res) {
  try {
    const threshold = req.query.threshold || 20; // Default threshold to 10 if not specified
    const shortageMedicines = await Medicine.MedicineShortage(threshold);
    res.json(shortageMedicines);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching medicine shortage" });
  }
}

async function MedicineGroups(req, res) {
  try {
    const medicineGroups = await Medicine.MedicineGroups();
    res.json(medicineGroups);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching medicine groups" });
  }
}

module.exports = {
  AllMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  TopSellingMedicines,
  MedicineShortage,
  MedicineGroups,
};
