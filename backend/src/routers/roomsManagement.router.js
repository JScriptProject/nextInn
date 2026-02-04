import express from "express";
import { addRoom } from "../controllers/addRoom.controller.js";

const router = express.Router();
router.post("/add-room",addRoom);

export default router;