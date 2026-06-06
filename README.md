# SmartShop — AI Voice-Controlled E-Commerce Platform

A full-stack MERN e-commerce platform with a bilingual AI voice assistant as the primary shopping interface. Built as a Final Year Project at IMSciences, Peshawar.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini%201.5%20Flash-4285F4?logo=google&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux&logoColor=white)

---

## What It Does

Users speak in **Urdu or English** — the AI understands the intent, searches the database, and responds aloud. No typing required.

- **Voice Search** — "Mujhe red shoes dikhao" → finds matching products
- **Voice Navigation** — "Cart me jao" → navigates to cart
- **Order Tracking** — "Mera order kahan hai?" → returns order status
- **Flash Sale** — real-time countdown timer with admin-configurable deals
- **Multi-Role System** — buyer, seller, admin portals with separate dashboards
- **Admin Analytics** — Recharts sales charts + in-browser PDF export (jsPDF)

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, Vite, Redux Toolkit, React Router v7, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js, MongoDB, Mongoose, JWT, Multer |
| AI | Google Gemini 1.5 Flash (multimodal — audio + text) |
| State | Redux Toolkit — 4 slices: auth, cart, products, wishlist |
| Charts | Recharts (admin dashboard) |
| PDF | jsPDF + autoTable (admin report export) |

---

## Voice Assistant — How It Works

```
User speaks → Web Speech API → Audio blob → Multer upload
→ Google Gemini 1.5 Flash → Intent JSON
→ MongoDB query → Products/navigation/order data
→ SpeechSynthesis API → Spoken response
```

**Three intents Gemini returns:**

```json
{ "intent": "SEARCH",   "query": "red shoes", "category": "fashion", "maxPrice": 5000 }
{ "intent": "NAVIGATE", "route": "/cart" }
{ "intent": "TRACK_ORDER" }
```

---

## User Roles

| Role | Access |
|------|--------|
| `buyer` | Browse, cart, checkout, order tracking |
| `seller_pending` | Applied for seller — awaiting admin approval |
| `seller` | Full seller dashboard — add/manage products |
| `admin` | Full platform control — users, orders, flash sale, seller approvals |

---

## Project Structure

```
SmartShop/
├── backend/
│   ├── controllers/         # authController, voiceController, productController...
│   ├── models/              # User, Product, Order, FlashSaleConfig
│   ├── routes/              # API routes
│   ├── services/
│   │   └── GeminiVoiceService.js   # Core AI integration
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/           # 30+ pages (store, admin, seller, static)
│   │   ├── components/
│   │   │   └── VoiceOverlay.jsx    # Voice assistant modal
│   │   ├── hooks/           # useVoiceAssistant, useVoiceRecorder
│   │   ├── store/slices/    # Redux: auth, cart, products, wishlist
│   │   └── App.jsx
│   └── package.json
└── .env
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API key — [get one here](https://makersuite.google.com/)

### Setup

```bash
# Clone the repo
git clone https://github.com/mnaumanzahid-1/SmartShop-Ecom.git
cd SmartShop-Ecom

# Backend
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

```bash
# Start backend
node server.js

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Key Features

- **Bilingual Voice AI** — handles Romanised Urdu ("Mujhe mobile dikhao") and English naturally
- **Smart Fallback Search** — if strict query returns nothing, Gemini broadens the search automatically
- **Real-Time Flash Sale** — countdown timer, stock progress bars, admin-configurable
- **Seller Workflow** — apply → pending → approved by admin → access seller dashboard
- **PDF Reports** — admin can export analytics as PDF in one click (jsPDF)
- **30+ Pages** — complete shopping flow, admin panel, seller portal, static pages

---

## Author

**Muhammad Nauman Zahid**
BS Software Engineering — IMSciences, Peshawar
[LinkedIn](https://www.linkedin.com/in/muhammad-nauman-zahid/) · [GitHub](https://github.com/mnaumanzahid-1)
