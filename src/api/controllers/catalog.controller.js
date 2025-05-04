import { getCatalogData } from '../services/catalog.service.js';
import { HTTP_STATUS } from '../../config/constants.js';

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