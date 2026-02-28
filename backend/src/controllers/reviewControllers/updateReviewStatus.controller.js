import { Review } from "#models/review.model.js";
import { ApiError } from "#utils/ApiError.js";
import { asyncHandler } from "#utils/asyncHandler.js";

export const updateReviewStatus = asyncHandler(async (req, res, next) => {
  const { reviewId, reviewStatus } = req.body || {};

  if (!reviewId || !reviewStatus) {
    throw new ApiError(400, "ReviewId and review status needed!");
  }
 
  const selectedReview = await Review.findById(reviewId);
  if (!selectedReview) {
    throw new ApiError(404, "No review found!");
  }
  console.log("Selected Review =>", selectedReview)
  if (selectedReview.status === "pending") {
    throw new ApiError(400, "Guest not yet finished review submission!");
  }
  if(reviewStatus === "pending")
  {
    throw new ApiError(400,"Can not change active review back to pending");
  }
  selectedReview.status = reviewStatus;
  console.log("Before update selectedReview=>", selectedReview);
  const updatedReview = await selectedReview.save();
  console.log("Updated Review", updatedReview);
  res.success(200, updatedReview, "Review status updated succesfully!");
});
