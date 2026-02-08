import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RefreshToken } from "../../models/refreshToken.model.js";

const userLogin = asyncHandler(async (req, res, next) => {
  console.log("I am in the auth controller of login");
  const body = req.body || {};
  const { email, password } = body;

  const isProd = process.env.NODE_ENV === "production";

  //check if any user available with same
  const user = await User.findOne({ email });
  console.log("Inside Controller user info =>", user);
  if (!user) {
    throw new ApiError(404, "Unable to find account for this email");
  }

  //check if password is correct

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }

  //create a payload

  const payload = {
    userId: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    mobile: user.mobile,
    city: user.city,
  };

  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
  res.cookie("access_token", access_token, {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd ? true: false,
    path: "/",
    maxAge: 1000 * 60 * 60 * 24,
  });

  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd ? true : false,
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 10,
  });

  //Save the refresh token into the database

  let updateRefreshToken = await RefreshToken.findOneAndUpdate(
    { userId: user._id },
    {
      userId: user._id,
      refreshToken: refresh_token,
      expiresAt: new Date(Date.now() + 24*60 * 60 * 1000),
    },
    {new: true, upsert: true}
  );
  
  console.log("Refresh Token =", updateRefreshToken);

  res.success(200, user, "User logged in successfully!");
});

export { userLogin };
