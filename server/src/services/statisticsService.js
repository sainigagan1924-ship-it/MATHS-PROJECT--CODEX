import jStatPkg from 'jstat';
import {
  badInput,
  buildCurve,
  conclusion,
  criticalNormal,
  criticalT,
  mean,
  normalPValue,
  parseNumberList,
  round,
  sampleStdDev,
  tPValue,
  toNumber
} from './mathUtils.js';

const { jStat } = jStatPkg;

export function runCalculation(testId, rawInputs) {
  const inputs = normalizeOptions(rawInputs);
  switch (testId) {
    case 'hypothesis-1':
    case 'one-sample-z':
      return oneSampleZ(inputs);
    case 'hypothesis-2':
    case 'one-sample-t':
      return oneSampleT(inputs);
    case 'hypothesis-3':
      return twoProportionZ(inputs);
    case 'two-sample-z':
      return twoSampleZ(inputs);
    case 'two-sample-t':
      return twoSampleT(inputs);
    case 'paired-t':
      return pairedT(inputs);
    case 'chi-square':
      return chiSquare(inputs);
    case 'anova':
      return anova(inputs);
    default:
      throw badInput('Unsupported statistical test');
  }
}

function normalizeOptions(inputs) {
  return {
    ...inputs,
    alpha: inputs.alpha === undefined ? 0.05 : Number(inputs.alpha),
    tail: inputs.tail || 'two'
  };
}

function baseResult({ statisticName, statistic, pValue, alpha, criticalValues, distribution, df, df2, formula, steps, context, libraryMethod }) {
  const reject = pValue <= alpha;
  return {
    statisticName,
    statistic: round(statistic),
    pValue: round(pValue),
    alpha,
    criticalValues: criticalValues.map((value) => (Math.abs(value) === Infinity ? value : round(value))),
    decision: reject ? 'Reject H0' : 'Fail to reject H0',
    region: describeRegion(criticalValues),
    formula,
    manualMethod: steps,
    libraryMethod,
    interpretation: conclusion(round(pValue), alpha, context),
    graph: {
      distribution,
      statistic: round(statistic),
      criticalValues: criticalValues.map((value) => (Math.abs(value) === Infinity ? value : round(value))),
      points: buildCurve(distribution, statistic, criticalValues, df, df2)
    }
  };
}

function oneSampleZ(inputs) {
  const xbar = toNumber(inputs.sampleMean, 'Sample mean');
  const mu = toNumber(inputs.populationMean, 'Population mean');
  const sigma = toNumber(inputs.populationStdDev, 'Population standard deviation');
  const n = toNumber(inputs.sampleSize, 'Sample size');
  if (sigma <= 0 || n <= 1) throw badInput('Standard deviation must be positive and sample size must be greater than 1');
  const se = sigma / Math.sqrt(n);
  const z = (xbar - mu) / se;
  const pValue = normalPValue(z, inputs.tail);
  const criticalValues = criticalNormal(inputs.alpha, inputs.tail);
  return baseResult({
    statisticName: 'z',
    statistic: z,
    pValue,
    alpha: inputs.alpha,
    criticalValues,
    distribution: 'normal',
    formula: 'z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}}',
    steps: [
      `Standard error = ${sigma} / sqrt(${n}) = ${round(se)}`,
      `z = (${xbar} - ${mu}) / ${round(se)} = ${round(z)}`,
      `p-value from the standard normal distribution = ${round(pValue)}`
    ],
    context: 'The z-test compares the observed sample mean with the hypothesized population mean using the known population standard deviation.',
    libraryMethod: `jStat normal CDF used for p-value; inverse normal used for critical value.`
  });
}

