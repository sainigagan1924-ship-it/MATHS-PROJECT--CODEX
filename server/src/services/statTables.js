import jStatPkg from 'jstat';

const { jStat } = jStatPkg;

const alphas = [0.1, 0.05, 0.025, 0.01, 0.005];

export function getStatTable(testId) {
  if (testId.includes('z') || testId.includes('hypothesis-1') || testId.includes('hypothesis-3')) return zTable();
  if (testId.includes('t') || testId.includes('hypothesis-2')) return tTable();
  if (testId.includes('chi')) return chiSquareTable();
  if (testId.includes('anova')) return fTable();
  return zTable();
}

function zTable() {
  return {
    title: 'Standard Normal Z Table',
    columns: ['z', '0.00', '0.01', '0.02', '0.03', '0.04', '0.05', '0.06', '0.07', '0.08', '0.09'],
    highlightColumns: ['0.95', '0.975', '0.99'],
    rows: Array.from({ length: 35 }, (_, index) => {
      const base = -3.4 + index * 0.2;
      return [base.toFixed(1), ...Array.from({ length: 10 }, (_v, col) => jStat.normal.cdf(base + col / 100, 0, 1).toFixed(4))];
    })
  };
}

function tTable() {
  const dfs = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 60, 100];
  return {
    title: 'T Critical Values Table',
    columns: ['df', ...alphas.map((alpha) => `alpha ${alpha}`)],
    highlightColumns: ['alpha 0.05', 'alpha 0.01'],
    rows: dfs.map((df) => [df, ...alphas.map((alpha) => jStat.studentt.inv(1 - alpha / 2, df).toFixed(4))])
  };
}

function chiSquareTable() {
  const dfs = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30];
  return {
    title: 'Chi-Square Critical Values Table',
    columns: ['df', ...alphas.map((alpha) => `alpha ${alpha}`)],
    highlightColumns: ['alpha 0.05', 'alpha 0.01'],
    rows: dfs.map((df) => [df, ...alphas.map((alpha) => jStat.chisquare.inv(1 - alpha, df).toFixed(4))])
  };
}

function fTable() {
  const df1 = [1, 2, 3, 4, 5, 10];
  const df2 = [5, 10, 15, 20, 30, 60];
  return {
    title: 'F Critical Values Table (alpha 0.05)',
    columns: ['df2 \\ df1', ...df1],
    highlightColumns: ['1', '2', '3'],
    rows: df2.map((denominator) => [denominator, ...df1.map((numerator) => jStat.centralF.inv(0.95, numerator, denominator).toFixed(4))])
  };
}
