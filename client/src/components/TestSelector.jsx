import { Link, useNavigate } from 'react-router-dom';

export default function TestSelector({ tests, selectedId }) {
  const navigate = useNavigate();
  const categories = [...new Set(tests.map((test) => test.category))];

  return (
    <aside className="space-y-4">
      <select
        className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        value={selectedId || ''}
        onChange={(event) => navigate(`/test/${event.target.value}`)}
      >
        {tests.map((test) => (
          <option key={test.id} value={test.id}>
            {test.name}
          </option>
        ))}
      </select>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted dark:text-slate-400">{category}</p>
            <div className="space-y-2">
              {tests
                .filter((test) => test.category === category)
                .map((test) => (
                  <Link
                    key={test.id}
                    to={`/test/${test.id}`}
                    className={`block rounded-md border px-3 py-3 text-sm transition ${
                      selectedId === test.id
                        ? 'border-brand bg-teal-50 text-brand dark:bg-teal-950 dark:text-teal-100'
                        : 'border-line bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-600'
                    }`}
                  >
                    <span className="font-semibold">{test.name}</span>
                    <span className="mt-1 block text-xs text-muted dark:text-slate-400">{test.description}</span>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
