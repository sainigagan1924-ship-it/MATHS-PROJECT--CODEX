import crypto from 'crypto';
import mongoose from 'mongoose';
import Calculation from '../models/Calculation.js';
import { calculationSchema } from '../services/validation.js';
import { runCalculation } from '../services/statisticsService.js';
import { testsById } from '../services/testDefinitions.js';

export async function calculate(req, res, next) {
  try {
    const parsed = calculationSchema.safeParse(req.body);
    if (!parsed.success) {
      const error = new Error('Invalid calculation input');
      error.status = 400;
      error.details = parsed.error.flatten();
      throw error;
    }

    const { testId, inputs } = parsed.data;
    const result = runCalculation(testId, inputs);
    const testName = testsById[testId]?.name || testId;
    const shareId = crypto.randomBytes(8).toString('hex');

    const saved =
      mongoose.connection.readyState === 1
        ? await Calculation.create({ testId, testName, inputs, result, shareId })
        : { shareId };

    res.json({ testId, testName, inputs, result, shareId: saved.shareId });
  } catch (error) {
    next(error);
  }
}
