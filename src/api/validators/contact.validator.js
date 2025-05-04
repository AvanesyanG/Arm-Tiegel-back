import { body } from 'express-validator';
import { HTTP_STATUS } from '../../config/constants.js';

export const validateContact = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),

    body('name')
        .optional()
        .trim()
];