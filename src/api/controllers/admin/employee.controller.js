import Employee from '../../../models/Employee.js';
import { HTTP_STATUS} from '../../../config/constants.js';

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
        const employee = new Employee({ full_name, email, role, hashed_password: password });
        await employee.save();
        res.status(HTTP_STATUS.CREATED).json(employee);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        res.json(employee);
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