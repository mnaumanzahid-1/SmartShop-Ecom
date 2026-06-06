import React, { useState } from 'react';
import axios from 'axios';
import { Search, Package, MapPin, Truck, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import ImageWithFallback from '../components/ui/ImageWithFallback';

const TrackOrderPage = () => {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!orderId.trim()) return;

        setLoading(true);
        setError(null);
        setOrder(null);

        try {
            // Assuming the backend endpoint supports getById directly or via query
            const { data } = await axios.get(`/api/v1/orders/${orderId}`);
            setOrder(data.order);
        } catch (err) {
            setError(err.response?.data?.message || 'Order not found. Please check the ID and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <h1 className="text-3xl font-black text-brand-navy italic uppercase tracking-tighter text-center mb-2">Track Your Order</h1>
            <p className="text-center text-gray-400 text-sm font-bold uppercase tracking-widest mb-10">Enter your Order ID to see current status</p>

            <div className="bg-white p-8 rounded-sm shadow-card border border-gray-100 mb-10">
                <form onSubmit={handleTrack} className="flex gap-4">
                    <div className="relative flex-1">
                        <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter Order Reference (e.g., 65b12...)"
                            className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-sm font-bold text-gray-800 focus:outline-none focus:border-brand-orange transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="h-14 px-8 bg-brand-orange text-white font-black text-xs uppercase tracking-widest rounded-sm hover:bg-orange-600 transition-all flex items-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} strokeWidth={3} />}
                        Track
                    </button>
                </form>
                {error && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-sm flex items-center gap-3 text-red-600 text-xs font-bold uppercase tracking-wide">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}
            </div>

            {order && (
                <div className="bg-white rounded-sm shadow-card border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-brand-navy p-6 flex justify-between items-center text-white">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Order Reference</p>
                            <p className="text-xl font-black italic">#{order._id}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Current Status</p>
                            <div className="flex items-center gap-2 text-brand-orange font-black italic uppercase text-lg">
                                {order.status === 'Delivered' ? <CheckCircle size={20} /> : <Truck size={20} />}
                                {order.status}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Progress Bar Mock */}
                        <div className="relative pt-6 pb-2">
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 rounded-full transition-all duration-1000"
                                    style={{ width: order.status === 'Delivered' ? '100%' : order.status === 'Shipped' ? '75%' : order.status === 'Processing' ? '50%' : '25%' }}
                                />
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <span>Placed</span>
                                <span>Processing</span>
                                <span>Shipped</span>
                                <span>Delivered</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <MapPin size={16} className="text-brand-orange" /> Shipping Details
                                </h3>
                                <div className="p-4 bg-gray-50 rounded-sm space-y-1 text-sm text-gray-600">
                                    <p className="font-bold text-gray-800">{order.user?.name || 'Guest'}</p>
                                    <p>{order.shippingAddress?.address}</p>
                                    <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                                    <p>{order.shippingAddress?.country}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Package size={16} className="text-brand-orange" /> Order Items
                                </h3>
                                <div className="space-y-3">
                                    {order.orderItems.map((item, i) => (
                                        <div key={i} className="flex gap-3 items-center">
                                            <div className="w-10 h-10 bg-white border border-gray-200 rounded-sm overflow-hidden flex-shrink-0">
                                                <ImageWithFallback src={item.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-gray-800 truncate">{item.name}</p>
                                                <p className="text-[10px] text-gray-500 font-bold">Qty: {item.qty} x Rs.{item.price.toLocaleString()}</p>
                                            </div>
                                            <p className="text-xs font-black text-brand-orange">Rs.{(item.price * item.qty).toLocaleString()}</p>
                                        </div>
                                    ))}
                                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center mt-3">
                                        <span className="text-xs font-bold text-gray-500 uppercase">Total Amount</span>
                                        <span className="text-lg font-black text-brand-navy italic">Rs.{order.totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackOrderPage;
