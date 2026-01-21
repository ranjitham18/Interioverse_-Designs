//connects frontend to backend
// sends cookies automatically

import axios from "axios";

const api = axios.create({
  baseURL: "https://interioverse-backend.onrender.com",
  // baseURL: "http://localhost:5000",
  withCredentials: true
});

export default api;