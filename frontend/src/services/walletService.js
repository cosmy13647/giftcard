import api from './api';

/**
 * Get current user wallet
 * @returns {Promise} - Axios response promise
 */
export const getWallet = async () => {
    try {
        const response = await api.get('/wallet');
        return response.data;
    } catch (error) {
        console.error('Service Error - getWallet:', {
            response: error.response?.data,
            status: error.response?.status
        });
        return {
            error: true,
            message: error.response?.data?.error || error.response?.data?.message || 'Failed to fetch wallet data',
            status: error.response?.status
        };
    }
};

/**
 * Refresh/Fetch current user wallet (Alias for getWallet)
 * @returns {Promise} - Axios response promise
 */
export const fetchWallet = getWallet;
