import dotenv from "dotenv";
dotenv.config();
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken';


const isAuthenticated = async(req, res, next)=>{
       console.log("request.cookies", req.cookies);
    try {
        const token = req.cookies?.access_token;
        if(!token)
        {
          return next(new ApiError(401, "Unauthorized: No token provided"));
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("decoded", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in isAuthenticated", error);
        return next(new ApiError(401, "Unauthorized: Invalid token"));
    }
}

export { isAuthenticated }