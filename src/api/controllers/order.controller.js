import Order from '../../models/Order.js';
import { HTTP_STATUS } from '../../config/constants.js';

export const createOrder = async (req, res) => {
    try {
        const { address, email, items } = req.body;

        // Transform items to match schema
        const orderItems = items.map(item => ({
            product: item.id,
            count: item.count
        }));

        const order = await Order.create({
            address,
            email,
            items: orderItems
        });

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            order: {
                _id: order._id,
                status: order.status,
                items: order.items.map(item => ({
                    id: item.product,
                    count: item.count
                })),
                address: order.address,
                email: order.email
            }
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            success: false,
            error: error.message
        });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate({
                path: 'items.product',
                select: 'name description dimensions'
            })
            .sort('-createdAt');

        res.status(HTTP_STATUS.OK).json({
            success: true,
            orders: orders.map(order => ({
                ...order.toObject(),
                items: order.items.map(item => ({
                    product: {
                        id: item.product._id,
                        name: item.product.name,
                        description: item.product.description,
                        dimensions: item.product.dimensions
                    },
                    count: item.count
                }))
            }))
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            success: false,
            error: error.message
        });
    }
};
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        res.json({ success: true, order });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_ERROR).json({
            success: false,
            error: error.message
        });
    }
};

