import adminApi from "@api/adminAxiosInstance.js";
import axios from "axios";

export const verifyAdminSession = async () => {
  try {
    const response = await adminApi.post("/api/auth/admin-me");
    console.log("Verify Session: ", response);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.error("Error in the Verification", error);
    const errorMessageVrify =
      error.code === "ERR_NETWORK"
        ? "Opps backend Server is down"
        : error.response?.data?.message || "Something went wrong";
    return {
      success: false,
      message: errorMessageVrify,
      status: error.response?.status || 520,
    };
  }
};

export const loginAdmin = async (loginData) => {
  try {
    const response = await adminApi.post("/api/auth/admin-login", loginData);
    console.log("API Response: ", response);
    return {
      success: true,
      message: response.data.message,
      data:response.data.data,
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

export const adminVerifySendEmail = async () => {
  console.log("Calling API for to generate OTP");
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/auth/admin-verify`;
    const response = await axios.post(apiUrl, {});
    console.log("Api response =>", response);
    return {
      success: true,
      message: response.data.message,
      status: response.data.statusCode,
    };
  } catch (error) {
    console.log("API EROOO =>", error);
    const errorMessage =
      error.response.data.message ||
      "Unable to trigger the OTP, please try again..";
    return {
      success: false,
      message: errorMessage,
      status: error.response.data.statusCode || 520,
    };
  }
};

export const adminVerifyOTP = async (otp) => {
  console.log("OTP from adminAuth API=>", otp);
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/auth/admin-verify-otp`;
    const response = await axios.post(apiUrl, { otp: otp });
    console.log("API Response from OTP validation=>", response);
    if (response.data.data.success) {
      return {
        success: true,
        message: response.data.message,
        status: response.data.statusCode,
      };
    } else {
      return {
        success: false,
        message: response.data.message,
        status: response.data.statusCode,
      };
    }
  } catch (error) {
    console.log("API Error after vaildating OTP =>", error);
    const errorMessage =
      error.response.data.message || "Something went wrong!!";
    return {
      success: false,
      message: errorMessage,
      status: error.response.data.statusCode || 520,
    };
  }
};

export const superAdminLogin = async(loginData) => {
  const SERVER_URL = import.meta.env.VITE_API_URL;
    try {
    const response = await axios.post(
      `${SERVER_URL}/api/auth/super-admin-login`,
      loginData,
      { withCredentials: true }
    );
    console.log("API Response: ", response);
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
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