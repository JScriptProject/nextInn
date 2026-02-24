import { asyncHandler } from "#utils/asyncHandler.js";
import { Room } from "#models/room.models.js";
import { ApiError } from "#utils/ApiError.js";

export const getAllRooms = asyncHandler(async (req, res, next) => {
  const admin = req.user || {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;
  const statusFilter = req.query.status;

  const skip = (page - 1) * limit;

  const query = {};
  if(statusFilter && statusFilter!=="all")
  {
    query.status = statusFilter.toLowerCase();
  }

  console.log("The requested by admin =>", admin);

  const allRooms = await Room.find(query)
    .populate({
      path: "current_booking",
      select: "bookingId",
    })
    .sort({ roomNumber: 1 })
    .skip(skip)
    .limit(limit);

  // Get the total records count and basis on that will calculate the total number of pages
  const totalRooms = await Room.countDocuments();
  const totalPages = Math.ceil(totalRooms / limit);

  if (!allRooms) {
    throw new ApiError(404, "Unanble to find the rooms!");
  }
  console.log("All Rooms");
  res.success(
    200,
    {
      allRooms,
      pagination: { totalRooms, totalPages, currentPage: page, limit },
    },
    "All Rooms Data fetched succesfully!",
  );
});
