import { Router } from 'express';
import { getHistory, getHistoryItem } from '../controllers/historyController.js';

const router = Router();

router.get('/', getHistory);
router.get('/:id', getHistoryItem);

export default router;
