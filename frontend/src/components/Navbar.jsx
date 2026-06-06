import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Mic, Search, ShoppingBag, User, ChevronDown } from 'lucide-react';
import { selectCartCount } from '../store/slices/cartSlice';
import { logout } from '../store/slices/authSlice';
import { setStatus } from '../store/slices/productSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const { user, isAuthenticated } = useSelector(state => state.auth);

    const [searchKeyword, setSearchKeyword] = useState('');
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            navigate(`/search/${searchKeyword.trim()}`);
            setSearchKeyword('');
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-[9999] shadow-soft w-screen bg-white/80 backdrop-blur-md border-b border-gray-100">
            {/* Top Banner Strip */}
            <div className="bg-[#f57224] py-1 text-white text-[12px] font-medium w-full overflow-x-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center gap-4 sm:gap-8 opacity-95 whitespace-nowrap">
                    <Link to="/mobile-app" className="cursor-pointer hover:underline uppercase hover:text-gray-200 transition-colors">Save More on App</Link>
                    <Link to="/sell-on-smartshop" className="cursor-pointer hover:underline uppercase hover:text-gray-200 transition-colors">Sell on SmartShop</Link>
                    <Link to="/track-order" className="cursor-pointer hover:underline uppercase hover:text-gray-200 transition-colors">Track My Order</Link>
                    <Link to="/help-center" className="cursor-pointer hover:underline uppercase hover:text-gray-200 transition-colors">Help & Support</Link>
                </div>
            </div>

            {/* Main Header Area */}
            <div className="bg-white/0 px-4 sm:px-6 w-full">
                <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-6 pt-2 min-h-[64px]">
                    {/* Branded Logo */}
                    <Link to="/" className="text-brand-orange text-2xl sm:text-3xl font-black italic tracking-tighter shrink-0 drop-shadow-sm hover:opacity-90 transition-opacity duration-200">
                        SmartShop
                    </Link>
                    {/* Search Bar + Mic Button */}
                    <form onSubmit={handleSearch} className="flex-1 flex justify-center items-center gap-2">
                        <div className="relative w-full max-w-lg">
                            <input
                                type="text"
                                value={searchKeyword}
                                onChange={e => setSearchKeyword(e.target.value)}
                                placeholder="Search products, brands..."
                                className="w-full px-6 py-2 rounded-2xl bg-white/60 shadow-inner border border-white/40 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-base text-gray-700 placeholder-gray-400 transition-all duration-200 backdrop-blur"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-orange hover:text-white hover:bg-brand-orange rounded-full p-2 transition-all duration-200"
                                title="Execute Search"
                            >
                                <Search size={18} strokeWidth={3} />
                            </button>
                        </div>
                        {/* Mic Button for Voice Assistant */}
                        <button
                            type="button"
                            className="ml-2 flex items-center justify-center rounded-full bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange p-2 shadow-soft transition-all duration-200"
                            title="Voice Assistant"
                            onClick={() => dispatch(setStatus('listening'))}
                        >
                            <Mic size={22} />
                        </button>
                    </form>

                    {/* Profile & Cart */}
                    <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                        {isAuthenticated ? (
                            <div className="relative">
                                {/* Profile Trigger - NOT a Link */}
                                <button
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    onMouseEnter={() => setProfileDropdownOpen(true)}
                                    onMouseLeave={() => setProfileDropdownOpen(false)}
                                    className="flex items-center gap-1 text-brand-orange cursor-pointer py-2 px-2 rounded-16 hover:bg-orange-50 transition-all duration-200 focus:outline-none"
                                >
                                    <User size={26} strokeWidth={1.5} />
                                    <span className="text-sm font-bold truncate max-w-[100px]">{user.name || 'Account'}</span>
                                    <ChevronDown size={14} className={`transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Auth Dropdown */}
                                {profileDropdownOpen && (
                                    <div
                                        className="absolute top-full right-0 mt-2 w-56 bg-white text-gray-800 shadow-soft rounded-16 py-2 z-[10000] border border-gray-100 animate-fadeIn"
                                        onMouseEnter={() => setProfileDropdownOpen(true)}
                                        onMouseLeave={() => setProfileDropdownOpen(false)}
                                    >
                                        <div className="px-4 py-2 border-b border-gray-100 italic font-black text-[9px] text-gray-400 uppercase tracking-widest">My Account</div>

                                        {user.role === 'admin' && (
                                            <Link to="/admin" className="block px-4 py-3 hover:bg-orange-50 cursor-pointer text-sm font-black text-brand-orange uppercase tracking-tighter italic">
                                                Admin Dashboard
                                            </Link>
                                        )}

                                        {user.role === 'seller' && (
                                            <Link to="/seller/dashboard" className="block px-4 py-3 hover:bg-orange-50 cursor-pointer text-sm font-black text-brand-orange uppercase tracking-tighter italic">
                                                Seller Dashboard
                                            </Link>
                                        )}

                                        {user.role === 'seller_pending' && (
                                            <Link to="/seller/application-status" className="block px-4 py-3 hover:bg-orange-50 cursor-pointer text-sm font-black text-blue-600 uppercase tracking-tighter italic">
                                                Application Status
                                            </Link>
                                        )}

                                        {user.role === 'buyer' && (
                                            <Link to="/sell-on-smartshop" className="block px-4 py-3 hover:bg-orange-50 cursor-pointer text-sm font-black text-gray-600 uppercase tracking-tighter italic">
                                                Become a Seller
                                            </Link>
                                        )}

                                        <Link to="/profile" className="block px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm font-medium">My Profile</Link>
                                        <Link to="/profile" className="block px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm font-medium">My Orders</Link>

                                        <div
                                            onClick={() => {
                                                dispatch(logout());
                                                setProfileDropdownOpen(false);
                                            }}
                                            className="px-4 py-3 border-t border-gray-100 text-[#f57224] font-black cursor-pointer hover:bg-orange-50 text-sm uppercase italic tracking-widest"
                                        >
                                            Disconnect Link
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-1 text-brand-orange hover:opacity-80 transition-opacity">
                                <User size={26} strokeWidth={1.5} />
                                <span className="text-sm font-bold uppercase tracking-widest">Login</span>
                            </Link>
                        )}

                        <Link to="/cart" className="relative group py-2">
                            <ShoppingBag size={28} className="text-brand-orange" strokeWidth={1.5} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-2 bg-white text-brand-orange text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-soft border border-brand-orange/20 group-hover:scale-110 transition-transform duration-200">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
