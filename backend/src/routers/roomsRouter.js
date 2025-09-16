import express from 'express';
import { roomController } from '../controllers/roomController.js';
import { roomControllerPost } from '../controllers/roomControllerPost.js'
const router = express.Router();

router.get("/rooms", roomController);
router.post("/rooms", roomControllerPost);

export default router;