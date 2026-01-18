import GitHubService from '../services/githubService.js';
import { Problem } from '../models/index.js';

export const importFromGitHub = async (req, res) => {
    try {
        const { username, repo } = req.body;

        if (!username || !repo) {
            return res.status(400).json({
                success: false,
                message: 'Username and repository name are required'
            });
        }

        console.log(`Starting GitHub import for ${username}/${repo}`);

        const githubService = new GitHubService(username, repo);

        // Fetch problems with better error handling
        let problems;
        try {
            problems = await githubService.getAllProblemsWithCode();
        } catch (fetchError) {
            console.error('GitHub fetch error:', fetchError);
            return res.status(400).json({
                success: false,
                message: `Failed to fetch from GitHub: ${fetchError.message}`,
                error: fetchError.message
            });
        }

        if (!problems || problems.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No problems found in the repository. Make sure the repository has LeetCode solutions.'
            });
        }

        console.log(`Found ${problems.length} problems, saving to database...`);

        // Save problems to database for this user
        const savedProblems = [];
        const errors = [];

        for (const problem of problems) {
            try {
                const newProblem = await Problem.create({
                    user_id: req.user.userId,
                    problem_name: problem.title,
                    difficulty: problem.difficulty || 'Medium', // Use detected difficulty
                    topics: problem.language ? [problem.language] : [],
                    companies: ['GitHub Import'],
                    url: problem.url,
                    code: problem.code,
                    notes: `Imported from ${username}/${repo}`,
                    status: 'no_reminder'
                });
                savedProblems.push(newProblem);
            } catch (saveError) {
                console.error(`Error saving problem ${problem.title}:`, saveError);
                errors.push({ title: problem.title, error: saveError.message });
            }
        }

        console.log(`Successfully saved ${savedProblems.length} problems`);

        res.json({
            success: true,
            message: `Successfully imported ${savedProblems.length} problems${errors.length > 0 ? ` (${errors.length} failed)` : ''}`,
            count: savedProblems.length,
            errors: errors.length > 0 ? errors : undefined
        });
    } catch (error) {
        console.error('GitHub import error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to import from GitHub',
            error: error.message
        });
    }
};

