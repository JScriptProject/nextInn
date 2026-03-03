import { Room } from "#models/room.models.js";
import { ApiError } from "#utils/ApiError.js";
import { asyncHandler } from "#utils/asyncHandler.js";
import { createAuditLog } from "#utils/auditLogger.js";

export const deleteRoom = asyncHandler(async(req, res, next)=>{
    const roomId = req.params.roomId;
    if(!roomId)
    {
        throw new ApiError(404, "Room id neeedd to delete room");
    }

    const deletedRoom = await Room.findByIdAndDelete(roomId);
    if(deleteRoom)
    {
        createAuditLog(
            req.admin.userId,
            "DELETE",
            "Rooms",
            `Deleted Room `,
          );
        res.success(201, deleteRoom, "Room Deleted Successfully!");
    }
})