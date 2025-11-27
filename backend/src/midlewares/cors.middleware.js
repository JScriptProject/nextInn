import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


//handle cors
const  coresMiddleware = cors({
    origin: process.env.ORIGIN,
    credentials:true,
    methods:['GET', 'POST', 'PUT', 'PATCH','DELETE'],
    allowedHeaders: ["Content-Type","Authorization"]
});

export default coresMiddleware;