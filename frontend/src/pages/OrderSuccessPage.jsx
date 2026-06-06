import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 space-y-8 bg-white rounded-sm shadow-card border border-gray-100">
      <CheckCircle size={80} className="text-green-500 mb-4" />
      <h2 className="text-3xl font-black text-brand-navy uppercase tracking-tighter">Order Placed Successfully!</h2>
      <p className="text-lg text-gray-500 font-bold text-center max-w-xl">
        Thank you for shopping with SmartShop. Your order has been received and is being processed. You will receive a confirmation email or SMS soon.
      </p>
      <Link to="/" className="mt-6">
        <button className="bg-brand-orange text-white px-10 py-4 font-black text-xs uppercase tracking-[0.3em] rounded-sm shadow-2xl hover:bg-orange-600 transition-all active:scale-95">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default OrderSuccessPage;
