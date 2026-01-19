import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Convert problem title to LeetCode slug format
 * Example: "Two Sum" -> "two-sum"
 */
export const titleToSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Fetch problem details from backend proxy
 * @param {string} titleSlug - The problem slug (e.g., "two-sum")
 * @returns {Promise} Problem data including title, content, difficulty, examples
 */
export const fetchLeetCodeProblem = async (titleSlug) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/leetcode/problem/${titleSlug}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.data && response.data.success && response.data.problem) {
            return response.data.problem;
        } else {
            throw new Error('Problem not found');
        }
    } catch (error) {
        console.error('LeetCode API error:', error);
        throw new Error(error.response?.data?.error || 'Failed to fetch problem from LeetCode');
    }
};

/**
 * Parse HTML content and convert to clean markdown
 * @param {string} htmlContent - HTML content from LeetCode
 * @returns {string} Clean markdown text
 */
export const parseHTMLContent = (htmlContent) => {
    if (!htmlContent) return '';

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // Extract text and format
    let markdown = tempDiv.textContent || tempDiv.innerText || '';

    // Clean up extra whitespace
    markdown = markdown.replace(/\n\n\n+/g, '\n\n').trim();

    return markdown;
};

/**
 * Format problem statement for the Notes tab
 * @param {object} problemData - Problem data from LeetCode API
 * @returns {string} Formatted markdown for Notes
 */
export const formatProblemStatement = (problemData) => {
    if (!problemData) return '';

    const { title, difficulty, content, exampleTestcases, hints, topicTags } = problemData;

    // Parse HTML content to clean text
    const cleanContent = parseHTMLContent(content);

    // Build formatted markdown
    let markdown = `# ${title}\n\n`;
    markdown += `**Difficulty:** ${difficulty}\n\n`;

    if (topicTags && topicTags.length > 0) {
        markdown += `**Topics:** ${topicTags.map(t => t.name).join(', ')}\n\n`;
    }

    markdown += `---\n\n`;
    markdown += `## Problem Description\n\n`;
    markdown += `${cleanContent}\n\n`;

    if (exampleTestcases) {
        markdown += `---\n\n`;
        markdown += `## Example Test Cases\n\n`;
        markdown += `\`\`\`\n${exampleTestcases}\n\`\`\`\n\n`;
    }

    if (hints && hints.length > 0) {
        markdown += `---\n\n`;
        markdown += `## Hints\n\n`;
        hints.forEach((hint, index) => {
            markdown += `${index + 1}. ${hint}\n`;
        });
        markdown += `\n`;
    }

    markdown += `---\n\n`;
    markdown += `## My Notes\n\n`;
    markdown += `_Add your approach, thoughts, and solution notes here..._\n\n`;

    return markdown;
};

/**
 * Auto-populate notes for a problem based on its URL or title
 * @param {string} urlOrTitle - LeetCode URL or problem title
 * @returns {Promise<string>} Formatted notes markdown
 */
export const autoPopulateNotes = async (urlOrTitle) => {
    try {
        let titleSlug;

        // Check if it's a URL
        if (urlOrTitle.includes('leetcode.com')) {
            // Extract slug from URL
            // Example: https://leetcode.com/problems/two-sum/
            const match = urlOrTitle.match(/\/problems\/([^\/]+)/);
            if (match && match[1]) {
                titleSlug = match[1];
            } else {
                throw new Error('Invalid LeetCode URL');
            }
        } else {
            // Convert title to slug
            titleSlug = titleToSlug(urlOrTitle);
        }

        // Fetch problem data
        const problemData = await fetchLeetCodeProblem(titleSlug);

        // Format and return
        return formatProblemStatement(problemData);
    } catch (error) {
        console.error('Auto-populate failed:', error);
        throw error;
    }
};

export default {
    titleToSlug,
    fetchLeetCodeProblem,
    formatProblemStatement,
    autoPopulateNotes,
    parseHTMLContent
};
