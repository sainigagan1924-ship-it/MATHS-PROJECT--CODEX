import { Router } from 'express';
import { calculate } from '../controllers/calculationController.js';

const router = Router();

router.post('/', calculate);

export default router;
