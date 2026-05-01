import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ShoppingCart, Loader } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success("Added to cart!");
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-6 max-w-6xl mx-auto animate-in fade-in">
      <Link to="/" className="inline-flex items-center text-indigo-600 font-medium hover:text-purple-600 mb-8 transition-colors">
        <ArrowLeft size={20} className="mr-2" /> Back to Products
      </Link>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row border border-gray-100">
        <div className="md:w-1/2 bg-gray-50/50 flex justify-center items-center p-12">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[400px] object-contain drop-shadow-2xl mix-blend-multiply hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-bl-full -z-10"></div>
          
          <div className="text-xs text-indigo-700 bg-indigo-50 border border-indigo-100 font-black px-3 py-1.5 rounded-lg uppercase tracking-widest inline-block w-max mb-6">
            {product.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            {product.name}
          </h1>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 pt-10 mt-auto">
            <div className="mb-6 sm:mb-0">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Price</p>
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
                ${product.price.toFixed(2)}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden h-14 w-32 bg-gray-50 shadow-sm">
                <button
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  className="px-3 hover:bg-gray-200 hover:text-indigo-600 text-gray-500 h-full flex-grow transition-colors font-medium"
                  disabled={qty === 1}
                >
                  -
                </button>
                <div className="px-3 font-bold text-gray-900 border-x border-gray-200 flex items-center justify-center h-full w-12 bg-white">
                  {qty}
                </div>
                <button
                  onClick={() => setQty(qty < product.countInStock ? qty + 1 : qty)}
                  className="px-3 hover:bg-gray-200 hover:text-indigo-600 text-gray-500 h-full flex-grow transition-colors font-medium"
                  disabled={qty === product.countInStock || product.countInStock === 0}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className={`h-14 flex items-center justify-center space-x-2 px-8 rounded-xl text-white font-bold transition-all duration-300 flex-grow sm:flex-grow-0 ${
                  product.countInStock > 0
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-600/30 transform hover:-translate-y-0.5"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <ShoppingCart size={20} />
                <span>{product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
