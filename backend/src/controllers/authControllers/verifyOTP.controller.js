import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "../../utils/asyncHandler.js";
import { OTP } from "../../models/otp.model.js";

export const verifyOTP = asyncHandler(async (req, res, next) => {
  const { otp } = req.body || {};
  //get the OTP from DB
  const dbRecord = await OTP.findOne({ email: process.env.ADMIN_EMAIL });
  const dbOTP = dbRecord.otp;
  if (otp.toString() === dbOTP) {
    res.success(200, { success: true }, "OTP Matched");
  } else {
    res.success(400, { success: false }, "OTP not Matched");
  }
});
