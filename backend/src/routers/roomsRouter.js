import express from "express";
import { roomController } from "../controllers/room.controller.js";
import { roomControllerPost } from "../controllers/roomPost.controller.js";
import showUsers from "../controllers/showUsers.controller.js";
import addUser from "../controllers/addUser.controller.js";
import { upload } from "../midlewares/multer.middleware.js";

const router = express.Router();
router.get("/rooms", roomController);
router.post("/rooms", roomControllerPost);
// router.post(
//   "/user",
//   upload.fields([
//     {
//       name: "banner_image",
//       maxCount: 1,
//     },
//     { name: "room_image", maxCount: 5 },
//   ]),
//   addUser
// );
router.post("/user", addUser);
router.get("/user", showUsers);

export default router;
