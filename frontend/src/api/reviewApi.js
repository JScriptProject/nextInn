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
 
  try {
    const response = await axios.post(
      `${SERVER_URL}/api/review/submit-review`,
      { token, rating, comment }
    );
    
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
      {
        params: {
          currentPage: currentPage,
          limit: limit,
          filterStatus: filterStatus,
          searchTerm: searchTerm,
        },
      }
    );
    console.log("response=>", response);
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.error("Error while fetching the reviews:", error);
    const errorMessage = error.response.data.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 404,
    };
  }
};

export const toggleFeaturedReview = async (reviewId, isFeaturedReview) => {
  try {
   
    const response = await adminApi.patch(
      `${SERVER_URL}/api/review/toggle-featured`,
      { reviewId: reviewId, isFeaturedReview: isFeaturedReview }
    );
   
     return {
       success: true,
       message: response.data.message,
       data: response.data.data,
       status: response.status,
     };
  } catch (error) {
    console.error("Error occured while review featured toggle", error);
    const errorMessage = error.response.data.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 404,
    };
  }
};

export const updateReviewStatus = async (reviewId, reviewStatus) => {
  try {
   
    const response = await adminApi.put(
      `${SERVER_URL}/api/review/update-status`,
      { reviewId: reviewId, reviewStatus: reviewStatus }
    );
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  } catch (error) {
    const errorMessage = error.response.data.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 404,
    };
  }
};
