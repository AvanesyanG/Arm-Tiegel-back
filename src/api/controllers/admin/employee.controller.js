import Employee from '../../../models/Employee.js';
import bcrypt from 'bcrypt';
import { HTTP_STATUS } from '../../../config/constants.js';

export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}, '-hashed_password');
        res.json(employees);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
    }
};

export const createEmployee = async (req, res) => {
    try {
        const { full_name, email, role, password } = req.body;

        // Validate required fields
        if (!password || password.length < 8) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: 'Password is required and must be at least 8 characters'
            });
        }

        // Create employee with separate password field
        const employee = new Employee({
            full_name,
            email,
            role,
            hashed_password: password // Will be hashed by pre-save hook
        });

        await employee.save();

        // Remove password from response
        const response = employee.toObject();
        delete response.hashed_password;

        res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        // Find employee first to use Mongoose middleware
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                error: 'Employee not found'
            });
        }

        // Handle password update
        if (updates.password) {
            employee.hashed_password = updates.password;
            delete updates.password;
        }

        // Update other fields
        Object.keys(updates).forEach(key => {
            employee[key] = updates[key];
        });

        // Save to trigger pre-save hooks
        await employee.save();

        // Remove password from response
        const response = employee.toObject();
        delete response.hashed_password;

        res.json(response);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await Employee.findByIdAndDelete(id);
        res.sendStatus(HTTP_STATUS.OK);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
    }
};