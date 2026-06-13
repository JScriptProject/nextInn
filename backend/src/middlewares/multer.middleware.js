import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = path.join(__dirname, '../../public/temp');
fs.mkdirSync(tempDir, { recursive: true });
console.log("DIR NAME==", tempDir);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  cb(null, uniqueSuffix + "-" + file.originalname);
  }
})
export const upload = multer({ storage, limits:{fileSize: 5* 1024 * 1024} })