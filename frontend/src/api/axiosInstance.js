import axios from "axios";
const SERVER_URI = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: SERVER_URI,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response?.status;
    const errorMessage = error.response?.data?.message;


    // if already hit the refresh endpoint then immidaitly send to login page
    if (originalRequest?.url?.includes("/api/auth/refresh")) {
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (statusCode === 401 && !originalRequest._retry) {
      //if its the login credentails issues then dont initiate refresh
      if (errorMessage === "Invalid password") {
        return Promise.reject(error);
      }

      //if custome header added to skip the auto refresh
      if (skipAutoRefresh) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        // queue this request until refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        await api.post("/api/auth/refresh"); // api has withCredentials true
        isRefreshing = false;
        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        isRefreshing = false;
        processQueue(err);
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
