import { getStatTable } from '../services/statTables.js';

export function getTable(req, res, next) {
  try {
    res.json(getStatTable(req.params.testId));
  } catch (error) {
    next(error);
  }
}
