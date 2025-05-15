import axios from 'axios';
import { auth } from '../config/firebase';

// Create an axios instance with common configuration
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Replace with your Django backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add auth token to requests
api.interceptors.request.use(async (config) => {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authApi = {
    register: async (idToken: string) => {
        try {
            const response = await api.post('/auth/register/', { idToken });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle specific HTTP errors
                if (error.response) {
                    throw new Error(error.response.data.message || 'Registration failed');
                } else if (error.request) {
                    throw new Error('Network error. Please check your connection.');
                }
            }
            throw error;
        }
    },

    verifyEmail: async (idToken: string) => {
        try {
            const response = await api.post('/auth/verify-email/', { idToken });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Return specific error responses from the backend
                    return {
                        status: 'error',
                        message: error.response.data.message || 'Email verification failed',
                        code: error.response.data.code,
                        data: error.response.data.data
                    };
                } else if (error.request) {
                    throw new Error('Network error. Please check your connection.');
                }
            }
            throw error;
        }
    },

    loginWithGoogle: async (idToken: string) => {
        try {
            const response = await api.post('/auth/google/', { idToken });
            return {
                status: 'success',
                message: 'Google authentication successful',
                data: response.data
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    return {
                        status: 'error',
                        message: error.response.data.message || 'Google authentication failed',
                        code: 'auth/backend-error'
                    };
                }
                return {
                    status: 'error',
                    message: 'Network error. Please check your connection.',
                    code: 'auth/network-error'
                };
            }
            return {
                status: 'error',
                message: 'An unexpected error occurred',
                code: 'auth/unknown-error'
            };
        }
    },

    status: async () => {
        try {
            const response = await api.get('/auth/status/');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    throw new Error(error.response.data.message || 'Failed to get auth status');
                } else if (error.request) {
                    throw new Error('Network error. Please check your connection.');
                }
            }
            throw error;
        }
    },
};

export default api;
