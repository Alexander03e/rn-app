import axios from 'axios';
import { BASE_URL, TOKEN } from './const';

export const $api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

$api.interceptors.request.use(
    config => {
        config.headers['X-API-KEY'] = TOKEN;

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);
