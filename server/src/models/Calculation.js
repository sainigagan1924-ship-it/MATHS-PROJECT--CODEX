import mongoose from 'mongoose';

const CalculationSchema = new mongoose.Schema(
  {
    testId: { type: String, required: true, index: true },
    testName: { type: String, required: true },
    inputs: { type: mongoose.Schema.Types.Mixed, required: true },
    result: { type: mongoose.Schema.Types.Mixed, required: true },
    shareId: { type: String, required: true, unique: true, index: true }
  },
  { timestamps: true }
);

export default mongoose.model('Calculation', CalculationSchema);
