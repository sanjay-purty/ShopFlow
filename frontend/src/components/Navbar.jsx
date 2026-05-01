import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Package, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = ["Electronics", "Furniture", "Clothes", "Accessories"];

  const handleCategoryClick = (category) => {
    setIsMobileMenuOpen(false);
    navigate(`/#${category}`);
    // A simple hack to scroll to the element since react-router hash links sometimes need help
    setTimeout(() => {
      const element = document.getElementById(category);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex-shrink-0 tracking-tight">
              ShopFlow.
            </Link>
          </div>

          {/* Desktop Categories */}
          <div className="hidden lg:flex items-center space-x-8">
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 sm:space-x-5 flex-shrink-0">
            <div className="hidden sm:block w-48 md:w-64">
              <SearchBar />
            </div>

            <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600 transition p-2 bg-gray-50 rounded-full hover:bg-indigo-50">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-3 bg-gray-50 hover:bg-gray-100 rounded-full transition border border-gray-100"
                >
                  <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                    {userInfo.name.split(' ')[0]}
                  </span>
                  <div className="bg-indigo-600 text-white rounded-full p-1">
                    <User size={16} />
                  </div>
                  <ChevronDown size={14} className="text-gray-500 mr-1" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{userInfo.name}</p>
                      <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
                    </div>
                    
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User size={16} />
                      My Profile
                    </Link>
                    
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Package size={16} />
                      My Orders
                    </Link>

                    <div className="h-px bg-gray-100 my-1 mx-2"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition shadow-sm hover:shadow-md font-medium text-sm"
              >
                <User size={16} />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search - Visible only on small screens */}
        <div className="mt-3 sm:hidden">
          <SearchBar />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-100 space-y-2 pb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Categories</p>
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
