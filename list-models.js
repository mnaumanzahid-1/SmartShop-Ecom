const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        // Note: listModels is not directly on genAI in most versions, 
        // it's usually part of the admin/management API or you can try to list them.
        // However, we can try to hit a known model with a simple prompt first.

        const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro', 'gemini-1.0-pro'];

        for (const m of models) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent("test");
                const response = await result.response;
                console.log(`✅ Model ${m} is available and working!`);
                return;
            } catch (e) {
                console.log(`❌ Model ${m} failed: ${e.message}`);
            }
        }
    } catch (error) {
        console.error("❌ List Models Failed:", error);
    }
}

listModels();
