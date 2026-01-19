import express from 'express';
import {
    getAllCompanies,
    getAllCompanyProblems,
    getCompanyProblems,
    getStatistics
} from '../controllers/companyProblemsController.js';

const router = express.Router();

// Public routes - no authentication required for viewing seeded data
router.get('/companies', getAllCompanies);
router.get('/problems', getAllCompanyProblems);
router.get('/companies/:company/problems', getCompanyProblems);
router.get('/statistics', getStatistics);

export default router;
