import Contact from '../../models/Contact.js';
import { HTTP_STATUS } from '../../config/constants.js';

export const createContactRequest = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const contactRequest = await Contact.create({
            name: name || null,
            email,
            message
        });

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            contactRequest: {
                _id: contactRequest._id,
                name: contactRequest.name,
                email: contactRequest.email,
                message: contactRequest.message,
                createdAt: contactRequest.createdAt
            }
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            success: false,
            error: error.message
        });
    }
};

export const getContactRequests = async (req, res) => {
    try {
        const requests = await Contact.find({})
            .sort('-createdAt');

        res.status(HTTP_STATUS.OK).json({
            success: true,
            requests: requests.map(req => ({
                _id: req._id,
                name: req.name,
                email: req.email,
                message: req.message,
                createdAt: req.createdAt
            }))
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            success: false,
            error: error.message
        });
    }
};

export const deleteContactRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Contact.findByIdAndDelete(id);

        if (!request) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                error: 'Contact request not found'
            });
        }

        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: 'Contact request deleted successfully'
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            success: false,
            error: error.message
        });
    }
};