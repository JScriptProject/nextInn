import express from "express";
import { getAllRoomCategories } from "#controllers/roomCategoryController/getAllRoomCategories.controller.js";
import { updateRoomCategoryData } from "#controllers/roomCategoryController/updateRoomcategory.controller.js";
import { getRoomCategoryById } from "#controllers/roomCategoryController/getRoomCategoryById.controller.js";
const router = express.Router();

router.get("/get-all", getAllRoomCategories);
router.put("/update", updateRoomCategoryData);
router.post("/get-room",  getRoomCategoryById);

export default router;
