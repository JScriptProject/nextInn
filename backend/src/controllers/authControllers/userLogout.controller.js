import dotenv from "dotenv";
dotenv.config();
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { RefreshToken } from "../../models/refreshToken.model.js";

const userLogout = asyncHandler(async (req, res, next) => {

  try {
    const isProd = process.env.NODE_ENV === "production";
    console.log("Request object in logout", req.user);
    const cookiesData = req.cookies;

    console.log("Cookies Data:", cookiesData);

    // delete the refresh token from db
    const currentToken = cookiesData?.refresh_token;
    const deleteResponse = await RefreshToken.findOneAndDelete({ refreshToken: currentToken });
    console.log("Logout controller: deleteRespononse=>". deleteResponse);
    
    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      path: "/",
    };
    
    res.clearCookie("access_token", cookieOptions);
    res.clearCookie("refresh_token", cookieOptions);
    console.log("User Logged out");
    res.success(200, "User logged out successfully!");
    
  } catch (error) {
    console.error("error occured while logout!", error);
    throw new ApiError(500, "Error while Logout!");
  }
  
});

export { userLogout };
