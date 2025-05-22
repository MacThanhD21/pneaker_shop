import axios from 'axios';

const API_URL = 'https://dc3c-34-148-89-69.ngrok-free.app';
// https://dc3c-34-148-89-69.ngrok-free.app/recommend
// Tạo instance axios với config mặc định
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
});

/**
 * Get product recommendations based on item ID
 * @param {string} itemId - The ID of the current product
 * @returns {Promise<{similar_item_ids: string[]}>} - Array of recommended product IDs
 */
export const getRecommendations = async (itemId) => {
  try {
    console.log('Calling API with itemId:', itemId);
    console.log('API URL:', `${API_URL}/recommend_w_img_sim`);
    
    const response = await axiosInstance.post(`${API_URL}/recommend_w_img_sim`, {
      item_id: itemId
    });
    
    console.log('API Response:', response);
    console.log('Response Data:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    throw error;
  }
};

/**
 * Get personalized product recommendations for a user
 * @param {string} userId - The ID of the user
 * @returns {Promise<{item_ids: string[]}>} - Array of recommended product IDs for the user
 */
export const getUserRecommendations = async (userId) => {
  try {
    console.log('Calling API with userId:', userId);
    console.log('API URL:', `${API_URL}/recommend`);
    
    const response = await axiosInstance.post(`${API_URL}/recommend`, {
      user_id: userId
    });
    
    console.log('API Response:', response);
    console.log('Response Data:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error getting user recommendations:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    throw error;
  }
}; 