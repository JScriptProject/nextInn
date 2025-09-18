import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

export const roomControllerPost = asyncHandler(async (req, res, next) => {
 const dirname = path.dirname(fileURLToPath(import.meta.url));
    const srcPath = path.resolve(dirname, "../..");
    const filePath = path.join(srcPath, "data", "rooms.json");
    const { rooms } = req.body;
    if (!rooms) {
      return res.status(404).json({ message: "Data not recieved!!" });
    }
    fs.writeFile(filePath, JSON.stringify(rooms, null, 2));
    res.status(200).json({ message: "Data Saved succesfuly", rooms });
})
