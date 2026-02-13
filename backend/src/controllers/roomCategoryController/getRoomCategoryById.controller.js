import { asyncHandler } from "#utils/asyncHandler.js";
import { RoomCategory } from "#models/roomCategory.model.js";
import { ApiError } from "#utils/ApiError.js";

export const getRoomCategoryById = asyncHandler(async (req, res, next) => {
  const { roomId } = req.body || {};
  if (!roomId) {
    throw new ApiError("Opps not a valid room cetgory Id");
  }

  const roomData = await RoomCategory.findById(roomId);
  console.log("RoomData=>", roomData);
  res.success(200, roomData, "Room category Data fetched succssfully!");
});
