import express from "express";
const router = express.Router();
import {
  createBooking,
  getBookingByUser,
  getAllBookingsByDate,
  updateBookingStatus,
  cancelBooking,
} from "#controllers/bookingControllers/index.js";
// Import your middleware
import { isAuthenticated } from "#middlewares/isAuthenticated.js";
import { checkRoomsAvailability } from "#controllers/checkRoomsAvailability.controller.js";
// Apply the middleware before the controller
router.post("/create", isAuthenticated, createBooking);
router.get("/get-by-user", isAuthenticated, getBookingByUser);
router.get("/check-availability", checkRoomsAvailability);
router.get("/all-booking", getAllBookingsByDate);
router.post("/update-status", updateBookingStatus);
router.post("/update-cancel", cancelBooking);
export default router;
