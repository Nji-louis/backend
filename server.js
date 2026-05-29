require("dotenv").config();

const express = require("express");
const cors = require("cors");


const app = express();

const path = require("path");

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});