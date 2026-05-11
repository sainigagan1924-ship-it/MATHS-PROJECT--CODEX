export const tests = [
  {
    id: 'hypothesis-1',
    name: 'Hypothesis Testing - 1',
    category: 'Hypothesis Testing',
    description: 'One-population mean hypothesis test with a known population standard deviation.',
    table: 'z',
    fields: ['sampleMean', 'populationMean', 'populationStdDev', 'sampleSize']
  },
  {
    id: 'hypothesis-2',
    name: 'Hypothesis Testing - 2',
    category: 'Hypothesis Testing',
    description: 'One-population mean hypothesis test with an unknown population standard deviation.',
    table: 't',
    fields: ['sampleMean', 'populationMean', 'sampleStdDev', 'sampleSize']
  },
  {
    id: 'hypothesis-3',
    name: 'Hypothesis Testing - 3',
    category: 'Hypothesis Testing',
    description: 'Two-proportion hypothesis test for comparing population proportions.',
    table: 'z',
    fields: ['successes1', 'sampleSize1', 'successes2', 'sampleSize2']
  },
  {
    id: 'one-sample-z',
    name: 'One Sample Z-Test',
    category: 'Z-Test',
    description: 'Compare a sample mean to a population mean when sigma is known.',
    table: 'z',
    fields: ['sampleMean', 'populationMean', 'populationStdDev', 'sampleSize']
  },
  {
    id: 'two-sample-z',
    name: 'Two Sample Z-Test',
    category: 'Z-Test',
    description: 'Compare two independent sample means when population sigmas are known.',
    table: 'z',
    fields: ['mean1', 'mean2', 'stdDev1', 'stdDev2', 'sampleSize1', 'sampleSize2']
  },
  {
    id: 'one-sample-t',
    name: 'One Sample T-Test',
    category: 'T-Test',
    description: 'Compare a sample mean to a population mean when sigma is unknown.',
    table: 't',
    fields: ['sampleMean', 'populationMean', 'sampleStdDev', 'sampleSize']
  },
  {
    id: 'two-sample-t',
    name: 'Two Sample T-Test',
    category: 'T-Test',
    description: 'Compare two independent sample means with sample standard deviations.',
    table: 't',
    fields: ['mean1', 'mean2', 'stdDev1', 'stdDev2', 'sampleSize1', 'sampleSize2']
  },
  {
    id: 'paired-t',
    name: 'Paired T-Test',
    category: 'T-Test',
    description: 'Test the mean of paired differences.',
    table: 't',
    fields: ['beforeValues', 'afterValues']
  },
  {
    id: 'chi-square',
    name: 'Chi-Square Test',
    category: 'Chi-Square',
    description: 'Test association in a contingency table.',
    table: 'chi-square',
    fields: ['observedMatrix']
  },
  {
    id: 'anova',
    name: 'ANOVA',
    category: 'ANOVA',
    description: 'One-way ANOVA for comparing three or more group means.',
    table: 'f',
    fields: ['groups']
  }
];

export const testsById = Object.fromEntries(tests.map((test) => [test.id, test]));
