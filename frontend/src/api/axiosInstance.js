
import axios from "axios";
const SERVER_URI = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: SERVER_URI,
    withCredentials: true,
});

let isRefreshing = false;

api.interceptors.response.use(

    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log("Original Request: ", originalRequest);
        console.log("Original request._rety: ", originalRequest._retry);
        console.log("Error:::", error);
        console.log("Original Request response", error.response);
        if(error.response?.status === 401 && !originalRequest._retry && isRefreshing)
        {
          originalRequest._retry = true;
          isRefreshing = true;
          try {
              await api.post("/api/auth/refresh", {}, { withCredentials: true });
              isRefreshing = false;
              return api(originalRequest);
          } catch (error) {
            isRefreshing = false;
            window.location.href = "/login";
            return Promise.reject(error);
          }

        }
        return Promise.reject(error);
    }
);


export default api;


// const processQueue = (error) => {
//   failedQueue.forEach(prom => {
//     if (error) prom.reject(error);
//     else prom.resolve();
//   });

//   failedQueue = [];
// };


// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If refresh endpoint itself fails -> logout
//     if (originalRequest.url.includes("/api/auth/refresh")) {
//       window.location.href = "/login";
//       return Promise.reject(error);
//     }

//     // If access token expired
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // If refresh is already running -> queue this request
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(() => api(originalRequest));
//       }

//       isRefreshing = true;

//       try {
//         await api.post("/api/auth/refresh", {}, { withCredentials: true });

//         isRefreshing = false;
//         processQueue(null);

//         return api(originalRequest);
//       } catch (err) {
//         isRefreshing = false;
//         processQueue(err);

//         window.location.href = "/login";
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

