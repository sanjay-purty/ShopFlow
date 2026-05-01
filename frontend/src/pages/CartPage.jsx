import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Trash2, ArrowRight } from "lucide-react";

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <img
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
          alt="Empty Cart"
          className="w-48 h-48 mb-6 opacity-80"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link
          to="/"
          className="px-8 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition shadow-lg"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li key={item.product} className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50 transition">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                    <Link to={`/product/${item.product}`} className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition">
                      {item.name}
                    </Link>
                    <div className="text-indigo-600 font-bold mt-1">${item.price.toFixed(2)}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-10 w-28 bg-white">
                      <button
                        onClick={() => addToCart(item, -1)}
                        disabled={item.qty === 1}
                        className="px-2 hover:bg-gray-100 text-gray-600 h-full flex-grow transition"
                      >
                        -
                      </button>
                      <div className="font-semibold text-gray-800 text-sm flex items-center justify-center w-8">
                        {item.qty}
                      </div>
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="px-2 hover:bg-gray-100 text-gray-600 h-full flex-grow transition"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                <span className="font-medium text-gray-900">
                  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-indigo-600">
                  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </span>
              </div>
            </div>

            <button
                type="button"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/30 transform hover:-translate-y-0.5"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
              Proceed to Checkout
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
