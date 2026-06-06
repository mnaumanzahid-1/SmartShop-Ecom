import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

const ImageWithFallback = ({ src, alt, className, ...props }) => {
    const [error, setError] = useState(false);

    if (error || !src) {
        return (
            <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
                <div className="text-center text-gray-400">
                    <ImageOff size={24} className="mx-auto mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-widest block">No Image</span>
                </div>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            crossOrigin="anonymous"
            {...props}
        />
    );
};

export default ImageWithFallback;
