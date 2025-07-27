// utils/axios.ts - COMPLETE FIX
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api',
  withCredentials: true, // ⭐ CRITICAL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // ⭐ CRITICAL: Accept header for proper JSON response
    'Accept': 'application/json',
  },
});

// ⭐ CRITICAL: Request interceptor to ensure credentials
api.interceptors.request.use(
  (config) => {
    // Force withCredentials on every request
    config.withCredentials = true;
    
    // Log for debugging
    console.log('📤 API Request:', {
      url: config.url,
      method: config.method,
      withCredentials: config.withCredentials,
      baseURL: config.baseURL,
    });
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// ⭐ CRITICAL: Response interceptor with detailed logging
api.interceptors.response.use(
  (response) => {
    console.log('📨 API Response:', {
      url: response.config.url,
      status: response.status,
      headers: response.headers,
      // Don't log sensitive data in production
      data: process.env.NODE_ENV === 'development' ? response.data : '[HIDDEN]'
    });
    return response;
  },
  (error) => {
    console.log('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      response: error.response?.data,
    });
    
    // Don't handle 401 here - let auth context handle it
    return Promise.reject(error);
  }
);

export default api;

// ⭐ EXPORT A SEPARATE INSTANCE FOR SERVER-SIDE REQUESTS (if needed)
export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // No withCredentials for server-side
});