import express from 'express';
import { roomController } from '../controllers/room.controller.js';
import { roomControllerPost } from '../controllers/roomPost.controller.js'
const router = express.Router();

router.get("/rooms", roomController);
router.post("/rooms", roomControllerPost);

export default router;