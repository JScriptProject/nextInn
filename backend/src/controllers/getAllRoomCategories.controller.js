import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"; 
import { RoomCategory } from '../models/roomCategory.model.js';

const getAllRoomCategories = asyncHandler(async(req, res, next)=>{

    const allCategoryData = await RoomCategory.find();
    if(allCategoryData.length === 0 || !allCategoryData )
    {
        throw new ApiError(404, "Room category data empty");
    }

    res.success(new ApiResponse(200, allCategoryData, "All category data fetched succesfully"));
})

export {getAllRoomCategories};