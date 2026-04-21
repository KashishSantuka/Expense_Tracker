import { v4 as uuidv4 } from "uuid";

const store = new Map();

export const save = ({ amount, category, date, description, idempotencyKey }) => {
  const expense = {
    id: uuidv4(),
    amount,
    category,
    date,
    description,
    idempotencyKey,  // ✅ store it for duplicate check
    createdAt: new Date(),
  };

  store.set(expense.id, expense);
  return expense;
};

export const findAll = () => {
  return Array.from(store.values());
};