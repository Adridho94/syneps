import axios from 'axios'

import Cookies from 'js-cookie'

const Api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    // baseURL: 'http://localhost/syneps/backend-synofone/public/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default Api;