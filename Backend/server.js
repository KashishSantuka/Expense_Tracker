import express from "express";
import cors from "cors";
import expenseRoute from "./src/routes/ExpenseRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());                                // ✅ add this
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/expenses", expenseRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});