function twoSampleZ(inputs) {
  const mean1 = toNumber(inputs.mean1, 'Mean 1');
  const mean2 = toNumber(inputs.mean2, 'Mean 2');
  const sd1 = toNumber(inputs.stdDev1, 'Standard deviation 1');
  const sd2 = toNumber(inputs.stdDev2, 'Standard deviation 2');
  const n1 = toNumber(inputs.sampleSize1, 'Sample size 1');
  const n2 = toNumber(inputs.sampleSize2, 'Sample size 2');
  if (sd1 <= 0 || sd2 <= 0 || n1 <= 1 || n2 <= 1) throw badInput('Standard deviations and sample sizes must be positive');
  const se = Math.sqrt(sd1 ** 2 / n1 + sd2 ** 2 / n2);
  const z = (mean1 - mean2) / se;
  const pValue = normalPValue(z, inputs.tail);
  const criticalValues = criticalNormal(inputs.alpha, inputs.tail);
  return baseResult({
    statisticName: 'z',
    statistic: z,
    pValue,
    alpha: inputs.alpha,
    criticalValues,
    distribution: 'normal',
    formula: 'z = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\sigma_1^2/n_1 + \\sigma_2^2/n_2}}',
    steps: [
      `Standard error = sqrt(${sd1}^2/${n1} + ${sd2}^2/${n2}) = ${round(se)}`,
      `z = (${mean1} - ${mean2}) / ${round(se)} = ${round(z)}`,
      `p-value from the standard normal distribution = ${round(pValue)}`
    ],
    context: 'The two-sample z-test compares two independent means using known or large-sample standard deviations.',
    libraryMethod: 'jStat normal distribution functions supplied the p-value and critical value.'
  });
}

function oneSampleT(inputs) {
  const xbar = toNumber(inputs.sampleMean, 'Sample mean');
  const mu = toNumber(inputs.populationMean, 'Population mean');
  const s = toNumber(inputs.sampleStdDev, 'Sample standard deviation');
  const n = toNumber(inputs.sampleSize, 'Sample size');
  if (s <= 0 || n <= 1) throw badInput('Sample standard deviation must be positive and sample size must be greater than 1');
  const df = n - 1;
  const se = s / Math.sqrt(n);
  const t = (xbar - mu) / se;
  const pValue = tPValue(t, df, inputs.tail);
  const criticalValues = criticalT(inputs.alpha, df, inputs.tail);
  return baseResult({
    statisticName: 't',
    statistic: t,
    pValue,
    alpha: inputs.alpha,
    criticalValues,
    distribution: 't',
    df,
    formula: 't = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}',
    steps: [
      `Degrees of freedom = ${n} - 1 = ${df}`,
      `Standard error = ${s} / sqrt(${n}) = ${round(se)}`,
      `t = (${xbar} - ${mu}) / ${round(se)} = ${round(t)}`
    ],
    context: 'Use a t-test when population standard deviation is unknown and the data are approximately normal or the sample is large.',
    libraryMethod: 'jStat Student t CDF and inverse t functions supplied p-value and critical value.'
  });
}

function twoSampleT(inputs) {
  const mean1 = toNumber(inputs.mean1, 'Mean 1');
  const mean2 = toNumber(inputs.mean2, 'Mean 2');
  const s1 = toNumber(inputs.stdDev1, 'Standard deviation 1');
  const s2 = toNumber(inputs.stdDev2, 'Standard deviation 2');
  const n1 = toNumber(inputs.sampleSize1, 'Sample size 1');
  const n2 = toNumber(inputs.sampleSize2, 'Sample size 2');
  if (s1 <= 0 || s2 <= 0 || n1 <= 1 || n2 <= 1) throw badInput('Standard deviations and sample sizes must be positive');
  const se = Math.sqrt(s1 ** 2 / n1 + s2 ** 2 / n2);
  const df = (s1 ** 2 / n1 + s2 ** 2 / n2) ** 2 / ((s1 ** 2 / n1) ** 2 / (n1 - 1) + (s2 ** 2 / n2) ** 2 / (n2 - 1));
  const t = (mean1 - mean2) / se;
  const pValue = tPValue(t, df, inputs.tail);
  const criticalValues = criticalT(inputs.alpha, df, inputs.tail);
  return baseResult({
    statisticName: 't',
    statistic: t,
    pValue,
    alpha: inputs.alpha,
    criticalValues,
    distribution: 't',
    df,
    formula: 't = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{s_1^2/n_1 + s_2^2/n_2}}',
    steps: [
      `Welch df = ${round(df)}`,
      `Standard error = ${round(se)}`,
      `t = (${mean1} - ${mean2}) / ${round(se)} = ${round(t)}`
    ],
    context: 'Welch two-sample t-test is appropriate for independent samples and does not require equal variances.',
    libraryMethod: 'jStat Student t functions supplied p-value and critical value using Welch degrees of freedom.'
  });
}

