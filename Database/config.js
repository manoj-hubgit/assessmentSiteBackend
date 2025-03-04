import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDB_URL = process.env.MONGODB_URL;
const connectDB=async(req,res)=>{
    try {
        const connection= await mongoose.connect(mongoDB_URL)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"MongoDB connection error"})
    }
}

export default connectDB;