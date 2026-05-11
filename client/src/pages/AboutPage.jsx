import Card from '../components/Card.jsx';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Card>
        <h1 className="text-3xl font-semibold">About Statistics</h1>
        <div className="mt-4 space-y-4 text-muted dark:text-slate-300">
          <p>Inferential statistics helps estimate whether observed sample results are likely under a null hypothesis. This site focuses on the tests students most often use in introductory statistics.</p>
          <p>Z-tests are useful when population standard deviation is known or samples are large. T-tests handle unknown standard deviation. Chi-square tests work with categorical counts. ANOVA compares three or more group means.</p>
          <p>Every calculator shows the statistic, p-value, critical value, rejection region, formula, and a plain-language conclusion so the result can be checked from both manual and calculator perspectives.</p>
        </div>
      </Card>
    </div>
  );
}
