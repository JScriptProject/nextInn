import adminApi from "@api/adminAxiosInstance.js";

// Fetch all rooms
export const getAllRooms = async (page = 1, limit = 15, status = "all") => {
  try {
    const response = await adminApi.get("/api/rooms/all", {
      params: { page, limit, status },
    }); // Adjust to your actual GET endpoint

    console.log("ALL ROOM Returned =>", response);
    return {
      success: true,
      data: response.data.data.allRooms,
      pagination: response.data.data.pagination,
      message: response.data.message,
      status: response.status,
    };
  } catch (error) {
    console.error("An error occured while loading rooms data", error);
    const errorMessage = error.response.data.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 404,
    };
  }
};

// Add a new room (Matches your addRoom.controller.js)
export const addRoom = async (roomData) => {
  try {
    const response = await adminApi.post("/api/rooms/add-room", roomData);
    console.log("Add Room API RESPOSNE =>", response);
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.error("An error occurred while Adding room", error);
    const errorMessage =
      error.response.data.message || "Issue while adding room";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 404,
    };
  }
};

// Update existing room
export const updateRoom = async (roomId, roomData) => {
  try {
    console.log("APIIIII DATA=>", roomId, roomData);
    const response = await adminApi.put(
      `/api/rooms/update/${roomId}`,
      roomData
    ); 
    console.log("RESPNSE UPDATE=>", response);
    return {

      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.error("An error occurred while updating rooms", error);
    const errorMessage = error.response.data.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 404,
    };
  }
};

// Delete room
export const deleteRoom = async (roomId) => {
  try {
    console.log("roomId=>", roomId);
    const response = await adminApi.delete(`/api/rooms/delete/${roomId}`); // Adjust endpoint
    
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  } catch (error) {
    console.error("An error occurred while deleting room", error);
    const errorMessage = error.response.data.message || "Something went wrong";
    return {
      success: false,
      message: errorMessage,
      data: null,
      status: error.response?.status || 404,
    };
  }
};
