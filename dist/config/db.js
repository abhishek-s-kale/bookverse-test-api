import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri)
            throw new Error("mongo url not found");
        await mongoose.connect(uri);
        console.log("connected to database");
    }
    catch (err) {
        console.error("mongodb connection error", err);
        process.exit(1);
    }
};
