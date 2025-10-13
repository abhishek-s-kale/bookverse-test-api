import mongoose from "mongoose"

export const connectDB = async (): Promise<void> =>{
    try {
        const uri = process.env.MONGODB_URI as string;
        if(!uri) throw new Error("mongo url not found");
        await mongoose.connect(uri);
        console.log("connected to database");
    }
    catch (err) {
        console.error("mongodb connection error", err);
        process.exit(1);
    }
}