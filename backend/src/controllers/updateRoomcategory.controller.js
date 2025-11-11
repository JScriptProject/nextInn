import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { RoomCategory } from "../models/roomCategory.model.js";

const updateRoomCategoryData = asyncHandler(async (req, res, next) => {
  const body = req.body || {};
  const { _id, changes } = body;
  console.log("CONTROLLER CHANGES=> ", changes);
  const result = await RoomCategory.findByIdAndUpdate(
    { _id },
    { $set:changes },
    { new: true }
  );
  if(!result){
    throw new ApiError(500, "Unable to perform the update operation on room category");

  }
  res.success(201, result, "Data updated Succesfully!");
});

export {updateRoomCategoryData};