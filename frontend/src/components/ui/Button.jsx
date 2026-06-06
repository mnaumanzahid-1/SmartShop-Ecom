import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({
    children,
    variant = 'primary',
    className,
    onClick,
    isLoading,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-sm font-black uppercase tracking-widest text-[11px] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-brand-orange text-white hover:bg-orange-600 shadow-md",
        secondary: "bg-brand-navy text-white hover:bg-navy-900 shadow-md",
        outline: "border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white",
        ghost: "text-gray-600 hover:bg-gray-100"
    };

    return (
        <button
            className={twMerge(clsx(baseStyles, variants[variant], className))}
            onClick={onClick}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : children}
        </button>
    );
};

export default Button;
