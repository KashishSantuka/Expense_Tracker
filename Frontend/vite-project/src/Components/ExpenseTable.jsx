import { useState } from "react";

const CATEGORIES = ["food", "travel", "entertainment", "health", "utilities", "other"];

const BADGE = {
  food:          "bg-emerald-100 text-emerald-800",
  travel:        "bg-blue-100 text-blue-800",
  entertainment: "bg-purple-100 text-purple-800",
  health:        "bg-green-100 text-green-800",
  utilities:     "bg-amber-100 text-amber-800",
  other:         "bg-gray-100 text-gray-700",
};

function formatAmt(n) {
  return "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(s) {
  if (!s) return "—";
  const date = s.slice(0, 10);
  const [y, m, d] = date.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${d} ${months[parseInt(m) - 1]} ${y}`;
}

const ExpenseTable = ({ expenses, onDelete, filterCat, setFilterCat }) => {
  const [sortOrder, setSortOrder] = useState("desc"); // desc = newest first

  const toggleSort = () => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));

  const visible = expenses
    .filter((e) => filterCat === "all" || e.category === filterCat)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  const total = visible.reduce((s, e) => s + parseFloat(e.amount), 0);

  return (
    <div>
      {/* ── Controls ── */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Expenses</p>
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500">Category</label>
          <select
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Total ── */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-sm text-gray-400">Total</span>
        <span className="text-2xl font-semibold text-gray-900">{formatAmt(total)}</span>
        {visible.length > 0 && (
          <span className="text-sm text-gray-400">
            {visible.length} item{visible.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* ── Table ── */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {visible.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-10">
            No expenses yet. Add one above.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">

                {/* ── Clickable Date header ── */}
                <th className="text-left px-4 py-3">
                  <button
                    onClick={toggleSort}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Date
                    <span>{sortOrder === "desc" ? "↓" : "↑"}</span>
                  </button>
                </th>

                {["Category", "Description", "Amount", ""].map((h) => (
                  <th
                    key={h}
                    className={`text-xs font-semibold uppercase tracking-wide text-gray-400 px-4 py-3 ${h === "Amount" ? "text-right" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((e, i) => (
                <tr
                  key={e.id}
                  className={i !== visible.length - 1 ? "border-b border-gray-50" : ""}
                >
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(e.date)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${BADGE[e.category]}`}>
                      {e.category.charAt(0).toUpperCase() + e.category.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {e.description || <span className="opacity-30">—</span>}
                  </td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums text-gray-900">
                    {formatAmt(e.amount)}
                  </td>
                  <td className="px-4 py-3">
                    {/* <button
                      onClick={() => onDelete(e.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors text-lg leading-none"
                      title="Delete"
                    >
                      ×
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExpenseTable;