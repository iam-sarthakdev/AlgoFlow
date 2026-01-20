import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getLists = async () => {
    const response = await axios.get(`${API_URL}/lists`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

const getListByName = async (name) => {
    const response = await axios.get(`${API_URL}/lists/${encodeURIComponent(name)}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

const addProblemToList = async (listId, sectionTitle, problemData) => {
    const response = await axios.post(`${API_URL}/lists/${listId}/sections/${sectionTitle}/problems`, problemData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

const listService = {
    getLists,
    getListByName,
    addProblemToList
};

export default listService;
