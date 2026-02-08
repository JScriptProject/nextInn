import mongoose from "mongoose";
import { Booking } from "../models/booking.model.js";
import { Room } from "../models/room.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { sendBookingConfirmation } from "../utils/emailService.js";

// API: POST /api/bookings/create
export const createBooking = asyncHandler(async (req, res) => {
  // 1. Start a MongoDB Session for Atomicity
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      category,
      checkIn,
      checkOut,
      guestDetails,
      priceBreakdown,
      totalAmount,
    } = req.body || {};

    // 2. Basic Validation (Happens before we touch the DB)
    if (
      !category ||
      !checkIn ||
      !checkOut ||
      !guestDetails ||
      !totalAmount ||
      !priceBreakdown
    ) {
      throw new ApiError(400, "All booking details are required");
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const requestedRoomCount = Number(guestDetails.roomsCount);

    // --- CRITICAL SECTION START (Transaction Active) ---

    // 3. Find "Conflicting" Bookings within the Transaction
    // We pass .session(session) to ensure we see the most up-to-date state
    const conflictingBookings = await Booking.find({
      category: category,
      bookingStatus: { $ne: "cancelled" },
      $or: [
        {
          checkIn: { $lt: endDate },
          checkOut: { $gt: startDate },
        },
      ],
    })
      .select("assignedRooms")
      .session(session);

    // 4. Flatten occupied IDs
    const occupiedRoomIds = conflictingBookings.flatMap((b) =>
      b.assignedRooms.map((id) => id.toString()),
    );

    // 5. Find strictly available rooms using DB Query
    // Instead of fetching ALL and filtering in JS, we ask DB for rooms NOT IN occupied list
    // This effectively "locks" these rooms for this transaction
    const availableRoomsToAssign = await Room.find({
      category: category,
      status: { $ne: "maintenance" },
      _id: { $nin: occupiedRoomIds }, // Exclude occupied IDs
    })
      .limit(requestedRoomCount)
      .session(session);

    // 6. Final Availability Check
    if (availableRoomsToAssign.length < requestedRoomCount) {
      // If we don't have enough rooms, ABORT immediately.
      // This prevents the "Double Booking" race condition.
      throw new ApiError(
        409, // 409 Conflict
        `Sorry! Someone just booked the last room. Only ${availableRoomsToAssign.length} left.`,
      );
    }

    console.log("user=>", req.user);

    // 7. Create the Booking
    // Note: When providing a session, 'create' expects an ARRAY of documents.
    const newBooking = await Booking.create(
      [
        {
          user: req.user.userId,
          category,
          assignedRooms: availableRoomsToAssign.map((r) => r._id),
          checkIn: startDate,
          checkOut: endDate,
          guestDetails,
          priceBreakdown: {
            baseRoomCharge: priceBreakdown.baseRoomCharge || 0,
            extraGuestCharges: priceBreakdown.extraGuestCharges || {},
            addonServicesCharges: priceBreakdown.addonServicesCharges || {},
          },
          totalAmount,
          paymentStatus: "pending",
          bookingStatus: "confirmed",
        },
      ],
      { session },
    );

    // --- CRITICAL SECTION END ---

    // 8. Commit the Transaction
    // If we reach here, no conflicts occurred. Save everything.
    await session.commitTransaction();

    // 9. Post-Transaction Actions
    // newBooking is an array (because of the create syntax), so take the first item
    const confirmedBooking = newBooking[0];

    if (!confirmedBooking) {
      throw new ApiError(500, "Failed to generate booking");
    }

    console.log("Booking confirmed now will execute send email!");
    // Send email AFTER successful commit
    sendBookingConfirmation(req.user, confirmedBooking);

    res.success(201, confirmedBooking, "Booking confirmed successfully!");
  } catch (error) {
    // 10. Rollback on Failure
    // If any error occurred (validation, availability, DB error), undo everything.
    await session.abortTransaction();
    throw error;
  } finally {
    // 11. Always end the session
    session.endSession();
  }
});
