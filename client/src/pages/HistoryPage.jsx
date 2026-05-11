import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../components/Card.jsx';
import ResultsPanel from '../components/ResultsPanel.jsx';
import { api } from '../utils/api.js';

export default function HistoryPage() {
  const [params] = useSearchParams();
  const [items, setItems] = useState([]);
  const [sharedItem, setSharedItem] = useState(null);
  const share = params.get('share');
  const resultRef = useRef(null);

  useEffect(() => {
    api.get('/api/history').then((response) => setItems(response.data.items)).catch(() => setItems([]));
  }, []);

  useEffect(() => {
    if (!share) return;
    api.get(`/api/history/${share}`).then((response) => setSharedItem(response.data.item)).catch(() => setSharedItem(null));
  }, [share]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-5 text-3xl font-semibold">Saved Calculations</h1>
      {sharedItem && (
        <div className="mb-5">
          <ResultsPanel result={sharedItem.result} resultRef={resultRef} shareId={sharedItem.shareId} />
        </div>
      )}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left dark:border-slate-800">
                <th className="py-3 pr-4">Test</th>
                <th className="py-3 pr-4">Decision</th>
                <th className="py-3 pr-4">Statistic</th>
                <th className="py-3 pr-4">p-value</th>
                <th className="py-3 pr-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-line last:border-0 dark:border-slate-800">
                  <td className="py-3 pr-4 font-semibold">{item.testName}</td>
                  <td className="py-3 pr-4">{item.result.decision}</td>
                  <td className="py-3 pr-4">{item.result.statistic}</td>
                  <td className="py-3 pr-4">{item.result.pValue}</td>
                  <td className="py-3 pr-4">{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {!items.length && (
                <tr>
                  <td className="py-6 text-muted dark:text-slate-400" colSpan="5">No saved calculations yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
