import { Booking } from "#models/booking.model.js";
import { asyncHandler } from "#utils/asyncHandler.js";
import { ApiError } from "#utils/ApiError.js";

export const getAllBookingsByDate = asyncHandler(async (req, res, next) => {
  console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    throw new ApiError(404, "Start or End Date missing!");
  }
  console.log("Start Date=>", startDate);

  const bookingData = await Booking.find({
    checkIn: { $gte: new Date(startDate) },
    checkOut: { $lte: new Date(endDate) },
  });
  console.log("Here inside the get all booking controller", bookingData);
  console.log("Found Bookings count =>", bookingData.length);

  res.success(200, bookingData, "Fetched data");
});
