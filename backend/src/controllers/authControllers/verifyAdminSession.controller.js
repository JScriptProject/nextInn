import { asyncHandler } from "../../utils/asyncHandler.js";
import { Admin } from "../../models/admin.model.js";

const verifyAdminSession = asyncHandler(async (req, res, next) => {
  console.log("I have executed from here!!! VERIFY ADMIN CONTROLLER !!");
  const admin = await Admin.findById(req.admin._id).select("-password");
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  } else {
    res.success(200, admin, "Session verified successfully!");
  }
});

export { verifyAdminSession };
