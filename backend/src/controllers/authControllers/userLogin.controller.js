import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from '../../models/user.model.js';
import { ApiError } from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userLogin = asyncHandler(async(req, res, next)=>{
   console.log("I am in the auth controller of login");
    const body = req.body || {};
    const  {email, password} = body;

    const isProd = process.env.NODE_ENV === "production";
    console.log("isProd=>", isProd);

    //check if any user available with same 
    const user = await User.findOne({email});
  
    if(!user){
        throw new ApiError(404, "Unable to find account for this email");
    }

    //check if password is correct

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect)
    {
        throw new ApiError(401, "Invalid password");
    }

    //create a payload

    const payload = {
        id:user._id,
        firstname:user.firstname,
        lastname:user.lastname,
        email:user.email,
        mobile:user.mobile,
        city:user.city,
    }

    const access_token  = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
    res.cookie("access_token", access_token, {
        httpOnly:true,
        sameSite:isProd?"none":"lax",
        secure:isProd,
        maxAge:1000*60*2
    })

    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY});
    res.cookie("refresh_token", refresh_token, {
        httpOnly:true,
        sameSite:isProd? "none":"lax",
        secure:isProd,
        maxAge:1000*60*60*24*10
    });
    res.success(200, user, "User logged in successfully!");

})

export { userLogin }