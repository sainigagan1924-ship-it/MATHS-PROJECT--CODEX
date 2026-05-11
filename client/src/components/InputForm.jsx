import { Info, RotateCcw, Wand2 } from 'lucide-react';
import Button from './Button.jsx';
import { fieldLabels, longFields } from '../data/examples.js';

export default function InputForm({ test, values, setValues, onExample, onReset }) {
  const setValue = (name, value) => setValues((current) => ({ ...current, [name]: value }));

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Significance Level</span>
          <select className="w-full rounded-md border border-line bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={values.alpha ?? 0.05} onChange={(event) => setValue('alpha', event.target.value)}>
            <option value="0.1">0.10</option>
            <option value="0.05">0.05</option>
            <option value="0.01">0.01</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Alternative Hypothesis</span>
          <select className="w-full rounded-md border border-line bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" value={values.tail ?? 'two'} onChange={(event) => setValue('tail', event.target.value)}>
            <option value="two">Two-tailed</option>
            <option value="left">Left-tailed</option>
            <option value="right">Right-tailed</option>
          </select>
        </label>
      </div>

      {test.category === 'T-Test' && (
        <div className="flex gap-2 rounded-md border border-sky-200 bg-sky-50 p-3 text-sm text-sky-900 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-100">
          <Info className="mt-0.5 shrink-0" size={16} />
          <span>Use a t-test when population standard deviation is unknown, observations are independent or paired as selected, and data are approximately normal or sample sizes are reasonably large.</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {test.fields.map((field) => {
          const isLong = longFields.includes(field);
          return (
            <label key={field} className={isLong ? 'sm:col-span-2' : ''}>
              <span className="mb-1 block text-sm font-medium">{fieldLabels[field] || field}</span>
              {isLong ? (
                <textarea
                  rows={field === 'observedMatrix' || field === 'groups' ? 4 : 3}
                  className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                  value={values[field] ?? ''}
                  onChange={(event) => setValue(field, event.target.value)}
                  placeholder={field === 'groups' ? 'Group 1 values on row 1\nGroup 2 values on row 2' : 'Separate values with commas, spaces, or new lines'}
                />
              ) : (
                <input
                  className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                  value={values[field] ?? ''}
                  onChange={(event) => setValue(field, event.target.value)}
                  inputMode="decimal"
                  placeholder="0"
                />
              )}
            </label>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={onExample}>
          <Wand2 size={16} /> Example Input
        </Button>
        <Button type="button" variant="secondary" onClick={onReset}>
          <RotateCcw size={16} /> Reset
        </Button>
      </div>
    </div>
  );
}
