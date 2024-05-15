import { API_URL } from '@env';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const apiClient = axios.create({ baseURL: `${API_URL}` });
apiClient.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().token;
    if (token) config.headers.Authorization = 'Bearer ' + token;
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export { apiClient };
