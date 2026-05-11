import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { api } from '../utils/api.js';
import Card from '../components/Card.jsx';

export default function HomePage() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    api.get('/api/tests').then((response) => setTests(response.data.tests)).catch(() => setTests([]));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <section className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Statistics Calculator</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Calculate statistical tests with formulas, steps, tables, and graphs.</h1>
        <p className="mt-3 max-w-2xl text-muted dark:text-slate-300">Choose a test, enter values, and get a complete result with manual calculation and library verification.</p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tests.map((test) => (
          <Link key={test.id} to={`/test/${test.id}`}>
            <Card className="h-full transition hover:-translate-y-0.5 hover:border-brand">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted dark:text-slate-400">{test.category}</p>
              <h2 className="mt-2 text-lg font-semibold">{test.name}</h2>
              <p className="mt-2 min-h-12 text-sm text-muted dark:text-slate-400">{test.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                Open calculator <ArrowRight size={15} />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
