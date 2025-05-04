import { Router } from 'express';
import {createOrder, getOrders} from '../../controllers/order.controller.js';
import { validateOrder } from '../../validators/order.valiadtor.js';
import { authenticate, authorizeAdmin } from '../../../middleware/auth.js';

const router = Router();

// Public route for order creation
router.post('/', validateOrder, createOrder);

// Admin routes
router.get('/admin', authenticate, authorizeAdmin, getOrders);

export default router;