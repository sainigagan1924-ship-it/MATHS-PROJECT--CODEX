import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import Button from './Button.jsx';

export default function TableModal({ open, onClose, table }) {
  const [query, setQuery] = useState('');
  const rows = useMemo(() => {
    if (!table?.rows) return [];
    const needle = query.toLowerCase();
    return table.rows.filter((row) => row.join(' ').toLowerCase().includes(needle));
  }, [query, table]);

  if (!open || !table) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3">
      <div className="max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-soft dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3 border-b border-line p-4 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-semibold">{table.title}</h2>
            <p className="text-sm text-muted dark:text-slate-400">Common confidence levels are highlighted where available.</p>
          </div>
          <Button variant="secondary" onClick={onClose} aria-label="Close table">
            <X size={16} />
          </Button>
        </div>
        <div className="border-b border-line p-4 dark:border-slate-800">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-2.5 text-muted" size={17} />
            <input
              className="w-full rounded-md border border-line bg-white py-2 pl-9 pr-3 text-sm dark:border-slate-700 dark:bg-slate-950"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search table"
            />
          </label>
        </div>
        <div className="max-h-[58vh] overflow-auto p-4">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                {table.columns.map((column) => (
                  <th
                    key={column}
                    className={`sticky top-0 border border-line bg-slate-100 px-3 py-2 text-left dark:border-slate-800 dark:bg-slate-950 ${
                      table.highlightColumns?.includes(String(column)) ? 'text-brand' : ''
                    }`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row[0]}-${index}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`} className="border border-line px-3 py-2 dark:border-slate-800">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
