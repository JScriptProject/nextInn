import { asyncHandler } from "#utils/asyncHandler.js";
import { ApiError } from "#utils/ApiError.js";
import { uploadToCloudinary } from "#utils/cloudinary.js";
import { UserDemo } from "#models/userDemo.models.js";

const addUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ApiError(400, "All fields are required"));
  }
  const filesData = req.files || {};
  console.log("FILES DATA === ", filesData);

  //in case if i dont get the banner Image then return from here itself
  if (!filesData.bannerImg || filesData.bannerImg.length === 0) {
    return next(
      new ApiError(400, "Banner Image not uploaded to server, it's required"),
    );
  }

  const cloudinaryBannerUpload = await uploadToCloudinary(
    filesData?.bannerImg?.[0]?.path,
  );

  console.log(
    "CLOUDINARY BANNER UPLOAD =  ",
    cloudinaryBannerUpload.secure_url,
  );

  if (!cloudinaryBannerUpload?.secure_url) {
    return next(
      new ApiError(500, "Error while uplaoding banner image to cloudinary"),
    );
  }

  //upload room images to cloudinary
  const roomImgs = filesData?.roomImgs || [];
  console.log("ROOM IMAGES= ", roomImgs);

  const roomsUpload = roomImgs.map((file) => uploadToCloudinary(file.path));
  const cloudinaryUplaod = await Promise.all(roomsUpload);

  console.log("CLOUDINARY UPLOADS ", cloudinaryUplaod);
  const roomImgsUrls = cloudinaryUplaod.map((room) => room?.secure_url);
  console.log("ROOM IMAGES URLS ", roomImgsUrls);

  const user = await UserDemo.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    bannerImg: cloudinaryBannerUpload?.secure_url,
    roomImgs: roomImgsUrls || [],
  });

  // await user.save();
  res.status(201).json({ message: "User addded Succesfully", user });
});

export default addUser;
