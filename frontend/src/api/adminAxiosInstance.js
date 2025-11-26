import axios from "axios";
const SERVER_URI = import.meta.env.VITE_API_URL;

const adminApi = axios.create({
  baseURL: SERVER_URI,
  withCredentials: true,
});

let isRefreshing = false;

adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("Original Request: ", originalRequest);
    console.log("Original request._rety: ", originalRequest._retry);
    console.log("Error:::", error);
    console.log("Original Request response", error.response);
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        await api.post(
          "/api/auth/admin-refresh",
          {},
          { withCredentials: true }
        );
        isRefreshing = false;
        return api(originalRequest);
      } catch (error) {
        isRefreshing = false;
        window.location.href = "/admin-login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default adminApi;