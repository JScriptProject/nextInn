
// create a database connection

import { DB_NAME } from '../constant.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MongoDB_URL}/${DB_NAME}`);
        console.log("Database connected successfully!", connectionInstance.connection.host, connectionInstance.connection.name);
    } 
    catch(error) {
           console.log("Error while connecting to DB", error);
           process.exit(1);        
    }
}
