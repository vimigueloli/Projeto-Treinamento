import axios from "axios";

const api = axios.create({
    baseURL: "https://url.back-end/",
    // baseURL: process.env.REACT_APP_API_URL,
    // baseURL: "http://localhost:3001/",
});

export default api;