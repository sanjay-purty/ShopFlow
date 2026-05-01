import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState(userInfo?.address || "");
  const [city, setCity] = useState(userInfo?.city || "");
  const [postalCode, setPostalCode] = useState(userInfo?.postalCode || "");
  const [country, setCountry] = useState(userInfo?.country || "");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const totalPrice = itemsPrice; // No tax/shipping for simplicity

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        "/api/orders",
        {
          orderItems: cartItems,
          itemsPrice,
          totalPrice,
        },
        config
      );

      toast.success("Order placed successfully!");
      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      if (err.response?.status === 401) {
        logout();
        navigate("/login");
      }
    }
  };

  if (orderPlaced) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <CheckCircle size={80} className="text-green-500 mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Successful!</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Thank you for your purchase. Your order has been placed and is being processed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition shadow-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="py-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Details</h2>
            <form onSubmit={placeOrderHandler} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 truncate pr-4">{item.qty} x {item.name}</span>
                  <span className="font-medium text-gray-900">${(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}
              
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-indigo-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={placeOrderHandler}
              disabled={cartItems.length === 0}
              className={`w-full font-bold py-4 px-4 rounded-xl transition-all duration-300 mt-4 flex justify-center items-center ${
                cartItems.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-600/30 transform hover:-translate-y-0.5"
              }`}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
