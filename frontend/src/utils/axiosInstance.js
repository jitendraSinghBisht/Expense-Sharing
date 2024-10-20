// src/axiosInstance.js

import axios from 'axios';

// Create an instance of axios with a common base URL
const axiosInstance = axios.create({
    baseURL: `http://localhost:5000`,
});

// Add interceptors if needed for logging, error handling, etc.
// axiosInstance.interceptors.request.use((config) => {
//     // Do something before request is sent
//     return config;
// });

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         // Handle error
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
