import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Booking } from "../../models/booking.model.js";

export const getBookingByUser = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(404, "User not found!!");
  }
  const userId = user.userId;

  const userBooking = await Booking.find({ user: userId });
  if (!userBooking) {
    throw new ApiError(404, "No Booking found for this user!");
  }

  res.success(200, userBooking, "Succefully fetched all bookings for user!");
});
