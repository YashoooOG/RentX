import React from "react";
import { useTheme } from './App.jsx';

const Home = () => {
  const { isDarkTheme } = useTheme();

  return (
    <main className={isDarkTheme ? '' : 'bg-white text-black'} style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3' } : {}}>
      <div className="max-w-7xl mx-auto px-5 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          <p className={`italic text-xl mb-5 ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
            "Why buy when you can borrow?"
          </p>
          <h1 className="text-5xl font-extrabold mb-5">Save money. Save space.</h1>
          <h1 className="text-5xl font-extrabold mb-10">Rent smart.</h1>
        </div>
    
        {/* Body Section */}
        <div className="text-center">
          <p className={`text-lg mb-14 leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
            Access everything you need without the commitment.
            <br />
            From cars to gadgets, homes to equipment — rent it all on RentX.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-5 flex-wrap mb-16">
            <button
              className={`text-lg px-7 py-3 border transition font-medium ${
                isDarkTheme 
                  ? 'hover:text-white' 
                  : 'bg-black text-white border-black hover:bg-white hover:text-black'
              }`}
              style={isDarkTheme ? { backgroundColor: '#e8e6e3', color: '#181a1b', borderColor: '#e8e6e3' } : {}}
              onMouseEnter={(e) => isDarkTheme && (e.target.style.backgroundColor = '#181a1b', e.target.style.color = '#e8e6e3')}
              onMouseLeave={(e) => isDarkTheme && (e.target.style.backgroundColor = '#e8e6e3', e.target.style.color = '#181a1b')}
              id="nextBtn"
            >
              Start Renting
            </button>
            <button
              className={`text-lg px-7 py-3 border transition font-medium ${
                isDarkTheme
                  ? 'hover:bg-white hover:text-black'
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
              style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3', borderColor: '#e8e6e3' } : {}}
              onMouseEnter={(e) => isDarkTheme && (e.target.style.backgroundColor = '#e8e6e3', e.target.style.color = '#181a1b')}
              onMouseLeave={(e) => isDarkTheme && (e.target.style.backgroundColor = '#181a1b', e.target.style.color = '#e8e6e3')}
              onClick={() => (window.location.href = "new.html")}
            >
              List Your Item
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="py-6">
              <h2 className="text-4xl font-bold mb-3">10K+</h2>
              <p className={isDarkTheme ? 'text-gray-300' : 'text-gray-500'}>Items Listed</p>
            </div>
            <div className="py-6">
              <h2 className="text-4xl font-bold mb-3">50K+</h2>
              <p className={isDarkTheme ? 'text-gray-300' : 'text-gray-500'}>Happy Renters</p>
            </div>
            <div className="py-6">
              <h2 className="text-4xl font-bold mb-3">1K+</h2>
              <p className={isDarkTheme ? 'text-gray-300' : 'text-gray-500'}>Trusted Owners</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
