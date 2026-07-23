import api from './api';

export const codeforcesAPI = {
    // Get all problems with optional filters
    getProblems: async (filters = {}) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== '') params.append(key, value);
        });
        const response = await api.get(`/codeforces?${params}`);
        return response.data;
    },

    // Get a single problem by ID
    getProblemById: async (id) => {
        const response = await api.get(`/codeforces/${id}`);
        return response.data;
    },

    // Create a new problem
    createProblem: async (problemData) => {
        const response = await api.post('/codeforces', problemData);
        return response.data;
    },

    // Update an existing problem
    updateProblem: async (id, updates) => {
        const response = await api.patch(`/codeforces/${id}`, updates);
        return response.data;
    },

    // Delete a problem
    deleteProblem: async (id) => {
        const response = await api.delete(`/codeforces/${id}`);
        return response.data;
    },

    // Get stats
    getStats: async () => {
        const response = await api.get('/codeforces/stats');
        return response.data;
    }
};

export default codeforcesAPI;
