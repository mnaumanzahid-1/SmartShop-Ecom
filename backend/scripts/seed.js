const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');

// Config
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Fixed image URLs - each category gets consistent images
const mobileImages = [
    'https://dummyimage.com/400x400/000000/ffffff?text=Phone+1',
    'https://dummyimage.com/400x400/1a1a2e/00d4ff?text=Phone+2',
    'https://dummyimage.com/400x400/16213e/0f3460?text=Phone+3',
    'https://dummyimage.com/400x400/0f3460/e94560?text=Phone+4',
    'https://dummyimage.com/400x400/e94560/f1a208?text=Phone+5',
    'https://dummyimage.com/400x400/f1a208/16213e?text=Phone+6',
    'https://dummyimage.com/400x400/16213e/0ff0fc?text=Phone+7',
    'https://dummyimage.com/400x400/0ff0fc/f25f4c?text=Phone+8',
    'https://dummyimage.com/400x400/f25f4c/003d5c?text=Phone+9',
    'https://dummyimage.com/400x400/003d5c/e74b3d?text=Phone+10',
];

const fashionImages = [
    'https://dummyimage.com/400x400/1a472a/5FD3BC?text=Fashion+1',
    'https://dummyimage.com/400x400/8b0000/ff6b6b?text=Fashion+2',
    'https://dummyimage.com/400x400/4a235a/a71585?text=Fashion+3',
    'https://dummyimage.com/400x400/c41e3a/ff1744?text=Fashion+4',
    'https://dummyimage.com/400x400/1f2937/6366f1?text=Fashion+5',
];

const electronicsImages = [
    'https://dummyimage.com/400x400/2c2c54/5a3a8c?text=Electronics+1',
    'https://dummyimage.com/400x400/5a3a8c/a370f0?text=Electronics+2',
    'https://dummyimage.com/400x400/a370f0/8e44ad?text=Electronics+3',
];

const homeImages = [
    'https://dummyimage.com/400x400/8b4513/daa520?text=Home+1',
    'https://dummyimage.com/400x400/daa520/228b22?text=Home+2',
    'https://dummyimage.com/400x400/228b22/3cb371?text=Home+3',
];

const beautyImages = [
    'https://dummyimage.com/400x400/c7547b/ff69b4?text=Beauty+1',
    'https://dummyimage.com/400x400/ff69b4/ffc0cb?text=Beauty+2',
    'https://dummyimage.com/400x400/ffc0cb/ff1493?text=Beauty+3',
];

const carImages = [
    'https://dummyimage.com/400x400/1c1c1c/ff0000?text=Car+1',
    'https://dummyimage.com/400x400/ff0000/ffd700?text=Car+2',
    'https://dummyimage.com/400x400/ffd700/000000?text=Car+3',
];

