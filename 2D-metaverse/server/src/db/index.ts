import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URL}/metaverse-2d`)
    } catch (error) {
        console.log('MONGODB connection error', error);
        process.exit(1)
    }
}

export {connectDB}