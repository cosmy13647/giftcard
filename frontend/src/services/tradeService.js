import api from './api';

/**
 * Buy a gift card
 * @param {string} cardId - ID of the gift card to purchase
 * @returns {Promise} - Axios response data
 */
export const buyGiftCard = async (cardId) => {
    try {
        const response = await api.post(`/trade/buy/${cardId}`);
        return response.data;
    } catch (error) {
        console.error('Service Error - buyGiftCard:', error.response?.data || error.message);
        throw error;
    }
};
