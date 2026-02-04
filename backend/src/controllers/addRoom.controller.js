import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Room } from "../models/room.models.js";
import { RoomCategory } from "../models/roomCategory.model.js";

export const addRoom = asyncHandler(async (req, res, next) => {
  const {
    roomNumber,
    floor,
    category,
    status,
    cleaning_status,
    current_guest,
  } = req.body || {};

  // 1. Mandatory field check - Use 400 for Client errors
  if (!roomNumber || !floor || !category || !status || !cleaning_status) {
    throw new ApiError(400, "Please provide all mandatory fields.");
  }

  const categoryDoc = await RoomCategory.findById(category);
  if (!categoryDoc) {
    throw new ApiError(404, "Room category not found!");
  }

  const capacityLimit = categoryDoc.roomCapacity.availableRooms;
  const currentCount = await Room.countDocuments({ category });

  // 2. Capacity Check - Use 400
  if (currentCount >= capacityLimit) {
    throw new ApiError(
      400,
      `Capacity reached. Max ${capacityLimit} rooms allowed.`,
    );
  }

  const addedRoom = await Room.create({
    roomNumber,
    floor,
    category,
    status,
    cleaning_status,
    current_guest,
  });

  // 3. This line will now execute cleanly
  res.success(201, addedRoom, "Room created successfully!");
});
