import axiosInstance from "../util/axiosInstance";
export const getAllRoomsCategory = async () => {
  const response = await axiosInstance.get("/api/category/get-all");
  return response.data.data;
};

export const updateRoomCategoryData = async (_id, changes) => {
  const response = await axiosInstance.put("/api/category/update", {
    _id,
    changes,
  });
  return response.data;
};
