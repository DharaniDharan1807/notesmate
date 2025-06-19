// src/services/api.js
import axios from 'axios';

const API = axios.create({
   baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:9090/api/',
    'Content-Type': 'application/json',
  });

// Add request interceptor to include auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
},
  (error) => Promise.reject(error)
);

export default API;