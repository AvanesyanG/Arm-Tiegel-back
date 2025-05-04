import Category from '../../../models/Category.js';
import { HTTP_STATUS } from '../../../config/constants.js';

// Create new category
export const createCategory = async (req, res) => {
    try {
        // Add check for req.body
        if (!req.body) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: "Request body is missing"
            });
        }

        // Destructure with fallback
        const { category = {} } = req.body;

        // Validate translations
        if (!category.en || !category.ru || !category.hy) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: "All language translations (en, ru, hy) are required"
            });
        }

        const newCategory = await Category.create({ category });
        res.status(HTTP_STATUS.CREATED).json(newCategory);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            error: error.message,
            details: error.stack
        });
    }
};

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(HTTP_STATUS.OK).json(categories);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            error: error.message,
            details: error.stack
        });
    }
};

// Get single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                error: 'Category not found'
            });
        }

        res.status(HTTP_STATUS.OK).json(category);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            error: error.message,
            details: error.stack
        });
    }
};

// Update category
export const updateCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { category },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                error: 'Category not found'
            });
        }

        res.status(HTTP_STATUS.OK).json(updatedCategory);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            error: error.message,
            details: error.stack
        });
    }
};

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                error: 'Category not found'
            });
        }

        res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            error: error.message,
            details: error.stack
        });
    }
};