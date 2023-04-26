import axios from 'axios';
import { BASE_URL, API_KEY } from '../constants/api';

export const axiosConfig = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});
