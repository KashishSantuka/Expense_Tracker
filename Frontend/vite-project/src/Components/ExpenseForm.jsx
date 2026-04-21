import { useState } from "react";

const CATEGORIES = ["food", "travel", "entertainment", "health", "utilities", "other"];

function today() {
  return new Date().toISOString().slice(0, 10);
}

const ExpenseForm = ({ onAdd, submitting, status }) => {
  const [form, setForm] = useState({ amount: "", category: "food", date: today(), description: "" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    const amount = parseFloat(form.amount);
    onAdd({ ...form, amount });
    setForm((f) => ({ ...f, amount: "", description: "" }));
  };

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Add expense</p>
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8 shadow-sm">
        <div className="grid grid-cols-2 gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Amount (₹)</label>
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Category</label>
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Date</label>
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-xs text-gray-500">Description</label>
            <textarea
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 resize-y min-h-[60px]"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="What was this for?"
            />
          </div>

          <div className="col-span-2 flex items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              {submitting ? "Saving…" : "Add expense"}
            </button>
            <span className={`text-xs ${
              status.type === "err" ? "text-red-500" :
              status.type === "ok"  ? "text-emerald-600" :
              "text-gray-400"
            }`}>
              {status.msg}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;