import { BlockMath } from 'react-katex';
import Card from '../components/Card.jsx';

const formulas = [
  ['One Sample Z-Test', 'z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}}'],
  ['Two Sample Z-Test', 'z = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\sigma_1^2/n_1 + \\sigma_2^2/n_2}}'],
  ['One Sample T-Test', 't = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}'],
  ['Two Sample T-Test', 't = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{s_1^2/n_1 + s_2^2/n_2}}'],
  ['Paired T-Test', 't = \\frac{\\bar{d}}{s_d / \\sqrt{n}}'],
  ['Two Proportion Z-Test', 'z = \\frac{\\hat{p}_1 - \\hat{p}_2}{\\sqrt{\\hat{p}(1-\\hat{p})(1/n_1 + 1/n_2)}}'],
  ['Chi-Square Test', '\\chi^2 = \\sum \\frac{(O_i - E_i)^2}{E_i}'],
  ['ANOVA', 'F = \\frac{MS_{between}}{MS_{within}}']
];

export default function FormulaReferencePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-5 text-3xl font-semibold">Formula Reference</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {formulas.map(([name, formula]) => (
          <Card key={name}>
            <h2 className="font-semibold">{name}</h2>
            <div className="mt-3 overflow-x-auto rounded-md bg-slate-50 p-3 dark:bg-slate-950">
              <BlockMath math={formula} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
