import axios from "axios";
import adminApi from "@api/adminAxiosInstance";
const SERVER_URL = import.meta.env.VITE_API_URL;

export const checkReviewForTokenApi = async (tokenValue) => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/review/check-token/${tokenValue}`
    );
    console.log("REVIEW RESPONSE=>", response);
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.error("Error occured while checking review");
    const errorMessage = error.response.data.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 404,
    };
  }
};

export const submitReviewApi = async (token, rating, comment) => {
  console.log("TOKEN", token);
  console.log("RATING", rating);
  console.log("COMMENT", comment);
  try {
    const response = await axios.post(
      `${SERVER_URL}/api/review/submit-review`,
      { token, rating, comment }
    );
    console.log("SUBMIT REVIEW RESPONSE =>", response);
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.error("Error occured while submitting the review!!", error);
    const errorMessage = error.response.data.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 404,
    };
  }
};

export const getAllReviews = async (
  currentPage,
  limit,
  filterStatus,
  searchTerm
) => {
  try {
    const response = await adminApi.get(
      `${SERVER_URL}/api/review/all-reviews`,
      { params: { currentPage, limit, filterStatus, searchTerm } }
    );
    console.log("response=>", response);
  } catch (error) {
    console.error("Error while fetching the reviews:", error)
  }
};