// Helper function to get image by category
const getImageByCategory = (category, index) => {
    const categoryMap = {
        'Mobiles': mobileImages,
        'Fashion': fashionImages,
        'Electronics': electronicsImages,
        'Home': homeImages,
        'Beauty': beautyImages,
        'Automotive': carImages
    };
    const images = categoryMap[category] || mobileImages;
    return [images[index % images.length]];
};

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Products Cleared');

        // Get admin user
        const adminUser = await User.findOne({ role: 'admin' });

        if (!adminUser) {
            console.error('Admin user not found. Please create one first.');
            process.exit(1);
        }

        console.log('Admin Found:', adminUser._id);

        const products = [
            // --- MOBILES ---
            {
                title: 'Samsung Galaxy S24 Ultra',
                price: 399999,
                description: 'Experience the new era of mobile AI with the Galaxy S24 Ultra. Titanium frame, 200MP camera, and the most powerful Snapdragon chip ever.',
                category: 'Mobiles',
                images: [],
                stock: 15,
                user: adminUser._id
            },
            {
                title: 'Infinix Note 40 Pro',
                price: 69999,
                description: 'All-Round FastCharge 2.0 with Wireless MagCharge. 3D Curved AMOLED Display, 108MP OIS Super-Zoom Cam.',
                category: 'Mobiles',
                images: [],
                stock: 50,
                user: adminUser._id
            },
            {
                title: 'Tecno Spark 20 Pro+',
                price: 54999,
                description: 'G99 Ultimate Processor, 3D Curved AMOLED, 108MP Ultra Sensing Main Camera.',
                category: 'Mobiles',
                images: [],
                stock: 45,
                user: adminUser._id
            },
            {
                title: 'Apple iPhone 15 Pro Max',
                price: 525000,
                description: 'Forged in titanium. A17 Pro chip. The most powerful iPhone ever made.',
                category: 'Mobiles',
                images: [],
                stock: 8,
                user: adminUser._id
            },
            {
                title: 'Xiaomi Redmi Note 13',
                price: 59999,
                description: 'Super-clear 108MP triple camera, 120Hz FHD+ AMOLED display, 33W fast charging.',
                category: 'Mobiles',
                images: [],
                stock: 30,
                user: adminUser._id
            },
            {
                title: 'Samsung Galaxy A55',
                price: 130000,
                description: 'Awesome design, vivid nightography, and Knox security vault.',
                category: 'Mobiles',
                images: [],
                stock: 25,
                user: adminUser._id
            },
            {
                title: 'Oppo Reno 11 F',
                price: 79999,
                description: 'The Portrait Expert with 64MP Ultra-Clear Triple Camera and 67W SUPERVOOC Flash Charge.',
                category: 'Mobiles',
                images: [],
                stock: 20,
                user: adminUser._id
            },
            {
                title: 'Vivo V30 5G',
                price: 139999,
                description: 'Studio-Quality Aura Light Portrait, 50MP AF Group Selfie, and slimmest 5000mAh structural design.',
                category: 'Mobiles',
                images: [],
                stock: 18,
                user: adminUser._id
            },
            {
                title: 'Realme C67',
                price: 44999,
                description: '108MP 3x In-sensor Zoom Camera, Snapdragon 685 Chipset, Sunny Oasis Design.',
                category: 'Mobiles',
                images: [],
                stock: 60,
                user: adminUser._id
            },
            {
                title: 'OnePlus 12',
                price: 265000,
                description: 'Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System, 5400mAh Battery.',
                category: 'Mobiles',
                images: [],
                stock: 5,
                user: adminUser._id
            },

            // --- FASHION ---
            {
                title: 'J. Men Kameez Shalwar Black',
                price: 4990,
                description: 'Classic black Kameez Shalwar for men, premium blended fabric, regular fit.',
                category: 'Fashion',
                images: [],
                stock: 100,
                user: adminUser._id
            },
            {
                title: 'Gul Ahmed Premium Lawn 3-Piece',
                price: 8500,
                description: 'Unstitched 3-piece embroidered lawn suit, vibrant summer collection.',
                category: 'Fashion',
                images: [],
                stock: 80,
                user: adminUser._id
            },
            {
                title: 'Retro High-Top Sneakers',
                price: 3500,
                description: 'Canvas high-top sneakers, durable rubber sole, classic streetwear style.',
                category: 'Fashion',
                images: [],
                stock: 40,
                user: adminUser._id
            },
            {
                title: 'Luxury Analog Watch - Gold',
                price: 12000,
                description: 'Stainless steel gold plated analog watch, water resident, quartz movement.',
                category: 'Fashion',
                images: [],
                stock: 15,
                user: adminUser._id
            },
            {
                title: 'Khaadi Pret Kurta',
                price: 3200,
                description: 'Printed cambric kurta with intricate patterns, perfect for casual wear.',
                category: 'Fashion',
                images: [],
                stock: 60,
                user: adminUser._id
            },
            {
                title: 'Leather Wallet for Men',
                price: 1500,
                description: 'Genuine leather wallet with multiple card slots and cash compartment.',
                category: 'Fashion',
                images: [],
                stock: 150,
                user: adminUser._id
            },
            {
                title: 'Peshawari Chappal - Brown',
                price: 2800,
                description: 'Handcrafted traditional Peshawari chappal, pure leather, comfortable sole.',
                category: 'Fashion',
                images: [],
                stock: 35,
                user: adminUser._id
            },
            {
                title: 'Women\'s Handbag - Beige',
                price: 4500,
                description: 'Stylish tote bag with spacious interior and gold-tone hardware.',
                category: 'Fashion',
                images: [],
                stock: 25,
                user: adminUser._id
            },
            {
                title: 'Ray-Ban Aviator Sunglasses',
                price: 18000,
                description: 'Classic Aviator sunglasses with G-15 lenses and gold metal frame.',
                category: 'Fashion',
                images: [],
                stock: 10,
                user: adminUser._id
            },
            {
                title: 'Denim Jacket - Vintage Wash',
                price: 3900,
                description: 'Rugged denim jacket with vintage wash finish, button-up front.',
                category: 'Fashion',
                images: [],
                stock: 20,
                user: adminUser._id
            },

            // --- ELECTRONICS ---
            {
                title: 'Audionic Airbud 400',
                price: 3500,
                description: 'Wireless earbuds with ENC, heavy bass, and 20+ hours play time.',
                category: 'Electronics',
                images: [],
                stock: 200,
                user: adminUser._id
            },
            {
                title: 'Dell Inspiron 15 Laptop',
                price: 145000,
                description: '15.6" FHD display, Intel Core i5 12th Gen, 8GB RAM, 512GB SSD.',
                category: 'Electronics',
                images: [],
                stock: 10,
                user: adminUser._id
            },
            {
                title: 'Samsung 55" 4K Smart TV',
                price: 160000,
                description: 'Crystal UHD 4K Smart TV with sleek design and vivid colors.',
                category: 'Electronics',
                images: [],
                stock: 5,
                user: adminUser._id
            },
            {
                title: 'Sony PlayStation 5 Slim',
                price: 175000,
                description: 'Slimmer design, 1TB storage, enter new worlds with PS5.',
                category: 'Electronics',
                images: [],
                stock: 8,
                user: adminUser._id
            },
            {
                title: 'Canon EOS 4000D DSLR',
                price: 95000,
                description: '18MP sensor, Wi-Fi, Full HD movies. Includes 18-55mm lens.',
                category: 'Electronics',
                images: [],
                stock: 4,
                user: adminUser._id
            },
            {
                title: 'HP LaserJet Pro M15w',
                price: 35000,
                description: 'World\'s smallest laser in its class. Wireless printing.',
                category: 'Electronics',
                images: [],
                stock: 12,
                user: adminUser._id
            },
            {
                title: 'Apple iPad 10th Gen',
                price: 115000,
                description: 'All-screen design, 10.9-inch Liquid Retina display, A14 Bionic chip.',
                category: 'Electronics',
                images: [],
                stock: 10,
                user: adminUser._id
            },
            {
                title: 'Logitech G502 Hero Mouse',
                price: 12000,
                description: 'High performance gaming mouse, HERO 25K sensor, customizable RGB.',
                category: 'Electronics',
                images: [],
                stock: 40,
                user: adminUser._id
            },
            {
                title: 'Anker SoundCore 2 Speaker',
                price: 11000,
                description: '12W stereo sound, incredible battery life, IPX7 water resistance.',
                category: 'Electronics',
                images: [],
                stock: 30,
                user: adminUser._id
            },
            {
                title: 'Hikvision CCTV Camera Set',
                price: 25000,
                description: 'Full HD 4-camera setup with DVR for complete home security.',
                category: 'Electronics',
                images: [],
                stock: 15,
                user: adminUser._id
            },

            // --- HOME ---
            {
                title: 'King Size Cotton Bed Sheet',
                price: 1800,
                description: 'Soft cotton bed sheet with 2 pillow covers. Floral print.',
                category: 'Home',
                images: [],
                stock: 100,
                user: adminUser._id
            },
            {
                title: 'Non-Stick Cookware Set',
                price: 14000,
                description: '12-piece non-stick kitchen set including pots, pans, and spoons.',
                category: 'Home',
                images: [],
                stock: 20,
                user: adminUser._id
            },
            {
                title: 'Philips Air Fryer HD9200',
                price: 32000,
                description: 'Healthy frying with Rapid Air technology. Fry, bake, grill, roast.',
                category: 'Home',
                images: [],
                stock: 15,
                user: adminUser._id
            },
            {
                title: 'Memory Foam Pillow',
                price: 2500,
                description: 'Contour memory foam pillow for neck support and better sleep.',
                category: 'Home',
                images: [],
                stock: 50,
                user: adminUser._id
            },
            {
                title: 'Automatic Washing Machine Cover',
                price: 850,
                description: 'Waterproof and dustproof cover for top load washing machines.',
                category: 'Home',
                images: [],
                stock: 200,
                user: adminUser._id
            },
            {
                title: 'Study Table Lamp LED',
                price: 1500,
                description: 'Rechargeable LED desk lamp with touch control and brightness adjustment.',
                category: 'Home',
                images: [],
                stock: 60,
                user: adminUser._id
            },
            {
                title: 'Persian Rug 5x7',
                price: 12000,
                description: 'Traditional Persian design rug, soft texture, durable build.',
                category: 'Home',
                images: [],
                stock: 10,
                user: adminUser._id
            },
            {
                title: 'Wall Clock Modern 3D',
                price: 1200,
                description: 'Large DIY 3D wall clock for living room decor.',
                category: 'Home',
                images: [],
                stock: 80,
                user: adminUser._id
            },
            {
                title: 'Shoe Rack Organizer',
                price: 2200,
                description: '4-tier portable shoe rack with dustproof cover.',
                category: 'Home',
                images: [],
                stock: 45,
                user: adminUser._id
            },
            {
                title: 'Dawlance Microwave Oven',
                price: 24000,
                description: '20L Microwave oven with mechanical control and defrost function.',
                category: 'Home',
                images: [],
                stock: 18,
                user: adminUser._id
            },

            // --- BEAUTY ---
            {
                title: 'Rivaj UK Sunblock SPF 60',
                price: 950,
                description: 'High protection sunblock, non-greasy, prevents tanning and sunburn.',
                category: 'Beauty',
                images: [],
                stock: 300,
                user: adminUser._id
            },
            {
                title: 'Maybelline Fit Me Foundation',
                price: 2800,
                description: 'Matte + Poreless foundation for normal to oily skin.',
                category: 'Beauty',
                images: [],
                stock: 150,
                user: adminUser._id
            },
            {
                title: 'J. Junaid Jamshed Perfume - Oudh',
                price: 4500,
                description: 'Rich and woody fragrance, long-lasting scent for men.',
                category: 'Beauty',
                images: [],
                stock: 70,
                user: adminUser._id
            },
            {
                title: 'L\'Oreal Paris Shampoo 400ml',
                price: 1100,
                description: 'Total Repair 5 shampoo for damaged hair.',
                category: 'Beauty',
                images: [],
                stock: 120,
                user: adminUser._id
            },
            {
                title: 'Garnier Vitamin C Serum',
                price: 1850,
                description: 'Brightening serum for dark spots and acne marks.',
                category: 'Beauty',
                images: [],
                stock: 90,
                user: adminUser._id
            },
            {
                title: 'Huda Beauty Eyeshadow Palette',
                price: 3500,
                description: 'Rose Gold Remastered palette with 18 high-pigment shades.',
                category: 'Beauty',
                images: [],
                stock: 40,
                user: adminUser._id
            },
            {
                title: 'Nivea Soft Moisturizing Cream',
                price: 800,
                description: 'Refreshingly soft moisturizing cream for face, body and hands.',
                category: 'Beauty',
                images: [],
                stock: 250,
                user: adminUser._id
            },
            {
                title: 'Philips Hair Straightener',
                price: 6500,
                description: 'Keratin ceramic coated plates for smooth and shiny styles.',
                category: 'Beauty',
                images: [],
                stock: 25,
                user: adminUser._id
            },
            {
                title: 'Dove Body Wash',
                price: 950,
                description: 'Deeply nourishing body wash for softer, smoother skin.',
                category: 'Beauty',
                images: [],
                stock: 180,
                user: adminUser._id
            },
            {
                title: 'Mac Matte Lipstick - Ruby Woo',
                price: 4200,
                description: 'Iconic vivid blue-red shade with a retro matte finish.',
                category: 'Beauty',
                images: [],
                stock: 60,
                user: adminUser._id
            },

            // --- AUTOMOTIVE ---
            {
                title: 'Car Top Cover (Waterproof)',
                price: 3500,
                description: 'Heavy duty waterproof scratch proof car cover for Sedan.',
                category: 'Automotive',
                images: [],
                stock: 50,
                user: adminUser._id
            },
            {
                title: 'Studds Motorcycle Helmet',
                price: 4500,
                description: 'Full face helmet with clear visor, certified safety.',
                category: 'Automotive',
                images: [],
                stock: 30,
                user: adminUser._id
            },
            {
                title: 'Microfiber Cleaning Cloths (Pack of 5)',
                price: 800,
                description: 'Ultra soft microfiber cloths for car washing and detailing.',
                category: 'Automotive',
                images: [],
                stock: 200,
                user: adminUser._id
            },
            {
                title: 'Car Vacuum Cleaner Portable',
                price: 2800,
                description: 'High power 12V portable vacuum cleaner for car interiors.',
                category: 'Automotive',
                images: [],
                stock: 40,
                user: adminUser._id
            },
            {
                title: 'Engine Oil Shell Helix 4L',
                price: 6500,
                description: 'Synthetic motor oil for ultimate engine performance.',
                category: 'Automotive',
                images: [],
                stock: 25,
                user: adminUser._id
            },
            {
                title: 'Car Floor Mats (Rubber)',
                price: 2500,
                description: 'Universal fit heavy duty rubber floor mats set of 4.',
                category: 'Automotive',
                images: [],
                stock: 60,
                user: adminUser._id
            },
            {
                title: 'Dashboard Polish Spray',
                price: 650,
                description: 'Restores shine and protects dashboard from UV rays.',
                category: 'Automotive',
                images: [],
                stock: 150,
                user: adminUser._id
            },
            {
                title: 'Mobile Phone Holder for Car',
                price: 900,
                description: '360 degree rotatable universal mobile holder for dashboard/windshield.',
                category: 'Automotive',
                images: [],
                stock: 120,
                user: adminUser._id
            },
            {
                title: 'Tyre Inflator Air Compressor',
                price: 4200,
                description: 'Heavy duty digital tyre inflator pump for cars and bikes.',
                category: 'Automotive',
                images: [],
                stock: 20,
                user: adminUser._id
            },
            {
                title: 'Car Air Freshener Gel',
                price: 450,
                description: 'Long lasting fresh fragrance for car interior.',
                category: 'Automotive',
                images: [],
                stock: 300,
                user: adminUser._id
            }

        ];

        // Assign images based on category
        const categoryCounters = {};
        products.forEach(product => {
            if (!categoryCounters[product.category]) {
                categoryCounters[product.category] = 0;
            }
            product.images = getImageByCategory(product.category, categoryCounters[product.category]);
            categoryCounters[product.category]++;
        });

        console.log(`Inserting ${products.length} products...`);
        const result = await Product.insertMany(products);
        console.log(`Successfully seeded ${result.length} products!`);
        process.exit(0);

    } catch (error) {
        console.error('Error in seed execution:', error);
        process.exit(1);
    }
};

seedProducts();


