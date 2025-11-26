import adminApi from "@api/adminAxiosInstance.js";


export const verifyAdminSession = async()=>{
     
    try {
        const response = await adminApi.post("/api/auth/admin-me");
        console.log("Verify Session: ", response);

        return{
            success:true,
            message:response.data.message,
            user:response.data.data,
            status:response.status
        }
    } catch (error) {
        console.error("Error in the Verification", error);
        const errorMessageVrify =  error.response.data?.message || "Something went wrong";
        return{
          success:false,
          message:errorMessageVrify,
          status:error.response?.status || 520
        }
    }
}


export const loginAdmin = async (loginData) => {
  try {
    const response = await adminApi.post("/api/auth/admin-login", loginData);
    console.log("API Response: ", response);
    return {
      success: true,
      message: response.data.message,
      status: response.status,
    };
  } catch (error) {
    console.error("Error in login", error);
    const errorMessage = error.response.data.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      status: error.response?.status || 520,
    };
  }
};