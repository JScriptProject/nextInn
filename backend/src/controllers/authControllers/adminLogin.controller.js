import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "#utils/asyncHandler.js";
import { Admin } from "#models/admin.model.js";
import { ApiError } from "#utils/ApiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RefreshToken } from "#models/refreshToken.model.js";

const adminLogin = asyncHandler(async (req, res, next) => {
  const body = req.body || {};
  const { email, password } = body;
  console.log("email =>", email);
  console.log("password =>", password);

  const isProd = process.env.NODE_ENV === "production";

  if (!email || !password) {
    throw new ApiError(500, "All fields are required");
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new ApiError(404, "Unable to find account for this email");
  }
  if(admin.role ==="superadmin")
  {
    throw new ApiError(500, "Can't login superAdmin here!!!")
  }
  const isPasswordCorrect = await bcrypt.compare(password, admin.password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }
  const payload = {
    userId: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };

  const access_token_admin = jwt.sign(
    payload,
    process.env.ADMIN_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXPIRY },
  );
  res.cookie("access_token_admin", access_token_admin, {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    maxAge: 1000 * 60 * 2,
  });

  const refresh_token_admin = jwt.sign(
    payload,
    process.env.ADMIN_REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.ADMIN_REFRESH_TOKEN_EXPIRY },
  );
  res.cookie("refresh_token_admin", refresh_token_admin, {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    maxAge: 1000 * 60 * 4,
  });

  //save the refresh token in DB

  let updateAdminRefreshToken = await RefreshToken.findOneAndUpdate({userId: admin._id},{
    userId: admin._id,
    adminRefreshToken:refresh_token_admin,
    expiresAt: new Date(Date.now() + 1000 * 60 * 4 ),
  },{new:true, upsert:true})

  res.success(200, admin, "Admin logged in successfully!");
});

export { adminLogin };
