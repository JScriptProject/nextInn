import { asyncHandler } from "../../utils/asyncHandler.js";
import { Admin } from "../../models/admin.model.js";
import { ApiError } from "../../utils/ApiError.js";


const adminSignUp = asyncHandler(async(req, res, next)=>{
     const body = req.body || {};
     const {name, email, password, role} = body;
     console.log("req.body =>", req.body);
     if(!name || !email || !password || !role)
     {
        throw new ApiError(500, "All fields are required");
     }

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     
     if(!emailRegex.test(email))
     {
        throw new ApiError(500, "Invalid email format");
     }

    const newAdmin = new Admin({
      name,
      email,
      password,
      role
    })

    const createAdmin = await newAdmin.save();
    if(!createAdmin)
    {
      throw new ApiError(500, "Unable to create admin");
    }

    console.log("Created Admin =>", createAdmin);
    res.success(201, createAdmin, "Admin created successfully!");
})

export {adminSignUp};

