import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TrendingUp, ShieldCheck, Headphones, Globe, DollarSign, BarChart } from 'lucide-react';
import LearnMoreModal from '../components/LearnMoreModal';

const SellerLandingPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.auth);
    const [learnMoreOpen, setLearnMoreOpen] = useState(false);

    // If already approved seller, redirect to seller dashboard
    React.useEffect(() => {
        const userData = localStorage.getItem('vstore_user');
        if (userData) {
            const user = JSON.parse(userData);
            if (user.role === 'seller') {
                navigate('/seller/dashboard', { replace: true });
            }
        }
    }, [navigate]);

    const handleStartSelling = () => {
        if (isAuthenticated) {
            // Logged-in users go to Terms & Conditions
            navigate('/seller/terms');
        } else {
            // Non-logged-in users go to signup
            navigate('/signup?role=seller');
        }
    };

    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="bg-brand-navy relative overflow-hidden text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center space-y-6 sm:space-y-8">
                    <span className="bg-brand-orange/20 border border-brand-orange/40 text-[#f57224] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Join the ecosystem</span>
                    <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none text-white">
                        Become a <br />
                        <span className="text-brand-orange">SmartShop Seller</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-medium leading-relaxed">
                        Unlock access to millions of customers through our AI-powered marketplace. Start your journey today and grow your business exponentially.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleStartSelling}
                            className="h-14 px-10 bg-brand-orange hover:bg-orange-600 text-white font-black text-sm uppercase tracking-[0.2em] rounded-sm shadow-xl transition-all active:scale-95"
                        >
                            Start Selling
                        </button>
                        <button
                            onClick={() => setLearnMoreOpen(true)}
                            className="h-14 px-10 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-black text-sm uppercase tracking-[0.2em] rounded-sm backdrop-blur-sm transition-all active:scale-95"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Benefits Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: DollarSign, title: '0% Commission', desc: 'Enjoy 0% commission on your sales for the first 30 days of registration.' },
                        { icon: Globe, title: 'Nationwide Reach', desc: 'Deliver to over 500+ cities across Pakistan with our integrated logicstics.' },
                        { icon: Headphones, title: '24/7 Seller Support', desc: 'Dedicated support team to help you manage your store around the clock.' },
                        { icon: TrendingUp, title: 'Growth Tools', desc: 'Advanced analytics dashboard to track performance and optimize sales.' },
                        { icon: ShieldCheck, title: 'Secure Payments', desc: 'Verified weekly payouts directly to your bank account.' },
                        { icon: BarChart, title: 'Product Promotion', desc: 'Your products get promoted to relevant customers through our smart recommendation system.' },
                    ].map((feature, i) => (
                        <div key={i} className="p-8 border border-gray-100 rounded-sm hover:shadow-xl hover:border-brand-orange/30 transition-all group bg-white">
                            <div className="w-12 h-12 bg-gray-50 rounded-sm flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                <feature.icon size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-black text-brand-orange italic uppercase mb-3">{feature.title}</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Strip */}
            <div className="bg-[#f2f3f8] py-20 px-6 text-center">
                <h2 className="text-3xl font-black text-brand-navy italic uppercase tracking-tighter mb-8 drop-shadow-sm">Ready to transform your business?</h2>
                <Link to="/signup?role=seller">
                    <button className="h-14 px-12 bg-brand-navy hover:bg-black text-white font-black text-xs uppercase tracking-[0.3em] rounded-sm shadow-2xl transition-all">
                        Register Now
                    </button>
                </Link>
            </div>

            {/* Learn More Modal */}
            <LearnMoreModal isOpen={learnMoreOpen} onClose={() => setLearnMoreOpen(false)} />
        </div>
    );
};

export default SellerLandingPage;
