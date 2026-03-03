import { asyncHandler } from "#utils/asyncHandler.js";
import { ApiError } from "#utils/ApiError.js";

const isSuperAdmin = asyncHandler(async (req, res, next) => {
  try {
    if (req.admin.role !== "superadmin") {
      return next(new ApiError(403, "Forbidden: You are not a superadmin"));
    }
    next();
  } catch (error) {
    console.error("Error in isSuperAdmin =>>", error);
    return next(new ApiError(401, "Unauthorized: Invalid token"));
  }
});

export { isSuperAdmin };
