import cloudinary from '../config/cloudinary.js';
import fileUpload from 'express-fileupload';

export const handleFileUpload = (fieldName) => [
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
    }),
    async (req, res, next) => {
        if (!req.files?.[fieldName]) return next();

        try {
            const result = await cloudinary.uploader.upload(
                req.files[fieldName].tempFilePath,
                { folder: 'arm-tiegel-products' }
            );

            req.uploadResult = {
                public_id: result.public_id,
                secure_url: result.secure_url
            };
            next();
        } catch (error) {
            next(new Error(`Cloudinary upload failed: ${error.message}`));
        }
    }
];