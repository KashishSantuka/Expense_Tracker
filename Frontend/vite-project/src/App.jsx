import './App.css'
import ExpenseTracker from './Components/ExpenseTracker'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Navbar ── */}
      <header className="border-b border-gray-200 bg-white px-10 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-none">Expense Tracker</h1>
          <p className="text-md text-gray-400 mt-0.5">Personal expense tracker</p>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="px-8 py-8">
        <ExpenseTracker />
      </main>

    </div>
  )
}

export default App