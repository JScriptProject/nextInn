import { asyncHandler } from "../utils/asyncHandler.js";

import {RoomCategory} from '../models/roomCategory.model.js';

const testRooms = asyncHandler(async(req, res, next)=>{

    const data = await RoomCategory.find();
  
    console.log(data);
    res.status(200).json(data);

})

export {testRooms};