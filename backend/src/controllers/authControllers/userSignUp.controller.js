import { asyncHandler } from "#utils/asyncHandler.js";
import { ApiError } from "#utils/ApiError.js"; 
import { User } from '#models/user.model.js';


const userSignUp = asyncHandler(async (req, res, next) => {
  const body = req.body || {};
  const {firstname, lastname, email, mobile, city, password} = body;
 
  //VALIDATIONS 
  //check if any field is empty
  if(!firstname || !lastname || !email || !mobile || !city || !password)
  {
    throw new ApiError(500, "All fields are required");
  }

  //check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email))
  {
    throw new ApiError(500, "Invalid email format");
  }
  
  //check if mobile is valid
  if (!mobile || !/^\+?\d{7,15}$/.test(mobile)) {
  throw new ApiError(400, "Invalid mobile number");
}

const newUser = new User({
  firstname,
  lastname,
  email,
  mobile,
  city,
  password
});

const createdUser = await newUser.save();
if(!createdUser)
{
  throw new ApiError(500, "Unable to create user");
}


res.success(201, createdUser, "User created successfully!");

});

export {userSignUp}