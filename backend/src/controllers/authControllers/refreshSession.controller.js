import dotenv from "dotenv";
dotenv.config();
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";

const refreshSession = asyncHandler(async (req, res, next) => {
  // check if refresh token there or not
  const refresh_token = req.cookies?.refresh_token;
  const isProd = process.env.NODE_ENV === "production";

  if (!refresh_token) {
    next(new ApiError(401, "Unauthorized: No token provided"));
  }

  //decode the payload info from refresh token
  const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);

  //get the user details from the database
  const user = await User.findById(decoded._id).select("-password");

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  // generate the access token and attach that to cookies
  const newAcessToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  res.cookie("access_token", newAcessToken, {
    httpOnly: true,
    sameSite: isProd? "none" : "lax",
    secure: isProd,
    maxAge: 1000 * 60 * 2,
  });

  return res.success(200, user, "Session refreshed successfully!");
});


export {refreshSession};