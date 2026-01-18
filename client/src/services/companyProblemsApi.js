import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Get auth header
const getAuthHeader = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

// Fetch company problems (seeded data)
export const fetchCompanyProblems = async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.company) params.append('company', filters.company);
    if (filters.difficulty) params.append('difficulty', filters.difficulty);
    if (filters.search) params.append('search', filters.search);

    const queryString = params.toString();
    const url = filters.company
        ? `${API_URL}/company-problems/companies/${filters.company}/problems${queryString ? `?${queryString}` : ''}`
        : `${API_URL}/company-problems/companies`;

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
