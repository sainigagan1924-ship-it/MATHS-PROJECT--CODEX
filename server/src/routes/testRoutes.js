import { Router } from 'express';
import { listTests } from '../controllers/testController.js';

const router = Router();

router.get('/', listTests);

export default router;
