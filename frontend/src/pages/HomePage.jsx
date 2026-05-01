import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Loader, ArrowRight, TrendingUp, ShieldCheck, Truck } from "lucide-react";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(keyword ? `/api/products?keyword=${keyword}` : "/api/products");
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <div className="animate-in fade-in pb-12">
      {/* Hero Section - Only show if not searching */}
      {!keyword && (
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 text-white mb-16 shadow-2xl">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop" 
              alt="Hero Background" 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
          </div>
          <div className="relative px-8 py-20 md:py-32 lg:px-16 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Premium</span> Lifestyle Products.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
              Elevate your everyday with our curated collection of electronics, fashion, and home essentials. Quality guaranteed.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#Electronics" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2">
                Shop Now <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Feature Highlights */}
      {!keyword && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 px-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
            <div className="bg-indigo-50 p-4 rounded-full text-indigo-600">
              <Truck size={28} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Free Fast Delivery</h3>
              <p className="text-sm text-gray-500">On all orders over $100</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
            <div className="bg-purple-50 p-4 rounded-full text-purple-600">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Secure Payments</h3>
              <p className="text-sm text-gray-500">100% protected transactions</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
            <div className="bg-pink-50 p-4 rounded-full text-pink-600">
              <TrendingUp size={28} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Top Quality Brands</h3>
              <p className="text-sm text-gray-500">Curated for excellence</p>
            </div>
          </div>
        </div>
      )}

      {keyword ? (
        <div className="mb-8 flex items-center justify-between bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Search Results for <span className="text-indigo-600">"{keyword}"</span>
          </h1>
          <Link to="/" className="text-indigo-600 bg-white px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition">Clear</Link>
        </div>
      ) : (
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Our Collections</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-500">Explore our carefully categorized selection designed for modern living.</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader className="animate-spin text-indigo-600" size={48} />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center">
          <p className="text-red-700 font-medium text-lg">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-2xl font-bold text-gray-900 mb-2">No products found</p>
          <p className="text-gray-500 mb-6">Try adjusting your search keyword</p>
          <Link to="/" className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition shadow-md hover:shadow-lg">Browse All Products</Link>
        </div>
      ) : (
        <div className="space-y-16">
          {Object.entries(
            products.reduce((acc, product) => {
              if (!acc[product.category]) {
                acc[product.category] = [];
              }
              acc[product.category].push(product);
              return acc;
            }, {})
          ).map(([category, categoryProducts]) => (
            <div key={category} id={category} className="category-section scroll-mt-28">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">{category}</h2>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">{categoryProducts.length} Items</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categoryProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
