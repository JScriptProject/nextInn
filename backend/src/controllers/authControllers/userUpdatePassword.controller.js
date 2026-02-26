import { User } from "#models/user.model.js";
import { ApiError } from "#utils/ApiError.js";
import { asyncHandler } from "#utils/asyncHandler.js";

import bcrypt from "bcrypt";

export const userUpdatePassword = asyncHandler(async (req, res, next) => {
  const { curr_pass, new_pass, new_pass_conf } = req.body;
  if (!curr_pass || !new_pass || !new_pass_conf) {
    throw new ApiError(401, "All fields mandatory!!");
  }

  const currentUser = await User.findById(req.user.userId);
  //  check the current passowrd
 
  const isOldPasswordMatch = await bcrypt.compare(
    curr_pass,
    currentUser.password,
  );
  
  if (!isOldPasswordMatch) {
    throw new ApiError(401, "Incorrect current passowrd enetered!");
  }

  currentUser.password = new_pass;
  const updateNewPassword = await currentUser.save();
  
  if (!updateNewPassword) {
    throw new ApiError(
      401,
      "Error while updating the password, please try again!!",
    );
  }
  res.success(200, "Password updated succesfully!");
});
