import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, login } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      // Use hard redirect to ensure state is settled and page changes
      window.location.href = "/profile";
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center py-20 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full max-w-md border border-gray-100 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-tr from-indigo-100 to-purple-100 p-4 rounded-2xl text-indigo-600 shadow-sm border border-indigo-50">
              <LogIn size={36} />
            </div>
          </div>
          <h2 className="text-3xl font-black text-center text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-8 font-medium">Sign in to continue to ShopFlow</p>
          
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-600/30 transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          <div className="mt-10 text-center text-sm font-medium text-gray-600 border-t border-gray-100 pt-6">
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-indigo-600 hover:text-purple-600 font-bold transition-colors"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
