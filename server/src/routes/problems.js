import express from 'express';
import {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem
} from '../controllers/problemController.js';
import { markAsRevised } from '../controllers/revisionController.js';
import { importFromGitHub } from '../controllers/githubImportController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// GitHub import route
router.post('/import/github', importFromGitHub);

// Problem CRUD routes
router.post('/', createProblem);
router.get('/', getAllProblems);
router.get('/:id', getProblemById);
router.patch('/:id', updateProblem);
router.delete('/:id', deleteProblem);

// Revision route
router.post('/:id/revisions', markAsRevised);

export default router;
