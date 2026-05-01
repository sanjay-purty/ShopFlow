import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 overflow-hidden transform hover:-translate-y-1">
      <Link to={`/product/${product._id}`} className="relative overflow-hidden aspect-square sm:aspect-w-4 sm:aspect-h-3 bg-gray-50 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-56 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow bg-white relative z-10">
        <div className="text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-100 font-black px-2 py-1 rounded-md uppercase tracking-widest inline-block w-max mb-3">
          {product.category}
        </div>
        
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-5 flex items-end justify-between border-t border-gray-50">
          <div>
            <p className="text-xs text-gray-400 font-bold tracking-wider uppercase mb-1">Price</p>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">${product.price.toFixed(2)}</span>
          </div>
          
          <Link
            to={`/product/${product._id}`}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-indigo-500/30"
          >
            <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
