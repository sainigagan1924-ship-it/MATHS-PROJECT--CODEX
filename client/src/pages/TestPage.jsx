import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Card from '../components/Card.jsx';
import ComparePanel from '../components/ComparePanel.jsx';
import InputForm from '../components/InputForm.jsx';
import ResultsPanel from '../components/ResultsPanel.jsx';
import StickyCalculatePanel from '../components/StickyCalculatePanel.jsx';
import TableModal from '../components/TableModal.jsx';
import TestSelector from '../components/TestSelector.jsx';
import { exampleInputs } from '../data/examples.js';
import { api } from '../utils/api.js';

export default function TestPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const resultRef = useRef(null);
  const [tests, setTests] = useState([]);
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);
  const [previousResult, setPreviousResult] = useState(null);
  const [shareId, setShareId] = useState('');
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState(null);
  const [tableOpen, setTableOpen] = useState(false);

  useEffect(() => {
    api.get('/api/tests').then((response) => {
      setTests(response.data.tests);
      if (!response.data.tests.find((test) => test.id === testId)) navigate(`/test/${response.data.tests[0].id}`, { replace: true });
    });
  }, [navigate, testId]);

  useEffect(() => {
    setValues(exampleInputs[testId] || { alpha: 0.05, tail: 'two' });
    setResult(null);
  }, [testId]);

  useEffect(() => {
    if (!testId) return;
    api.get(`/api/tables/${testId}`).then((response) => {
      setTable(response.data);
      setTableOpen(true);
    }).catch(() => {});
  }, [testId]);

  const selectedTest = useMemo(() => tests.find((test) => test.id === testId), [tests, testId]);

  const calculate = async () => {
    if (!selectedTest) return;
    setLoading(true);
    try {
      const response = await api.post('/api/calculate', { testId, inputs: values });
      setPreviousResult(result);
      setResult(response.data.result);
      setShareId(response.data.shareId);
      toast.success('Calculation complete');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Please check your inputs');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedTest) {
    return <div className="mx-auto max-w-7xl px-4 py-8">Loading calculator...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="calculator-grid grid gap-5">
        <TestSelector tests={tests} selectedId={testId} />
        <div className="space-y-5">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">{selectedTest.category}</p>
            <h1 className="mt-1 text-3xl font-semibold">{selectedTest.name}</h1>
            <p className="mt-2 text-muted dark:text-slate-300">{selectedTest.description}</p>
          </Card>
          <Card>
            <h2 className="mb-4 text-xl font-semibold">Input Values</h2>
            <InputForm
              test={selectedTest}
              values={values}
              setValues={setValues}
              onExample={() => setValues(exampleInputs[testId])}
              onReset={() => setValues({ alpha: 0.05, tail: 'two' })}
            />
          </Card>
          <div className="lg:hidden">
            <StickyCalculatePanel selectedName={selectedTest.name} loading={loading} onCalculate={calculate} onTable={() => setTableOpen(true)} />
          </div>
          <ResultsPanel result={result} resultRef={resultRef} shareId={shareId} />
          <ComparePanel left={result} right={previousResult} />
        </div>
        <div className="hidden lg:block">
          <StickyCalculatePanel selectedName={selectedTest.name} loading={loading} onCalculate={calculate} onTable={() => setTableOpen(true)} />
        </div>
      </div>
      <TableModal open={tableOpen} onClose={() => setTableOpen(false)} table={table} />
    </div>
  );
}
