import { Router } from 'express';
import { getTable } from '../controllers/tableController.js';

const router = Router();

router.get('/:testId', getTable);

export default router;
