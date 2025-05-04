import { Router } from 'express';
import {
    createContactRequest,
    getContactRequests,
    deleteContactRequest
} from '../../controllers/contact.controller.js';
import { validateContact } from '../../validators/contact.validator.js';
import { authenticate, authorizeAdmin } from '../../../middleware/auth.js';

const router = Router();

// Public submission
router.post('/', validateContact, createContactRequest);

// Admin routes
router.get('/admin', authenticate, authorizeAdmin, getContactRequests);
router.delete('/admin/:id', authenticate, authorizeAdmin, deleteContactRequest);

export default router;