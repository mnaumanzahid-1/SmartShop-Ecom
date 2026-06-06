import React from 'react';
import { Truck, Globe, Clock, Package } from 'lucide-react';

const ShippingPage = () => {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-black italic text-brand-navy uppercase tracking-tighter">Shipping & Logistics</h1>
                <p className="text-gray-500 font-medium">Fast, reliable, and trackable. We deliver to every corner of Pakistan.</p>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 flex items-start gap-4">
                    <Truck className="text-brand-orange shrink-0" size={32} />
                    <div>
                        <h3 className="text-lg font-black text-brand-navy uppercase italic">Standard Delivery</h3>
                        <p className="text-2xl font-black text-brand-orange mt-1">Rs. 199</p>
                        <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-widest">Flat Rate Nationwide</p>
                        <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                            Reliable overland shipping via our logistics partners (TCS, Leopards). Delivery typically takes 3-5 business days.
                        </p>
                    </div>
                </div>

                <div className="bg-brand-navy text-white p-8 rounded-sm shadow-xl flex items-start gap-4">
                    <Package className="text-brand-orange shrink-0" size={32} />
                    <div>
                        <h3 className="text-lg font-black uppercase italic">Free Shipping</h3>
                        <p className="text-2xl font-black text-brand-orange mt-1">Orders Rs. 5000+</p>
                        <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-widest">Automatic Qualifier</p>
                        <p className="text-sm text-gray-300 mt-4 leading-relaxed">
                            Spend more than Rs. 5000 in a single cart and we'll cover the shipping costs entirely. No coupon code needed.
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-black italic text-brand-navy uppercase border-b border-gray-100 pb-4">Process Timeline</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: Clock, title: "Processing", desc: "1-2 Days", detail: "Order verification and packing." },
                        { icon: Truck, title: "Transit", desc: "2-3 Days", detail: "On the road to your city." },
                        { icon: Globe, title: "Last Mile", desc: "Same Day", detail: "Out for delivery to your doorstep." }
                    ].map((step, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-sm">
                            <step.icon size={24} className="text-gray-400 mb-4" />
                            <h4 className="font-black text-brand-navy uppercase">{step.title}</h4>
                            <p className="text-brand-orange font-black text-xl my-1">{step.desc}</p>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{step.detail}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ShippingPage;
