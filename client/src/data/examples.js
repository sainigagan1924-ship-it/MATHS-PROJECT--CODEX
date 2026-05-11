export const exampleInputs = {
  'hypothesis-1': { sampleMean: 72, populationMean: 70, populationStdDev: 8, sampleSize: 64, alpha: 0.05, tail: 'two' },
  'hypothesis-2': { sampleMean: 54.2, populationMean: 50, sampleStdDev: 9.5, sampleSize: 25, alpha: 0.05, tail: 'right' },
  'hypothesis-3': { successes1: 56, sampleSize1: 120, successes2: 42, sampleSize2: 110, alpha: 0.05, tail: 'two' },
  'one-sample-z': { sampleMean: 82, populationMean: 78, populationStdDev: 12, sampleSize: 49, alpha: 0.05, tail: 'two' },
  'two-sample-z': { mean1: 31.5, mean2: 28.9, stdDev1: 5.2, stdDev2: 4.8, sampleSize1: 60, sampleSize2: 55, alpha: 0.05, tail: 'two' },
  'one-sample-t': { sampleMean: 18.4, populationMean: 20, sampleStdDev: 3.1, sampleSize: 16, alpha: 0.05, tail: 'left' },
  'two-sample-t': { mean1: 74.6, mean2: 70.2, stdDev1: 8.5, stdDev2: 7.9, sampleSize1: 24, sampleSize2: 22, alpha: 0.05, tail: 'two' },
  'paired-t': { beforeValues: '72, 69, 75, 71, 68, 73', afterValues: '75, 72, 78, 74, 70, 76', alpha: 0.05, tail: 'right' },
  'chi-square': { observedMatrix: '64, 56\n42, 28', alpha: 0.05, tail: 'right' },
  anova: { groups: '12, 15, 14, 10\n18, 20, 17, 19\n11, 13, 12, 14', alpha: 0.05, tail: 'right' }
};

export const fieldLabels = {
  sampleMean: 'Sample Mean',
  populationMean: 'Population Mean',
  populationStdDev: 'Population Std. Dev.',
  sampleStdDev: 'Sample Std. Dev.',
  sampleSize: 'Sample Size',
  mean1: 'Mean 1',
  mean2: 'Mean 2',
  stdDev1: 'Std. Dev. 1',
  stdDev2: 'Std. Dev. 2',
  sampleSize1: 'Sample Size 1',
  sampleSize2: 'Sample Size 2',
  successes1: 'Successes 1',
  successes2: 'Successes 2',
  beforeValues: 'Before Values',
  afterValues: 'After Values',
  observedMatrix: 'Observed Matrix',
  groups: 'Groups'
};

export const longFields = ['beforeValues', 'afterValues', 'observedMatrix', 'groups'];
