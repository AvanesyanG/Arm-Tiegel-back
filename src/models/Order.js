import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
    address: { type: String, required: true },
    email: String,
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        count: Number
    }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);