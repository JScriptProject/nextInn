import dotenv from "dotenv";
dotenv.config();
import { ApiError } from "#utils/ApiError.js";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      return next(new ApiError(401, "Unauthorized: No Access token provided"));
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    req.user = decoded;
   
    return next();
  } catch (error) {
    console.error("Error in isAuthenticated", error.message);
    return next(
      new ApiError(401, "Unauthorized: Invalid or expired access token"),
    );
  }
};

export { isAuthenticated };
