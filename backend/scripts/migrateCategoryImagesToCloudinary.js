/**
 * One-time migration: upload localhost image URLs to Cloudinary and update MongoDB.
 *
 * Prerequisites:
 *   - backend/.env with MongoDB_URL and CLOUDINARY_* vars
 *   - Room image files on disk (frontend/src/assets/media or backend/src/assets/media)
 *
 * Run from backend folder:
 *   node scripts/migrateCategoryImagesToCloudinary.js
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { DB_NAME } from "../src/constant.js";
import { RoomCategory } from "../src/models/roomCategory.model.js";
import { uploadToCloudinary } from "../src/utils/cloudinary.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..", "..");

const LOCAL_MEDIA_BASES = [
  path.join(projectRoot, "frontend", "src", "assets", "media"),
  path.join(projectRoot, "backend", "src", "assets", "media"),
];

function localhostUrlToRelativePath(url) {
  const match = url.match(/\/media\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function findLocalFile(relativePath) {
  const candidates = [
    relativePath,
    relativePath.replace(/ /g, "_"),
    relativePath.replace(/_/g, " "),
  ];

  for (const candidate of candidates) {
    for (const base of LOCAL_MEDIA_BASES) {
      const fullPath = path.join(base, candidate);
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
  }

  return null;
}

function collectLocalhostUrls(categories) {
  const urls = new Set();
  for (const category of categories) {
    if (category.bannerImg?.includes("localhost")) {
      urls.add(category.bannerImg);
    }
    for (const img of category.roomImages || []) {
      if (img?.includes("localhost")) {
        urls.add(img);
      }
    }
  }
  return urls;
}

async function buildUrlMap(localhostUrls) {
  const urlMap = new Map();

  for (const url of localhostUrls) {
    const relativePath = localhostUrlToRelativePath(url);
    if (!relativePath) {
      console.warn(`Skipping unparseable URL: ${url}`);
      continue;
    }

    const localPath = findLocalFile(relativePath);
    if (!localPath) {
      console.warn(`Local file not found for: ${url}`);
      console.warn(`  Expected under: ${relativePath}`);
      continue;
    }

    console.log(`Uploading: ${localPath}`);
    const upload = await uploadToCloudinary(localPath);
    if (!upload?.secure_url) {
      console.error(`Cloudinary upload failed for: ${localPath}`);
      continue;
    }

    urlMap.set(url, upload.secure_url);
    console.log(`  -> ${upload.secure_url}`);
  }

  return urlMap;
}

async function updateCategories(categories, urlMap) {
  let updatedCount = 0;

  for (const category of categories) {
    const updates = {};

    if (category.bannerImg && urlMap.has(category.bannerImg)) {
      updates.bannerImg = urlMap.get(category.bannerImg);
    }

    if (category.roomImages?.length) {
      const newRoomImages = category.roomImages.map(
        (img) => urlMap.get(img) || img,
      );
      if (
        JSON.stringify(newRoomImages) !== JSON.stringify(category.roomImages)
      ) {
        updates.roomImages = newRoomImages;
      }
    }

    if (Object.keys(updates).length === 0) {
      continue;
    }

    await RoomCategory.findByIdAndUpdate(category._id, { $set: updates });
    console.log(`Updated category: ${category.name}`);
    updatedCount++;
  }

  return updatedCount;
}

async function migrate() {
  if (!process.env.MongoDB_URL) {
    throw new Error("MongoDB_URL is not set in backend/.env");
  }

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_CLOUD_API_KEY ||
    !process.env.CLOUDINARY_CLOUD_API_SECRET
  ) {
    throw new Error("CLOUDINARY_* environment variables are not set");
  }

  await mongoose.connect(`${process.env.MongoDB_URL}/${DB_NAME}`);
  console.log("Connected to MongoDB");

  const categories = await RoomCategory.find();
  console.log(`Found ${categories.length} categories`);

  const localhostUrls = collectLocalhostUrls(categories);
  console.log(`Found ${localhostUrls.size} unique localhost image URLs`);

  if (localhostUrls.size === 0) {
    console.log("No localhost URLs to migrate. Done.");
    await mongoose.disconnect();
    return;
  }

  const urlMap = await buildUrlMap(localhostUrls);
  console.log(`Uploaded ${urlMap.size} images to Cloudinary`);

  const updatedCount = await updateCategories(categories, urlMap);
  console.log(`Updated ${updatedCount} categories in MongoDB`);

  await mongoose.disconnect();
  console.log("Migration complete.");
}

migrate().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
