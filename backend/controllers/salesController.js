const Sale = require("../models/sale"); // Replace with your actual model path

exports.createSale = async (req, res) => {
  const { customerName, customerId, MedicineID, quantity, amount, date } =
    req.body;

  // Input validation
  if (
    !MedicineID ||
    !quantity ||
    !amount ||
    !customerId ||
    !customerName ||
    !date
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newSale = await Sale.createSale(
      customerName,
      customerId,
      MedicineID,
      quantity,
      amount,
      date
    );
    res
      .status(201)
      .json({ message: "Sale created successfully", saleId: newSale.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating sale" });
  }
};

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.getAllSales();
    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching sales" });
  }
};

exports.getSaleById = async (req, res) => {
  const saleId = req.params.id;

  try {
    const sale = await Sale.getSaleById(saleId);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.json(sale);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching sale details" });
  }
};

exports.updateSale = async (req, res) => {
  const saleId = req.params.id;
  const { customerName, customerId, MedicineID, quantity, amount, date } =
    req.body;

  // Input validation
  if (
    !MedicineID ||
    !quantity ||
    !amount ||
    !customerId ||
    !customerName ||
    !date
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await Sale.updateSale(saleId, medicineId, quantity, price, customerId);
    res.json({ message: "Sale updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating sale" });
  }
};

exports.deleteSale = async (req, res) => {
  const saleId = req.params.id;

  try {
    await Sale.deleteSale(saleId);
    res.json({ message: "Sale deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting sale" });
  }
};

exports.getTotalSalesPerDay = async (req, res) => {
  try {
    const startDate = req.query.startDate; // Assuming you pass startDate and endDate as query parameters
    const endDate = req.query.endDate;

    // Retrieve total sales per day within the specified date range
    const totalSalesPerDay = await Sale.getTotalSalesPerDay(startDate, endDate);

    // Send the total sales per day as JSON response
    res.json(totalSalesPerDay);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching total sales per day",
    });
  }
};

exports.getTotalOrdersPerDay = async (req, res) => {
  try {
    const startDate = req.query.startDate; // Assuming you pass startDate and endDate as query parameters
    const endDate = req.query.endDate;
    const totalOrdersPerDay = await Sale.getTotalOrdersPerDay(
      startDate,
      endDate
    );
    res.json(totalOrdersPerDay);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching total orders per day",
    });
  }
};

exports.getTotalProductsSold = async (req, res) => {
  try {
    const startDate = req.query.startDate; // Assuming you pass startDate and endDate as query parameters
    const endDate = req.query.endDate;
    const totalProductsSold = await Sale.getTotalProductsSold(
      startDate,
      endDate
    );
    res.json(totalProductsSold);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching total products sold per day",
    });
  }
};

exports.getTotalNewCustomersPerDay = async (req, res) => {
  try {
    const startDate = req.query.startDate; // Assuming you pass startDate and endDate as query parameters
    const endDate = req.query.endDate;
    const totalNewCustomersPerDay = await Sale.getTotalNewCustomersPerDay(
      startDate,
      endDate
    );
    res.json(totalNewCustomersPerDay);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching total new customers per day",
    });
  }
};

exports.TotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await Sale.TotalRevenue();
    res.json({ totalRevenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "An error occurred while calculating total revenue of the current month",
    });
  }
};
