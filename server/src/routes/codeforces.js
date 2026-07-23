import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
    getProblems,
    getProblemById,
    createProblem,
    updateProblem,
    deleteProblem,
    getStats,
    reorderProblems
} from '../controllers/codeforcesController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Stats
router.get('/stats', getStats);

// Reorder
router.patch('/reorder', reorderProblems);

// CRUD
router.get('/', getProblems);
router.get('/:id', getProblemById);
router.post('/', createProblem);
router.patch('/:id', updateProblem);
router.delete('/:id', deleteProblem);

export default router;
