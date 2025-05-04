import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});



export const deleteImage = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        throw new Error(`Cloudinary deletion failed: ${error.message}`);
    }
};