function pairedT(inputs) {
  const before = parseNumberList(inputs.beforeValues, 'Before values');
  const after = parseNumberList(inputs.afterValues, 'After values');
  if (before.length !== after.length) throw badInput('Before and after lists must have the same length');
  const diffs = before.map((value, index) => after[index] - value);
  const avgDiff = mean(diffs);
  const sdDiff = sampleStdDev(diffs);
  const n = diffs.length;
  const df = n - 1;
  const se = sdDiff / Math.sqrt(n);
  const t = avgDiff / se;
  const pValue = tPValue(t, df, inputs.tail);
  const criticalValues = criticalT(inputs.alpha, df, inputs.tail);
  return baseResult({
    statisticName: 't',
    statistic: t,
    pValue,
    alpha: inputs.alpha,
    criticalValues,
    distribution: 't',
    df,
    formula: 't = \\frac{\\bar{d}}{s_d / \\sqrt{n}}',
    steps: [
      `Differences = ${diffs.map((item) => round(item)).join(', ')}`,
      `Mean difference = ${round(avgDiff)}, SD of differences = ${round(sdDiff)}`,
      `t = ${round(avgDiff)} / (${round(sdDiff)} / sqrt(${n})) = ${round(t)}`
    ],
    context: 'The paired t-test checks whether the mean difference between matched observations is significantly different from zero.',
    libraryMethod: 'jStat Student t functions supplied p-value and critical value.'
  });
}

function twoProportionZ(inputs) {
  const x1 = toNumber(inputs.successes1, 'Successes 1');
  const n1 = toNumber(inputs.sampleSize1, 'Sample size 1');
  const x2 = toNumber(inputs.successes2, 'Successes 2');
  const n2 = toNumber(inputs.sampleSize2, 'Sample size 2');
  if (x1 < 0 || x2 < 0 || n1 <= 0 || n2 <= 0 || x1 > n1 || x2 > n2) throw badInput('Successes must be between 0 and sample size');
  const p1 = x1 / n1;
  const p2 = x2 / n2;
  const pooled = (x1 + x2) / (n1 + n2);
  const se = Math.sqrt(pooled * (1 - pooled) * (1 / n1 + 1 / n2));
  const z = (p1 - p2) / se;
  const pValue = normalPValue(z, inputs.tail);
  const criticalValues = criticalNormal(inputs.alpha, inputs.tail);
  return baseResult({
    statisticName: 'z',
    statistic: z,
    pValue,
    alpha: inputs.alpha,
    criticalValues,
    distribution: 'normal',
    formula: 'z = \\frac{\\hat{p}_1 - \\hat{p}_2}{\\sqrt{\\hat{p}(1-\\hat{p})(1/n_1 + 1/n_2)}}',
    steps: [
      `p1 = ${x1}/${n1} = ${round(p1)}, p2 = ${x2}/${n2} = ${round(p2)}`,
      `Pooled p = (${x1} + ${x2}) / (${n1} + ${n2}) = ${round(pooled)}`,
      `z = (${round(p1)} - ${round(p2)}) / ${round(se)} = ${round(z)}`
    ],
    context: 'The two-proportion z-test compares two independent proportions using a pooled estimate under H0.',
    libraryMethod: 'jStat normal distribution functions supplied p-value and critical value.'
  });
}

