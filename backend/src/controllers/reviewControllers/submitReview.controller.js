import { Review } from "#models/review.model.js";
import { ApiError } from "#utils/ApiError.js";
import { asyncHandler } from "#utils/asyncHandler.js";

export const submitReview = asyncHandler(async (req, res, next) => {
  const {
    token: reviewToken,
    rating: newRating,
    comment: reviewComment = "",
  } = req.body || {};
  console.log("Token", reviewToken);
  console.log("rating", newRating);
  console.log("comment", reviewComment);
  const updatedRating = await Review.findOneAndUpdate(
    { token: reviewToken },
    {
      $set: {
        comment: reviewComment,
        status: "submitted",
        rating: newRating,
      },
    },
    { new: true, runValidators: true },
  );
  if(!updatedRating)
  {
    throw new ApiError(400, "Error while updating the rating, try again!")
  }
  const newStatus = updatedRating.status
  console.log("UPDATED=>", updatedRating);
  res.success(200,{status:newStatus}, "Thanks for providing your review!");
});
