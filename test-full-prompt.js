const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemPrompt = `
  You are a high-end E-commerce Shopping Assistant (Daraz/Amazon style).
  Convert text into JSON.
  
  RULES:
  1. Output RAW JSON ONLY. No markdown.
  2. "sasta" -> slots.sort = "price_asc".
  3. "X tak" -> slots.price_constraint = { operator: "lt", value: X }.
  
  SCHEMA:
  {
    "intent": "SEARCH" | "NAVIGATE" | "CART_ACTION" | "ORDER_STATUS" | "SUPPORT",
    "slots": {
      "product": string,
      "adjectives": string[],
      "price_constraint": { "operator": "lt" | "gt" | "eq", "value": number } | null,
      "sort": "price_asc" | "price_desc" | "newest" | null,
      "quantity": number
    },
    "meta": {
      "detected_lang": string,
      "response_speech": string
    }
  }
`;

const testQuery = "Yaar mujhe running shoes dikhao 5000 tak, sasty walay";

async function testFullPrompt() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const combinedPrompt = `${systemPrompt}\n\nUSER COMMAND: "${testQuery}"\n\nJSON OUTPUT:`;

        console.log("🚀 Testing full prompt... ");
        const result = await model.generateContent(combinedPrompt);
        const response = await result.response;
        console.log("✅ Success! Response:");
        console.log(response.text());
    } catch (error) {
        console.error("❌ Full Prompt Test Failed:", error);
    }
}

testFullPrompt();
