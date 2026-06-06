const { GoogleGenerativeAI } = require('@google/generative-ai');
console.log('--- VOICE INTENT SERVICE VERSION 2.0.1 ---');
const Joi = require('joi');
const logger = require('../utils/logger');

// Initialize Gemini at runtime to ensure process.env is loaded
let genAI;
let model;

const initAI = () => {
    if (!genAI) {
        if (!process.env.GEMINI_API_KEY) {
            logger.error('GEMINI_API_KEY is missing from environment variables');
            throw new Error('AI configuration missing');
        }
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Using gemini-2.0-flash as confirmed by models/list
        model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    }
    return model;
};

const voiceSchema = Joi.object({
    intent: Joi.string().valid('SEARCH', 'NAVIGATE', 'CART_ACTION', 'ORDER_STATUS', 'SUPPORT').required(),
    slots: Joi.object({
        product: Joi.string().allow(null, '').default(''),
        adjectives: Joi.array().items(Joi.string()).default([]),
        price_constraint: Joi.object({
            operator: Joi.string().valid('lt', 'gt', 'eq'),
            value: Joi.number()
        }).allow(null),
        sort: Joi.string().valid('price_asc', 'price_desc', 'newest').allow(null),
        quantity: Joi.number().default(1)
    }).required(),
    meta: Joi.object({
        detected_lang: Joi.string().default('en'),
        response_speech: Joi.string().required()
    }).required()
});

const systemPrompt = `
  You are a high-end E-commerce Shopping Assistant (Daraz/Amazon style).
  Convert text into JSON.
  
  RULES:
  1. Output RAW JSON ONLY. No markdown. No conversational filler.
  2. "sasta" or "cheap" -> slots.sort = "price_asc".
  3. "X tak", "under X", "less than X", "below X" -> slots.price_constraint = { operator: "lt", value: X }.
  4. "X se zyada", "over X", "more than X", "above X" -> slots.price_constraint = { operator: "gt", value: X }.
  
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

class VoiceIntentService {
    async processUserCommand(text, retryCount = 0) {
        const aiModel = initAI();
        const combinedPrompt = `${systemPrompt}\n\nUSER COMMAND: "${text}"\n\nJSON OUTPUT:`;

        try {
            const result = await aiModel.generateContent(combinedPrompt);
            const response = await result.response;
            let rawJson = response.text().trim();

            // Self-Correction: Remove potential markdown backticks
            rawJson = rawJson.replace(/^```json\n?/, '').replace(/\n?```$/, '');

            const parsedData = JSON.parse(rawJson);

            // Validation
            const { error, value } = voiceSchema.validate(parsedData);

            if (error) {
                if (retryCount < 1) {
                    return this.processUserCommand(`Fix this JSON: ${rawJson}. Error: ${error.message}`, retryCount + 1);
                }
                throw new Error(`AI generated invalid schema: ${error.message}`);
            }

            return value;
        } catch (err) {
            logger.error(`VoiceIntentService Error: ${err.message}`);
            throw err;
        }
    }
}

module.exports = new VoiceIntentService();
