import { asyncHandler } from "../utils/asyncHandler.js";

const showUsers = asyncHandler((req, res, next) => {
  res.success(200, "Hello from the Show User");
});

export default showUsers;
