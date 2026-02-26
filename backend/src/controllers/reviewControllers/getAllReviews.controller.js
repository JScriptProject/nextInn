import { asyncHandler } from "#utils/asyncHandler.js";

export const getAllReviews = asyncHandler((req, res, next) => {
    const alldata = req.params;
    console.log("AllDTATA", req.params)
  res.success(200, "All reviews fetched!");
});
