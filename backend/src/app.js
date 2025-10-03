import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import loggerMiddleware from "./midlewares/logger.midleware.js";
import {responseHandler} from './midlewares/responseHandler.middleware.js';
dotenv.config();
const app = express();

//cors middleware
app.use(cors({
    origin:process.env.ORIGIN,
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))

//responseHandler Middleware

app.use(responseHandler);

//parse the body of incoming request so that can access as req.body
//parse JSON
app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({limit:"100mb", extended: true }));


//logger middleware
app.use(loggerMiddleware);



export default app;