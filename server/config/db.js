import mongoose from "mongoose";
import config from "./config.js";

export const connectToDB = async () => {
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log('MongoDB connected');
    }
    catch(error){
        console.error('DB connection error: ', err);
        process.exit(1);
    }
}



