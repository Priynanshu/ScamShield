import apiClient from './api.service';

async function registerService(userData) {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
}

async function loginService(credentials) {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
}

async function getMeService() {
  try {
    const response = await apiClient.get('/auth/me', { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
}

async function logoutService() {
  try {
    const response = await apiClient.post('/auth/logout', {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
}

// FIX: Was missing — used in authSlice but not defined
async function getAllUsersService() {
  try {
    const response = await apiClient.get('/auth/users', { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
}

export default {
  registerService,
  loginService,
  getMeService,
  logoutService,
  getAllUsersService,
};