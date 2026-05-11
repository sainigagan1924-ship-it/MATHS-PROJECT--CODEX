import jStatPkg from 'jstat';

const { jStat } = jStatPkg;

export function toNumber(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw badInput(`${name} must be a valid number`);
  }
  return number;
}

export function parseNumberList(value, name) {
  const list = Array.isArray(value)
    ? value
    : String(value)
        .split(/[\s,;]+/)
        .map((item) => item.trim())
        .filter(Boolean);
  const numbers = list.map((item) => toNumber(item, name));
  if (numbers.length < 2) {
    throw badInput(`${name} must include at least two values`);
  }
  return numbers;
}

export function mean(values) {
  return values.reduce((sum, item) => sum + item, 0) / values.length;
}

export function sampleVariance(values) {
  const avg = mean(values);
  return values.reduce((sum, item) => sum + (item - avg) ** 2, 0) / (values.length - 1);
}

export function sampleStdDev(values) {
  return Math.sqrt(sampleVariance(values));
}

export function round(value, digits = 5) {
  if (!Number.isFinite(value)) return value;
  return Number(value.toFixed(digits));
}

export function normalPValue(z, tail) {
  if (tail === 'left') return jStat.normal.cdf(z, 0, 1);
  if (tail === 'right') return 1 - jStat.normal.cdf(z, 0, 1);
  return 2 * (1 - jStat.normal.cdf(Math.abs(z), 0, 1));
}

export function tPValue(t, df, tail) {
  if (tail === 'left') return jStat.studentt.cdf(t, df);
  if (tail === 'right') return 1 - jStat.studentt.cdf(t, df);
  return 2 * (1 - jStat.studentt.cdf(Math.abs(t), df));
}

export function criticalNormal(alpha, tail) {
  if (tail === 'left') return [-Infinity, jStat.normal.inv(alpha, 0, 1)];
  if (tail === 'right') return [jStat.normal.inv(1 - alpha, 0, 1), Infinity];
  return [jStat.normal.inv(alpha / 2, 0, 1), jStat.normal.inv(1 - alpha / 2, 0, 1)];
}

export function criticalT(alpha, df, tail) {
  if (tail === 'left') return [-Infinity, jStat.studentt.inv(alpha, df)];
  if (tail === 'right') return [jStat.studentt.inv(1 - alpha, df), Infinity];
  return [jStat.studentt.inv(alpha / 2, df), jStat.studentt.inv(1 - alpha / 2, df)];
}

export function conclusion(pValue, alpha, context) {
  const decision = pValue <= alpha ? 'Reject the null hypothesis' : 'Fail to reject the null hypothesis';
  return `${decision}. At alpha = ${alpha}, the result ${pValue <= alpha ? 'is' : 'is not'} statistically significant. ${context}`;
}

export function buildCurve(distribution, statistic, criticalValues, df1, df2) {
  const points = [];
  const min = distribution === 'f' || distribution === 'chi-square' ? 0 : -4;
  const max = distribution === 'f' ? 6 : distribution === 'chi-square' ? 18 : 4;
  for (let i = 0; i <= 160; i += 1) {
    const x = min + ((max - min) * i) / 160;
    let y = 0;
    if (distribution === 'normal') y = jStat.normal.pdf(x, 0, 1);
    if (distribution === 't') y = jStat.studentt.pdf(x, df1);
    if (distribution === 'chi-square') y = jStat.chisquare.pdf(x, df1);
    if (distribution === 'f') y = jStat.centralF.pdf(x, df1, df2);
    points.push({
      x: round(x, 3),
      y: round(y, 5),
      region: isRejected(x, criticalValues) ? 'reject' : 'accept',
      isPValue: statistic >= 0 ? x >= statistic : x <= statistic
    });
  }
  return points;
}

function isRejected(x, criticalValues) {
  const [left, right] = criticalValues;
  if (left === -Infinity) return x <= right;
  if (right === Infinity) return x >= left;
  return x <= left || x >= right;
}

export function badInput(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}
