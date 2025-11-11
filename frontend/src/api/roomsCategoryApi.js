import api from "./axiosInstance.js";

export const getAllRoomsCategory = async () => {
  const response = await api.get("/api/category/get-all");
  console.log("Api response",response);
  return response.data.data;
};

export const updateRoomCategoryData = async (_id, changes) => {
  const response = await api.put("/api/category/update", {
    _id,
    changes,
  });
  return response.data;
};
