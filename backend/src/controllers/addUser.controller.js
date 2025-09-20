import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";

const addUser = asyncHandler( async(req, res, next)=>{
    const {name, email, password} = req.body;
    
    if(!name || !email || !password){
        return next(new ApiError(400,"All fields are required"));
    }
    const filesData = req.files;
    console.log("filesData === ",filesData);
   console.log("Data added successfully", name,email,password);
  
res.json({message: `User added successfully`, data:{
    name,
    email,
    password,
    bannerImg: filesData?.bannerImg?.[0]?.filename || null,
    roomImgs: filesData?.roomImgs?.map(file => file.filename) || []
}});
})

export default addUser;