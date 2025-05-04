import { Router } from 'express';
import {getCatalog, getProductIds} from '../../controllers/catalog.controller.js';

const router = Router();

router.get('/', getCatalog);
router.get('/product-ids', getProductIds);

export default router;