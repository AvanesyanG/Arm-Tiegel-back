import Category from '../../models/Category.js';

export const getCatalogData = () => {
    return Category.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category",
                as: "items"
            }
        },
        {
            $project: {
                "category.en": 1,
                "category.ru": 1,
                "category.hy": 1,
                items: {
                    $map: {
                        input: "$items",
                        as: "item",
                        in: {
                            _id: "$$item._id",
                            image_url: "$$item.image.secure_url",
                            name: "$$item.name",
                            description: "$$item.description",
                            dimensions: "$$item.dimensions"
                        }
                    }
                }
            }
        }
    ]);
};