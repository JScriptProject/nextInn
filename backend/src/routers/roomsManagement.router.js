import express from "express";
import { getAllRooms } from "#controllers/rooms/getAllRooms.controller.js";
import { addRoom } from "#controllers/rooms/addRoom.controller.js";
import { deleteRoom } from "#controllers/rooms/deleteRoom.controller.js";
import { isAdminAuthenticated } from "#middlewares/isAdminAuthenticated.js";

const router = express.Router();
router.post("/add-room", addRoom);
router.get("/all", isAdminAuthenticated, getAllRooms);
router.delete("/delete", deleteRoom);

export default router;
