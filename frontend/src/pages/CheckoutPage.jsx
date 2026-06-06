import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, selectCartTotal } from '../store/slices/cartSlice';
import { Lock, CreditCard, Banknote, Check, Loader2, ShieldCheck, MapPin } from 'lucide-react';
import axios from 'axios';
import ImageWithFallback from '../components/ui/ImageWithFallback';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);
    const totalAmount = useSelector(selectCartTotal);
    const { userInfo } = useSelector((state) => state.auth);


    // Guest Info State
    const [guestInfo, setGuestInfo] = useState({
        fullName: '',
        email: '',
        phone: ''
    });
    // Shipping State
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: 'Pakistan'
    });
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });

    const SHIPPING_FEE = 199;
    const finalTotal = totalAmount + SHIPPING_FEE - discount;

    const handleApplyCoupon = () => {
        if (couponCode.toUpperCase() === 'VOICE10') {
            const discountAmount = Math.round(totalAmount * 0.10);
            setDiscount(discountAmount);
            setCouponMessage({ type: 'success', text: `Coupon Applied! Saved Rs. ${discountAmount}` });
        } else {
            setDiscount(0);
            setCouponMessage({ type: 'error', text: 'Invalid Coupon Code' });
        }
    };


    const handlePlaceOrder = () => {
        // Validation
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
            alert('Please fill in all shipping details.');
            return;
        }
        if (!userInfo) {
            // Guest validation
            if (!guestInfo.fullName || !guestInfo.email || !guestInfo.phone) {
                alert('Please fill in all guest details.');
                return;
            }
        }

        setIsProcessing(true);

        setTimeout(async () => {
            try {
                const orderData = {
                    orderItems: items.map(item => ({
                        product: item._id,
                        name: item.title,
                        image: item.images?.[0],
                        price: item.price,
                        qty: item.qty
                    })),
                    shippingAddress,
                    paymentMethod,
                    itemsPrice: totalAmount,
                    shippingPrice: SHIPPING_FEE,
                    totalAmount: finalTotal,
                };
                if (!userInfo) {
                    orderData.guestName = guestInfo.fullName;
                    orderData.guestEmail = guestInfo.email;
                    orderData.guestPhone = guestInfo.phone;
                    orderData.guestAddress = `${shippingAddress.address}, ${shippingAddress.city}`;
                }

                let config = {};
                if (userInfo) {
                    config.headers = { Authorization: `Bearer ${userInfo.token}` };
                }

                await axios.post('/api/v1/orders', orderData, config);

                dispatch(clearCart());
                setIsProcessing(false);
                navigate('/order-success');
            } catch (error) {
                console.error(error);
                setIsProcessing(false);
                alert('Failed to place order. Please try again.');
            }
        }, 2000);
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <p className="text-xl font-black text-gray-400 uppercase tracking-widest">Your cart is empty</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-brand-orange text-white font-bold uppercase rounded-sm"
                >
                    Start Shopping
                </button>
            </div>
        );
    }


    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

            {/* Left Column: Form & Payment */}
            <div className="lg:col-span-2 space-y-6">

                {/* 1. Guest Info Section (if not logged in) */}
                {!userInfo && (
                    <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center text-xs">0</span>
                            Guest Checkout
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                                <input
                                    type="text"
                                    value={guestInfo.fullName}
                                    onChange={e => setGuestInfo({ ...guestInfo, fullName: e.target.value })}
                                    placeholder="Your Name"
                                    className="w-full h-10 border border-gray-200 rounded-sm px-3 text-sm focus:border-brand-orange outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                                <input
                                    type="email"
                                    value={guestInfo.email}
                                    onChange={e => setGuestInfo({ ...guestInfo, email: e.target.value })}
                                    placeholder="you@email.com"
                                    className="w-full h-10 border border-gray-200 rounded-sm px-3 text-sm focus:border-brand-orange outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                                <input
                                    type="tel"
                                    value={guestInfo.phone}
                                    onChange={e => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                                    placeholder="03XXXXXXXXX"
                                    className="w-full h-10 border border-gray-200 rounded-sm px-3 text-sm focus:border-brand-orange outline-none"
                                />
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-gray-500">
                            Already have an account? <span className="text-brand-orange font-bold cursor-pointer" onClick={() => navigate('/login')}>Login to checkout faster.</span>
                        </div>
                    </div>
                )}

                {/* 2. Address Section */}
                <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center text-xs">1</span>
                        Shipping Address
                    </h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Street Address</label>
                            <input
                                type="text"
                                value={shippingAddress.address}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                                placeholder="House / Apartment / Street"
                                className="w-full h-10 border border-gray-200 rounded-sm px-3 text-sm focus:border-brand-orange outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">City</label>
                                <input
                                    type="text"
                                    value={shippingAddress.city}
                                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                    placeholder="City Name"
                                    className="w-full h-10 border border-gray-200 rounded-sm px-3 text-sm focus:border-brand-orange outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Postal Code</label>
                                <input
                                    type="text"
                                    value={shippingAddress.postalCode}
                                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                    placeholder="54000"
                                    className="w-full h-10 border border-gray-200 rounded-sm px-3 text-sm focus:border-brand-orange outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Country</label>
                            <input
                                type="text"
                                value={shippingAddress.country}
                                disabled
                                className="w-full h-10 bg-gray-50 border border-gray-200 rounded-sm px-3 text-sm text-gray-500 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Payment Method */}
                <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 bg-brand-navy text-white rounded-full flex items-center justify-center text-xs">2</span>
                        Payment Method
                    </h3>

                    <div className="space-y-3">
                        {/* CC Option */}
                        <label className={`flex items-start gap-4 p-4 border rounded-sm cursor-pointer transition-all ${paymentMethod === 'Card' ? 'border-brand-orange bg-orange-50/10 ring-1 ring-brand-orange' : 'border-gray-200 hover:bg-gray-50'}`}>
                            <input
                                type="radio"
                                name="payment"
                                className="mt-1"
                                checked={paymentMethod === 'Card'}
                                onChange={() => setPaymentMethod('Card')}
                            />
                            <div className="flex-1 space-y-2">
                                <span className="font-bold text-brand-navy flex items-center gap-2">
                                    <CreditCard size={16} /> Credit / Debit Card
                                </span>
                                {paymentMethod === 'Card' && (
                                    <div className="space-y-3 mt-2 animate-in fade-in slide-in-from-top-2">
                                        <input type="text" placeholder="Card Number (Mock)" className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-brand-orange" />
                                        <div className="flex gap-3">
                                            <input type="text" placeholder="MM/YY" className="w-1/2 p-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-brand-orange" />
                                            <input type="text" placeholder="CVC" className="w-1/2 p-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-brand-orange" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </label>

                        {/* COD Option */}
                        <label className={`flex items-start gap-4 p-4 border rounded-sm cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-brand-orange bg-orange-50/10 ring-1 ring-brand-orange' : 'border-gray-200 hover:bg-gray-50'}`}>
                            <input
                                type="radio"
                                name="payment"
                                className="mt-1"
                                checked={paymentMethod === 'COD'}
                                onChange={() => setPaymentMethod('COD')}
                            />
                            <div className="flex-1">
                                <span className="font-bold text-brand-navy flex items-center gap-2">
                                    <Banknote size={16} /> Cash on Delivery
                                </span>
                                <p className="text-xs text-gray-500 mt-1">Pay with cash upon arrival.</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
                    <h3 className="text-lg font-black italic text-brand-navy uppercase mb-6">Order Summary</h3>

                    {/* Items List (Collapsed) */}
                    <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {items.map((item) => (
                            <div key={item._id} className="flex justify-between items-start text-sm">
                                <div className="flex gap-2">
                                    <ImageWithFallback src={item.images?.[0]} alt={item.title} className="w-10 h-10 object-cover rounded-sm border border-gray-200" />
                                    <div>
                                        <p className="line-clamp-1 font-bold text-gray-700 w-32">{item.title}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-700">Rs. {(item.price * item.qty).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    {/* Voucher Input */}
                    <div className="mb-6 space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Apply Voucher</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter Code"
                                className="flex-1 p-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-brand-orange uppercase"
                            />
                            <button
                                onClick={handleApplyCoupon}
                                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded-sm hover:bg-gray-700"
                            >
                                Apply
                            </button>
                        </div>
                        {couponMessage.text && (
                            <p className={`text-xs font-bold flex items-center gap-1 ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                {couponMessage.type === 'success' && <Check size={12} />}
                                {couponMessage.text}
                            </p>
                        )}
                    </div>

                    {/* Cost Breakdown */}
                    <div className="space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-600">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>Rs. {totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping Fee</span>
                            <span>Rs. {SHIPPING_FEE}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-brand-orange font-bold">
                                <span>Discount</span>
                                <span>- Rs. {discount.toLocaleString()}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                        <span className="font-black text-brand-navy text-lg">Total</span>
                        <span className="font-black text-brand-orange text-xl">Rs. {finalTotal.toLocaleString()}</span>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="w-full mt-6 bg-brand-orange text-white py-3 rounded-sm font-black uppercase tracking-widest hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 size={18} className="animate-spin" /> Processing
                            </>
                        ) : (
                            <>
                                Place Order <Lock size={16} />
                            </>
                        )}
                    </button>

                    <p className="text-[10px] text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                        <ShieldCheck size={12} /> Secure SSL Encrypted Transaction
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
