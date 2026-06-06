import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    User,
    Package,
    Settings,
    ChevronRight,
    CreditCard,
    MapPin,
    ArrowRight,
    Loader2
} from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import { formatMonthYear, formatRelativeWithTime } from '../utils/dateUtils';
import useNow from '../hooks/useNow';

const ProfilePage = () => {
    const { user } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('orders');
    const now = useNow();

    useEffect(() => {
        const fetchMyOrders = async () => {
            try {
                const { data } = await axios.get('/api/v1/orders/myorders');
                setOrders(data.orders);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch orders');
                setLoading(false);
            }
        };

        fetchMyOrders();
    }, []);

    const tabs = [
        { id: 'orders', name: 'My Orders', icon: Package },
        { id: 'profile', name: 'Account Settings', icon: User },
        { id: 'address', name: 'Shipping Address', icon: MapPin },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-brand-orange text-white rounded-sm flex items-center justify-center text-3xl font-black italic shadow-xl">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-brand-navy italic uppercase tracking-tighter leading-none">
                            Assalam-o-Alaikum, <br /> <span className="text-brand-orange">{user?.name}</span>
                        </h1>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Member since {formatMonthYear(user?.createdAt)}</p>
                    </div>
                </div>

                <div className="flex bg-white p-1 rounded-sm shadow-sm border border-gray-100">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all flex items-center gap-2 ${activeTab === tab.id
                                ? 'bg-brand-navy text-white shadow-lg'
                                : 'text-gray-400 hover:text-brand-navy'
                                }`}
                        >
                            <tab.icon size={14} />
                            {tab.name}
                        </button>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Content Area */}
                <div className="lg:col-span-8">
                    {activeTab === 'orders' && (
                        <div className="space-y-6">
                            {loading ? (
                                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-orange" size={48} /></div>
                            ) : orders.length > 0 ? (
                                orders.map(order => (
                                    <div key={order._id} className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden hover:border-brand-orange/30 transition-colors group">
                                        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-50 bg-gray-50/30">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Reference</p>
                                                <h3 className="text-sm font-black text-brand-navy uppercase">#{order._id.slice(-12)}</h3>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Status</p>
                                                <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${order.status === 'Delivered' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-brand-orange border-orange-100'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total</p>
                                                <p className="text-lg font-black text-brand-navy leading-none">Rs.{order.totalAmount.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="p-6 flex items-center justify-between">
                                            <div className="flex -space-x-3">
                                                {order.orderItems.slice(0, 4).map((item, i) => (
                                                    <div key={i} className="w-12 h-12 rounded-sm border-2 border-white overflow-hidden shadow-sm bg-gray-100">
                                                        <ImageWithFallback src={item.image} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                                {order.orderItems.length > 4 && (
                                                    <div className="w-12 h-12 rounded-sm border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-sm">
                                                        +{order.orderItems.length - 4}
                                                    </div>
                                                )}
                                            </div>
                                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-orange group-hover:gap-4 transition-all">
                                                View Order Details <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white rounded-sm border border-dashed border-gray-200">
                                    <Package className="mx-auto text-gray-200 mb-4" size={48} />
                                    <h3 className="text-xl font-black text-gray-300 uppercase tracking-tighter">No orders found</h3>
                                    <Link to="/" className="text-brand-orange text-[10px] font-black uppercase tracking-widest mt-4 inline-block hover:underline italic">Start Shopping with Voice</Link>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 space-y-8">
                            <h3 className="text-xl font-black italic uppercase tracking-tighter border-b border-gray-100 pb-4">Personal Information</h3>
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                                    <input type="text" value={user?.name} className="w-full h-12 bg-gray-50 border border-transparent px-4 rounded-sm text-sm font-bold focus:bg-white focus:border-brand-orange/30 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                                    <input type="email" value={user?.email} className="w-full h-12 bg-gray-50 border border-transparent px-4 rounded-sm text-sm font-bold opacity-60 cursor-not-allowed" disabled />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">New Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full h-12 bg-gray-50 border border-transparent px-4 rounded-sm text-sm font-bold focus:bg-white focus:border-brand-orange/30 outline-none transition-all" />
                                </div>
                                <div className="flex items-end">
                                    <button type="button" className="w-full h-12 bg-brand-navy text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-black transition-all shadow-lg active:scale-95">
                                        Update Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                {/* Sidebar Stats */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-brand-navy text-white p-8 rounded-sm shadow-2xl border-b-8 border-brand-orange space-y-8">
                        <h3 className="text-lg font-black uppercase tracking-tighter italic border-b border-white/10 pb-4">Account Credits</h3>
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SmartShop Wallet</p>
                            <div className="flex justify-between items-end">
                                <h2 className="text-3xl font-black text-white italic">Rs. 0</h2>
                                <button className="text-[10px] font-black text-brand-orange uppercase tracking-widest hover:underline italic">Top Up</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest italic border-b border-gray-50 pb-4 text-gray-400">Security Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                <span className="text-gray-400">2FA Status</span>
                                <span className="text-red-500">Disabled</span>
                            </div>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                        <span className="text-gray-400">Last Login</span>
                                        <span className="text-brand-navy">{formatRelativeWithTime(user?.lastLogin, now)}</span>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
