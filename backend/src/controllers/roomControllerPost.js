import rooms from "../../data/rooms.json" with { type: "json" };
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

export const roomControllerPost = (req, res) => {
  try {
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    const srcPath = path.resolve(dirname, "../..");
    const filePath = path.join(srcPath, "data", "rooms.json");
    const { rooms } = req.body;
    if (!rooms) {
      return res.status(404).json({ message: "Data not recieved" });
    }
    fs.writeFile(filePath, JSON.stringify(rooms, null, 2));
    res.status(200).json({ message: "Data Saved succesfuly", rooms });
  } catch (error) {
    console.error("Issue while posting room data");
    throw error;
  }
};
