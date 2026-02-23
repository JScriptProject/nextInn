import adminApi from "@api/adminAxiosInstance.js";

// Fetch all rooms
export const getAllRooms = async () => {
  try {
    const response = await adminApi.get("/api/rooms/all"); // Adjust to your actual GET endpoint
    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message };
  }
};

// Add a new room (Matches your addRoom.controller.js)
export const addRoom = async (roomData) => {
  try {
    const response = await adminApi.post("/api/rooms/add-room", roomData);
    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error adding room",
    };
  }
};

// Update existing room
export const updateRoom = async (roomId, roomData) => {
  try {
    const response = await adminApi.put(
      `/api/rooms/update/${roomId}`,
      roomData
    ); // Adjust endpoint
    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    return { success: false, message: error.response?.data?.message };
  }
};

// Delete room
export const deleteRoom = async (roomId) => {
  try {
    const response = await adminApi.delete(`/api/rooms/delete/${roomId}`); // Adjust endpoint
    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.message };
  }
};
