import { Review } from "#models/review.model.js";
import { ApiError } from "#utils/ApiError.js";
import { asyncHandler } from "#utils/asyncHandler.js";

export const checkReview = asyncHandler(async(req, res, next) => {
  const {tokenValue} = req.params;
  if(!tokenValue)
  {
    throw new ApiError(404,"Opps token is missing!!");
  }

  const fetchedReview = await Review.findOne({token:tokenValue});
  if(!fetchedReview)
  {
    throw new ApiError(404, "No Review Sent!");
  }
  const reviewStatus = fetchedReview.status;
  console.log("REview ststus=>", reviewStatus);
  res.success(200,{status:reviewStatus}, "Review fetched succesfully!");
});


