import  { Router } from 'express';
import { authenticate, authorizeAdmin } from '../../../../middleware/auth.js';
import {
    createProduct,
    updateProduct,
    deleteProduct
} from '../../../controllers/admin/product.controller.js';
import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from '../../../controllers/admin/employee.controller.js';

import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '../../../controllers/admin/category.controller.js';
import { handleFileUpload } from '../../../../middleware/fileUpload.middleware.js';

const router = Router();


// Apply authentication and authorization to ALL admin routes
router.use(authenticate, authorizeAdmin);
// router.use((req, res, next) => next());


// Product routes with image upload
router.post('/products',
    handleFileUpload('image'),  // File middleware FIRST
    createProduct
);

router.put('/products/:id',
    handleFileUpload('image'),  // File middleware FIRST
    updateProduct
);

router.delete('/products/:id', deleteProduct);
//category routes
router.route('/categories')
    .get(getCategories)
    .post(createCategory);

router.route('/categories/:id')
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategory);

// Employee routes (no file upload needed)
router.route('/employees')
    .get(getEmployees)
    .post(createEmployee);

router.route('/employees/:id')
    .put(updateEmployee)
    .delete(deleteEmployee);

export default router;