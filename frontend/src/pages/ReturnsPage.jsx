import React from 'react';
import { RefreshCcw, AlertCircle, CheckCircle } from 'lucide-react';

const ReturnsPage = () => {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-black italic text-brand-navy uppercase tracking-tighter">Returns & Refunds</h1>
                <p className="text-gray-500 font-medium">We want you to love what you ordered. But if something isn't right, let's fix it.</p>
            </section>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-8">
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <RefreshCcw className="text-brand-orange" size={24} />
                            <h2 className="text-xl font-black italic text-brand-navy uppercase">7-Day Easy Returns</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            You have 7 days from the date of delivery to initiate a return. Items must be unused, in original packaging, and with all tags intact. We offer a "No Questions Asked" policy for defective or incorrect items.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="font-black text-brand-navy uppercase text-sm tracking-widest border-b border-gray-100 pb-2">Non-Returnable Items</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            {[
                                "Beauty & Hygiene products (opened)",
                                "Undergarments and swimwear",
                                "Customized or personalized items",
                                "Items sold during Clearance sales"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <AlertCircle size={14} className="text-red-400" /> {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="bg-gray-50 p-6 rounded-sm space-y-6 h-fit">
                    <h3 className="font-black text-brand-navy uppercase text-sm tracking-widest">How to Return</h3>
                    <div className="space-y-4">
                        {[
                            "Log in to your account.",
                            "Go to 'Order History' in Profile.",
                            "Select the order and click 'Return'.",
                            "Pack the item securely.",
                            "Wait for our courier to pick it up."
                        ].map((step, i) => (
                            <div key={i} className="flex gap-3 text-sm text-gray-600">
                                <span className="font-black text-brand-orange">{i + 1}.</span>
                                <span>{step}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnsPage;
