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

        const githubService = new GitHubService(username, repo);
        const problems = await githubService.getAllProblemsWithCode();

        // Save problems to database for this user
        const savedProblems = [];
        for (const problem of problems) {
            const newProblem = await Problem.create({
                user_id: req.user.userId,
                problem_name: problem.title,
                difficulty: 'Medium', // Default, can be enhanced
                topics: [problem.language],
                companies: ['GitHub Import'],
                url: problem.url,
                code: problem.code,
                notes: `Imported from ${username}/${repo}`,
                status: 'no_reminder'
            });
            savedProblems.push(newProblem);
        }

        res.json({
            success: true,
            message: `Successfully imported ${savedProblems.length} problems`,
            count: savedProblems.length
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
