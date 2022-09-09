import axios from "axios";
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': 'true'
    },

    // required to handle the CSRF token
    withCredentials: true


})
axiosInstance.interceptors.request.use(req => {
    req.headers.common['Accept'] = 'application/json';
    req.headers.common['Context-Type'] = 'application/json'; 
    return req;
})

export default { axiosInstance }