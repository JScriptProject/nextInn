import axiosInstance from "../util/axiosInstance";
export const getAllRoomsCategory = async () => {
  const response = await axiosInstance.get("/api/category/get-all");
  return response.data.data;
};

export const updateRoomCategoryData = async (categoryId, updates) => {
  const response = await axiosInstance.put("/api/category/update", {
    categoryId,
    updates,
  });
  return response.data;
};
