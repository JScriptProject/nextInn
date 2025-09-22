import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});



const uploadToCloudinary = async(localFilePath) => {
 console.log("cloudinary file 1 ");
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"});
        console.log("File uploaded to Cloudinary successfully");
        console.log("cloudinary file 2 ");
        return response;
    } catch (error) {
        //it will remove the locally saved temp files, if upload operation failed
        console.log("cloudinary file error 3 ", error);

        fs.unlinkSync(localFilePath);
    }
}

export { uploadToCloudinary };