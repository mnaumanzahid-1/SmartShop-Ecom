const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ProductService = require('./backend/services/ProductService');
const logger = require('./backend/utils/logger');

dotenv.config();

async function runMockTest() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ DB Connected for Mock Test");

        // Test Case 1: Search for shoes under 5000, sasta
        const slots1 = {
            product: "shoes",
            price_constraint: { operator: "lt", value: 5000 },
            sort: "price_asc"
        };

        console.log("\n🧪 Test 1: 'Sasta shoes under 5000'");
        const results1 = await ProductService.searchProducts(slots1);
        console.log(`Results found: ${results1.length}`);
        results1.forEach(p => console.log(` - ${p.title} (Rs. ${p.price})`));

        // Test Case 2: Search for mobile
        const slots2 = {
            product: "mobile",
            sort: "price_desc"
        };

        console.log("\n🧪 Test 2: 'Mobile (expensive first)'");
        const results2 = await ProductService.searchProducts(slots2);
        console.log(`Results found: ${results2.length}`);
        results2.forEach(p => console.log(` - ${p.title} (Rs. ${p.price})`));

        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Mock Test Failed:", error);
        process.exit(1);
    }
}

runMockTest();
