import axios from "axios";

const api = axios.create({
    baseURL: "https://word-api-hmlg.vercel.app",
});

export default api;