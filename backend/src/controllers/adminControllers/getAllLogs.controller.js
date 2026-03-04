import { Admin } from "#models/admin.model.js";
import { Log } from "#models/log.model.js";
import { ApiError } from "#utils/ApiError.js";
import { asyncHandler } from "#utils/asyncHandler.js";

export const getAllLogs = asyncHandler(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 15;
  const currentPage = parseInt(req.query.currentPage) || 1;
  const filterModule = req.query.filterModule || "All";
  const searchTerm = req.query.searchTerm || "";

  const skip = (currentPage - 1) * limit;

  const query = {};

  // 1. FIXED: Removed .toLowerCase() so it matches your DB ("Admins", "Rooms", etc.)
  if (filterModule && filterModule !== "All") {
    query.module = filterModule;
  }

  if (searchTerm && searchTerm !== "") {
    const searchedAdmin = await Admin.find({
      name: { $regex: searchTerm, $options: "i" },
    }).select("_id");

    // 2. FIXED: Map the array of objects into a flat array of IDs for $in
    const adminIds = searchedAdmin.map((admin) => admin._id);
    query.admin = { $in: adminIds };
  }

  // 3. FIXED: Changed sort to -1 so newest logs appear at the top
  const logs = await Log.find(query)
    .populate({ path: "admin", select: "name email" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // 4. FIXED: Passed the 'query' object so it only counts searched/filtered results!
  const totalLogs = await Log.countDocuments(query);
  const totalPages = Math.ceil(totalLogs / limit);

  if (!logs) {
    throw new ApiError(404, "Unable to find the logs");
  }

  res.success(
    200,
    { logs, pagination: { totalLogs, totalPages, currentPage, limit } },
    "All logs fetched succesfully!",
  );
});
