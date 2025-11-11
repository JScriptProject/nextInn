import api from "./axiosInstance.js";
 const API = import.meta.env.VITE_API_URL

export const signup = async(signUpData) =>{
    console.log(signUpData);
    try{
        const response = await api.post(`/api/auth/signup`,signUpData);
        console.log("API Respone: ", response);
        console.log("API Data: ", response.data);

        return {
            success:true,
            message:response.data.message,
            status:response.status
        };
    }
    catch(error)
    {
        console.error("Error in signup", error);
        const errorMessage = error.response.data.message || "Something went wrong";
        return{
            success:false,
            message:errorMessage,
            status:error.response?.status || 520
        }
    }
};
