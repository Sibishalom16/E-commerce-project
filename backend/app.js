const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middleware/error");
const orders = require("./controller/order");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Configure CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-commerce-project-plum-nine.vercel.app",
    ],
    credentials: true,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

// Serve static files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(
  "/products",
  express.static(path.join(__dirname, "products"))
);

// Import Routes
const userRoutes = require("./controller/user");
const productRoutes = require("./controller/product");

// Route Handling
app.use("/api/v2/product", productRoutes);
app.use("/api/v2/user", userRoutes);
app.use("/api/v2/orders", orders);

// Error Handling Middleware
app.use(ErrorHandler);

module.exports = app;