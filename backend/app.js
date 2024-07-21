// server.js
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const salesRoutes = require("./routes/salesRoutes");
const supplierRouter = require("./routes/supplierRouter");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/medicine", medicineRoutes);
app.use("/sales", salesRoutes);
app.use("/supplier", supplierRouter);
// app.use("/chat", chatRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
