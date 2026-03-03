import { asyncHandler } from "#utils/asyncHandler.js";
import { Admin } from "#models/admin.model.js";
import { ApiResponse } from "#utils/ApiResponse.js";

const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({ role: { $ne: "superadmin" } }).select(
    "-password -createdAt -updatedAt -__v"
  );

  return res.success(200, admins, "Admins fetched successfully");
});

export { getAllAdmins };
