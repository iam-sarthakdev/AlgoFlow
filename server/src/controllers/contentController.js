import GitHubService from '../services/githubService.js';

// Hardcoded target repo for public content
const TARGET_USERNAME = 'AkashSingh3031';
const TARGET_REPO = 'The-Complete-FAANG-Preparation';

const githubService = new GitHubService(TARGET_USERNAME, TARGET_REPO);

/**
 * Get Fundamentals Content (Technical Subjects)
 * Path: Technical Subjects
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to read local markdown
const readLocalFile = async (subPath) => {
    try {
        // Adjust path to point to server/src/data/...
        const filePath = path.join(__dirname, '../data', subPath);
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    } catch (error) {
        console.error(`Error reading local file ${subPath}:`, error);
        return null; // Return null if not found
    }
};

/**
 * Get Fundamentals Content (Technical Subjects)
 * Path: Local Files
 */
export const getFundamentalsContent = async (req, res, next) => {
    try {
        const { topic } = req.params;

        // Target directory for the topic
        const topicDir = path.join(__dirname, '../data/fundamentals', topic);

        try {
            // Check if directory exists
            await fs.access(topicDir);

            // Read all files in the directory
            const files = await fs.readdir(topicDir);

            // Filter and map to response format
            const data = files
                .filter(file => file.endsWith('.md'))
                .map(file => ({
                    name: file.replace(/-/g, ' ').replace('.md', ''), // Pretty name
                    type: 'file',
                    path: `LOCAL:fundamentals/${topic}/${file}`,
                    url: null
                }))
                // Sort by filename (assuming 01-, 02- prefix)
                .sort((a, b) => a.path.localeCompare(b.path));

            if (data.length === 0) {
                return res.json({ success: true, data: [] });
            }

            res.json({ success: true, data });

        } catch (err) {
            // Directory doesn't exist or error reading
            if (err.code === 'ENOENT') {
                // Return empty if not found
                return res.json({ success: true, data: [] });
            }
            throw err;
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Get Behavioral Content
 * Path: Local Master Guide
 */
export const getBehavioralContent = async (req, res, next) => {
    try {
        const data = [{
            name: 'Behavioral Master Guide.md',
            type: 'file',
            path: 'LOCAL:behavioral/master-guide.md',
            url: null
        }];
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

/**
 * Get DSA Sheets Content
 * Path: GFGSC-RTU/All-DSA-Sheets
 */
export const getDSAContent = async (req, res, next) => {
    console.log("Received request for DSA Content");
    try {
        // Switch to new repo
        if (githubService.repo !== 'All-DSA-Sheets') {
            githubService.username = 'GFGSC-RTU';
            githubService.repo = 'All-DSA-Sheets';
            githubService.baseUrl = `https://api.github.com/repos/GFGSC-RTU/All-DSA-Sheets`;
        }

        const { path: queryPath } = req.query;
        let path = queryPath || ''; // Use query path or root

        // Strip DSA: prefix if present
        if (path.startsWith('DSA:')) {
            path = path.replace('DSA:', '');
        }

        console.log("Fetching path:", path);

        const contents = await githubService.getDirectoryContents(path);
        console.log("Fetched contents count:", contents ? contents.length : 0);

        const data = contents.map(item => ({
            name: item.name,
            type: item.type,
            path: item.path,
            sha: item.sha,
            url: item.html_url
        }));

        res.json({ success: true, data });
    } catch (error) {
        console.error("Error in getDSAContent:", error);
        next(error);
    }
};

/**
 * Get System Design Content (LLD/HLD)
 */
export const getSystemDesignContent = async (req, res, next) => {
    try {
        const { type } = req.query;

        if (type === 'lld') {
            const data = [{
                name: 'LLD Master Guide.md',
                type: 'file',
                path: 'LOCAL:system-design/lld/master-guide.md',
                url: null
            }];
            return res.json({ success: true, data });
        }

        // HLD (local mocked)
        res.json({ success: true, data: [] });

    } catch (error) {
        next(error);
    }
};

export const getFileContent = async (req, res, next) => {
    try {
        const { path } = req.query;
        if (!path) {
            return res.status(400).json({ success: false, message: 'Path is required' });
        }

        console.log("Fetching file content for:", path);

        // Handle DSA files (Force Repo Switch)
        if (path.startsWith('DSA:')) {
            const actualPath = path.replace('DSA:', '');
            console.log("Switching to DSA Repo for:", actualPath);
            githubService.username = 'GFGSC-RTU';
            githubService.repo = 'All-DSA-Sheets';
            githubService.baseUrl = `https://api.github.com/repos/GFGSC-RTU/All-DSA-Sheets`;

            const content = await githubService.getFileContent(actualPath);
            if (content === null || content === undefined) {
                return res.status(404).json({ success: false, message: 'Content not found' });
            }
            return res.json({ success: true, content });
        }

        // Handle LOCAL files
        if (path.startsWith('LOCAL:')) {
            const actualPath = path.replace('LOCAL:', '');
            const content = await readLocalFile(actualPath);
            if (!content) return res.status(404).json({ success: false, message: 'Local content not found' });
            return res.json({ success: true, content });
        }

        const content = await githubService.getFileContent(path);

        if (content === null || content === undefined) {
            return res.status(404).json({ success: false, message: 'Content not found' });
        }

        res.json({ success: true, content });
    } catch (error) {
        console.error("Error in getFileContent:", error);
        next(error);
    }
};
