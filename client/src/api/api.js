import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,           // crucial for cookies/sessions
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: response interceptor for common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized - session likely expired');
    }
    return Promise.reject(error);
  }
);

export default api;