/*
Supportive variables 
isRefreshing
failedQueue
originalRequest
originalRequest._retry

processQueue()
*/

// 1. import the axios

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

      if (currentPath === "/admin") {
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
        }).then(() => api(originalRequest));
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
// import axios from "axios";

// const SERVER_URI = import.meta.env.VITE_API_URL;

// //create axios object
// const adminApi = axios.create({
//   baseURL: SERVER_URI,
//   withCredentials: true,
// });

// //variable declarations
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token=null) =>{

// }

// adminApi.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     console.log("Original Request: ", originalRequest);
//     console.log("Original request._rety: ", originalRequest._retry);
//     console.log("Error:::", error);
//     console.log("Original Request response", error.response);
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !isRefreshing
//     ) {
//       originalRequest._retry = true;
//       isRefreshing = true;
//       try {
//         await api.post(
//           "/api/auth/admin-refresh",
//           {},
//           { withCredentials: true }
//         );
//         isRefreshing = false;
//         return api(originalRequest);
//       } catch (error) {
//         isRefreshing = false;
//         window.location.href = "/admin-login";
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default adminApi;
