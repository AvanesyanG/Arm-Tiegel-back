import { getCatalogData } from '../services/catalog.service.js';
import { HTTP_STATUS } from '../../config/constants.js';
import Product from "../../models/Product.js";

export const getCatalog = async (req, res) => {
    try {
        const catalog = await getCatalogData();
        res.status(HTTP_STATUS.OK).json({ success: true, catalog });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            success: false,
            error: error.message
        });
    }
};

export const getProductIds = async (req, res) => {
    try {
        // Get all active product IDs from database
        const products = await Product.find({}, '_id');
        const productIds = products.map(product => product._id.toString());

        res.status(HTTP_STATUS.OK).json({
            success: true,
            productIds
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            success: false,
            error: error.message
        });
    }
};