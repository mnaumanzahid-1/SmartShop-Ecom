import React from 'react';
import { Smartphone, Star, Download, Apple } from 'lucide-react';

const MobileAppPage = () => {
    return (
        <div className="w-full bg-[#eff0f5] min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
            <div className="bg-brand-navy max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Left Content */}
                <div className="flex-1 p-8 sm:p-12 md:p-20 flex flex-col justify-center relative z-10">
                    <span className="text-[#f57224] font-black text-[10px] uppercase tracking-[0.3em] mb-4">Mobile Shopping Experience</span>
                    <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none mb-6">
                        Shop Smarter <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-500">On The Go.</span>
                    </h1>
                    <p className="text-gray-400 text-lg mb-10 max-w-md">
                        Download the SmartShop app for exclusive deals, voice-first navigation, and real-time order tracking.
                    </p>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-white p-2 rounded-lg shadow-lg">
                                <img
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SmartShopApp"
                                    alt="QR Code"
                                    className="w-24 h-24 mix-blend-multiply"
                                />
                            </div>
                            <div className="text-white space-y-1">
                                <p className="font-bold text-sm">Scan to Download</p>
                                <p className="text-xs text-gray-500">iOS & Android Compatible</p>
                                <div className="flex text-yellow-400 text-xs">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg px-4 py-3 transition-all">
                                <Apple className="text-white" size={24} />
                                <div className="text-left">
                                    <p className="text-[9px] text-gray-400 font-bold uppercase">Download on the</p>
                                    <p className="text-sm font-bold text-white leading-none">App Store</p>
                                </div>
                            </button>
                            <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg px-4 py-3 transition-all">
                                <Smartphone className="text-white" size={24} />
                                <div className="text-left">
                                    <p className="text-[9px] text-gray-400 font-bold uppercase">Get it on</p>
                                    <p className="text-sm font-bold text-white leading-none">Google Play</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Visual (Mockup) */}
                <div className="flex-1 relative min-h-[400px] md:min-h-auto bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-10">
                    <div className="relative w-64 h-[500px] bg-black rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                        {/* Mock App Screen */}
                        <div className="w-full h-full bg-white flex flex-col">
                            <div className="bg-brand-orange h-20 w-full flex items-end p-4">
                                <span className="text-white font-black italic text-xl">SmartShop</span>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
                                    <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
                                </div>
                            </div>
                            <div className="mt-auto h-16 border-t border-gray-100 flex justify-around items-center text-gray-300">
                                <div className="w-8 h-8 rounded-full bg-gray-100" />
                                <div className="w-8 h-8 rounded-full bg-brand-orange" />
                                <div className="w-8 h-8 rounded-full bg-gray-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileAppPage;
