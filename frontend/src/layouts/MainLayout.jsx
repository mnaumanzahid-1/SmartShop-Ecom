import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import CategoryNavigation from '../components/ui/CategoryNavigation';
import VoiceOverlay from '../components/VoiceOverlay';
import { resetAssistant } from '../store/slices/productSlice';

const MainLayout = () => {
    const dispatch = useDispatch();
    const { status, transcript } = useSelector((state) => state.products);

    return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] via-[#f3f4f8] to-[#f7f1ed] overflow-x-hidden">
            <Navbar />

            {/* Header Spacer */}
            <div className="h-[94px]" />

            {/* Global Category Navigation */}
                <div className="w-full max-w-7xl mx-auto mb-2 sm:mb-4">
                    <CategoryNavigation />
                </div>

            <main className="flex-1 w-full px-4 sm:px-6 py-6 md:py-8">
                    <div className="w-full max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>

            {/* Enterprise Footer */}
            <footer className="bg-[#2e2e54] text-white pt-16 pb-12">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/5 pb-16 mb-10">
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold text-[#f57224] uppercase tracking-widest">Customer Care</h4>
                        <ul className="space-y-3 text-[13px] opacity-70">
                            <li><Link to="/shipping" className="hover:underline cursor-pointer">Shipping & Delivery</Link></li>
                            <li><Link to="/returns" className="hover:underline cursor-pointer">Returns & Refunds</Link></li>
                            <li><Link to="/terms" className="hover:underline cursor-pointer">Terms & Conditions</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold text-[#f57224] uppercase tracking-widest">SmartShop Online</h4>
                        <ul className="space-y-3 text-[13px] opacity-70">
                            <li><Link to="/about" className="hover:underline cursor-pointer text-white opacity-100 italic">About Us</Link></li>
                            <li><Link to="/profile" className="hover:underline cursor-pointer">My Account</Link></li>
                            <li><Link to="/privacy" className="hover:underline cursor-pointer">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold text-[#f57224] uppercase tracking-widest">Global Experience</h4>
                        <div className="grid grid-cols-2 gap-4 opacity-50 text-[11px] font-bold">
                            <Link to="/category/mobiles" className="hover:text-brand-orange transition-colors">MOBILES</Link>
                            <Link to="/category/fashion" className="hover:text-brand-orange transition-colors">FASHION</Link>
                            <Link to="/category/electronics" className="hover:text-brand-orange transition-colors">ELECTRONICS</Link>
                            <Link to="/category/home" className="hover:text-brand-orange transition-colors">HOME</Link>
                            <Link to="/category/beauty" className="hover:text-brand-orange transition-colors">BEAUTY</Link>
                            <Link to="/category/automotive" className="hover:text-brand-orange transition-colors">AUTOMOTIVE</Link>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold text-[#f57224] uppercase tracking-widest">Socialize</h4>
                        <div className="flex gap-4">
                            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f57224] transition-all cursor-pointer">f</div>
                            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f57224] transition-all cursor-pointer">t</div>
                            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f57224] transition-all cursor-pointer italic">i</div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 text-[11px] font-medium uppercase tracking-[0.1em]">
                    <p>© 2026 SmartShop Pakistan - Your Voice-Powered Shopping Platform.</p>
                    <div className="flex gap-10">
                        <span>Visa / Master / COD</span>
                        <span>Powered by Voice Technology</span>
                    </div>
                </div>
            </footer>

            {/* Global Voice Assistant Overlay */}
            <VoiceOverlay />
        </div>
    );
};

export default MainLayout;
