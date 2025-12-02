import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


//handle cors
const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Skip-Auto-Refresh"],
 
};

export default cors(corsOptions);

