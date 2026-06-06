import React from 'react';
import { Lock } from 'lucide-react';

const PrivacyPage = () => {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-navy text-white rounded-sm">
                    <Lock size={24} />
                </div>
                <div>
                    <h1 className="text-3xl font-black italic text-brand-navy uppercase tracking-tighter">Privacy Policy</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last Updated: January 2026</p>
                </div>
            </div>

            <div className="prose prose-sm prose-gray max-w-none">
                <p>
                    At SmartShop, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal data when you use our AI-powered voice commerce platform.
                </p>

                <h3>1. Data We Collect</h3>
                <p>
                    We collect information you provide directly to us, such as when you create an account, place an order, or communicate with our Voice AI. This includes:
                </p>
                <ul>
                    <li>Name, email address, and phone number.</li>
                    <li>Shipping and billing addresses.</li>
                    <li>Voice recordings (processed transitorily for intent detection).</li>
                    <li>Order history and preferences.</li>
                </ul>

                <h3>2. How We Use Your Data</h3>
                <p>
                    We use your data to:
                </p>
                <ul>
                    <li>Process and fulfill your orders.</li>
                    <li>Improve our AI voice recognition models (anonymized data only).</li>
                    <li>Send you transaction updates and promotional offers (if opted in).</li>
                    <li>Detect and prevent fraud.</li>
                </ul>

                <h3>3. Voice Data Handling</h3>
                <p>
                    <strong>SmartShop uses advanced voice processing</strong> for transcribing and understanding voice commands. Your audio data is transmitted securely for transcription and analysis. We do not permanently store raw audio recordings on our servers unless explicitly authorized for quality assurance.
                </p>

                <h3>4. Data Security</h3>
                <p>
                    We implement industry-standard encryption protocols (SSL/TLS) to protect your data during transmission and storage. Your password is hashed using bcrypt before being stored in our database.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPage;
