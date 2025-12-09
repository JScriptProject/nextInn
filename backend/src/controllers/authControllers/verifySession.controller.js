import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../models/user.model.js";
const verifySession = asyncHandler(async (req, res, next) => {
  //pull the user info from DB and check if the same user logged in
    console.log("Request object", req.user);
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.success(200, user, "Session verified successfully!");
});

export { verifySession };
