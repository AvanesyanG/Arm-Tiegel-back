import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
    category: {
        en: String,
        ru: String,
        hy: String
    }
});

export default mongoose.model('Category', categorySchema);