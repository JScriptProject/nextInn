import { Review } from "#models/review.model.js";
import { ApiError } from "#utils/ApiError.js";
import { asyncHandler } from "#utils/asyncHandler.js";


export const toggleFeaturedReview = asyncHandler(async(req, res, next)=>{
    const { reviewId, isFeaturedReview } = req.body || {};
    console.log("REVIEW ID=>", reviewId);
    console.log("isFeaturedReview=>", isFeaturedReview);

    if (!reviewId || isFeaturedReview === undefined) {
      throw new ApiError(400, "Mandatory data missing to update flag.");
    }
    const featuredReview = await Review.find({ isFeatured :true}).select("_id");
    const countOfFeaturedReview = featuredReview?.map((fr)=> fr._id);
    console.log("featuredReview", featuredReview);
    console.log("countOfFeaturedReview", countOfFeaturedReview.length);
    if(countOfFeaturedReview.length >=3)
    {
      throw new ApiError(400, "Maximum 3 reviews can be featured!!")
    }

    const toggledReview = await Review.findOne({_id:reviewId});
    if(!toggledReview)
    {
       throw new ApiError(400, "No review found to toggle featured");  
    }
    toggledReview.isFeatured = isFeaturedReview;
    const updatedReview = await toggledReview.save();
   if(!updatedReview)
   {
    throw new ApiError(400,"Opps! failed to update the flag!");
   }
   if(updatedReview.isFeatured)
   {
    res.success(201, updatedReview, "Review set as featured!");
   }
   else{
    res.success(201, updatedReview, "Review removed as featured!")
   }
})