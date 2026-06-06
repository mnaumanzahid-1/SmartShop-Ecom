import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone, Shirt, Tv, Home as HomeIcon, Smile, Car } from 'lucide-react';

const categories = [
  { name: 'Mobiles', icon: Smartphone, color: 'bg-blue-100 text-blue-600', link: '/category/mobiles' },
  { name: 'Fashion', icon: Shirt, color: 'bg-pink-100 text-pink-600', link: '/category/fashion' },
  { name: 'Electronics', icon: Tv, color: 'bg-purple-100 text-purple-600', link: '/category/electronics' },
  { name: 'Home', icon: HomeIcon, color: 'bg-green-100 text-green-600', link: '/category/home' },
  { name: 'Beauty', icon: Smile, color: 'bg-red-100 text-red-600', link: '/category/beauty' },
  { name: 'Automotive', icon: Car, color: 'bg-orange-100 text-orange-600', link: '/category/automotive' },
];

const getActiveCategory = (pathname) => {
  const match = categories.find(cat => pathname.startsWith(cat.link));
  return match ? match.name : null;
};

const CategoryNavigation = () => {
  const location = useLocation();
  const active = getActiveCategory(location.pathname);

  return (
    <nav className="w-full px-2 pt-0 pb-2 sm:pb-3 sticky top-0 z-30 bg-white/60 backdrop-blur-xl shadow-[0_2px_24px_0_rgba(40,40,80,0.08)] rounded-2xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-5">
        {categories.map((cat, idx) => {
          const isActive = active === cat.name;
          return (
            <Link
              to={cat.link}
              key={idx}
              className={`group flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl border border-white/40 transition-all duration-300 cursor-pointer relative overflow-hidden
                bg-white/60 backdrop-blur shadow-[0_2px_16px_0_rgba(40,40,80,0.08)] hover:shadow-[0_4px_32px_0_rgba(40,40,80,0.13)] hover:-translate-y-1.5
                ${isActive ? 'ring-2 ring-brand-orange bg-brand-orange/10' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${cat.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-[0_2px_8px_0_rgba(245,114,36,0.10)]
                  ${isActive ? 'ring-2 ring-brand-orange' : ''}`}
              >
                <cat.icon size={24} className="transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" />
              </div>
              <span className={`text-[13px] font-bold uppercase tracking-wide drop-shadow-sm transition-colors duration-200
                ${isActive ? 'text-brand-orange' : 'text-primary group-hover:text-brand-orange'}`}>{cat.name}</span>
              <span className="absolute inset-0 rounded-16 pointer-events-none group-hover:bg-brand-orange/5 transition-colors duration-300" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryNavigation;
