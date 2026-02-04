import { Booking } from "../models/booking.model.js";
import { Room } from "../models/room.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// API: POST /api/bookings/create
export const createBooking = asyncHandler(async (req, res) => {
  const {
    category,
    checkIn,
    checkOut,
    guestDetails,
    priceBreakdown,
    totalAmount,
  } = req.body || {};

  // 1. Basic Validation
  if (!category || !checkIn || !checkOut || !guestDetails || !totalAmount || !priceBreakdown) {
    throw new ApiError(400, "All booking details are required");
  }

  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const requestedRoomCount = Number(guestDetails.roomsCount);

  // 2. AVAILABILITY CHECK (The Core Logic)
  // We must ensure rooms are still available at the exact moment of booking

  // A. Get ALL active rooms for this category
  const allRoomsInCategory = await Room.find({
    category: category,
    status: { $ne: "maintenance" }, // Don't book rooms under repair
  });

  if (allRoomsInCategory.length === 0) {
    throw new ApiError(404, "No rooms found in this category");
  }

  // B. Find "Conflicting" Bookings
  // Any booking that overlaps with our requested dates
  const conflictingBookings = await Booking.find({
    category: category,
    bookingStatus: { $ne: "cancelled" }, // Ignore cancelled bookings
    $or: [
      {
        checkIn: { $lt: endDate },
        checkOut: { $gt: startDate },
      },
    ],
  }).select("assignedRooms");

  // C. Flatten the array of occupied room IDs
  // Example: conflictingBookings might look like [{assignedRooms: [id1]}, {assignedRooms: [id2, id3]}]
  // We turn that into [id1, id2, id3]
  const occupiedRoomIds = conflictingBookings.flatMap((b) =>
    b.assignedRooms.map((id) => id.toString()),
  );

  // D. Filter out the occupied rooms
  const availableRooms = allRoomsInCategory.filter(
    (room) => !occupiedRoomIds.includes(room._id.toString()),
  );

  // 3. Final Validation
  if (availableRooms.length < requestedRoomCount) {
    throw new ApiError(
      400,
      `Sorry, only ${availableRooms.length} rooms are available for these dates.`,
    );
  }

  // 4. AUTO-ASSIGNMENT
  // Take the first 'N' rooms from the available list
  const roomsToAssign = availableRooms
    .slice(0, Number(guestDetails.roomsCount))
    .map((r) => r._id);
console.log("user=>", req.user);
  // 5. Create the Booking
  const newBooking = await Booking.create({
    user: req.user.userId, // Assumes user is logged in via 'verifySession'
    category,
    assignedRooms: roomsToAssign,
    checkIn: new Date(startDate),
    checkOut: new Date(endDate),
    guestDetails,
    priceBreakdown: {
      baseRoomCharge: priceBreakdown.baseRoomCharge || 0,
      extraGuestCharges: priceBreakdown.extraGuestCharges || {},
      addonServicesCharges: priceBreakdown.addonServicesCharges || {},
    },
    totalAmount,
    paymentStatus: "pending", // Or "paid" if you integrate Stripe/Razorpay later
    bookingStatus: "confirmed",
  });

  if (!newBooking) {
    throw new ApiError(500, "Failed to generate booking");
  }

  res.success(201, newBooking, "Booking confirmed successfully!");
});
