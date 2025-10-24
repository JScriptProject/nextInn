import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"; 

const userSignUp = asyncHandler(async (req, res, next) => {
  const body = req.body || {};
  console.log(body);
  if (body) {
    res.success(
      new ApiResponse(
        200,
        body,
        "SignUp Data Recieved succesfully "
      )
    );
  }
});

export {userSignUp}