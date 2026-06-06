import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { ArrowLeft, Lock, Mail, ChevronRight, Github } from 'lucide-react';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isAdminLogin, setIsAdminLogin] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const { data } = await axios.post('/api/v1/auth/login', {
                email: formData.email,
                password: formData.password
            });

            // Validate role matches login intent
            if (isAdminLogin && data.user.role !== 'admin') {
                dispatch(loginFailure('Invalid admin credentials. This account does not have admin privileges.'));
                return;
            }

            dispatch(loginSuccess({
                user: data.user,
                token: data.token
            }));

            // Redirect based on role
            const redirectPath = data.user.role === 'admin' ? '/admin' : '/';
            navigate(redirectPath);
        } catch (err) {
            dispatch(loginFailure(err.response?.data?.message || 'Invalid email or password. Please try again.'));
        }
    };

    return (
        <div className="min-h-screen w-screen flex bg-white font-sans overflow-x-hidden lg:overflow-hidden">
            {/* Visual Branding Side */}
            <div className="hidden lg:flex flex-1 bg-brand-navy relative items-center justify-center p-24">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-transparent" />
                <div className="absolute top-12 left-12">
                    <Link to="/" className="text-white text-4xl font-black italic tracking-tighter flex items-center gap-3">
                        <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center shadow-2xl">V</div>
                        SmartShop
                    </Link>
                </div>

                <div className="relative z-10 space-y-12 max-w-lg">
                    <h2 className="text-7xl font-black text-white italic tracking-tighter leading-none">
                        THE FUTURE <br /> IS <span className="text-brand-orange underline">VOICE.</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-bold italic tracking-wide">Shop and discover amazing products with your voice in Pakistan.</p>

                    <div className="flex gap-4">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                            <p className="text-[10px] font-black uppercase text-brand-orange mb-2">Total Users</p>
                            <p className="text-2xl font-black text-white italic">2.5M+</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                            <p className="text-[10px] font-black uppercase text-brand-orange mb-2">Satisfaction Rate</p>
                            <p className="text-2xl font-black text-white italic">99.8%</p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-12 left-12 opacity-30">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white">Voice-Powered Shopping Platform</p>
                </div>
            </div>

            {/* Content Form Side */}
            <div className="w-full lg:w-[500px] flex flex-col justify-center px-6 sm:px-12 lg:px-20 relative bg-[#fcfcfc] min-h-screen lg:min-h-full py-8 lg:py-0">
                <Link to="/" className="absolute top-6 sm:top-12 left-6 sm:left-12 lg:hidden text-brand-navy z-10">
                    <ArrowLeft size={28} strokeWidth={3} />
                </Link>

                <div className="mt-16 lg:mt-0 space-y-8 sm:space-y-10 w-full max-w-md mx-auto lg:mx-0">
                    <div className="space-y-2 text-center lg:text-left">
                        <h3 className="text-5xl font-black text-brand-navy uppercase italic tracking-tighter leading-tight">
                            {isAdminLogin ? 'Admin Access' : 'Welcome Back'}
                        </h3>
                        <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.15em] leading-relaxed">
                            {isAdminLogin ? 'Secure Administration Portal' : 'Access Your Personalized Shopping Dashboard'}
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest pl-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input
                                    type="email"
                                    required
                                    className="w-full h-14 bg-white border border-gray-100 rounded-sm px-14 text-sm font-bold shadow-sm focus:ring-2 focus:ring-brand-orange/30 outline-none transition-all"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-brand-navy uppercase tracking-widest pl-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input
                                    type="password"
                                    required
                                    className="w-full h-14 bg-white border border-gray-100 rounded-sm px-14 text-sm font-bold shadow-sm focus:ring-2 focus:ring-brand-orange/30 outline-none transition-all"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase text-center rounded-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 bg-brand-orange text-white font-black text-xs uppercase tracking-[0.3em] rounded-sm shadow-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                            {!loading && <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />}
                        </button>
                    </form>

                    <div className="relative pt-6">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
                        <div className="relative flex justify-center text-[9px] uppercase font-black text-gray-300 bg-[#fcfcfc] px-4">
                            {isAdminLogin ? 'OR BACK TO USER LOGIN' : 'OR LOGIN AS ADMIN'}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsAdminLogin(!isAdminLogin)}
                        className="w-full h-14 border border-gray-100 rounded-sm flex items-center justify-center gap-3 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all"
                    >
                        {isAdminLogin ? '← Back to User Login' : '→ Admin Login Portal'}
                    </button>

                    <div className="pt-8 space-y-4">
                        <div className="text-center space-y-2">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">New to SmartShop?</p>
                            <Link
                                to="/signup"
                                className="inline-block w-full h-14 border border-brand-orange text-brand-orange rounded-sm flex items-center justify-center font-black text-[10px] uppercase tracking-widest hover:bg-orange-50 transition-all active:scale-95"
                            >
                                Create Account
                            </Link>
                        </div>
                        <p className="text-center text-[9px] font-bold text-gray-300 uppercase italic">
                            Secure your unique SKU identity today.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
