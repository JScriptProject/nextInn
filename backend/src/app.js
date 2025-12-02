import express from "express";
import dotenv from "dotenv";
import coresMiddleware from "./midlewares/cors.middleware.js";
import cookieParser from "cookie-parser";
import loggerMiddleware from "./midlewares/logger.midleware.js";
import { responseHandler } from "./midlewares/responseHandler.middleware.js";
import roomsRouter from "./routers/roomsRouter.js";
import roomsCategoryRouter from "./routers/roomsCategory.router.js";
import authRouter from "./routers/auth.router.js";

dotenv.config();
const app = express();


// 1️⃣ CORS MUST BE FIRST
app.use(coresMiddleware);

app.use(cookieParser());

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(responseHandler);

app.use(loggerMiddleware);

app.use("/api/category", roomsCategoryRouter);
app.use("/api", roomsRouter);
app.use("/api/auth", authRouter);

export default app;
