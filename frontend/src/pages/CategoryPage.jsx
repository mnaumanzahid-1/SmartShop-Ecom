import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Package, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';

const CategoryPage = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/v1/products/category/${slug}`);
                setProducts(data.products);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch products');
                setLoading(false);
            }
        };

        if (slug) {
            fetchProducts();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="bg-white aspect-[3/4] rounded-md animate-pulse p-4 space-y-4 shadow-sm">
                            <div className="bg-gray-100 w-full aspect-square rounded-sm" />
                            <div className="bg-gray-100 h-4 w-3/4 rounded-sm" />
                            <div className="bg-gray-100 h-6 w-1/2 rounded-sm" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
            {/* Header */}
            <div className="mb-10 space-y-6">
                <Link to="/" className="inline-flex items-center gap-2 text-brand-orange font-bold text-sm hover:underline">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <div className="flex items-center gap-4">
                    <Package className="text-brand-orange" size={32} />
                    <div>
                        <h1 className="text-3xl font-black text-brand-navy italic uppercase tracking-tighter">
                            {slug}
                        </h1>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">
                            {products.length} items available
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
                    <Package size={64} className="mx-auto text-gray-200 mb-6" />
                    <h2 className="text-2xl font-black text-gray-400 italic uppercase mb-2">No products in this category</h2>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Check back soon for new arrivals</p>
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

export default CategoryPage;
