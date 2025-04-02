import mongoose from "mongoose";

const connectDB= async () =>{
    try {
        const conn= await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error){
        console.log("MongoDB connection error: ", error);
    }
}

export default connectDB;