import express from 'express';
import { seedCompanyProblems } from '../scripts/seedCompanyProblemsLocal.js';
import CompanyProblem from '../models/CompanyProblem.js';

const router = express.Router();

// Admin seed endpoint - protected by secret key
router.post('/seed-companies', async (req, res) => {
    const adminKey = req.headers['x-admin-key'];
    const expectedKey = process.env.ADMIN_SEED_KEY;

    if (!expectedKey || adminKey !== expectedKey) {
        return res.status(403).json({ error: 'Unauthorized. Set ADMIN_SEED_KEY env var and provide x-admin-key header.' });
    }

    try {
        const countBefore = await CompanyProblem.countDocuments();
        console.log(`🌱 Admin triggered seeding. Current count: ${countBefore}`);

        await seedCompanyProblems();

        const countAfter = await CompanyProblem.countDocuments();
        console.log(`✅ Seeding completed. New count: ${countAfter}`);

        res.json({
            success: true,
            message: 'Seeding completed successfully',
            before: countBefore,
            after: countAfter
        });
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        res.status(500).json({ error: error.message });
    }
});

// Check seed status (public - just returns count)
router.get('/seed-status', async (req, res) => {
    try {
        const count = await CompanyProblem.countDocuments();
        res.json({
            count,
            needsSeeding: count < 500,
            message: count < 500 ? 'Database needs seeding' : 'Database is properly seeded'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
