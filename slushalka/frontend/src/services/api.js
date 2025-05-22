import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен к запросам, если он есть
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const auth = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
  logout: () => {
    localStorage.removeItem('token');
  },
};

export const albums = {
  getAll: () => api.get('/albums/'),
  getById: (id) => api.get(`/albums/${id}/`),
  create: (data) => api.post('/albums/', data),
  update: (id, data) => api.put(`/albums/${id}/`, data),
  delete: (id) => api.delete(`/albums/${id}/`),
};

export const artists = {
  getAll: () => api.get('/artists/'),
  getById: (id) => api.get(`/artists/${id}/`),
  create: (data) => api.post('/artists/', data),
  update: (id, data) => api.put(`/artists/${id}/`, data),
  delete: (id) => api.delete(`/artists/${id}/`),
};

export const tracks = {
  getAll: () => api.get('/tracks/'),
  getById: (id) => api.get(`/tracks/${id}/`),
  create: (data) => api.post('/tracks/', data),
  update: (id, data) => api.put(`/tracks/${id}/`, data),
  delete: (id) => api.delete(`/tracks/${id}/`),
};

export const playlists = {
  getAll: () => api.get('/playlists/'),
  getById: (id) => api.get(`/playlists/${id}/`),
  create: (data) => api.post('/playlists/', data),
  update: (id, data) => api.put(`/playlists/${id}/`, data),
  delete: (id) => api.delete(`/playlists/${id}/`),
  addTrack: (playlistId, trackId) => api.post(`/playlists/${playlistId}/tracks/`, { track_id: trackId }),
  removeTrack: (playlistId, trackId) => api.delete(`/playlists/${playlistId}/tracks/${trackId}/`),
};

export const user = {
  getProfile: () => api.get('/users/profile/'),
  updateProfile: (data) => api.put('/users/profile/', data),
  getFavorites: () => api.get('/users/favorites/'),
  addToFavorites: (trackId) => api.post('/users/favorites/', { track_id: trackId }),
  removeFromFavorites: (trackId) => api.delete(`/users/favorites/${trackId}/`),
};

export default api; 