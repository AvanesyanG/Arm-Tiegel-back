import dotenv from 'dotenv';

dotenv.config();

export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION || '1h',
    mongodbUri: process.env.MONGODB_URI,
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
};