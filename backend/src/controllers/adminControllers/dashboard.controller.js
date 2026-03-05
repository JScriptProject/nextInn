import { asyncHandler } from "../../utils/asyncHandler.js";
import { Room } from "../../models/room.models.js";
import { Booking } from "../../models/booking.model.js";
import { Review } from "../../models/review.model.js";
import { Log } from "../../models/log.model.js";
import { Admin } from "../../models/admin.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getDashboardData = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Aggregation for booked rooms active today
  const bookedRoomsCountPipeline = [
    {
      $match: {
        bookingStatus: { $in: ["confirmed", "checked-in"] },
        checkIn: { $lt: tomorrow },
        checkOut: { $gte: today },
      },
    },
    { $project: { numberOfRooms: { $size: "$assignedRooms" } } },
    { $group: { _id: null, totalBookedRooms: { $sum: "$numberOfRooms" } } },
  ];

  // Aggregation for rooms checking in today
  const todayCheckinsCountPipeline = [
    {
      $match: {
        checkIn: { $gte: today, $lt: tomorrow },
      },
    },
    { $project: { numberOfRooms: { $size: "$assignedRooms" } } },
    { $group: { _id: null, totalCheckinRooms: { $sum: "$numberOfRooms" } } },
  ];

  const [
    totalRooms,
    bookedRoomsResult,
    pendingReviewsCount,
    todayCheckinsResult,
    recentBookings,
    adminLogs,
    cleanRoomsCount,
    dirtyRoomsCount,
    maintenanceRoomsCount,
    totalAdminsCount,
  ] = await Promise.all([
    Room.countDocuments(),
    Booking.aggregate(bookedRoomsCountPipeline),
    Review.countDocuments({ status: "Pending" }),
    Booking.aggregate(todayCheckinsCountPipeline),
    Booking.find().sort({ createdAt: -1 }).limit(5),
    Log.find().sort({ createdAt: -1 }).limit(5),
    Room.countDocuments({ cleaning_status: "clean", status: { $ne: "maintenance" } }),
    Room.countDocuments({ cleaning_status: "dirty", status: { $ne: "maintenance" } }),
    Room.countDocuments({ status: "maintenance" }),
    Admin.countDocuments({ role: 'admin' }),
  ]);

  const bookedRoomsCount = bookedRoomsResult.length > 0 ? bookedRoomsResult[0].totalBookedRooms : 0;
  const todayCheckinsCount = todayCheckinsResult.length > 0 ? todayCheckinsResult[0].totalCheckinRooms : 0;
  const availableRoomsCount = totalRooms - bookedRoomsCount;

  const dashboardData = {
    kpis: {
      bookedRooms: bookedRoomsCount,
      availableRooms: availableRoomsCount,
      pendingReviews: pendingReviewsCount,
      todayCheckins: todayCheckinsCount,
      totalAdmins: totalAdminsCount,
    },
    recentBookings: recentBookings.map((booking) => ({
      id: booking.bookingId,
      name: `${booking.user?.firstname} ${booking.user?.lastname}`,
      status: booking.bookingStatus,
      room: booking.category.name,
    })),
    roomStatus: {
      clean: cleanRoomsCount,
      dirty: dirtyRoomsCount,
      maintenance: maintenanceRoomsCount,
    },
    totalAdminsCount,
    superAdminLogs: adminLogs.map((log) => ({
      action: log.actionType,
      desc: log.description,
      time: log.createdAt,
    })),
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, dashboardData, "Dashboard data fetched successfully")
    );
});

export { getDashboardData };
