import jwt from 'jsonwebtoken';
import Employee from '../../models/Employee.js';
import config from '../../config/index.js';
import { HTTP_STATUS } from '../../config/constants.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email });

        if (!employee || !(await employee.comparePassword(password))) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: employee._id, role: employee.role },
            config.jwtSecret,
            { expiresIn: config.jwtExpiration }
        );

        res.json({ token });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
    }
};