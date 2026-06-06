import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2, Plus, Minus, ShoppingCart, Star, Share2, Heart, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { addToCart } from '../store/slices/cartSlice';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import { formatRelativeWithTime } from '../utils/dateUtils';
import useNow from '../hooks/useNow';
import { toggleWishlist, selectIsInWishlist } from '../store/slices/wishlistSlice';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const isInWishlist = useSelector(state => selectIsInWishlist(state, id));

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    // Review State
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewSuccess, setReviewSuccess] = useState(false);
    const [reviewError, setReviewError] = useState('');

    const now = useNow();

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/products/${id}`);
            setProduct(data.product);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({ product, quantity: qty }));
            alert("Item added to cart!");
        }
    };

    const handleBuyNow = () => {
        if (product) {
            dispatch(addToCart({ product, quantity: qty }));
            navigate('/checkout');
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setReviewError('');
        setReviewLoading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post(
                `/api/v1/products/${id}/reviews`,
                { rating, comment },
                config
            );

            setReviewSuccess(true);
            setReviewLoading(false);
            setComment('');
            fetchProduct(); // Refresh reviews

            setTimeout(() => setReviewSuccess(false), 3000);

        } catch (error) {
            setReviewError(error.response?.data?.message || 'Failed to submit review');
            setReviewLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin text-brand-orange" size={48} />
            </div>
        );
    }

    if (!product) {
        return <div className="text-center py-20 font-bold">Product not found</div>;
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {/* Breadcrumb (Mock) */}
            <div className="text-sm text-gray-500 mb-6 flex gap-2">
                <span>Home</span> / <span>{product.category}</span> / <span className="text-gray-900 font-bold">{product.title}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square bg-white rounded-sm shadow-card overflow-hidden group cursor-zoom-in border border-gray-100">
                        <ImageWithFallback
                            src={product.images[activeImage] || 'https://via.placeholder.com/600'}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                        />
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.images.map((img, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveImage(i)}
                                className={`w-20 h-20 border-2 rounded-sm cursor-pointer p-2 bg-white flex items-center justify-center ${activeImage === i ? 'border-brand-orange' : 'border-transparent hover:border-gray-200'}`}
                            >
                                <ImageWithFallback src={img} alt="" className="max-w-full max-h-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-black text-brand-navy italic uppercase tracking-tight leading-tight">{product.title}</h1>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex text-yellow-400 text-sm">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < Math.round(product.rating || 0) ? "currentColor" : "none"} />
                                ))}
                            </div>
                            <span className="text-sm text-blue-500 font-bold hover:underline cursor-pointer">{product.numReviews} Ratings</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-sm text-green-500 font-bold flex items-center gap-1"><CheckCircle size={14} /> In Stock</span>
                        </div>
                    </div>

                    <div className="border-t border-b border-gray-100 py-6 space-y-2">
                        <h2 className="text-4xl font-black text-brand-orange tracking-tight">Rs. {product.price.toLocaleString()}</h2>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest line-through">Rs. {(product.price * 1.2).toLocaleString()}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quantity</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gray-200 rounded-sm">
                                <button
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                    className="p-3 hover:bg-gray-100 transition-colors"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-12 text-center font-bold text-gray-700">{qty}</span>
                                <button
                                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                                    className="p-3 hover:bg-gray-100 transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <span className="text-xs text-gray-500 font-bold">{product.stock} items left</span>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-brand-navy text-white py-4 font-black uppercase tracking-widest rounded-sm hover:bg-[#2e2e54]/90 transition-all flex items-center justify-center gap-2 shadow-xl"
                        >
                            <ShoppingCart size={18} /> Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-brand-orange text-white py-4 font-black uppercase tracking-widest rounded-sm hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-xl"
                        >
                            Buy Now
                        </button>
                        <button className="w-14 bg-gray-100 text-gray-600 rounded-sm flex items-center justify-center hover:bg-gray-200 transition-colors"
                            onClick={() => dispatch(toggleWishlist(product))}
                        >
                            <Heart size={20} className={isInWishlist ? "fill-red-500 text-red-500" : ""} />
                        </button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-sm space-y-2 text-sm text-gray-600 border border-gray-100">
                        <p className="flex justify-between"><span>Delivery:</span> <span className="font-bold text-gray-800">Standard Delivery (3-5 Days)</span></p>
                        <p className="flex justify-between"><span>Service:</span> <span className="font-bold text-gray-800">7 Days Returns</span></p>
                        <p className="flex justify-between"><span>Warranty:</span> <span className="font-bold text-gray-800">1 Year Brand Warranty</span></p>
                    </div>
                </div>
            </div>

            {/* Product Details & Reviews Tabs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Description */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
                        <h3 className="text-lg font-black italic text-brand-navy uppercase mb-4 border-b border-gray-100 pb-2">Product Description</h3>
                        <p className="leading-relaxed text-gray-600">{product.description}</p>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100" id="reviews">
                        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-black italic text-brand-navy uppercase">Ratings & Reviews ({product.numReviews})</h3>
                            <button
                                onClick={() => document.getElementById('write-review').scrollIntoView({ behavior: 'smooth' })}
                                className="text-xs font-bold text-brand-orange uppercase hover:underline"
                            >
                                Write a Review
                            </button>
                        </div>

                        {product.reviews.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-sm border border-dashed border-gray-200">
                                <Star className="mx-auto text-gray-300 mb-2" size={32} />
                                <p className="text-gray-400 font-bold text-sm">No reviews yet. Be the first!</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {product.reviews.map((review) => (
                                    <div key={review._id} className="border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800">{review.name}</p>
                                                    <div className="flex text-yellow-400 text-xs">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400">{formatRelativeWithTime(review.createdAt, now)}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 ml-10">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Write Review Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 sticky top-24" id="write-review">
                        <h3 className="text-md font-black italic text-brand-navy uppercase mb-4">Write a Review</h3>

                        {userInfo ? (
                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((val) => (
                                            <button
                                                key={val}
                                                type="button"
                                                onClick={() => setRating(val)}
                                                className={`p-1 transition-transform hover:scale-110 ${val <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            >
                                                <Star size={24} fill="currentColor" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Review</label>
                                    <textarea
                                        className="w-full p-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-brand-orange h-32 resize-none"
                                        placeholder="What did you like or dislike?"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                {reviewError && <p className="text-xs text-red-500 font-bold">{reviewError}</p>}
                                {reviewSuccess && <p className="text-xs text-green-500 font-bold">Review submitted successfully!</p>}

                                <button
                                    type="submit"
                                    disabled={reviewLoading}
                                    className="w-full bg-brand-navy text-white py-3 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50"
                                >
                                    {reviewLoading ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-6 bg-gray-50 rounded-sm">
                                <p className="text-sm text-gray-500 mb-4">Please login to write a review</p>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="bg-brand-orange text-white px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest"
                                >
                                    Login Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
