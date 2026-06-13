import axios from "axios";
import api from "@api/axiosInstance.js";
import adminApi from "@api/adminAxiosInstance.js";

const API = import.meta.env.VITE_API_URL;

//handled all related to the room categories

//get all room category data to show on home page
export const getAllRoomsCategory = async () => {
  try {
    const response = await axios.get(`${API}/api/category/get-all`);
    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
      status: response.status,
    };
  } catch (error) {
    console.error("An Error occured while getting data", error);
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 500,
    };
  }
};

//Admin will update the categories
export const updateRoomCategoryData = async (_id, changes) => {
  try {
    const response = await api.put("/api/category/update", {
      _id,
      changes,
    });
    return response.data;
  } catch (error) {
    console.log("Error while updating..", error);
  }
};

export const uploadCategoryImages = async (_id, formData) => {
  try {
    const response = await adminApi.put("/api/category/upload-images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
      status: response.status,
    };
  } catch (error) {
    console.error("Error uploading category images:", error);
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 500,
    };
  }
};

//internal routing to fetch the room category with category Id
export const fetchRoomById = async (roomId) => {
  try {
    const response = await axios.post(`${API}/api/category/get-room`, {
      roomId: roomId,
    });
    console.log("Response =>", response);
    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
      status: response.status,
    };
  } catch (error) {
    console.error("An error occurred while booking", error);
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 500,
    };
  }
};
