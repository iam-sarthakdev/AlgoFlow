import express from 'express';
import { getLists, getListByName, addProblemToList, seedDefaultLists } from '../controllers/problemListController.js';

const router = express.Router();

router.get('/', getLists);
router.post('/seed', seedDefaultLists);
router.get('/:name', getListByName);
router.post('/:listId/sections/:sectionTitle/problems', addProblemToList);

export default router;
