import { Router } from "express";
import { createExpense, getAllExpenses } from "../controller/ExpenseController.js";

const router = Router();

router.post("/", createExpense);
router.get("/", getAllExpenses);

export default router;