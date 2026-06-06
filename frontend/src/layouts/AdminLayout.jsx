import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    ArrowLeft,
    LogOut,
    Settings,
    CheckCircle2
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const AdminLayout = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Products', path: '/admin/products', icon: Package },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Seller Applications', path: '/admin/seller-applications', icon: CheckCircle2 },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-brand-navy text-white flex flex-col fixed h-full z-20 transition-all">
                <div className="p-8">
                    <Link to="/" className="text-2xl font-black italic tracking-tighter flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-orange text-white rounded-md flex items-center justify-center not-italic text-sm">VS</div>
                        AdminPanel
                    </Link>
                </div>

                <nav className="flex-1 px-4 mt-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-sm text-sm font-black uppercase tracking-widest transition-all ${location.pathname === item.path
                                ? 'bg-brand-orange text-white'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={18} />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5 space-y-2">
                    <Link to="/" className="flex items-center gap-4 px-4 py-3 text-sm font-bold text-gray-400 hover:text-white transition-all">
                        <ArrowLeft size={18} /> Back to Store
                    </Link>
                    <button
                        onClick={() => dispatch(logout())}
                        className="w-full flex items-center gap-4 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-6 sm:p-8 md:p-10">
                <header className="mb-8 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-brand-navy italic uppercase tracking-tighter">
                            {menuItems.find(m => m.path === location.pathname)?.name || 'Admin'}
                        </h1>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">Management Portal v1.0.2</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/admin/settings" className="w-12 h-12 bg-white rounded-sm shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-orange cursor-pointer transition-all">
                            <Settings size={20} />
                        </Link>
                    </div>
                </header>

                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
