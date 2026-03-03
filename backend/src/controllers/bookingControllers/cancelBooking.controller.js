import { Booking } from "#models/booking.model.js";
import { ApiError } from "#utils/ApiError.js";
import { asyncHandler } from "#utils/asyncHandler.js";
import { createAuditLog } from "#utils/auditLogger.js";

export const cancelBooking = asyncHandler(async(req, res, next)=>{
    const {idx} = req.body || {};
    if(!idx) throw new ApiError(400, "All details required, id missing");

    const booking = await Booking.findById(idx);
    if(!booking)
    {
        throw new ApiError(400,"Unable to find the booking");
    }
    try {
        booking.updateBookingStatus("cancelled");
        const modifiedBooking = await booking.save();
        createAuditLog(
            req.admin.userId,
            "DELETE",
            "Bookings",
            `Booking manually cancelled by admin `,
          );
        res.success(200, modifiedBooking, "Booking has been cancelled!")
    } catch (error) {
        throw new ApiError(400, error.message);
    }
})