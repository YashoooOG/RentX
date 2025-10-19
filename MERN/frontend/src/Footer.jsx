import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from './App.jsx';

const Footer = () => {
  const { isDarkTheme } = useTheme();

  return (
    <footer 
      className={`border-t-2 ${isDarkTheme ? 'text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'}`}
      style={isDarkTheme ? { backgroundColor: '#1e2022' } : {}}
    >
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src="images/D1Qy2q01-cropped.svg" alt="Logo" className={`h-6 w-6 ${isDarkTheme ? 'filter invert' : ''}`} />
              <span className="font-bold text-xl">RentX</span>
            </div>
            <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
              Rent smart, save money, and access everything you need without the commitment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className={`${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition`}>Home</Link></li>
              <li><Link to="/browse" className={`${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition`}>Browse Items</Link></li>
              <li><Link to="/list-item" className={`${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition`}>List Item</Link></li>
              <li><Link to="/about" className={`${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition`}>About</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/support#help" className={`${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition`}>Help Center</Link></li>
              <li><Link to="/support#contact" className={`${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition`}>Contact Us</Link></li>
              <li><Link to="/support#faq" className={`${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition`}>FAQ</Link></li>
              <li><Link to="/support#safety" className={`${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition`}>Safety</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/legal#terms" className={`${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition`}>Terms of Service</Link></li>
              <li><Link to="/legal#privacy" className={`${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition`}>Privacy Policy</Link></li>
              <li><Link to="/legal#cookies" className={`${isDarkTheme ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition`}>Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`mt-8 pt-8 border-t ${isDarkTheme ? 'border-gray-700' : 'border-gray-300'} text-center`}>
          <p className={`text-sm ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>
            © 2024 RentX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
