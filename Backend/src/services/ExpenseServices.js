import { save, findAll } from "../models/ExpenseModel.js";
import { isValid, isFuture } from "date-fns";

export const createExpenseService = async ({ amount, category, date, description, idempotencyKey }) => {
  try {
    // Validate amount
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      throw new Error("Amount must be a positive number.");
    }

    // Validate date
    if (!date) {
      throw new Error("Date is required.");
    }
    const parsed = new Date(date);
    if (!isValid(parsed)) {
      throw new Error("Invalid date format.");
    }
    if (isFuture(parsed)) {
      throw new Error("Date cannot be in the future.");
    }

    // ✅ idempotency check — if same key exists, return existing expense
    if (idempotencyKey) {
      const existing = findAll().find((e) => e.idempotencyKey === idempotencyKey);
      if (existing) return { expense: existing, created: false };
    }

    const expense = save({ amount: Number(amount), category, date, description, idempotencyKey });
    return { expense, created: true };
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getAllExpensesService = async ({ category } = {}) => {
  try {
    let list = findAll();

    if (category) {
      list = list.filter(
        (e) => e.category.toLowerCase() === category.toLowerCase()
      );
    }

    return list;
  } catch (err) {
    throw new Error(err.message);
  }
};