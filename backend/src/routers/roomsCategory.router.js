import express from 'express';
import { getAllRoomCategories } from '../controllers/getAllRoomCategories.controller.js';
import { updateRoomCategoryData } from "../controllers/updateRoomcategory.controller.js"
import {addAmenities} from '../controllers/addAmenities.controller.js'
const router = express.Router();

router.get('/get-all',getAllRoomCategories);
router.put('/update',updateRoomCategoryData);
router.put('/test', addAmenities);
export default router;

