import axios from "axios";

// 2. Create axios object

const SERVER_URL = import.meta.env.VITE_API_URL;

const adminApi = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

//create a variables

let isRefreshing = false;
let failedQueue = [];

//create a processQueu

const processQueue = (error, token = null) => {
  failedQueue.forEach((program) => {
    if (error) program.reject(error);
    else program.resolve();
  });
  failedQueue = [];
};

// Catch the response of the axios request
console.log("AdminaxiosInstance");
adminApi.interceptors.response.use(
  //if response without error then send it back as it is
  (response) => response,
  async (error) => {
    console.log("Admin AxiosINstance =>", error)
    const originalRequest = error.config;
    const statusCode = error.response?.status;
    const errorMessage = error.response?.data?.message;
    const currentPath = window.location.pathname;
    //check if original request was refresh, if true then send to login

    if(error.code === "ERR_NETWORK")
    {
      return Promise.reject(error);
    }

    if (originalRequest?.url?.includes("/api/auth/admin-refresh")) {
      console.log("Return back to login");
      console.log("CURRENT PATH=>", currentPath);
      if (currentPath.startsWith("/admin/")) {
        window.location.href = "/admin-login";
      }
      return Promise.reject(error);
    }

    // if original request is not refresh request and if its 401 status then initiate the refresh call

    if (
      !originalRequest?.url?.includes("/api/auth/admin-refresh") &&
      statusCode === 401 &&
      !originalRequest._retry
    ) {
      if (errorMessage === "Invalid password") {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => adminApi(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      //refresh the session

      try {
        await adminApi.post("/api/auth/admin-refresh");
        isRefreshing = false;
        processQueue(null);
        return adminApi(originalRequest);
      } catch (error) {
        isRefreshing = false;
        processQueue(error);
        if (currentPath === "/admin") {
          window.location.href = "/admin-login";
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default adminApi;

