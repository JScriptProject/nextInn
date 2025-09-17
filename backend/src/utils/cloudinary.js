import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({ 
  cloud_name: process, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

const uploadToCloudinary = async(localFilePath) => {

    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"});
        console.log("File uploaded to Cloudinary successfully");
        return response;
    } catch (error) {
        //it will remove the locally saved temp files, if upload operation failed
        fs.unlinkSync(localFilePath);
    }
}

export { uploadToCloudinary };