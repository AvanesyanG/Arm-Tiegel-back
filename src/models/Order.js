import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
    address: {
        type: String,
        required: [true, 'Delivery address is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true
    },
    items: [{
        product: {
            type: String,
            ref: 'Product',
            required: true
        },
        count: {
            type: Number,
            required: true,
            min: [1, 'Minimum count is 1']
        }
    }],
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered'],
        default: 'pending'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

orderSchema.index({ email: 1, status: 1 });

export default mongoose.model('Order', orderSchema);