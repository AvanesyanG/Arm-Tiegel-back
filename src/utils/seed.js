import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

const seedDatabase = async () => {
    // Clear existing data
    await Category.deleteMany();
    await Product.deleteMany();

    // Create categories
    const tiegelsCategory = await Category.create({
        name: {
            en: 'Tiegels',
            ru: 'Тигли',
            hy: 'Թիգելներ'
        }
    });

    const solderingCategory = await Category.create({
        name: {
            en: 'Soldering Iron Board',
            ru: 'Доска для пайки',
            hy: 'Պայքման տախտակ'
        }
    });

    // Create products
    await Product.create([
        {
            name: {
                en: 'Gold Tiegel',
                ru: 'Золотой тигель',
                hy: 'Ոսկի Թիեղել'
            },
            description: {
                en: 'High-quality gold tiegel with heat resistance up to 1500°C.',
                ru: 'Тигель высокого качества, выдерживающий температуру до 1500°.',
                hy: 'Բարձրորակ ոսկու տիգել, որը դիմացկուն է մինչև 1500°C ջերմաստիճան։'
            },
            dimensions: {
                en: 'Diameter: 10cm, Height: 12cm, Weight: 500g',
                ru: 'Диаметр: 10 см, Высота: 12 см, Вес: 500 г',
                hy: 'Մեծությունը՝ 10սմ, Բարձրությունը՝ 12սմ, Քաշը՝ 500գ'
            },
            image_url: 'link_to_image',
            category: tiegelsCategory._id
        },
        // Add other products similarly
    ]);

    console.log('Database seeded successfully');
    process.exit();
};

// Run the seed
mongoose.connect(process.env.MONGODB_URI)
    .then(() => seedDatabase())
    .catch(error => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });