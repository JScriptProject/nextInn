import api from "@api/axiosInstance.js";

export const getAllRoomsCategory = async () => {
  const response = await api.get("/api/category/get-all");
  
  return response.data.data;
};

export const updateRoomCategoryData = async (_id, changes) => {
  const response = await api.put("/api/category/update", {
    _id,
    changes,
  });
  return response.data;
};
