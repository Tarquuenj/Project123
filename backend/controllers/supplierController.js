// controllers/supplierController.js

const Supplier = require("../models/Supplier");

exports.getSuppliersList = async (req, res) => {
  try {
    const suppliersList = await Supplier.getSuppliersList();
    res.json(suppliersList);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching suppliers list" });
  }
};

exports.createSupplier = async (req, res) => {
  try {
    const { name, username, company, email, number, address } = req.body;
    const supplierId = await Supplier.createSupplier(
      name,
      username,
      company,
      email,
      number,
      address
    );
    res
      .status(201)
      .json({ message: "Supplier created successfully", supplierId });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating supplier" });
  }
};
