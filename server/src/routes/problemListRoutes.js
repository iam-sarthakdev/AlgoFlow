import express from 'express';
import { getLists, getListByName, addProblemToList, seedDefaultLists, seedFamousLists, toggleProblemCompletion, createSection, deleteSection, deleteProblem, reorderSection, reorderProblem, incrementProblemRevision } from '../controllers/problemListController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getLists);
router.post('/seed', authenticate, seedDefaultLists);
router.post('/seed-famous', authenticate, seedFamousLists);
router.get('/:name', authenticate, getListByName);
router.post('/:listId/sections/:sectionTitle/problems', addProblemToList);
router.post('/:listId/sections', createSection);
router.delete('/:listId/sections/:sectionId', deleteSection);
router.delete('/:listId/sections/:sectionId/problems/:problemId', deleteProblem);
router.patch('/:listId/sections/:sectionId/problems/:problemId/toggle', toggleProblemCompletion);
router.patch('/:listId/sections/:sectionId/problems/:problemId/revisit', incrementProblemRevision);
router.put('/:listId/reorder-section', reorderSection);
router.put('/:listId/sections/:sectionId/reorder-problem', reorderProblem);

export default router;
