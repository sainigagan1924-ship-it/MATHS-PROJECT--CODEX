import { tests } from '../services/testDefinitions.js';

export function listTests(_req, res) {
  res.json({ tests });
}
