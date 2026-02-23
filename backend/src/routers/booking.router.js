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
import { isAdminAuthenticated } from "#middlewares/isAdminAuthenticated.js";
// Apply the middleware before the controller
router.post("/create", isAuthenticated, createBooking);
router.get("/get-by-user", isAuthenticated, getBookingByUser);
router.get("/check-availability", checkRoomsAvailability);
router.get("/all-booking",isAdminAuthenticated, getAllBookingsByDate);
router.post("/update-status", isAdminAuthenticated, updateBookingStatus);
router.post("/update-cancel", isAdminAuthenticated, cancelBooking);
export default router;
