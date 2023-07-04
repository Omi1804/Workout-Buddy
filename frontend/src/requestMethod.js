import axios from "axios";

const BASE_URL = 'https://workout-buddy-uxio.onrender.com/';


const publicRequest = axios.create({
    baseURL: BASE_URL,
});

publicRequest.interceptors.request.use((config) => {
    config.url = `/api${config.url}`;  // Add the `/api` prefix to all requests
    return config;
  });

export default publicRequest;