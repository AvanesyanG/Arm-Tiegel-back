import { body } from 'express-validator';
import { HTTP_STATUS } from '../../config/constants.js';

export const validateLogin = [
    body('email')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
];