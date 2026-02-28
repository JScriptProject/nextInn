import { Review } from "#models/review.model.js";
import { ApiError } from "#utils/ApiError.js";
import { asyncHandler } from "#utils/asyncHandler.js";


export const deleteReview = asyncHandler(async(req, res, next)=>{

    const {reviewId} = req.params;
    console.log("REVIEW ID =>", reviewId)
    if(!reviewId)
    {
        throw new ApiError(400, "Review Id is mandatory to delete the review");
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if(!deleteReview)
    {
        throw new ApiError(400, "Error while deleting the review");
    }
   console.log("THE DELETED REVIEW=>", deletedReview);
    //find review and delete
    res.success(200,deleteReview,  "Review deleted successfully!!");
});