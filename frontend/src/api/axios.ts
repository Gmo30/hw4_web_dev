import axios from 'axios';
import type { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_API_URL || '5000'}/`, // Use VITE_API_URL or default to 5000
  withCredentials: true,
});

export default api;