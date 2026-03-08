import api from './api';

/**
 * Get current user transactions
 * @returns {Promise} - Axios response data
 */
export const getMyTransactions = async () => {
    try {
        const response = await api.get('/transactions');
        return response.data;
    } catch (error) {
        console.error('Service Error - getMyTransactions:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Get all transactions (Admin only)
 * @returns {Promise} - Axios response data
 */
export const getAllTransactions = async () => {
    try {
        const response = await api.get('/transactions/all');
        return response.data;
    } catch (error) {
        console.error('Service Error - getAllTransactions:', error.response?.data || error.message);
        throw error;
    }
};
