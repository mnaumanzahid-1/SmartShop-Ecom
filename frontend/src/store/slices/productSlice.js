import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk to analyze voice command
export const analyzeVoice = createAsyncThunk(
    'products/analyzeVoice',
    async (text, { rejectWithValue }) => {
        try {
            // The backend is proxied via vite.config.js
            const response = await axios.post('/api/v1/voice/analyze', { text });
            return {
                products: response.data.products,
                meta: response.data.ai_meta.meta,
                intent: response.data.ai_meta.intent
            };
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: 'Internal Server Error' });
        }
    }
);

// Async Thunk to fetch all products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/products?limit=60');
            return response.data.products;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: 'Failed to fetch products' });
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        assistantMessage: '',
        transcript: '', // Added for real-time visual feedback
        status: 'idle', // 'idle' | 'listening' | 'processing' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setTranscript: (state, action) => {
            state.transcript = action.payload;
        },
        resetAssistant: (state) => {
            state.status = 'idle';
            state.assistantMessage = '';
            state.transcript = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(analyzeVoice.pending, (state) => {
                state.status = 'processing';
            })
            .addCase(analyzeVoice.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.products;
                state.assistantMessage = action.payload.meta?.response_speech || 'Processing complete';
            })
            .addCase(analyzeVoice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Voice processing failed';
                state.assistantMessage = 'Sorry, I encountered an error. Please try again.';
            })
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message;
            });
    },
});

export const { setStatus, resetAssistant, setTranscript } = productSlice.actions;
export default productSlice.reducer;
