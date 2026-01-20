import axios from 'axios';

// Use same base URL format as api.js
const baseUrl = import.meta.env.VITE_API_URL || 'https://algoflow-api.onrender.com';
const API_URL = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;

// Get auth header
const getAuthHeader = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

// Fetch company problems (seeded data)
export const fetchCompanyProblems = async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.difficulty) params.append('difficulty', filters.difficulty);
    if (filters.search) params.append('search', filters.search);
    if (filters.limit) params.append('limit', filters.limit);

    const queryString = params.toString();

    // If company is specified, fetch for that company. Otherwise fetch ALL problems.

    // Use generic endpoint but pass company as query param for robustness
    // Ideally we use the specific route, but this covers cases where filters might be mixed
    let url;
    if (filters.company) {
        // Force company param into query string even if using specific route
        if (!params.has('company')) params.append('company', filters.company);
        const qs = params.toString();
        url = `${API_URL}/company-problems/companies/${encodeURIComponent(filters.company)}/problems${qs ? `?${qs}` : ''}`;
    } else {
        url = `${API_URL}/company-problems/problems${queryString ? `?${queryString}` : ''}`;
    }

    const response = await axios.get(url);
    return response.data;
};

// Fetch all companies
export const fetchAllCompanies = async () => {
    const response = await axios.get(`${API_URL}/company-problems/companies`);
    return response.data;
};

// Fetch company-wise statistics
export const fetchCompanyStatistics = async () => {
    const response = await axios.get(`${API_URL}/company-problems/statistics`);
    return response.data;
};

export default {
    fetchCompanyProblems,
    fetchAllCompanies,
    fetchCompanyStatistics
};
