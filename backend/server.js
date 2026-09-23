// config
if (process.env.DB_URL !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

const app = require("./app");
const connectDatabase = require("./db/database");
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-commerce-project-plum-nine.vercel.app",
    ],
    credentials: true,
  })
);

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server for handling uncaught exception");
});

// connect db
connectDatabase();

// create server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection.");

  server.close(() => {
    process.exit(1);
  });
});