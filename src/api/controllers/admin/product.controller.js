import Product from '../../../models/Product.js';
import { deleteImage } from '../../services/cloudinary.service.js';
import { HTTP_STATUS } from '../../../config/constants.js';

export const createProduct = async (req, res) => {
    try {
        const image = req.uploadResult;

        if (!image) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Image upload failed" });
        }

        // Validate required fields
        const requiredFields = ['name', 'description', 'dimensions', 'category'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: `${field} is required` });
            }
        }

        // Parse JSON fields safely
        const parseField = (field) => {
            try {
                return JSON.parse(req.body[field]);
            } catch (error) {
                throw new Error(`Invalid JSON in ${field}: ${error.message}`);
            }
        };

        const productData = {
            name: parseField('name'),
            description: parseField('description'),
            dimensions: parseField('dimensions'),
            category: req.body.category,
            image
        };

        const product = await Product.create(productData);
        res.status(HTTP_STATUS.CREATED).json(product);

    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            error: error.message,
            details: error.stack
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        const updateData = { ...req.body };

        // Handle image update
        if (req.uploadResult) {
            await deleteImage(product.image.public_id);
            updateData.image = req.uploadResult;
        }

        // Parse multilingual fields if present
        if (req.body.name) updateData.name = JSON.parse(req.body.name);
        if (req.body.description) updateData.description = JSON.parse(req.body.description);
        if (req.body.dimensions) updateData.dimensions = JSON.parse(req.body.dimensions);

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        res.json(updatedProduct);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            error: error.message,
            details: error.stack
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                error: 'Product not found'
            });
        }

        await product.deleteOne();
        res.sendStatus(HTTP_STATUS.OK);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            error: error.message,
            details: error.stack
        });
    }
};