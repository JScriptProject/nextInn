import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "#utils/asyncHandler.js";
import crypto from "crypto";
import { OTP } from "#models/otp.model.js";
import { sendOTPEmail } from "#utils/emailService.js";
import { ApiError } from "#utils/ApiError.js";

export const sendEmail = asyncHandler(async (req, res, next) => {
  try {
    //first we will generate the password
    const adminEmail = process.env.ADMIN_EMAIL;
    console.log("Admin Email =>", adminEmail);
    const otpCode = crypto.randomInt(100000, 999999).toString();
    //store the otp in the database
    console.log("OTP COde=>", otpCode);
    await OTP.findOneAndDelete({ email: adminEmail });

    await OTP.create({
      email: adminEmail,
      otp: otpCode,
    });
    //trigger otp through the email
    await sendOTPEmail(adminEmail, otpCode);
    //send the response that OTP sent and timer started
    res.success(200,{}, "OTP Sent on email !");
  } catch (error) {
    const errorMessage =
      error.message || "An error occured while sending an OTP on email";
      console.log("error Message =>", errorMessage);
    console.error(error);
    throw new ApiError(500, errorMessage);
  }
});
