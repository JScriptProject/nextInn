import { Room } from "../models/room.models.js";
import { Booking } from "../models/booking.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const checkRoomsAvailability = asyncHandler(async (req, res) => {
  const { categoryId, checkIn, checkOut } = req.query;

  // 1. Validate Input
  if (!categoryId || !checkIn || !checkOut) {
    throw new ApiError(
      400,
      "Category, Check-in, and Check-out dates are required.",
    );
  }

  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);

  if (startDate >= endDate) {
    throw new ApiError(400, "Check-out date must be after check-in date.");
  }

  // 2. Get Total Physical Rooms for this Category
  // We exclude rooms currently in 'maintenance' as they cannot be booked
  const totalRooms = await Room.find({
    category: categoryId,
    status: { $ne: "maintenance" },
  }).select("_id");

  const totalRoomIds = totalRooms.map((room) => room._id.toString());

  // 3. Find "Conflicting" Bookings
  // Any booking that overlaps with our requested dates
  // Overlap Logic: (StartA < EndB) && (EndA > StartB)
  const conflictingBookings = await Booking.find({
    category: categoryId,
    bookingStatus: { $ne: "cancelled" }, // Ignore cancelled bookings
    $or: [
      {
        checkIn: { $lt: endDate },
        checkOut: { $gt: startDate },
      },
    ],
  }).select("assignedRooms");

  // 4. Calculate Occupied Rooms
  // Flatten the array of arrays: [[id1, id2], [id3]] -> [id1, id2, id3]
  const occupiedRoomIds = new Set();
  conflictingBookings.forEach((booking) => {
    booking.assignedRooms.forEach((roomId) => {
      occupiedRoomIds.add(roomId.toString());
    });
  });

  // 5. Determine Availability
  // Available = Total - Occupied
  const availableCount = Math.max(
    0,
    totalRoomIds.length - occupiedRoomIds.size,
  );

  return res.success(
    200,
    {
      availableRooms: availableCount,
      totalRooms: totalRoomIds.length,
      isAvailable: availableCount > 0,
    },
    "Availability check successful",
  );
});
