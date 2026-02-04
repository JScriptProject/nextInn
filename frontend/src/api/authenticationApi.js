import api from "@api/axiosInstance.js";


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


export const login = async(loginData) =>{
    console.log(loginData);
    
    try {
        const response = await api.post('/api/auth/login', loginData);
        console.log("API Response: ", response);
        console.log("API Data: ", response.data);
        return{
            success:true,
            message:response.data.message,
            status:response.status,
            user:response.data.data
        }
    } catch (error) {
          console.error("Error in login", error);
          return{
            success:false,
            message:error.response.data.message || "Something went wrong",
          }
    }
}


export const verifySession = async()=>{

    try {
        const response = await api.post("/api/auth/me");

        console.log("Verify Session: ", response);
            return{
                success:true,
                message:response.data.message,
                user:response.data.data,
                status:response.status
            }
    } catch (error) {
        console.error("Error in verifySession", error);
        const errorMessage =  error.response.data.message || "Something went wrong";
        return{
            success:false,
            message:errorMessage,
            status:error.response?.status || 520
        
        }
    }
}

export const logout = async ()=>{
    try {
        const response = await api.post("/api/auth/logout");
        return{
            success:true,
            message:response.data.message,
            status:response.status
        }
    } catch (error) {
        console.error("Error in logout", error);
        const errorMessage =  error.response.data.message || "Something went wrong";
        return{
           success:false,
           message: errorMessage,
           status:error.response?.status || 520 
        }
        
    }
}