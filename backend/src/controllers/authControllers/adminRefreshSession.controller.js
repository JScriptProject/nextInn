import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Admin } from "../../models/admin.model.js";

const adminRefreshSession = asyncHandler(async (req, res, next) => {
  const refresh_token_admin = req.cookies?.refresh_token_admin;
  const isProd = process.env.NODE_ENV === "production";
  console.log("Admin Refresh Token ==>", refresh_token_admin);
  console.log("Admin cookies=>", req.cookies);
  if (!refresh_token_admin) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }
  let decoded;
  try {
    decoded = jwt.verify(
      refresh_token_admin,
      process.env.ADMIN_REFRESH_TOKEN_SECRET,
    );
  } catch (error) {
    return next(
      new ApiError(401, "Unauthorized: Invalid or expired refresh token"),
    );
  }
  
  const admin = await Admin.findById(decoded.userId).select("-password");
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }
  console.log("WE FOUND ADMIN=>", admin);
  const access_token_paylod = {
    userId: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };

  const access_token_admin = jwt.sign(
    access_token_paylod,
    process.env.ADMIN_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXPIRY },
  );

  res.cookie("access_token_admin", access_token_admin, {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd ? true : false,
    maxAge: 1000 * 60 * 2,
  });
  return res.success(200, admin, "Session refreshed successfully!");
});

export { adminRefreshSession };
