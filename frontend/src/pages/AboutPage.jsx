import React from 'react';
import { Mic, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16">
            {/* Hero Section */}
            <section className="text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-black italic text-brand-navy uppercase tracking-tighter">
                    We Are <span className="text-brand-orange">VoiceWait</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
                    Pakistan's first AI-powered voice commerce ecosystem. We are redefining how you shop by blending state-of-the-art Generative AI with the warmth of local language.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <div className="px-6 py-2 bg-brand-navy/5 rounded-full text-brand-navy font-black uppercase text-xs tracking-widest border border-brand-navy/10">
                        Est. 2026
                    </div>
                    <div className="px-6 py-2 bg-brand-orange/5 rounded-full text-brand-orange font-black uppercase text-xs tracking-widest border border-brand-orange/10">
                        Lahore, PK
                    </div>
                </div>
            </section>

            {/* Mission Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    {
                        icon: Mic,
                        title: "Voice First",
                        desc: "Just speak. Our advanced voice technology understands Urdu, English, and Roman Urdu instantly."
                    },
                    {
                        icon: ShoppingBag,
                        title: "Curated Mall",
                        desc: "From fashion to electronics, we host thousands of authentic products from trusted brands."
                    },
                    {
                        icon: ShieldCheck,
                        title: "Secure Trust",
                        desc: "End-to-end encryption and a rigorous seller vetting process ensure your peace of mind."
                    },
                    {
                        icon: Truck,
                        title: "Fast Logistics",
                        desc: "Nationwide delivery network ensuring your orders reach you within 3-5 working days."
                    }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 hover:shadow-md transition-all text-center space-y-4 group">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto group-hover:bg-brand-orange group-hover:text-white transition-colors">
                            <item.icon size={32} />
                        </div>
                        <h3 className="text-xl font-black text-brand-navy uppercase italic">{item.title}</h3>
                        <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                    </div>
                ))}
            </section>

            {/* Story Section */}
            <section className="bg-brand-navy text-white rounded-sm p-10 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter">The Future is Spoken</h2>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            Shopping online used to be about endless clicking and scrolling. We asked: "Why can't I just ask for what I want?"
                            <br /><br />
                            SmartShop was born from a desire to make technology invisible. By leveraging cutting-edge voice recognition technology, we've built a platform that listens, understands, and delivers. Whether you're looking for a bridal dress or a gaming laptop, your voice is the only tool you need.
                        </p>
                    </div>
                    <div className="h-64 bg-white/5 border-2 border-dashed border-white/20 rounded-sm flex items-center justify-center">
                        <span className="text-white/20 font-black text-6xl italic uppercase">Our Vision</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
