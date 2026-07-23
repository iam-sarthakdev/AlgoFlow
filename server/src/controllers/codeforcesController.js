import CodeforcesProblem from '../models/CodeforcesProblem.js';

// Get all CF problems for the authenticated user
export const getProblems = async (req, res) => {
    try {
        const { topic, minDifficulty, maxDifficulty, search, isSolved, sort = 'createdAt', order = 'desc' } = req.query;
        const filter = { user_id: req.user.userId };

        if (topic) {
            filter.topics = topic;
        }

        if (minDifficulty || maxDifficulty) {
            filter.difficulty = {};
            if (minDifficulty) filter.difficulty.$gte = parseInt(minDifficulty);
            if (maxDifficulty) filter.difficulty.$lte = parseInt(maxDifficulty);
        }

        if (isSolved !== undefined && isSolved !== '') {
            filter.isSolved = isSolved === 'true';
        }

        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        const sortObj = {};
        sortObj[sort] = order === 'asc' ? 1 : -1;

        const problems = await CodeforcesProblem.find(filter).sort(sortObj);

        res.json({
            success: true,
            problems,
            total: problems.length
        });
    } catch (error) {
        console.error('Error fetching CF problems:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch problems', error: error.message });
    }
};

// Get a single CF problem by ID
export const getProblemById = async (req, res) => {
    try {
        const problem = await CodeforcesProblem.findOne({
            _id: req.params.id,
            user_id: req.user.userId
        });

        if (!problem) {
            return res.status(404).json({ success: false, message: 'Problem not found' });
        }

        res.json({ success: true, problem });
    } catch (error) {
        console.error('Error fetching CF problem:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch problem', error: error.message });
    }
};

// Create a new CF problem
export const createProblem = async (req, res) => {
    try {
        const { name, url, difficulty, topics, solution, notes } = req.body;

        if (!name || !url || !difficulty) {
            return res.status(400).json({ success: false, message: 'Name, URL, and difficulty are required' });
        }

        const problem = new CodeforcesProblem({
            user_id: req.user.userId,
            name,
            url,
            difficulty: parseInt(difficulty),
            topics: topics || [],
            solution: solution || '',
            notes: notes || ''
        });

        await problem.save();

        res.status(201).json({ success: true, problem });
    } catch (error) {
        console.error('Error creating CF problem:', error);
        res.status(500).json({ success: false, message: 'Failed to create problem', error: error.message });
    }
};

// Update a CF problem
export const updateProblem = async (req, res) => {
    try {
        const { name, url, difficulty, topics, solution, isSolved, notes } = req.body;

        const problem = await CodeforcesProblem.findOne({
            _id: req.params.id,
            user_id: req.user.userId
        });

        if (!problem) {
            return res.status(404).json({ success: false, message: 'Problem not found' });
        }

        if (name !== undefined) problem.name = name;
        if (url !== undefined) problem.url = url;
        if (difficulty !== undefined) problem.difficulty = parseInt(difficulty);
        if (topics !== undefined) problem.topics = topics;
        if (solution !== undefined) problem.solution = solution;
        if (isSolved !== undefined) problem.isSolved = isSolved;
        if (notes !== undefined) problem.notes = notes;

        await problem.save();

        res.json({ success: true, problem });
    } catch (error) {
        console.error('Error updating CF problem:', error);
        res.status(500).json({ success: false, message: 'Failed to update problem', error: error.message });
    }
};

// Delete a CF problem
export const deleteProblem = async (req, res) => {
    try {
        const result = await CodeforcesProblem.findOneAndDelete({
            _id: req.params.id,
            user_id: req.user.userId
        });

        if (!result) {
            return res.status(404).json({ success: false, message: 'Problem not found' });
        }

        res.json({ success: true, message: 'Problem deleted successfully' });
    } catch (error) {
        console.error('Error deleting CF problem:', error);
        res.status(500).json({ success: false, message: 'Failed to delete problem', error: error.message });
    }
};

// Get stats for the user's CF problems
export const getStats = async (req, res) => {
    try {
        const userId = req.user.userId;

        const [total, solved, topicStats, difficultyStats] = await Promise.all([
            CodeforcesProblem.countDocuments({ user_id: userId }),
            CodeforcesProblem.countDocuments({ user_id: userId, isSolved: true }),
            CodeforcesProblem.aggregate([
                { $match: { user_id: new (await import('mongoose')).default.Types.ObjectId(userId) } },
                { $unwind: '$topics' },
                { $group: { _id: '$topics', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]),
            CodeforcesProblem.aggregate([
                { $match: { user_id: new (await import('mongoose')).default.Types.ObjectId(userId) } },
                {
                    $bucket: {
                        groupBy: '$difficulty',
                        boundaries: [800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3500],
                        default: 'Other',
                        output: { count: { $sum: 1 } }
                    }
                }
            ])
        ]);

        res.json({
            success: true,
            stats: {
                total,
                solved,
                unsolved: total - solved,
                topicStats,
                difficultyStats
            }
        });
    } catch (error) {
        console.error('Error fetching CF stats:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch stats', error: error.message });
    }
};
