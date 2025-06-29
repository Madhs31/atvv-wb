// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // porta do back-end
});

export default api;
