import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { RoomCategory } from "../models/roomCategory.model.js";

const addAmenities = asyncHandler(async(req, res, next)=>{
    
    const body = req.body || {};
    const {_id, amenities} = body;

    const result = await RoomCategory.findByIdAndUpdate(
     _id ,
    { $set:{amenities} },
    { new: true });
    
 if(!result){
    throw new ApiError(500, "Unable to perform the update operation on room category");

  }
  res.success(new ApiResponse(201, result, "Data updated Succesfully!"));
 
});

export {addAmenities};