import api from './api';

/**
 * Get available gift cards for marketplace
 * @returns {Promise} - Axios response promise
 */
export const getMarketplaceCards = async () => {
    try {
        const response = await api.get('/giftcards');
        return response.data;
    } catch (error) {
        console.error('Service Error - getMarketplaceCards:', {
            response: error.response?.data,
            status: error.response?.status
        });
        return {
            error: true,
            message: error.response?.data?.error || 'Failed to fetch marketplace cards',
            status: error.response?.status
        };
    }
};
