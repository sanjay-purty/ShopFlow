import React from "react";
import { Link } from "react-router-dom";
import { Globe, MessageSquare, Camera, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 inline-block tracking-tight mb-2">
              ShopFlow.
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed pr-4">
              Your premium destination for the best products across electronics, fashion, furniture, and more. Quality you can trust, prices you'll love.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 text-white transition-all transform hover:-translate-y-1"><Globe size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 text-white transition-all transform hover:-translate-y-1"><MessageSquare size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 text-white transition-all transform hover:-translate-y-1"><Camera size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span> Quick Links
            </h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="text-gray-600">&rsaquo;</span> Home</Link></li>
              <li><a href="/#Electronics" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="text-gray-600">&rsaquo;</span> Electronics</a></li>
              <li><a href="/#Furniture" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="text-gray-600">&rsaquo;</span> Furniture</a></li>
              <li><a href="/#Clothes" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="text-gray-600">&rsaquo;</span> Clothes</a></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="text-gray-600">&rsaquo;</span> Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span> Service
            </h3>
            <ul className="space-y-3">
              <li><Link to="/profile" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="text-gray-600">&rsaquo;</span> My Account</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="text-gray-600">&rsaquo;</span> Order History</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="text-gray-600">&rsaquo;</span> Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="text-gray-600">&rsaquo;</span> Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><span className="text-gray-600">&rsaquo;</span> FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span> Contact Us
            </h3>
            <ul className="space-y-4 bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
              <li className="flex items-start gap-3">
                <MapPin className="text-indigo-400 mt-1 shrink-0" size={18} />
                <span className="text-gray-400 text-sm leading-relaxed">123 Commerce Avenue<br/>Tech District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-indigo-400 shrink-0" size={18} />
                <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-indigo-400 shrink-0" size={18} />
                <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">support@shopflow.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ShopFlow Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
