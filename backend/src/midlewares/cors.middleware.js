import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


//handle cors
const  coresMiddleware = cors({
    origin: process.env.ORIGIN,
    methods:['GET'],
    credentials:true
});

export default coresMiddleware;