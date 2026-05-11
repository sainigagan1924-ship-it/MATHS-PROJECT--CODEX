import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import calculationRoutes from './routes/calculationRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import testRoutes from './routes/testRoutes.js';
import tableRoutes from './routes/tableRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'statistics-calculator-api' });
});

app.use('/api/tests', testRoutes);
app.use('/api/calculate', calculationRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/tables', tableRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
