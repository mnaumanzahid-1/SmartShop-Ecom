import { useParams, Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search as SearchIcon, Filter, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';

const SearchPage = () => {
    const { keyword } = useParams();
    const location = useLocation();
    const [products, setProducts] = useState(location.state?.products || []);
    const [loading, setLoading] = useState(!location.state?.products);
    const [error, setError] = useState(null);

    // If coming from voice (location.state.query might exist), use that as title
    const displayKeyword = keyword || location.state?.query || 'Voice Search';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const { data } = await axios.get('/api/v1/products', {
                    params: { keyword }
                });
                setProducts(data.products || []);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to fetch products');
                // Log error safely
                if (typeof window !== 'undefined' && window.console) {
                    console.error('Search API error:', err);
                }
            } finally {
                setLoading(false);
            }
        };

        if (keyword && !location.state?.products) {
            fetchProducts();
        } else if (location.state?.products) {
            setLoading(false);
        }
    }, [keyword, location.state]);

    // Always render layout, never return null/empty
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
            {/* Header */}
            <div className="mb-10 space-y-6">
                <Link to="/" className="inline-flex items-center gap-2 text-brand-orange font-bold text-sm hover:underline">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <div className="flex items-center gap-4">
                    <SearchIcon className="text-brand-orange" size={32} />
                    <div>
                        <h1 className="text-3xl font-black text-brand-navy italic uppercase tracking-tighter">
                            Search Results for "{displayKeyword}"
                        </h1>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">
                            {loading ? 'Loading...' : `${products.length} items found`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Results */}
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="bg-white aspect-[3/4] rounded-md animate-pulse p-4 space-y-4 shadow-sm">
                            <div className="bg-gray-100 w-full aspect-square rounded-sm" />
                            <div className="bg-gray-100 h-4 w-3/4 rounded-sm" />
                            <div className="bg-gray-100 h-6 w-1/2 rounded-sm" />
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-sm text-center">
                    <p className="font-bold">{error}</p>
                </div>
            ) : products.length === 0 ? (
                <div className="bg-white p-20 rounded-sm shadow-card text-center border border-gray-100">
                    <SearchIcon size={64} className="mx-auto text-gray-200 mb-6" />
                    <h2 className="text-2xl font-black text-gray-400 italic uppercase mb-2">No products found</h2>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">No products found for '{displayKeyword}'</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
            {/* Header */}
            <div className="mb-10 space-y-6">
                <Link to="/" className="inline-flex items-center gap-2 text-brand-orange font-bold text-sm hover:underline">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <div className="flex items-center gap-4">
                    <SearchIcon className="text-brand-orange" size={32} />
                    <div>
                        <h1 className="text-3xl font-black text-brand-navy italic uppercase tracking-tighter">
                            Search Results for "{displayKeyword}"
                        </h1>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">
                            {products.length} items found
                        </p>
                    </div>
                </div>
            </div>

            {/* Results */}
            {error ? (
                <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-sm text-center">
                    <p className="font-bold">{error}</p>
                </div>
            ) : products.length === 0 ? (
                <div className="bg-white p-20 rounded-sm shadow-card text-center border border-gray-100">
                    <SearchIcon size={64} className="mx-auto text-gray-200 mb-6" />
                    <h2 className="text-2xl font-black text-gray-400 italic uppercase mb-2">No products found</h2>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Try different keywords or browse categories</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
