import api from "@api/axiosInstance.js";

export const signup = async (signUpData) => {
  try {
    const response = await api.post(`/api/auth/signup`, signUpData);

    return {
      success: true,
      message: response.data.message,
      status: response.status,
    };
  } catch (error) {
    console.error("Error in signup", error);
    const errorMessage = error.response.data.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      status: error.response?.status || 520,
    };
  }
};

export const login = async (loginData) => {
  try {
    const response = await api.post("/api/auth/login", loginData);

    return {
      success: true,
      message: response.data.message,
      status: response.status,
      user: response.data.data,
    };
  } catch (error) {
    console.error("Error in login", error);
    return {
      success: false,
      message: error.response.data.message || "Something went wrong",
    };
  }
};

export const verifySession = async () => {
  try {
    const response = await api.post("/api/auth/me");

    return {
      success: true,
      message: response.data.message,
      user: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.error("Error in verifySession", error);
    const errorMessage = error.response.data.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      status: error.response?.status || 520,
    };
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/api/auth/logout");
    return {
      success: true,
      message: response.data.message,
      status: response.status,
    };
  } catch (error) {
    console.error("Error in logout", error);
    const errorMessage = error.response.data.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      status: error.response?.status || 520,
    };
  }
};

//create a api for change password


export const updatePassoword = async(passObj)=>{

  try {
    console.log("Password Obj=>", passObj);
     const response =  await api.post("/api/auth/update-pass", passObj);
     console.log("Update Password Response =>", response);
     return {
       success: true,
       message: response.data.message,
       status: response.status,
     };
  } catch (error) {
    console.error("Issue while updating password", error);
    const errorMessage = error.response.data.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      status: error.response?.status || 520,
    };
  }
}