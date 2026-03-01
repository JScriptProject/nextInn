import dotenv from "dotenv";
dotenv.config();
import { RefreshToken } from "#models/refreshToken.model.js";
import { asyncHandler } from "#utils/asyncHandler.js";

const adminLogout = asyncHandler(async (req, res, next) => {
     const isProd = process.env.NODE_ENV === "production";
    console.log("Lets process the admin logout now!!");
    const {admin} = req.user ||{};
    console.log("REQQQ === ", req.admin);
    const adminId = req.admin.userId;

    //clear the tokens
    const clearToken = await RefreshToken.findByIdAndDelete(adminId);
    if(clearToken)
    {
        console.log("Token cleared!!");
    }

    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      path: "/",
    };

    res.clearCookie("access_token_admin", cookieOptions);
    res.clearCookie("refresh_token_admin", cookieOptions);
    //remove refresh token from admin
    res.success(200,null, "Logged out succesfully");
});

export { adminLogout };