function chiSquare(inputs) {
  const matrix = parseMatrix(inputs.observedMatrix);
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rowTotals = matrix.map((row) => row.reduce((sum, value) => sum + value, 0));
  const colTotals = matrix[0].map((_, colIndex) => matrix.reduce((sum, row) => sum + row[colIndex], 0));
  const grandTotal = rowTotals.reduce((sum, value) => sum + value, 0);
  const expected = matrix.map((row, rowIndex) => row.map((_, colIndex) => (rowTotals[rowIndex] * colTotals[colIndex]) / grandTotal));
  const statistic = matrix.flatMap((row, rowIndex) => row.map((observed, colIndex) => (observed - expected[rowIndex][colIndex]) ** 2 / expected[rowIndex][colIndex])).reduce((sum, value) => sum + value, 0);
  const df = (rows - 1) * (cols - 1);
  const pValue = 1 - jStat.chisquare.cdf(statistic, df);
  const critical = jStat.chisquare.inv(1 - inputs.alpha, df);
  return baseResult({
    statisticName: 'chi-square',
    statistic,
    pValue,
    alpha: inputs.alpha,
    criticalValues: [critical, Infinity],
    distribution: 'chi-square',
    df,
    formula: '\\chi^2 = \\sum \\frac{(O_i - E_i)^2}{E_i}',
    steps: [
      `Row totals = ${rowTotals.map(round).join(', ')}`,
      `Column totals = ${colTotals.map(round).join(', ')}, Grand total = ${round(grandTotal)}`,
      `df = (${rows} - 1)(${cols} - 1) = ${df}`,
      `Sum of (O - E)^2 / E = ${round(statistic)}`
    ],
    context: 'The chi-square test checks whether observed categorical counts differ from expected counts under independence.',
    libraryMethod: 'jStat chi-square CDF and inverse chi-square functions supplied p-value and critical value.'
  });
}

function anova(inputs) {
  const groups = parseGroups(inputs.groups);
  const k = groups.length;
  const all = groups.flat();
  const grandMean = mean(all);
  const ssBetween = groups.reduce((sum, group) => sum + group.length * (mean(group) - grandMean) ** 2, 0);
  const ssWithin = groups.reduce((sum, group) => sum + group.reduce((inner, value) => inner + (value - mean(group)) ** 2, 0), 0);
  const dfBetween = k - 1;
  const dfWithin = all.length - k;
  const msBetween = ssBetween / dfBetween;
  const msWithin = ssWithin / dfWithin;
  const f = msBetween / msWithin;
  const pValue = 1 - jStat.centralF.cdf(f, dfBetween, dfWithin);
  const critical = jStat.centralF.inv(1 - inputs.alpha, dfBetween, dfWithin);
  return baseResult({
    statisticName: 'F',
    statistic: f,
    pValue,
    alpha: inputs.alpha,
    criticalValues: [critical, Infinity],
    distribution: 'f',
    df: dfBetween,
    df2: dfWithin,
    formula: 'F = \\frac{MS_{between}}{MS_{within}}',
    steps: [
      `Grand mean = ${round(grandMean)}`,
      `SS between = ${round(ssBetween)}, SS within = ${round(ssWithin)}`,
      `MS between = ${round(msBetween)}, MS within = ${round(msWithin)}`,
      `F = ${round(msBetween)} / ${round(msWithin)} = ${round(f)}`
    ],
    context: 'One-way ANOVA tests whether at least one group mean differs from the others.',
    libraryMethod: 'jStat F distribution CDF and inverse F functions supplied p-value and critical value.'
  });
}

function parseMatrix(value) {
  const rows = Array.isArray(value) ? value : String(value).trim().split(/\n+/).map((row) => row.split(/[\s,;]+/));
  const matrix = rows.map((row, index) => row.map((item) => toNumber(item, `Row ${index + 1}`)));
  if (matrix.length < 2 || matrix[0].length < 2) throw badInput('Observed matrix must have at least 2 rows and 2 columns');
  if (!matrix.every((row) => row.length === matrix[0].length)) throw badInput('Every matrix row must have the same number of columns');
  if (matrix.flat().some((value) => value < 0)) throw badInput('Observed values cannot be negative');
  return matrix;
}

function parseGroups(value) {
  const groups = Array.isArray(value)
    ? value.map((group) => (Array.isArray(group) ? group : parseNumberList(group, 'Group')))
    : String(value)
        .trim()
        .split(/\n+/)
        .map((row) => parseNumberList(row, 'Group'));
  if (groups.length < 3) throw badInput('ANOVA requires at least three groups');
  return groups;
}

function describeRegion([left, right]) {
  if (left === -Infinity) return `Reject H0 when statistic <= ${round(right)}`;
  if (right === Infinity) return `Reject H0 when statistic >= ${round(left)}`;
  return `Reject H0 when statistic <= ${round(left)} or >= ${round(right)}`;
}
