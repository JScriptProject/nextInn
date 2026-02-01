import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";


const isAdminAuthenticated = asyncHandler(async(req, res, next)=>{
    console.log("Request cookies", req.cookies);
    try {
         const token = req.cookies?.access_token_admin;
         if (!token) {
           return next(new ApiError(401, "Unauthorized: No token provided"));
         }
         const decoded = jwt.verify(
           token,
           process.env.ADMIN_ACCESS_TOKEN_SECRET,
         );
         req.admin = decoded;
         next();
    } catch (error) {
        console.error("Error in isAuthenticated", error);
        return next(new ApiError(401, "Unauthorized: Invalid token"));
    }
})


export {isAdminAuthenticated}