import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { Calculator, Moon, Sun } from 'lucide-react';
import HomePage from './pages/HomePage.jsx';
import TestPage from './pages/TestPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import FormulaReferencePage from './pages/FormulaReferencePage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="min-h-screen bg-slate-50 text-ink dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-brand text-white">
              <Calculator size={19} />
            </span>
            StatCalc
          </Link>
          <nav className="hidden items-center gap-1 text-sm md:flex">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/test/one-sample-z">Tests</NavItem>
            <NavItem to="/formulas">Formulas</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/history">History</NavItem>
          </nav>
          <button
            className="grid h-10 w-10 place-items-center rounded-md border border-line bg-white text-ink dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            onClick={() => setDark((value) => !value)}
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test/:testId" element={<TestPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/formulas" element={<FormulaReferencePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
    </div>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-md px-3 py-2 ${isActive ? 'bg-teal-50 text-brand dark:bg-teal-950 dark:text-teal-200' : 'text-muted hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'}`
      }
    >
      {children}
    </NavLink>
  );
}
