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
    console.log("We are in the anxiosInstance: status code =>", statusCode);
    console.log("We are in the anxiosInstance: Error Object =>", error);

    // if already hit the refresh endpoint then immidaitly send to login page
    if (
      originalRequest?.url?.includes("/api/auth/refresh") &&
      statusCode === 401
    ) {
      console.log("Looking to redirect to /login");
      const currentPath = window.location.pathname;
      console.log("Current Path=>", currentPath);
      if (currentPath === "/user-dashboard") {
        console.log("here in the if statement as currentPath === /user-dashboard");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }

    if (
      statusCode === 401 &&
      !originalRequest._retry &&
      !originalRequest?.url?.includes("/api/auth/refresh")
    ) {
      console.log(
        "inside if checking original request=>",
        originalRequest.url.includes("/api/auth/refresh"));
      
      //if its the login credentails issues then dont initiate refresh
      if (errorMessage === "Invalid password") {
        return Promise.reject(error);
      }

      //if custome header added to skip the auto refresh

      originalRequest._retry = true;

      if (isRefreshing) {
        // queue this request until refresh completes
        console.log("inside is refreshing");
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        console.log("again refresh call inside try")
        await api.post("/api/auth/refresh"); // api has withCredentials true
        isRefreshing = false;
        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        console.log("catch of the try refresh");
        isRefreshing = false;
        processQueue(err);
        const currentPath = window.location.pathname;
        console.log("Current Path=>", currentPath);
        if (currentPath === "/user-dashboard") {
          console.log(
            "here in the if statement as currentPath === /user-dashboard"
          );
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
