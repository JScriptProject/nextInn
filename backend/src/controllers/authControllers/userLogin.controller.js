import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from '../../models/user.model.js';
import { ApiError } from "../../utils/ApiError.js";
import bcrypt from "bcrypt";

const userLogin = asyncHandler(async(req, res, next)=>{
   console.log("I am in the auth controller of login");
    const body = req.body || {};
    const  {email, password} = body;

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

    res.success(200, user, "User logged in successfully!");

})

export { userLogin }