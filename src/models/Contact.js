import mongoose from 'mongoose';

const { Schema } = mongoose;

const contactSchema = new Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Contact', contactSchema);