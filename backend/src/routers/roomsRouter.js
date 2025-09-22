import express from "express";
import { roomController } from "../controllers/room.controller.js";
import { roomControllerPost } from "../controllers/roomPost.controller.js";
import showUsers from "../controllers/showUsers.controller.js";
import addUser from "../controllers/addUser.controller.js";
import { upload } from "../midlewares/multer.middleware.js";
const router = express.Router();
router.get("/rooms", roomController);
router.post("/rooms", roomControllerPost);
router.get("/user", showUsers);
router.post(
  "/user",
  upload.fields([
    { name: "bannerImg", maxCount: 1 },
    { name: "roomImgs", maxCount: 3 },
  ]),
  addUser
);

export default router;
