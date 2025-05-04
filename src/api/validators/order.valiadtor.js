import { body, check } from 'express-validator';
import Product from '../../models/Product.js';
import { HTTP_STATUS } from '../../config/constants.js';
import mongoose from "mongoose";

const validateItems = check('items.*.id')
    .notEmpty().withMessage('Product ID is required')
    .custom(async (value) => {
        // FRONTEND NOTE: This validation ensures only existing products can be ordered
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid product ID format');
        }
        const product = await Product.findById(value);
        if (!product) {
            throw new Error(`Product ${value} not found`);
        }
        return true;
    });

export const validateOrder = [
    body('address')
        .trim()
        .notEmpty().withMessage('Address is required')
        .isLength({ min: 10 }).withMessage('Address must be at least 10 characters'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    body('items')
        .isArray({ min: 1 }).withMessage('At least one item is required'),

    body('items.*.count')
        .isInt({ min: 1 }).withMessage('Count must be at least 1'),

    validateItems
];