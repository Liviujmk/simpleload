import axios from 'axios';

export default axios.create({
    baseURL: 'http://127.0.0.1:3300'
});

export const baseURL = 'http://127.0.0.1:3300'
export const baseDashboardURL = 'http://127.0.0.1:3300/dashboard'

