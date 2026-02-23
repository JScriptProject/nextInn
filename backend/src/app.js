import express from "express";
import dotenv from "dotenv";
import coresMiddleware from "#middlewares/cors.middleware.js";
import cookieParser from "cookie-parser";
import loggerMiddleware from "#middlewares/logger.midleware.js";
import { responseHandler } from "#middlewares/responseHandler.middleware.js";
import roomsCategoryRouter from "./routers/roomsCategory.router.js";
import authRouter from "./routers/auth.router.js";
import bookingRouter from "./routers/booking.router.js";
import roomsManagementRouter from "./routers/roomsManagement.router.js";
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
app.use("/api/auth", authRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/rooms", roomsManagementRouter);

export default app;
