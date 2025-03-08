import axios from "axios";

const url = "http://localhost:8000";

const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use((config) => {
  const storageToken = localStorage.getItem("tokens");
  if (storageToken) {
    const tokens: { access: string } = JSON.parse(storageToken);
    config.headers["Authorization"] = `Bearer ${tokens.access}`;
  }
  return config;
});

export default api;
