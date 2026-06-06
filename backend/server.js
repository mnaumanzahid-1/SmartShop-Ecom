const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');

dotenv.config();
connectDB();

const app = express();

// CORS Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.use('/api/v1/voice', require('./routes/voiceRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/products', require('./routes/productRoutes'));
app.use('/api/v1/orders', require('./routes/orderRoutes'));
app.use('/api/v1/seller-applications', require('./routes/sellerApplicationRoutes'));
app.use('/api/flash-sale', require('./routes/flashSaleRoutes'));


app.get('/api/test-gemini', async (req, res) => {
    try {
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        const response = await result.response;
        res.status(200).json({ success: true, text: response.text() });
    } catch (error) {
        console.error('Test Gemini Route Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
