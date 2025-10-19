import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from './App.jsx';

const Support = () => {
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
        <h1 className="text-4xl font-bold text-center mb-12">Support</h1>

        {/* Help Center Section */}
        <section id="help" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Help Center</h2>
          <div className="space-y-6">
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Welcome to the RentX Help Center. Here you'll find answers to common questions and helpful guides to make the most of our platform.
            </p>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Getting Started</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              New to RentX? Learn how to create your account, verify your identity, and start renting or listing items. Our step-by-step guides will help you get up and running quickly.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">How to Rent</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Browse our marketplace, find the perfect item, and learn about our secure booking process. We'll guide you through payment, pickup, and return procedures.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">How to List Items</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Turn your unused items into income. Learn how to create compelling listings, set competitive prices, and manage your rental calendar effectively.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Payment & Insurance</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Understand our secure payment system, insurance coverage options, and what happens in case of damage or disputes.
            </p>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <div className="space-y-6">
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Need help? Our support team is here to assist you. Choose the best way to reach us based on your needs.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className={`p-6 border rounded-lg ${isDarkTheme ? '' : 'border-gray-300'}`} style={isDarkTheme ? { borderColor: '#e8e6e3' } : {}}>
                <h3 className="text-xl font-semibold mb-4">Email Support</h3>
                <p className={`mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                  For general inquiries and non-urgent matters
                </p>
                <p className="font-medium">support@rentx.com</p>
                <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Response within 24 hours</p>
              </div>

              <div className={`p-6 border rounded-lg ${isDarkTheme ? '' : 'border-gray-300'}`} style={isDarkTheme ? { borderColor: '#e8e6e3' } : {}}>
                <h3 className="text-xl font-semibold mb-4">Live Chat</h3>
                <p className={`mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                  For immediate assistance during business hours
                </p>
                <p className="font-medium">Available 9 AM - 6 PM EST</p>
                <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Monday - Friday</p>
              </div>

              <div className={`p-6 border rounded-lg ${isDarkTheme ? '' : 'border-gray-300'}`} style={isDarkTheme ? { borderColor: '#e8e6e3' } : {}}>
                <h3 className="text-xl font-semibold mb-4">Phone Support</h3>
                <p className={`mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                  For urgent matters requiring immediate attention
                </p>
                <p className="font-medium">1-800-RENTX-01</p>
                <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>24/7 Emergency Line</p>
              </div>

              <div className={`p-6 border rounded-lg ${isDarkTheme ? '' : 'border-gray-300'}`} style={isDarkTheme ? { borderColor: '#e8e6e3' } : {}}>
                <h3 className="text-xl font-semibold mb-4">Social Media</h3>
                <p className={`mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                  Follow us for updates and community support
                </p>
                <p className="font-medium">@RentXOfficial</p>
                <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Twitter, Facebook, Instagram</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className={`p-6 border rounded-lg ${isDarkTheme ? '' : 'border-gray-300'}`} style={isDarkTheme ? { borderColor: '#e8e6e3' } : {}}>
              <h3 className="text-lg font-semibold mb-3">How does RentX work?</h3>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                RentX connects people who want to rent items with those who have items to share. Simply browse our marketplace, book an item, and arrange pickup with the owner.
              </p>
            </div>

            <div className={`p-6 border rounded-lg ${isDarkTheme ? '' : 'border-gray-300'}`} style={isDarkTheme ? { borderColor: '#e8e6e3' } : {}}>
              <h3 className="text-lg font-semibold mb-3">Is my payment secure?</h3>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                Yes, all payments are processed through our secure payment system. We use industry-standard encryption and never store your full payment details.
              </p>
            </div>

            <div className={`p-6 border rounded-lg ${isDarkTheme ? '' : 'border-gray-300'}`} style={isDarkTheme ? { borderColor: '#e8e6e3' } : {}}>
              <h3 className="text-lg font-semibold mb-3">What if an item gets damaged?</h3>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                All rentals are covered by our protection program. Report any damage immediately, and we'll work with both parties to resolve the issue fairly.
              </p>
            </div>

            <div className={`p-6 border rounded-lg ${isDarkTheme ? '' : 'border-gray-300'}`} style={isDarkTheme ? { borderColor: '#e8e6e3' } : {}}>
              <h3 className="text-lg font-semibold mb-3">How do I cancel a booking?</h3>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                You can cancel bookings up to 24 hours before the rental start time for a full refund. Cancellation policies may vary by item owner.
              </p>
            </div>

            <div className={`p-6 border rounded-lg ${isDarkTheme ? '' : 'border-gray-300'}`} style={isDarkTheme ? { borderColor: '#e8e6e3' } : {}}>
              <h3 className="text-lg font-semibold mb-3">How do I become a verified user?</h3>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                Complete your profile with a valid ID, phone number verification, and email confirmation. Verified users have access to premium features and higher trust ratings.
              </p>
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section id="safety" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Safety</h2>
          <div className="space-y-6">
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Your safety is our top priority. Here are the measures we've put in place to ensure secure and trustworthy transactions.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">User Verification</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              All users must verify their identity through government-issued ID, phone number, and email address. We also run background checks for high-value item rentals.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Secure Meetings</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              We recommend meeting in public places for item exchanges. Many locations offer designated safe exchange zones with security cameras and good lighting.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Payment Protection</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              All payments are held in escrow until the rental is complete. This protects both renters and owners from fraud and ensures fair transactions.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">24/7 Support</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              Our emergency support line is available 24/7 for urgent safety concerns. Report suspicious activity or safety issues immediately.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Community Guidelines</h3>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              We maintain strict community guidelines and take swift action against users who violate our terms. Trust and safety violations result in immediate account suspension.
            </p>
          </div>
        </section>

        {/* Quick Navigation */}
        <div className="border-t pt-8" style={isDarkTheme ? { borderColor: '#e8e6e3' } : {}}>
          <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('help').scrollIntoView({ behavior: 'smooth' })}
              className={`px-4 py-2 border transition font-medium ${
                isDarkTheme 
                  ? 'hover:text-white' 
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
              style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3', borderColor: '#e8e6e3' } : {}}
            >
              Help Center
            </button>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className={`px-4 py-2 border transition font-medium ${
                isDarkTheme 
                  ? 'hover:text-white' 
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
              style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3', borderColor: '#e8e6e3' } : {}}
            >
              Contact Us
            </button>
            <button 
              onClick={() => document.getElementById('faq').scrollIntoView({ behavior: 'smooth' })}
              className={`px-4 py-2 border transition font-medium ${
                isDarkTheme 
                  ? 'hover:text-white' 
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
              style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3', borderColor: '#e8e6e3' } : {}}
            >
              FAQ
            </button>
            <button 
              onClick={() => document.getElementById('safety').scrollIntoView({ behavior: 'smooth' })}
              className={`px-4 py-2 border transition font-medium ${
                isDarkTheme 
                  ? 'hover:text-white' 
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
              style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3', borderColor: '#e8e6e3' } : {}}
            >
              Safety
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Support;
