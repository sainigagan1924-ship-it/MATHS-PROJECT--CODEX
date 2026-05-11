import Calculation from '../models/Calculation.js';
import mongoose from 'mongoose';

export async function getHistory(_req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ items: [] });
    }
    const items = await Calculation.find().sort({ createdAt: -1 }).limit(30).lean();
    res.json({ items });
  } catch (error) {
    next(error);
  }
}

export async function getHistoryItem(req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      const error = new Error('Database is not connected');
      error.status = 503;
      throw error;
    }
    const item = await Calculation.findOne({ shareId: req.params.id }).lean();
    if (!item) {
      const error = new Error('Calculation not found');
      error.status = 404;
      throw error;
    }
    res.json({ item });
  } catch (error) {
    next(error);
  }
}
