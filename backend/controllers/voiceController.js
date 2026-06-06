const fs = require('fs');
const GeminiVoiceService = require('../services/GeminiVoiceService');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Process Voice Command
// @route   POST /api/v1/voice/command
// @access  Public
exports.handleVoiceCommand = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No audio file uploaded');
    }

    const filePath = req.file.path;

    try {
        // 1. Process with Gemini
        const aiResponse = await GeminiVoiceService.processAudioCommand(filePath);
        console.log('AI Response:', aiResponse);

        let responseData = {
            success: true,
            intent: aiResponse.intent,
            redirect: aiResponse.route || null,
            products: []
        };

        // 2. Database Logic (Smart Search)
        if (aiResponse.intent === 'SEARCH') {
            const query = {};

            // Name Search (Regex) - Only if query exists
            if (aiResponse.query) {
                query.title = { $regex: aiResponse.query, $options: 'i' };
            }

            // Category Filter
            if (aiResponse.category) {
                query.category = { $regex: aiResponse.category, $options: 'i' };
            }

            // Price Filter
            if (aiResponse.maxPrice) {
                query.price = { $lte: aiResponse.maxPrice };
            }

            const products = await Product.find(query).limit(10);
            responseData.products = products;

            // If no products found via strict search, try broad search on query only
            if (products.length === 0 && aiResponse.query) {
                const broadProducts = await Product.find({
                    title: { $regex: aiResponse.query, $options: 'i' }
                }).limit(10);
                responseData.products = broadProducts;
            }
        }

        // 3. Cleanup
        fs.unlinkSync(filePath);

        // 4. Response
        res.json(responseData);

    } catch (error) {
        // Cleanup on error
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        console.error('Voice Controller Error:', error);
        res.status(500);
        throw new Error('AI Processing Failed');
    }
});
