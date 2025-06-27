import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const storageToken = localStorage.getItem("tokens");
  if (storageToken) {
    const tokens: { access: string } = JSON.parse(storageToken);
    config.headers["Authorization"] = `Bearer ${tokens.access}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorData = error.response?.data;
    const isTokenExpired =
      error.response?.status === 401 &&
      errorData?.code === "token_not_valid" &&
      errorData?.messages?.some(
        (msg: any) =>
          msg?.message?.toLowerCase().includes("invalid") && msg?.token_class === "AccessToken"
      ) &&
      !originalRequest._retry;

    if (isTokenExpired && localStorage.getItem("tokens")) {
      originalRequest._retry = true;

      const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");

      try {
        const refreshResponse = await axios.post(`${api.defaults.baseURL}/refresh/`, {
          refresh: tokens.refresh,
        });

        const newAccessToken = refreshResponse.data.access;
        localStorage.setItem("tokens", JSON.stringify({ ...tokens, access: newAccessToken }));

        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("tokens");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
