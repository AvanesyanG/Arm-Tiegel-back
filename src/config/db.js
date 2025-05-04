import mongoose from 'mongoose';
import 'dotenv/config';

const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    },
    maxPoolSize: 10
};

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables.");
        }

        await mongoose.connect(process.env.MONGODB_URI, clientOptions);

        // Verify connection
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("✅ Successfully connected to MongoDB!");

        return mongoose.connection;
    } catch (error) {
        console.error("❌ Connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;