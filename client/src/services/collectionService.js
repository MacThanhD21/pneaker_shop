import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const collectionService = {
    getAllCollections: async () => {
        try {
            const response = await axios.get(`${API_URL}/collections`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCollectionById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/collections/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createCollection: async (collectionData) => {
        try {
            const response = await axios.post(`${API_URL}/collections`, collectionData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateCollection: async (id, collectionData) => {
        try {
            const response = await axios.patch(`${API_URL}/collections/${id}`, collectionData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteCollection: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/collections/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 