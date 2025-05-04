import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { HTTP_STATUS ,ROLES} from '../config/constants.js';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, config.jwtSecret);
        req.user = verified;
        next();
    } catch (err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid token' });
    }
};

export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== ROLES.ADMIN) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({ error: 'Forbidden' });
    }
    next();
};