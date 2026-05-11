import Card from './Card.jsx';

export default function ComparePanel({ left, right }) {
  if (!left && !right) return null;
  return (
    <Card>
      <h2 className="text-xl font-semibold">Compare Tests</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <CompareColumn title="Current Result" result={left} />
        <CompareColumn title="Previous Result" result={right} />
      </div>
    </Card>
  );
}

function CompareColumn({ title, result }) {
  return (
    <div className="rounded-md border border-line p-4 dark:border-slate-800">
      <h3 className="font-semibold">{title}</h3>
      {result ? (
        <dl className="mt-3 space-y-2 text-sm">
          <Row label="Decision" value={result.decision} />
          <Row label="Statistic" value={result.statistic} />
          <Row label="p-value" value={result.pValue} />
          <Row label="Critical" value={result.criticalValues?.join(', ')} />
        </dl>
      ) : (
        <p className="mt-3 text-sm text-muted dark:text-slate-400">Calculate another test to compare.</p>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted dark:text-slate-400">{label}</dt>
      <dd className="text-right font-semibold">{String(value)}</dd>
    </div>
  );
}
