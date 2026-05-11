import { z } from 'zod';

const numberOrString = z.union([z.number(), z.string(), z.array(z.any()), z.record(z.any())]);

export const calculationSchema = z.object({
  testId: z.string().min(2),
  inputs: z.record(numberOrString)
});
