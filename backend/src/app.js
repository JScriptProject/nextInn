import express from "express";
import dotenv from 'dotenv';
import coresMiddleware from './midlewares/cors.middleware.js';
import loggerMiddleware from "./midlewares/logger.midleware.js";
import {responseHandler} from './midlewares/responseHandler.middleware.js';
import roomsRouter from "./routers/roomsRouter.js";
import roomsCategoryRouter from './routers/roomsCategory.router.js';
import authRouter from './routers/auth.router.js';

dotenv.config();
const app = express();

//cors middleware
app.use(coresMiddleware);

//responseHandler Middleware

app.use(responseHandler);

//parse the body of incoming request so that can access as req.body
//parse JSON
app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({limit:"100mb", extended: true }));


//logger middleware
app.use(loggerMiddleware);

//routers
app.use('/api/category',roomsCategoryRouter);
app.use("/api", roomsRouter);
app.use('/api/auth',authRouter);


export default app;