// src/services/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-backend-api.com/api', // Thay bằng URL backend của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Bạn có thể thêm interceptors ở đây để tự động thêm token vào header
// apiClient.interceptors.request.use(...)

export default apiClient;