import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Loader, ArrowLeft, Package, MapPin } from "lucide-react";
import toast from "react-hot-toast";

const OrderPage = () => {
  const { id } = useParams();
  const { userInfo } = useAuth();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(`/api/orders/${id}`, config);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchOrder();
    }
  }, [id, userInfo]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-indigo-600" size={64} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl inline-block mb-6 font-medium">
          {error}
        </div>
        <div>
          <Link to="/profile" className="text-indigo-600 hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in">
      <Link to="/profile" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition">
        <ArrowLeft size={18} /> Back to My Orders
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Details</h1>
          <p className="text-gray-500 mb-8">Order ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{order._id}</span></p>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-4">
              <Package className="text-indigo-500" /> Items in Order
            </h2>
            
            {order.orderItems.length === 0 ? (
              <p>Order is empty</p>
            ) : (
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-gray-50" />
                    <div className="flex-grow">
                      <Link to={`/product/${item.product || item._id}`} className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition line-clamp-1">
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">Qty: {item.qty}</p>
                    </div>
                    <div className="font-bold text-gray-900">
                      ${(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-black text-indigo-600">${order.totalPrice.toFixed(2)}</span>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-sm text-center font-medium text-gray-600">
              Paid on {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
