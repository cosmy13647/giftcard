import api from './api';

/**
 * Register a new user
 * @param {Object} data - User registration data (name, email, password)
 * @returns {Promise} - Axios response promise
 */
export const registerUser = async (data) => {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        console.error('Service Error - registerUser:', {
            data: data,
            response: error.response?.data,
            status: error.response?.status
        });
        return {
            error: true,
            message: error.response?.data?.error || error.response?.data?.message || 'Registration failed',
            status: error.response?.status
        };
    }
};

/**
 * Login an existing user
 * @param {Object} data - User login credentials (email, password)
 * @returns {Promise} - Axios response promise
 */
export const loginUser = async (data) => {
    try {
        const response = await api.post('/auth/login', data);
        return response.data;
    } catch (error) {
        console.error('Service Error - loginUser:', {
            data: data,
            response: error.response?.data,
            status: error.response?.status
        });
        return {
            error: true,
            message: error.response?.data?.error || error.response?.data?.message || 'Login failed',
            status: error.response?.status
        };
    }
};

/**
 * Get current user data
 * @returns {Promise} - Axios response promise
 */
export const getMe = async () => {
    try {
        const response = await api.get('/auth/me');
        return response.data;
    } catch (error) {
        console.error('Service Error - getMe:', {
            response: error.response?.data,
            status: error.response?.status
        });
        return {
            error: true,
            message: error.response?.data?.error || error.response?.data?.message || 'Failed to fetch user data',
            status: error.response?.status
        };
    }
};

/**
 * Logout user
 */
export const logout = () => {
    localStorage.removeItem('token');
};
