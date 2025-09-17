import express from 'express';
import app from './app.js';
import path from 'path';
import { fileURLToPath } from "url";
import {connectDB} from './db/index.js';
import coresMiddleware from './midlewares/cors.middleware.js';
import loggerMiddleware from './midlewares/logger.midleware.js';    

import roomsRouter from './routers/roomsRouter.js';

const PORT = process.env.PORT || 8000;

//parse JSON
app.use(express.json());

//handle cors
app.use(coresMiddleware);

//routers
app.use('/api', roomsRouter);

//logger middleware
app.use(loggerMiddleware);
// create static files for images 

const filePath = path.dirname(fileURLToPath(import.meta.url));
console.log(filePath);
const mediaPath = path.join(filePath,"assets","media");
app.use("/media", express.static(mediaPath))

connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`NextInn backend Server started on Port ${PORT}`);
    })
    app.on("error", (err)=>{
    console.log(`Error occured: ${err.message}`);
})
})



// app.listen(PORT, ()=>{
//     console.log(`NextInn backend Server started on Port ${PORT}`);
// })