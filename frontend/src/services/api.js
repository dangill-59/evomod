import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (username, password) =>
    api.post('/users/register', { username, password }),
  
  login: (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return api.post('/users/token', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Projects API
export const projectsAPI = {
  create: (name, description, fields) =>
    api.post('/projects/', { name, description, fields }),
  
  list: () => api.get('/projects/'),
  
  get: (id) => api.get(`/projects/${id}`),
};

// Documents API
export const documentsAPI = {
  upload: (projectId, file, metadata = {}) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('project_id', projectId);
    formData.append('metadata', JSON.stringify(metadata));
    return api.post('/documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  list: () => api.get('/documents/'),
  
  get: (id) => api.get(`/documents/${id}`),
};

// Search API
export const searchAPI = {
  search: (query) => api.get(`/search/?q=${encodeURIComponent(query)}`),
};

export default api;