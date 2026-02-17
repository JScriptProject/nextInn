import { asyncHandler } from "#utils/asyncHandler.js";
import { ApiError } from "#utils/ApiError.js";
import { Booking } from "#models/booking.model.js";

export const updateBookingStatus = asyncHandler(async (req, res, next) => {
  const { bookingStatus, paymentStatus, idx } = req.body;
  if (idx === undefined) {
    throw new ApiError(400, "Booking id is needed");
  }

  const booking = await Booking.findById(idx);
  if (!booking) throw new ApiError(404, "Booking not found!!");
   const errors =[];
   if(bookingStatus){
      try {
      booking.updateBookingStatus(bookingStatus);

      } catch (err) {
         errors.push(`Booking status: ${err.message}`);   
      }
   }
   if(paymentStatus)
   {
      try {
         booking.updatePaymentStatus(paymentStatus);
      } catch (err) {
         errors.push(`Payment status: ${err.message}`);
      }
   }
   const updatedBooking = await booking.save();
   if (errors.length > 0) {
     return res.success(
       200,
       updateBookingStatus,
       `partial updated. Success saved, but some errors occured ${errors.join(" | ")}`,
     );
   }
   res.success(200, updatedBooking, "All status updated successfully!");
});
