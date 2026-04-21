import { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";         // ✅ import
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import axios from "axios";

const ExpenseTracker = () => {
  const [expenses, setExpenses]     = useState([]);
  const [filterCat, setFilterCat]   = useState("all");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus]         = useState({ msg: "", type: "" });
  const [loading, setLoading]       = useState(false);

  const flash = (msg, type) => {
    setStatus({ msg, type });
    setTimeout(() => setStatus({ msg: "", type: "" }), 2500);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("https://expense-tracker-backend-4af3.onrender.com/api/expenses");
        setExpenses(data.data);
      } catch (err) {
        flash(err.response?.data?.error || "Failed to load expenses.", "err");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const addExpense = useCallback(async ({ amount, category, date, description }) => {
    if (submitting) return;

    if (!amount || isNaN(amount) || amount <= 0) {
      return flash("Enter a valid amount.", "err");
    }
    if (!date) {
      return flash("Please pick a date.", "err");
    }

    setSubmitting(true);
    flash("Saving…", "");

    const idempotencyKey = uuidv4(); // ✅ generated once per submit click

    try {
      const { data } = await axios.post("https://expense-tracker-backend-4af3.onrender.com/api/expenses", {
        amount: parseFloat(amount),
        category,
        date,
        description: description.trim(),
        idempotencyKey, // ✅ sent to backend
      });

      setExpenses((prev) => [...prev, data.data]);
      flash("Expense added.", "ok");
    } catch (err) {
      flash(err.response?.data?.error || "Something went wrong.", "err");
    } finally {
      setSubmitting(false);
    }
  }, [submitting]);

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {loading ? (
        <p className="text-center text-sm text-gray-400 py-10">Loading expenses...</p>
      ) : (
        <>
          <ExpenseForm onAdd={addExpense} submitting={submitting} status={status} />
          <ExpenseTable
            expenses={expenses}
            onDelete={deleteExpense}
            filterCat={filterCat}
            setFilterCat={setFilterCat}
          />
        </>
      )}
    </div>
  );
};

export default ExpenseTracker;