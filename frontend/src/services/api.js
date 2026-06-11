import axios from 'axios';

/**
 * Axios instance pre-configured for the CineVerse API Gateway.
 *
 * Base URL will point to the API Gateway once the backend is deployed.
 * For now, it defaults to localhost:4000/api.
 *
 * Features:
 * - Automatic JWT injection via request interceptor
 * - Centralised error handling via response interceptor
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor ──────────────────────────────────────────────
// Attaches the JWT token to every outgoing request.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cineverse_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ─────────────────────────────────────────────
// Handles common error scenarios globally.
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Token expired or invalid — clear auth state and redirect to login
        localStorage.removeItem('cineverse_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// ── API Methods ──────────────────────────────────────────────────────
// These are placeholders for future backend integration.

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  me: () => api.get('/auth/me'),
  logout: () => api.get('/auth/logout'),
};

export const moviesAPI = {
  getAll: (params) => api.get('/movies', { params }),
  getById: (id) => api.get(`/movies/${id}`),
};

export const reviewsAPI = {
  getByMovieId: (movieId) => api.get(`/reviews/${movieId}`),
  create: (reviewData) => api.post('/reviews', reviewData),
};

export default api;
