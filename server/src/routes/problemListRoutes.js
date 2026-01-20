import express from 'express';
import { getLists, getListByName, addProblemToList, seedDefaultLists, toggleProblemCompletion } from '../controllers/problemListController.js';

const router = express.Router();

router.get('/', getLists);
router.post('/seed', seedDefaultLists);
router.get('/:name', getListByName);
router.post('/:listId/sections/:sectionTitle/problems', addProblemToList);
router.patch('/:listId/sections/:sectionId/problems/:problemId/toggle', toggleProblemCompletion);

export default router;
