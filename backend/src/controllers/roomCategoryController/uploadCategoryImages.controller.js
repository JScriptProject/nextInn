import { asyncHandler } from "#utils/asyncHandler.js";
import { ApiError } from "#utils/ApiError.js";
import { RoomCategory } from "#models/roomCategory.model.js";
import { uploadToCloudinary } from "#utils/cloudinary.js";

const uploadCategoryImages = asyncHandler(async (req, res, next) => {
  const { _id } = req.body;

  if (!_id) {
    throw new ApiError(400, "Category _id is required");
  }

  const category = await RoomCategory.findById(_id);
  if (!category) {
    throw new ApiError(404, "Room category not found");
  }

  const files = req.files || {};
  const updates = {};

  if (files.bannerImg?.[0]) {
    const bannerUpload = await uploadToCloudinary(files.bannerImg[0].path);
    if (!bannerUpload?.secure_url) {
      throw new ApiError(500, "Error uploading banner image to Cloudinary");
    }
    updates.bannerImg = bannerUpload.secure_url;
  }

  if (files.roomImages?.length) {
    const roomUploads = await Promise.all(
      files.roomImages.map((file) => uploadToCloudinary(file.path)),
    );
    const roomImageUrls = roomUploads.map((upload) => upload?.secure_url);

    if (roomImageUrls.some((url) => !url)) {
      throw new ApiError(500, "Error uploading one or more room images to Cloudinary");
    }

    updates.roomImages = roomImageUrls;
  }

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, "No images provided for upload");
  }

  const result = await RoomCategory.findByIdAndUpdate(
    _id,
    { $set: updates },
    { new: true },
  );

  res.success(200, result, "Category images uploaded successfully");
});

export { uploadCategoryImages };
