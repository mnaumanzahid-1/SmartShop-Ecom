import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { ArrowLeft, User, Mail, Lock, ChevronRight, ShieldCheck } from 'lucide-react';

const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [localError, setLocalError] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLocalError(null);

        if (formData.password !== formData.confirmPassword) {
            setLocalError('Passwords do not match');
            return;
        }

        dispatch(loginStart());

        try {
            const { data } = await axios.post('/api/v1/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            dispatch(loginSuccess({
                user: data.user,
                token: data.token
            }));
            navigate('/');
        } catch (err) {
            dispatch(loginFailure(err.response?.data?.message || 'Registration failed. Try again.'));
        }
    };

    return (
        <div className="min-h-screen w-screen flex bg-white font-sans overflow-x-hidden lg:overflow-hidden">
            {/* Branding Side */}
            <div className="hidden lg:flex flex-1 bg-brand-navy relative items-center justify-center p-24">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-transparent" />
                <div className="absolute top-12 left-12">
                    <Link to="/" className="text-white text-4xl font-black italic tracking-tighter flex items-center gap-3">
                        <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center shadow-2xl">V</div>
                        SmartShop
                    </Link>
                </div>

                <div className="relative z-10 space-y-12 max-w-lg text-center lg:text-left">
                    <h2 className="text-7xl font-black text-white italic tracking-tighter leading-none">
                        JOIN THE <br /> REVOLUTION.
                    </h2>
                    <p className="text-xl text-gray-400 font-bold italic tracking-wide">Join the fastest growing e-commerce platform in Pakistan.</p>
                </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-[600px] flex flex-col justify-center px-6 sm:px-12 lg:px-24 relative bg-[#fcfcfc] min-h-screen lg:min-h-full py-8 lg:py-0">
                <Link to="/" className="absolute top-6 sm:top-12 left-6 sm:left-12 lg:hidden text-brand-navy z-10">
                    <ArrowLeft size={28} strokeWidth={3} />
                </Link>

                <div className="mt-20 lg:mt-0 space-y-8 sm:space-y-10 w-full max-w-md mx-auto lg:mx-0 pb-8 lg:pb-0">
                    <div className="space-y-3">
                        <h3 className="text-4xl font-black text-brand-navy uppercase italic tracking-tighter">Register Prototype</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none">Create your SmartShop account</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest pl-1">Display Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input
                                    type="text"
                                    required
                                    className="w-full h-14 bg-white border border-gray-100 rounded-sm px-14 text-sm font-bold focus:ring-2 focus:ring-brand-orange/30 outline-none transition-all"
                                    placeholder="Enter full name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest pl-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input
                                    type="email"
                                    required
                                    className="w-full h-14 bg-white border border-gray-100 rounded-sm px-14 text-sm font-bold focus:ring-2 focus:ring-brand-orange/30 outline-none transition-all"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest pl-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input
                                        type="password"
                                        required
                                        className="w-full h-14 bg-white border border-gray-100 rounded-sm px-14 text-sm font-bold focus:ring-2 focus:ring-brand-orange/30 outline-none transition-all"
                                        placeholder="Key"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest pl-1">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input
                                        type="password"
                                        required
                                        className="w-full h-14 bg-white border border-gray-100 rounded-sm px-14 text-sm font-bold focus:ring-2 focus:ring-brand-orange/30 outline-none transition-all"
                                        placeholder="Repeat"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {(error || localError) && (
                            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase text-center rounded-sm">
                                {error || localError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 bg-brand-orange text-white font-black text-xs uppercase tracking-[0.3em] rounded-sm shadow-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group mt-4"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                            {!loading && <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />}
                        </button>
                    </form>

                    <div className="pt-8 space-y-4">
                        <div className="text-center space-y-2">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Already have an account?</p>
                            <Link
                                to="/login"
                                className="inline-block w-full h-14 border border-brand-navy text-brand-navy rounded-sm flex items-center justify-center font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95"
                            >
                                Establish Connection (Login)
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
