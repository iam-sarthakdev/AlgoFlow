import express from 'express';
import { getProgress, toggleTopic } from '../controllers/systemDesignController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate); // All routes require auth

router.get('/progress', getProgress);
router.post('/progress', toggleTopic);

export default router;
