import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Admin } from "../../models/admin.model.js";

const adminRefreshSession = asyncHandler(async (req, res, next) => {
  const refresh_token_admin = req.cookies?.refresh_token_admin;
  const isProd = process.env.NODE_ENV === "production";
  if (!refresh_token_admin) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }
  const decoded = jwt.verify(
    refresh_token_admin,
    process.env.REFRESH_TOKEN_SECRET
  );
  const admin = await Admin.findById(decoded._id).select("-password");
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }
  const access_token_paylod = {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };

  const access_token_admin = jwt.sign(
    access_token_paylod,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  res.cookies("access_token_admin", access_token_admin, {
    httpOnly: true,
    sameSite: prod ? "none" : "lax",
    secure: prod,
    maxAge: 1000 * 60 * 2,
  });
  return res.success(200, admin, "Session refreshed successfully!");
});

export { adminRefreshSession };
