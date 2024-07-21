// salesRouter.js

const express = require("express");
const router = express.Router();
const saleController = require("../controllers/salesController");

// Route to create a new sale
router.post("/create-sale", saleController.createSale);

// Route to retrieve total sales per day
router.get("/total-sales-per-day", saleController.getTotalSalesPerDay);

// Route to retrieve all sales
router.get("/all-sales", saleController.getAllSales);

// Route to retrieve a sale by ID
router.get("/:id", saleController.getSaleById);

// Route to update a sale by ID
router.put("/:id", saleController.updateSale);

// Route to delete a sale by ID
router.delete("/:id", saleController.deleteSale);
router.get("/total-orders-per-day", saleController.getTotalOrdersPerDay);
router.get("/total-products-sold-per-day", saleController.getTotalProductsSold);
router.get(
  "/total-new-customers-per-day",
  saleController.getTotalNewCustomersPerDay
);
router.get("/total-revenue", saleController.TotalRevenue);

module.exports = router;
