import { asyncHandler } from "#utils/asyncHandler.js";
import { Room } from "#models/room.models.js";
import { ApiError } from "#utils/ApiError.js";

export const getAllRooms = asyncHandler(async (req, res, next) => {
  const admin  = req.user || {};
  console.log("The requested by admin =>", admin);
  const allRooms = await Room.find().populate({
    path: "current_booking",
    select: "bookingId",
  });
  if (!allRooms) {
    throw new ApiError(404, "Unanble to find the rooms");
  }
  console.log("All Rooms");
  res.success(200, allRooms, "All Rooms Data fetched succesfully!");
});
