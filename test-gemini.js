const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        console.log("✅ Gemini Success:", response.text());
    } catch (error) {
        console.error("❌ Gemini Error:", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
    }
}

testGemini();
