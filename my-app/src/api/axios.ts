import axios from 'axios';

export const API_ORIGIN = 'https://localhost:7046';

export const api = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
