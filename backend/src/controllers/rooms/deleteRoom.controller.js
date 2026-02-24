import { Room } from "#models/room.models.js";
import { ApiError } from "#utils/ApiError.js";
import { asyncHandler } from "#utils/asyncHandler.js";


export const deleteRoom = asyncHandler(async(req, res, next)=>{
    const roomId = req.params.roomId;
    if(!roomId)
    {
        throw new ApiError(404, "Room id neeedd to delete room");
    }

    const deletedRoom = await Room.findByIdAndDelete(roomId);
    if(deleteRoom)
    {
        console.log("Deleted ROom=>", deleteRoom);
        res.success(201, deleteRoom, "Room Deleted Successfully!");
    }
})