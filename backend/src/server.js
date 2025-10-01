import express from "express";
import app from "./app.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db/index.js";


import { errorhandler } from "./midlewares/errorsHandler.middleware.js";
import roomsRouter from "./routers/roomsRouter.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;



//routers
app.use("/api", roomsRouter);

// create static files for images

const filePath = path.dirname(fileURLToPath(import.meta.url));
console.log(filePath);
const mediaPath = path.join(filePath, "assets", "media");
app.use("/media", express.static(mediaPath));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`NextInn backend Server started on Port ${PORT}`);
  });
  app.on("error", (err) => {
    console.log(`Error occured: ${err.message}`);
  });
});

app.use(errorhandler);

