import api from './api';

/**
 * Upload a new gift card
 * @param {Object} data - Gift card data
 * @returns {Promise} - Axios response promise
 */
export const uploadGiftCard = async (data) => {
    try {
        const response = await api.post('/giftcards/upload', data);
        return response.data;
    } catch (error) {
        console.error('Service Error - uploadGiftCard:', {
            data: data,
            response: error.response?.data,
            status: error.response?.status
        });
        return {
            error: true,
            message: error.response?.data?.error || error.response?.data?.errors?.[0] || 'Gift card upload failed',
            status: error.response?.status
        };
    }
};

/**
 * Get current user's gift cards
 * @returns {Promise} - Axios response promise
 */
export const getMyGiftCards = async () => {
    try {
        const response = await api.get('/giftcards/my-cards');
        return response.data;
    } catch (error) {
        console.error('Service Error - getMyGiftCards:', {
            response: error.response?.data,
            status: error.response?.status
        });
        return {
            error: true,
            message: error.response?.data?.error || 'Failed to fetch gift cards',
            status: error.response?.status
        };
    }
};
/**
 * Get pending gift cards for verification (Admin)
 * @returns {Promise} - Axios response data
 */
export const getPendingGiftCards = async () => {
    try {
        const response = await api.get('/admin/pending-giftcards');
        return response.data;
    } catch (error) {
        console.error('Service Error - getPendingGiftCards:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Verify a gift card (Admin)
 * @param {string} id - Card ID
 * @returns {Promise} - Axios response data
 */
export const verifyGiftCard = async (id) => {
    try {
        const response = await api.patch(`/admin/approve-giftcard/${id}`);
        return response.data;
    } catch (error) {
        console.error('Service Error - verifyGiftCard:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Reject a gift card (Admin)
 * @param {string} id - Card ID
 * @returns {Promise} - Axios response data
 */
export const rejectGiftCard = async (id) => {
    try {
        const response = await api.patch(`/admin/reject-giftcard/${id}`);
        return response.data;
    } catch (error) {
        console.error('Service Error - rejectGiftCard:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Get available gift cards for marketplace
 * @returns {Promise} - Axios response promise
 */
export const getMarketplaceCards = async () => {
    try {
        const response = await api.get('/giftcards/marketplace');
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
