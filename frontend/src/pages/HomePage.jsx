import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import ProductCard from '../components/ui/ProductCard';
import { Loader2, Zap, ArrowRight, Smartphone, Shirt, Tv, Home, Smile, Car, ChevronRight } from 'lucide-react';
import FlashSaleTimer from '../components/ui/FlashSaleTimer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const categories = [
        { name: "Mobiles", icon: Smartphone, color: "bg-blue-100 text-blue-600", link: "/category/mobiles" },
        { name: "Fashion", icon: Shirt, color: "bg-pink-100 text-pink-600", link: "/category/fashion" },
        { name: "Electronics", icon: Tv, color: "bg-purple-100 text-purple-600", link: "/category/electronics" },
        { name: "Home", icon: Home, color: "bg-green-100 text-green-600", link: "/category/home" },
        { name: "Beauty", icon: Smile, color: "bg-red-100 text-red-600", link: "/category/beauty" },
        { name: "Automotive", icon: Car, color: "bg-orange-100 text-orange-600", link: "/category/automotive" },
    ];

    if (status === 'loading') {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="animate-spin text-brand-orange" size={48} />
            </div>
        );
    }

    if (status === 'failed') {
        return <div className="text-center text-red-500 py-20 font-bold">Failed to load payload: {error}</div>;
    }

    // Filter products for different sections
    const flashSaleProducts = [...items].sort(() => 0.5 - Math.random()).slice(0, 6);
    const justForYouProducts = items;

    return (
        <div className="w-full space-y-12 sm:space-y-20 pb-12 sm:pb-20">

            {/* ...category navigation now handled globally in MainLayout... */}

                        {/* 3. Flash Sale (Dynamic) */}
            <FlashSaleTimer>
                {({ label, hours, minutes, seconds, status }) => (
                    <section className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_4px_32px_0_rgba(245,114,36,0.10)] mt-2 mb-8 px-0 sm:px-6 py-6 sm:py-8 border border-white/30">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 border-b border-white/30 pb-4 gap-4">
                            <div className="flex items-center gap-4 sm:gap-6">
                                <h2 className="text-2xl sm:text-3xl font-black text-brand-orange italic uppercase tracking-tight">Flash Sale</h2>
                                <div className="flex items-center gap-2 text-base font-bold text-secondary bg-white/70 backdrop-blur px-4 py-1.5 rounded-2xl shadow-inner">
                                    <span>{label}</span>
                                    <div className="flex gap-1 text-white font-mono text-lg">
                                        <span className="bg-brand-orange/90 px-3 py-1 rounded-full shadow-soft animate-pulse min-w-[36px] text-center">{hours}</span>:
                                        <span className="bg-brand-orange/90 px-3 py-1 rounded-full shadow-soft animate-pulse min-w-[36px] text-center">{minutes}</span>:
                                        <span className="bg-brand-orange/90 px-3 py-1 rounded-full shadow-soft animate-pulse min-w-[36px] text-center">{seconds}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="btn-secondary text-xs font-black uppercase tracking-widest px-7 py-2.5 shadow-soft hover:scale-105 transition-transform duration-200 rounded-2xl">
                                Shop All
                            </button>
                        </div>
                        <div className="flex gap-3 sm:gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
                            {flashSaleProducts.map((product) => (
                                <div key={product._id} className="min-w-[220px] max-w-[260px] flex-shrink-0 snap-center transform hover:-translate-y-1 transition-transform duration-300">
                                    <ProductCard product={product} />
                                    <div className="mt-3 text-center">
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-2 overflow-hidden">
                                            <div className="bg-brand-orange h-1.5 rounded-full animate-pulse" style={{ width: `${Math.floor(Math.random() * 80) + 10}%` }}></div>
                                        </div>
                                        <span className="text-[11px] text-gray-500 font-bold uppercase mt-1 block tracking-wider">{Math.floor(Math.random()*50)+10} Sold</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </FlashSaleTimer>
            {/* 4. Just For You */}
            <section className="pt-2">
                <h2 className="text-2xl font-black text-primary italic uppercase mb-8 flex items-center gap-3">
                    Just For You <div className="h-[3px] w-24 bg-brand-orange rounded-8"></div>
                </h2>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {justForYouProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                <div className="mt-16 text-center">
                    <button className="btn-secondary px-16 py-4 text-lg font-black uppercase tracking-widest shadow-soft">
                        Load More Products
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
