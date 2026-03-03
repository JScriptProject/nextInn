import { Room } from "#models/room.models.js";
import { ApiError } from "#utils/ApiError.js";
import { asyncHandler } from "#utils/asyncHandler.js";
import { createAuditLog } from "#utils/auditLogger.js";
export const updateRoom = asyncHandler(async (req, res, next) => {
  const roomId = req.params.roomId;
  const roomData = req.body || {};
  if (!roomData || !roomId) {
    throw new ApiError(404, "All fields manadatory!");
  }

  const roomObj = await Room.findById(roomId);
  if (roomObj) {
    roomObj.set(roomData);
    const updatedRoomData = await roomObj.save();
    console.log("ROOM", roomObj);
    console.log("Room Id =>", roomId);
    console.log("Room Data =>", roomData);
    console.log("Updated Room=>",updatedRoomData);
     createAuditLog(
       req.admin.userId,
       "UPDATE",
       "Rooms",
       `Room from information updated `,
     );
    res.success(201, updatedRoomData ,"Room updated successfully!");
  }
});
