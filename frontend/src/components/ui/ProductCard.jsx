import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../store/slices/cartSlice';
import ImageWithFallback from './ImageWithFallback';
import { useSelector } from 'react-redux';
import { toggleWishlist, selectIsInWishlist } from '../../store/slices/wishlistSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleQuickAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart({ product, quantity: 1 }));
    };

    // Skeleton loader state
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.025 }}
            className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_0_rgba(40,40,80,0.08)] hover:shadow-[0_4px_32px_0_rgba(40,40,80,0.13)] transition-all duration-300 group border border-gray-100 hover:border-brand-orange/30 relative"
        >
            <Link to={`/product/${product._id}`}> 
                {/* Visual */}
                <div className="aspect-square bg-gray-50 relative overflow-hidden flex items-center justify-center rounded-xl">
                    {!imgLoaded && (
                        <div className="absolute inset-0 w-full h-full skeleton" />
                    )}
                    <ImageWithFallback
                        src={product.images?.[0] || ''}
                        alt={product.title}
                        className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${imgLoaded ? '' : 'opacity-0'}`}
                        onLoad={() => setImgLoaded(true)}
                    />
                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 bg-brand-orange text-white text-[11px] font-black px-2 py-0.5 rounded-8 shadow-soft tracking-wider animate-fadeIn">
                        -{product.discount || 20}%
                    </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                    <h3 className="text-[15px] text-gray-900 line-clamp-2 leading-tight min-h-[38px] group-hover:text-brand-orange transition-colors font-semibold">
                        {product.title}
                    </h3>

                    <div className="flex items-end gap-2">
                        <span className="text-xl font-black text-brand-orange leading-none">Rs.{product.price?.toLocaleString()}</span>
                        <span className="text-xs text-gray-400 line-through font-medium">Rs.{(product.price * 1.25).toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-1 mt-1">
                        <div className="flex gap-0.5 text-yellow-400">
                            {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < 4 ? "currentColor" : "none"} />)}
                        </div>
                        <span className="text-[11px] text-gray-500 font-bold">(85)</span>
                    </div>
                </div>
            </Link>

            {/* Quick Action */}
            <div className="absolute bottom-4 right-4 flex gap-2 translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(toggleWishlist(product));
                    }}
                    className="w-10 h-10 bg-white text-gray-400 rounded-full flex items-center justify-center shadow-soft active:scale-90 hover:text-red-500 transition-all duration-200 border border-gray-100"
                >
                    <Heart size={18} strokeWidth={2.5} className={useSelector(state => selectIsInWishlist(state, product._id)) ? "fill-red-500 text-red-500" : ""} />
                </button>
                <button
                    onClick={handleQuickAdd}
                    className="w-10 h-10 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-soft active:scale-90 hover:bg-orange-600 transition-all duration-200"
                >
                    <ShoppingCart size={18} strokeWidth={2.5} />
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
