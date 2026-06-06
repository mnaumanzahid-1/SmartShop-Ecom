import React from 'react';
import { X, Users, TrendingUp, Lock, Headphones, BarChart3, Zap, Award } from 'lucide-react';

const LearnMoreModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const advantages = [
        {
            icon: Users,
            title: 'Access to Millions of Customers',
            description: 'Tap into our massive user base and significantly expand your customer reach beyond your current market.'
        },
        {
            icon: Zap,
            title: 'Easy Product Listing & Management',
            description: 'Simple, intuitive tools to list products, manage inventory, and update product details in just minutes.'
        },
        {
            icon: Lock,
            title: 'Secure & Fast Payments',
            description: 'Your earnings are protected with secure payment processing. Get paid directly to your bank account weekly.'
        },
        {
            icon: TrendingUp,
            title: 'Marketing & Visibility Support',
            description: 'Benefit from SmartShop\'s smart recommendation engine and promotional features to boost product visibility.'
        },
        {
            icon: BarChart3,
            title: 'Seller Performance Insights',
            description: 'Access comprehensive analytics and performance metrics to understand customer behavior and optimize your sales.'
        },
        {
            icon: Headphones,
            title: '24/7 Dedicated Seller Support',
            description: 'Our support team is always available to help you with any issues, questions, or concerns about selling on SmartShop.'
        },
        {
            icon: Award,
            title: 'Platform Trust & Credibility',
            description: 'Build your business on a trusted platform. Customers feel confident purchasing from SmartShop sellers.'
        },
        {
            icon: Lock,
            title: 'Buyer Protection & Dispute Resolution',
            description: 'SmartShop\'s buyer protection policies ensure fair treatment while protecting sellers from fraudulent claims.'
        }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999]">
            <div className="bg-white rounded-lg max-w-4xl w-full shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-brand-navy to-brand-navy/80 text-white p-6 sm:p-8 relative flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-sm transition-colors"
                    >
                        <X size={24} />
                    </button>
                    <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-inverse">
                        Why Sell on SmartShop?
                    </h2>
                    <p className="text-muted mt-2">
                        Discover the advantages of becoming a SmartShop seller
                    </p>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1">
                    <div className="p-6 sm:p-8">
                        {/* Intro */}
                        <div className="mb-10 p-6 bg-brand-orange/5 border border-brand-orange/20 rounded-lg">
                            <p className="text-primary leading-relaxed text-lg">
                                SmartShop provides sellers with a powerful platform to reach millions of customers, manage their business efficiently, and grow their revenue. Here's what you get when you join our seller community:
                            </p>
                        </div>

                        {/* Advantages Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            {advantages.map((advantage, index) => (
                                <div
                                    key={index}
                                    className="p-6 border border-gray-200 rounded-lg hover:border-brand-orange hover:shadow-lg transition-all group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-orange/10 group-hover:bg-brand-orange/20 transition-colors">
                                                <advantage.icon className="h-6 w-6 text-brand-orange" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-black text-primary uppercase italic mb-2">
                                                {advantage.title}
                                            </h3>
                                            <p className="text-secondary text-sm leading-relaxed">
                                                {advantage.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom CTA */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-black text-primary uppercase italic mb-3">
                                Ready to Get Started?
                            </h3>
                            <p className="text-secondary mb-4">
                                Joining SmartShop is simple. Click "Start Selling" to begin your seller application process. Our team reviews applications to ensure platform quality and buyer safety.
                            </p>
                            <ul className="space-y-2 text-primary text-sm">
                                <li className="flex gap-2">
                                    <span className="text-brand-orange font-bold">•</span>
                                    <span>Complete seller application (takes 5 minutes)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-brand-orange font-bold">•</span>
                                    <span>Admin approval process (typically 24-48 hours)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-brand-orange font-bold">•</span>
                                    <span>Access your seller dashboard and start listing products</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer - Fixed */}
                <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t border-gray-200 flex gap-3 justify-end flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 border border-gray-300 hover:bg-surface text-primary font-black text-sm uppercase tracking-[0.1em] rounded-sm transition-all"
                    >
                        Close
                    </button>
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-brand-orange hover:bg-orange-600 text-white font-black text-sm uppercase tracking-[0.1em] rounded-sm shadow-lg transition-all active:scale-95"
                    >
                        Start Selling
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LearnMoreModal;
