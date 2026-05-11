import { Calculator, Table2 } from 'lucide-react';
import Button from './Button.jsx';

export default function StickyCalculatePanel({ onCalculate, onTable, loading, selectedName }) {
  return (
    <div className="sticky top-20 space-y-4 rounded-lg border border-line bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted dark:text-slate-400">Selected Test</p>
        <h2 className="mt-1 text-lg font-semibold">{selectedName}</h2>
      </div>
      <Button className="w-full" onClick={onCalculate} disabled={loading}>
        <Calculator size={17} /> {loading ? 'Calculating...' : 'Calculate'}
      </Button>
      <Button className="w-full" variant="secondary" onClick={onTable}>
        <Table2 size={17} /> Statistical Table
      </Button>
      <div className="rounded-md bg-slate-50 p-3 text-sm text-muted dark:bg-slate-950 dark:text-slate-400">
        Results include manual steps, formula, critical value, p-value, graph, and conclusion.
      </div>
    </div>
  );
}
