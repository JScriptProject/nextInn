import { Review } from "#models/review.model.js";
import { User } from "#models/user.model.js";
import { ApiError } from "#utils/ApiError.js";
import { asyncHandler } from "#utils/asyncHandler.js";

export const getAllReviews = asyncHandler(async (req, res, next) => {
  //since we want the currentPage and limit in intiger we will parse them right away

  const currentPage = parseInt(req.query.currentPage) || 1;
  const limit = parseInt(req.query.limit) || 15;
  const filterStatus = req.query.filterStatus || "all";
  const searchTerm = req.query.searchTerm || "";

  // we have currentPage and limit so that we can create skip to skip that many entries from database
  const skip = (currentPage - 1) * limit;
  const query = {};
  if (filterStatus && filterStatus !== "all") {
    query.status = filterStatus.toLowerCase();
  }
  if(searchTerm && searchTerm !=="")
  {
    const searchTermUser = await User.find({
      $or:[{
        firstname:{$regex:searchTerm, $options:"i"}
      },{
        lastname:{$regex:searchTerm, $options:"i"}
      }]
    }).select("_id");
  
    const searchTermUserIds = searchTermUser?.map(user=>user._id);

    
    query.user={$in:searchTermUserIds};
  }
  const allReviews = await Review.find(query)
    .populate([
      { path: "user", select: "firstname lastname email mobile city" },
      { path: "category", select: "name" },
    ])
    .sort({ rating: -1 })
    .skip(skip)
    .limit(limit);

    const totalReviews = await Review.countDocuments();
    const totalPages = Math.ceil(totalReviews/limit);
    if(!allReviews)
    {
        throw new ApiError(404, "No Review found!");
    }
  res.success(
    200,
    {
      allReviews,
      pagination: {
        totalReviews,
        totalPages,
        currentPage: currentPage,
        limit
      },
    },
    "All reviews fetched!",
  );
});
