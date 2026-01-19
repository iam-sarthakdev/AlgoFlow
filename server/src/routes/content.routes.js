import express from 'express';
import {
    getFundamentalsContent,
    getBehavioralContent,
    getDSAContent,
    getSystemDesignContent,
    getFileContent
} from '../controllers/contentController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Notes: We can choose to make these public or protected. 
// Since it fetches public GitHub data, it could be public, but usually it's behind auth.
router.use(authenticate);

router.get('/fundamentals/:topic?', getFundamentalsContent);
router.get('/behavioral', getBehavioralContent);
router.get('/dsa', getDSAContent);
router.get('/system-design', getSystemDesignContent);
router.get('/file', getFileContent);

export default router;
