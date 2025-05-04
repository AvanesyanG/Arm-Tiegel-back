import mongoose from 'mongoose';
import { deleteImage } from '../api/services/cloudinary.service.js';

const { Schema } = mongoose;

const productSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        en: { type: String, required: [true, 'English name is required'] },
        ru: { type: String, required: [true, 'Russian name is required'] },
        hy: { type: String, required: [true, 'Armenian name is required'] }
    },
    description: {
        en: { type: String, required: [true, 'English description is required'] },
        ru: { type: String, required: [true, 'Russian description is required'] },
        hy: { type: String, required: [true, 'Armenian description is required'] }
    },
    dimensions: {
        en: { type: String, required: [true, 'English dimensions are required'] },
        ru: { type: String, required: [true, 'Russian dimensions are required'] },
        hy: { type: String, required: [true, 'Armenian dimensions are required'] }
    },
    image: {
        public_id: String,
        secure_url: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

productSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    try {
        await deleteImage(this.image.public_id);
        next();
    } catch (error) {
        next(new Error(`Image deletion failed: ${error.message}`));
    }
});

export default mongoose.model('Product', productSchema);