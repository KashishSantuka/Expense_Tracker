import { createExpenseService, getAllExpensesService } from "../services/ExpenseServices.js";

export const createExpense = async (req, res) => {
  try {
    const { amount, category, date, description, idempotencyKey } = req.body; // ✅ added idempotencyKey
    const { expense, created } = await createExpenseService({ amount, category, date, description, idempotencyKey });
    return res.status(created ? 201 : 200).json({ success: true, data: expense }); // ✅ 201 new, 200 retry
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const { category } = req.query;
    const expenses = await getAllExpensesService({ category });
    return res.status(200).json({ success: true, data: expenses });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};