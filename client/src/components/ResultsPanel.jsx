import { Copy, Download, Link as LinkIcon } from 'lucide-react';
import { BlockMath } from 'react-katex';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Button from './Button.jsx';
import Card from './Card.jsx';
import DistributionChart from './DistributionChart.jsx';

export default function ResultsPanel({ result, resultRef, shareId }) {
  if (!result) {
    return (
      <Card>
        <h2 className="text-xl font-semibold">Result</h2>
        <p className="mt-2 text-sm text-muted dark:text-slate-400">Enter values and calculate to see the complete statistical output.</p>
      </Card>
    );
  }

  const copyResult = async () => {
    await navigator.clipboard.writeText(`${result.decision}\nStatistic: ${result.statistic}\np-value: ${result.pValue}\n${result.interpretation}`);
    toast.success('Result copied');
  };

  const share = async () => {
    const url = `${window.location.origin}/history?share=${shareId}`;
    await navigator.clipboard.writeText(url);
    toast.success('Share link copied');
  };

  const exportPdf = async () => {
    const canvas = await html2canvas(resultRef.current, { scale: 2 });
    const img = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = 190;
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(img, 'PNG', 10, 10, width, Math.min(height, 275));
    pdf.save('statistics-result.pdf');
  };

  return (
    <Card className="space-y-5" ref={resultRef}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted dark:text-slate-400">Final Answer</p>
          <h2 className="mt-1 text-2xl font-semibold">{result.decision}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={copyResult}>
            <Copy size={16} /> Copy
          </Button>
          <Button variant="secondary" onClick={share}>
            <LinkIcon size={16} /> Share
          </Button>
          <Button variant="secondary" onClick={exportPdf}>
            <Download size={16} /> PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label={`${result.statisticName} statistic`} value={result.statistic} />
        <Metric label="p-value" value={result.pValue} />
        <Metric label="Critical value" value={result.criticalValues.join(', ')} />
        <Metric label="Region" value={result.region} />
      </div>

      <div>
        <h3 className="text-lg font-semibold">Formula Used</h3>
        <div className="mt-2 overflow-x-auto rounded-md bg-slate-50 p-3 dark:bg-slate-950">
          <BlockMath math={result.formula} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Graph Visualization</h3>
        <DistributionChart graph={result.graph} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold">Manual Calculation Method</h3>
          <ol className="mt-2 space-y-2 text-sm text-muted dark:text-slate-300">
            {result.manualMethod.map((step, index) => (
              <li key={step} className="rounded-md bg-slate-50 p-3 dark:bg-slate-950">
                {index + 1}. {step}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Statistical Library Method</h3>
          <p className="mt-2 rounded-md bg-slate-50 p-3 text-sm text-muted dark:bg-slate-950 dark:text-slate-300">{result.libraryMethod}</p>
          <h3 className="mt-4 text-lg font-semibold">Interpretation</h3>
          <p className="mt-2 rounded-md bg-teal-50 p-3 text-sm text-teal-950 dark:bg-teal-950 dark:text-teal-100">{result.interpretation}</p>
        </div>
      </div>
    </Card>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-md border border-line p-3 dark:border-slate-800">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted dark:text-slate-400">{label}</p>
      <p className="mt-1 break-words text-lg font-semibold">{String(value)}</p>
    </div>
  );
}
