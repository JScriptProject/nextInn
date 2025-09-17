import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from "url";
import asyncHandler from '../utils/asyncHandler.js';


export const roomController = asyncHandler( async(req, res, next)=>{
  const filePath = path.dirname(fileURLToPath(import.meta.url));
    const srcPath = path.resolve(filePath,"../..");
    const jsonFilePath = path.join(srcPath, "data","rooms.json");
    const rooms = JSON.parse(await fs.readFile(jsonFilePath,"utf-8"));
    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found" });
    }
    res.status(200).json(rooms);
})

// export const roomController = async(req, res) => {
//   try {
//     const filePath = path.dirname(fileURLToPath(import.meta.url));
//     const srcPath = path.resolve(filePath,"../..");
//     const jsonFilePath = path.join(srcPath, "data","rooms.json");
//     const rooms = JSON.parse(await fs.readFile(jsonFilePath,"utf-8"));
//     if (!rooms || rooms.length === 0) {
//       return res.status(404).json({ message: "No rooms found" });
//     }
//     res.status(200).json(rooms);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
