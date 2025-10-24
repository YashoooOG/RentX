import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from './App.jsx';

function ProductPage() {
    const { isDarkTheme } = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                const foundProduct = data.products.find(p => p.id === parseInt(id));
                
                console.log('Product data:', foundProduct);
                setProduct(foundProduct);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const nextImage = () => {
        if (product?.images && product.images.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
        }
    };

    const prevImage = () => {
        if (product?.images && product.images.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={isDarkTheme ? { backgroundColor: '#181a1b' } : { backgroundColor: '#f0f2f5' }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
                    <p className="mt-4" style={isDarkTheme ? { color: '#e8e6e3' } : { color: '#333' }}>Loading...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={isDarkTheme ? { backgroundColor: '#181a1b' } : { backgroundColor: '#f0f2f5' }}>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4" style={isDarkTheme ? { color: '#e8e6e3' } : { color: '#333' }}>Product Not Found</h2>
                    <button onClick={() => navigate('/mainpage')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-6 px-4" style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3' } : { backgroundColor: '#f0f2f5', color: '#333' }}>
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="mb-4 flex items-center gap-2 px-4 py-2 transition-colors font-semibold"
                    style={isDarkTheme 
                        ? { backgroundColor: '#23272b', color: '#e8e6e3' } 
                        : { backgroundColor: '#fff', color: '#000' }
                    }
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Section - Images */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Image */}
                        <div className="overflow-hidden" style={isDarkTheme 
                            ? { backgroundColor: '#23272b' } 
                            : { backgroundColor: '#fff' }
                        }>
                            <div className="relative aspect-video bg-black">
                                {product.images && product.images.length > 0 ? (
                                    <>
                                        <img
                                            src={product.images[currentImageIndex]}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                        {product.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 hover:bg-gray-200 transition"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black p-3 hover:bg-gray-200 transition"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                                <div className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 text-sm font-bold">
                                                    {currentImageIndex + 1} / {product.images.length}
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">No image</div>
                                )}
                            </div>

                            {/* Thumbnail Gallery */}
                            {product.images && product.images.length > 1 && (
                                <div className="p-4 flex gap-2 overflow-x-auto">
                                    {product.images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`flex-shrink-0 w-20 h-20 overflow-hidden transition ${
                                                index === currentImageIndex 
                                                    ? 'opacity-100 ring-2 ring-offset-2' 
                                                    : 'opacity-60 hover:opacity-100'
                                            }`}
                                            style={index === currentImageIndex 
                                                ? (isDarkTheme ? { ringColor: '#e8e6e3' } : { ringColor: '#000' })
                                                : {}
                                            }
                                        >
                                            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="p-6" style={isDarkTheme 
                            ? { backgroundColor: '#23272b' } 
                            : { backgroundColor: '#fff' }
                        }>
                            <h2 className="text-2xl font-bold mb-4 uppercase">Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {product.category && (
                                    <div className="pb-3">
                                        <p className="text-sm opacity-70 uppercase font-semibold">Category</p>
                                        <p className="font-bold mt-1">{product.category}</p>
                                    </div>
                                )}
                                {product.condition && (
                                    <div className="pb-3">
                                        <p className="text-sm opacity-70 uppercase font-semibold">Condition</p>
                                        <p className="font-bold mt-1">{product.condition}</p>
                                    </div>
                                )}
                                {product.rate_unit && (
                                    <div className="pb-3">
                                        <p className="text-sm opacity-70 uppercase font-semibold">Rate Unit</p>
                                        <p className="font-bold mt-1">{product.rate_unit.replace('_', ' ')}</p>
                                    </div>
                                )}
                                {product.deposit && (
                                    <div className="pb-3">
                                        <p className="text-sm opacity-70 uppercase font-semibold">Deposit</p>
                                        <p className="font-bold mt-1">₹{product.deposit.toLocaleString('en-IN')}</p>
                                    </div>
                                )}
                                {product.min_rental_days && (
                                    <div className="pb-3">
                                        <p className="text-sm opacity-70 uppercase font-semibold">Min Rental</p>
                                        <p className="font-bold mt-1">{product.min_rental_days} days</p>
                                    </div>
                                )}
                                {product.max_rental_days && (
                                    <div className="pb-3">
                                        <p className="text-sm opacity-70 uppercase font-semibold">Max Rental</p>
                                        <p className="font-bold mt-1">{product.max_rental_days} days</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="p-6" style={isDarkTheme 
                            ? { backgroundColor: '#23272b' } 
                            : { backgroundColor: '#fff' }
                        }>
                            <h2 className="text-2xl font-bold mb-4 uppercase">Description</h2>
                            <p className="leading-relaxed whitespace-pre-line">{product.description || 'No description available'}</p>
                        </div>
                    </div>

                    {/* Right Section - Price & Seller */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Price Card */}
                        <div className="p-6" style={isDarkTheme 
                            ? { backgroundColor: '#23272b' } 
                            : { backgroundColor: '#fff' }
                        }>
                            <div className="mb-4">
                                <h1 className="text-4xl font-bold">
                                    ₹{product.price?.toLocaleString('en-IN')}
                                </h1>
                                {product.rate_unit && (
                                    <p className="text-sm opacity-70 mt-1 font-semibold">/ {product.rate_unit.replace('_', ' ')}</p>
                                )}
                            </div>

                            <h3 className="text-xl font-bold mb-3">{product.name}</h3>

                            <div className="flex items-center gap-2 mb-2 opacity-80">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm font-semibold">{product.location}</span>
                            </div>

                            <p className="text-sm opacity-70 mb-6 font-semibold">
                                {product.posted_at ? new Date(product.posted_at).toLocaleDateString('en-IN', { 
                                    day: 'numeric', 
                                    month: 'short', 
                                    year: 'numeric' 
                                }) : 'Recently posted'}
                            </p>

                            <button 
                                onClick={() => navigate('/login')}
                                className="w-full font-bold py-3 transition mb-3 uppercase tracking-wide" 
                                style={isDarkTheme 
                                    ? { backgroundColor: '#e8e6e3', color: '#181a1b' } 
                                    : { backgroundColor: '#000', color: '#fff' }
                                }
                                onMouseEnter={(e) => {
                                    if (isDarkTheme) {
                                        e.target.style.backgroundColor = '#181a1b';
                                        e.target.style.color = '#e8e6e3';
                                    } else {
                                        e.target.style.backgroundColor = '#fff';
                                        e.target.style.color = '#000';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (isDarkTheme) {
                                        e.target.style.backgroundColor = '#e8e6e3';
                                        e.target.style.color = '#181a1b';
                                    } else {
                                        e.target.style.backgroundColor = '#000';
                                        e.target.style.color = '#fff';
                                    }
                                }}
                            >
                                Chat with seller
                            </button>

                            <button 
                                onClick={() => navigate('/login')}
                                className="w-full font-bold py-3 transition uppercase tracking-wide" 
                                style={isDarkTheme 
                                    ? { backgroundColor: '#181a1b', color: '#e8e6e3', border: '2px solid #e8e6e3' } 
                                    : { backgroundColor: '#fff', color: '#000', border: '2px solid #000' }
                                }
                                onMouseEnter={(e) => {
                                    if (isDarkTheme) {
                                        e.target.style.backgroundColor = '#e8e6e3';
                                        e.target.style.color = '#181a1b';
                                    } else {
                                        e.target.style.backgroundColor = '#000';
                                        e.target.style.color = '#fff';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (isDarkTheme) {
                                        e.target.style.backgroundColor = '#181a1b';
                                        e.target.style.color = '#e8e6e3';
                                    } else {
                                        e.target.style.backgroundColor = '#fff';
                                        e.target.style.color = '#000';
                                    }
                                }}
                            >
                                Make an offer
                            </button>
                        </div>

                        {/* Seller Info */}
                        <div className="p-6" style={isDarkTheme 
                            ? { backgroundColor: '#23272b' } 
                            : { backgroundColor: '#fff' }
                        }>
                            <h3 className="font-bold text-lg mb-4 uppercase">Posted by</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 flex items-center justify-center font-bold text-xl" style={isDarkTheme 
                                    ? { backgroundColor: '#181a1b', color: '#e8e6e3' } 
                                    : { backgroundColor: '#000', color: '#fff' }
                                }>
                                    {product.seller?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <p className="font-bold">{product.seller || 'User'}</p>
                                    <p className="text-sm opacity-70 font-semibold">Member since 2025</p>
                                </div>
                            </div>
                        </div>

                        {/* AD ID */}
                        <div className="p-4 text-center" style={isDarkTheme 
                            ? { backgroundColor: '#23272b' } 
                            : { backgroundColor: '#fff' }
                        }>
                            <p className="text-sm font-bold uppercase">AD ID: {product.id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;