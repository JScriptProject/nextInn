import express from "express";
import { getAllRoomCategories } from "#controllers/roomCategoryController/getAllRoomCategories.controller.js";
import { updateRoomCategoryData } from "#controllers/roomCategoryController/updateRoomcategory.controller.js";
import { getRoomCategoryById } from "#controllers/roomCategoryController/getRoomCategoryById.controller.js";
import { uploadCategoryImages } from "#controllers/roomCategoryController/uploadCategoryImages.controller.js";
import { upload } from "#middlewares/multer.middleware.js";
import { isAdminAuthenticated } from "#middlewares/isAdminAuthenticated.js";

const router = express.Router();

router.get("/get-all", getAllRoomCategories);
router.put("/update", updateRoomCategoryData);
router.post("/get-room", getRoomCategoryById);
router.put(
  "/upload-images",
  isAdminAuthenticated,
  upload.fields([
    { name: "bannerImg", maxCount: 1 },
    { name: "roomImages", maxCount: 4 },
  ]),
  uploadCategoryImages,
);

export default router;
