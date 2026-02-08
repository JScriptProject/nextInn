import express from "express";
const router = express.Router();
import { createBooking } from "../controllers/booking.controller.js";
// Import your middleware
import { isAuthenticated } from "../midlewares/isAuthenticated.js";
import { getBookingByUser } from "../controllers/getBookingByUser.controller.js";
import { checkRoomsAvailability } from "../controllers/checkRoomsAvailability.controller.js";

// Apply the middleware before the controller
router.post("/create", isAuthenticated, createBooking);
router.get("/get-by-user", isAuthenticated, getBookingByUser);
router.get("/check-availability", checkRoomsAvailability);

export default router;
