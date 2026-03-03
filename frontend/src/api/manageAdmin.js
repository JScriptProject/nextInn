import adminApi from "@api/adminAxiosInstance.js";

export const getAllAdmins = async () => {
  try {
    const response = await adminApi.get("/api/admin");
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.error("An error occurred while fetching admins", error);
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 404,
    };
  }
};

export const addAdmin = async (payload) => {
  try {
    const response = await adminApi.post("/api/admin/add", payload);
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.error("An error occurred while adding admin", error);
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 400,
    };
  }
};

export const updateAdmin = async (id, payload) => {
  try {
    const response = await adminApi.patch(`/api/admin/${id}`, payload);
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.error("An error occurred while updating admin", error);
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 400,
    };
  }
};

export const deleteAdmin = async (id) => {
  try {
    const response = await adminApi.delete(`/api/admin/${id}`);
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.error("An error occurred while deleting admin", error);
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 400,
    };
  }
};
