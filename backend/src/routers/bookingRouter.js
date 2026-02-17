import express from "express";
const router = express.Router();
import { createBooking } from "../controllers/booking.controller.js";
// Import your middleware
import { isAuthenticated } from "../midlewares/isAuthenticated.js";
import { getBookingByUser } from "../controllers/getBookingByUser.controller.js";
import { checkRoomsAvailability } from "../controllers/checkRoomsAvailability.controller.js";
import { getAllBookingsByDate } from "#controllers/getAllBookingByDate.controller.js";
import { updateBookingStatus } from "#controllers/updateBookingStatus.controller.js";
import { cancelBooking } from "#controllers/cancelBooking.controller.js";
// Apply the middleware before the controller
router.post("/create", isAuthenticated, createBooking);
router.get("/get-by-user", isAuthenticated, getBookingByUser);
router.get("/check-availability", checkRoomsAvailability);
router.get("/all-booking", getAllBookingsByDate);
router.post("/update-status", updateBookingStatus);
router.post("/update-cancel", cancelBooking);
export default router;
