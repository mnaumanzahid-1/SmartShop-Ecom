import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBasket, ArrowLeft, ShieldCheck } from 'lucide-react';
import { removeFromCart, updateQty, selectCartTotal, selectCartCount } from '../store/slices/cartSlice';


const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.cart);
    const total = useSelector(selectCartTotal);
    const count = useSelector(selectCartCount);

    if (items.length === 0) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-40 flex flex-col items-center justify-center space-y-10 bg-white rounded-sm shadow-card border border-gray-100 italic">
                <div className="w-36 h-36 bg-[#eff0f5] rounded-full flex items-center justify-center text-brand-orange border border-white shadow-inner">
                    <ShoppingBasket size={80} strokeWidth={1.5} />
                </div>
                <div className="text-center space-y-3">
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Your cart is empty.</h2>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Fill it with the things you love</p>
                </div>
                <Link to="/">
                    <button className="bg-brand-orange text-white px-12 py-4 font-black text-xs uppercase tracking-[0.3em] rounded-sm shadow-2xl hover:bg-orange-600 transition-all active:scale-95">PROCEED TO SHOPPING</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Detailed Listing Stack */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="bg-white p-6 rounded-sm shadow-card border border-gray-100 flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter">My Shopping Cart ({count})</h2>
                        <Link to="/" className="text-[10px] font-black text-brand-orange uppercase flex items-center gap-3 hover:underline tracking-widest border border-brand-orange/20 px-4 py-2 rounded-sm">
                            <ArrowLeft size={14} /> Back to Market
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {items.map(item => (
                            <div key={`${item._id}-${item.variant}`} className="bg-white p-8 rounded-sm shadow-card border border-gray-100 flex flex-col md:flex-row items-center gap-10 group relative">
                                <div className="w-28 h-28 bg-[#f8f9fa] rounded-sm overflow-hidden shrink-0 border border-gray-100 shadow-sm relative">
                                    <img src={item.images?.[0] || 'https://via.placeholder.com/200'} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>

                                <div className="flex-1 space-y-3 text-center md:text-left">
                                    <Link to={`/product/${item._id}`} className="text-lg font-black text-gray-800 hover:text-brand-orange transition-colors leading-tight line-clamp-2 italic uppercase">
                                        {item.title}
                                    </Link>
                                    <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        <span>Var: <span className="text-gray-900">{item.variant}</span></span>
                                        <span>Condition: <span className="text-green-600 italic">Pre-Check Success</span></span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-1 min-w-[140px]">
                                    <span className="text-2xl font-black text-brand-orange italic tracking-tighter">Rs.{item.price.toLocaleString()}</span>
                                    <span className="text-[9px] text-gray-300 font-black uppercase tracking-widest line-through">Rs.{(item.price * 1.3).toLocaleString()}</span>
                                </div>

                                {/* Qty Controls */}
                                <div className="flex items-center border-2 border-gray-100 rounded-sm bg-white overflow-hidden shadow-sm">
                                    <button onClick={() => dispatch(updateQty({ id: item._id, variant: item.variant, qty: item.qty - 1 }))} className="w-12 h-12 hover:bg-gray-50 font-black transition-all border-r-2 border-gray-100">-</button>
                                    <span className="w-14 h-12 flex items-center justify-center font-black text-lg select-none">{item.qty}</span>
                                    <button onClick={() => dispatch(updateQty({ id: item._id, variant: item.variant, qty: item.qty + 1 }))} className="w-12 h-12 hover:bg-gray-50 font-black transition-all border-l-2 border-gray-100">+</button>
                                </div>

                                <button
                                    onClick={() => dispatch(removeFromCart({ id: item._id, variant: item.variant }))}
                                    className="p-4 text-gray-200 hover:text-red-600 hover:bg-red-50 rounded-full transition-all active:scale-95 group-hover:text-gray-400"
                                >
                                    <Trash2 size={24} strokeWidth={2} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Professional Summary Column */}
                <div className="lg:col-span-4 sticky top-[130px] space-y-4">
                    <div className="bg-brand-navy p-10 rounded-sm shadow-2xl border-b-8 border-brand-orange space-y-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />

                        <h3 className="text-2xl font-black uppercase tracking-tighter italic border-b border-white/10 pb-6">Final Summary</h3>

                        <div className="space-y-6 text-[11px] font-black uppercase tracking-[0.2em]">
                            <div className="flex justify-between text-gray-400">
                                <span>Merchandise ({count} items)</span>
                                <span className="text-white tracking-widest">Rs.{total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Logistics Fee</span>
                                <span className="text-green-500 font-black italic tracking-widest">FREE</span>
                            </div>
                            <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-gray-500 mb-1">TOTAL PAYABLE</span>
                                    <span className="text-3xl font-black text-brand-orange italic tracking-tighter">Rs.{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <button onClick={() => navigate('/checkout')} className="w-full h-16 bg-brand-orange text-white font-black text-xs uppercase tracking-[0.3em] rounded-sm shadow-xl hover:bg-orange-600 transition-all active:scale-95">ORDER NOW</button>
                            <div className="flex items-center justify-center gap-3 text-gray-500 text-[9px] font-black uppercase tracking-widest mt-2 opacity-80">
                                <ShieldCheck size={14} className="text-green-500" /> Verified Secure Gateway
                            </div>
                        </div>
                    </div>

                    {/* Voucher Logic Mock */}
                    <div className="bg-white p-8 rounded-sm shadow-card border border-gray-100 flex gap-4 items-center">
                        <input type="text" placeholder="Promo Code?" className="flex-1 h-12 bg-gray-50 border border-gray-100 rounded-sm px-6 font-black text-[10px] uppercase tracking-widest outline-none focus:ring-2 focus:ring-brand-orange/50 transition-all" />
                        <button className="h-12 px-6 border-2 border-brand-orange text-brand-orange font-black text-[10px] uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all rounded-sm">Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
