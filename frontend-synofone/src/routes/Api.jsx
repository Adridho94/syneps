import axios from 'axios';
import Cookies from 'js-cookie';

// Buat instance axios
const Api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json'
    }
});

// Tambahkan interceptor request untuk menyertakan token secara dinamis
Api.interceptors.request.use((config) => {
    const token = Cookies.get('token');  // Ambil token dari cookies
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;  // Set token di header
    }
    return config;
}, (error) => {
    // Handle request error
    return Promise.reject(error);
});

export default Api;
