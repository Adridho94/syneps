import axios from 'axios';
import Cookies from 'js-cookie';

// Buat instance axios
const Api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Accept': 'application/json',
    }
});

// Tambahkan interceptor request untuk menyertakan token secara dinamis
Api.interceptors.request.use((config) => {
    const token = Cookies.get('token');  // Ambil token terbaru setiap kali request
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;  // Set token di header
    }
    return config;
}, (error) => {
    // Handle request error
    return Promise.reject(error);
});

// Tambahkan interceptor response untuk penanganan error global (misal: token kadaluwarsa)
Api.interceptors.response.use((response) => {
    return response;  // Jika response sukses, langsung kembalikan response
}, (error) => {
    if (error.response && error.response.status === 401) {
        // Jika token tidak valid atau kadaluwarsa, redirect ke login atau lakukan tindakan lain
        window.location.href = '/login';
    }
    return Promise.reject(error);  // Jika error, kembalikan error ke komponen yang memanggil
});

export default Api;
