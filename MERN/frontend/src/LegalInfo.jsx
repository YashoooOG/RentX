import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from './App.jsx';

const LegalInfo = () => {
  const { isDarkTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    // Scroll to section based on URL hash
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <main className={isDarkTheme ? '' : 'bg-white text-black'} style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3' } : {}}>
      <div className="max-w-4xl mx-auto px-5 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Legal Information</h1>

        {/* Terms of Service Section */}
        <section id="terms" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Terms of Service</h2>
          <div className="space-y-6">
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Welcome to RentX. These Terms of Service ("Terms") govern your use of our platform and services. By accessing or using RentX, you agree to be bound by these Terms.
            </p>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              By creating an account or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">2. User Responsibilities</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You agree to provide accurate and complete information when creating your account.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">3. Rental Agreements</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              All rental transactions are agreements between users. RentX facilitates these transactions but is not a party to the rental agreements. Users are responsible for compliance with all applicable laws and regulations.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">4. Prohibited Activities</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Users may not use RentX for illegal activities, fraudulent transactions, or to list prohibited items. We reserve the right to suspend or terminate accounts that violate these terms.
            </p>
          </div>
        </section>

        {/* Privacy Policy Section */}
        <section id="privacy" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>
          <div className="space-y-6">
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use RentX.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              We collect information you provide directly to us, such as when you create an account, list an item, or contact us. This may include your name, email address, phone number, and payment information.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              We use your information to provide and improve our services, process transactions, communicate with you, and ensure the security of our platform.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">3. Information Sharing</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              We do not sell your personal information. We may share your information with service providers, law enforcement when required by law, or in connection with a business transfer.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">4. Data Security</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>
        </section>

        {/* Cookie Policy Section */}
        <section id="cookies" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Cookie Policy</h2>
          <div className="space-y-6">
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              This Cookie Policy explains how RentX uses cookies and similar technologies to recognize you when you visit our platform.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">1. What Are Cookies</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">2. Types of Cookies We Use</h3>
            <ul className={`list-disc list-inside space-y-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">3. Managing Cookies</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may impact your user experience and some functionality may not work as intended.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">4. Updates to This Policy</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </div>
        </section>

        {/* Quick Navigation */}
        <div className="border-t pt-8" style={isDarkTheme ? { borderColor: '#e8e6e3' } : {}}>
          <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('terms').scrollIntoView({ behavior: 'smooth' })}
              className={`px-4 py-2 border transition font-medium ${
                isDarkTheme 
                  ? 'hover:text-white' 
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
              style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3', borderColor: '#e8e6e3' } : {}}
            >
              Terms of Service
            </button>
            <button 
              onClick={() => document.getElementById('privacy').scrollIntoView({ behavior: 'smooth' })}
              className={`px-4 py-2 border transition font-medium ${
                isDarkTheme 
                  ? 'hover:text-white' 
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
              style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3', borderColor: '#e8e6e3' } : {}}
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => document.getElementById('cookies').scrollIntoView({ behavior: 'smooth' })}
              className={`px-4 py-2 border transition font-medium ${
                isDarkTheme 
                  ? 'hover:text-white' 
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
              style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3', borderColor: '#e8e6e3' } : {}}
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LegalInfo;
