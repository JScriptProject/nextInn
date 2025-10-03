  import axios from "axios";

  const API = import.meta.env.VITE_API_URL;

  //create axios instance

  const axiosInstance = axios.create({
    baseURL: API,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  // request interceptor (add toke if exist)
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  //response ineterceptor

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.error(
          "API Error:",
          error.response.data?.message || error.response.statustext
        );

        if (error.response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else if (error.request) {
            console.error("Network Error: Server not reposponding");  
      }
      else {
          console.error("Error", error.message);
      }
      }
      return Promise.reject(error);
    }
  );

  export default axiosInstance;