import axiosInstance from "../util/axiosInstance";
export const getAllRoomsCategory = async() =>{
     const response = await axiosInstance.get("/api/category/get-all");
     console.log("Response",response);
     console.log("Response Data", response.data);
     console.log("Response Data Data", response.data.data);
     return response.data.data;
};

export const updateRoomCategoryData = async(categoryId,updates) =>{
     const response = await axiosInstance.put("/api/category/update",{
         categoryId,
         updates,
     });
     return response.data;
}