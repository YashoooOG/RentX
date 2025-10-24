import React from 'react'
import { useState, useEffect, createContext, useContext } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Header from './Header.jsx';
import Home from './Home.jsx';
import Footer from './Footer.jsx';
import LegalInfo from './LegalInfo.jsx';
import Support from './Support.jsx';
import LoginSignup from './LoginSignup.jsx'; 
import UserDashboard from './UserDashboard.jsx';
import NewProduct from './NewProduct';
import About from './About';
import MainPage from './MainPage.jsx';
import ProductPage from './ProductPage.jsx';
// Create Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in on component mount
    const userData = localStorage.getItem('user');
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <Router>
        <div className={`min-h-screen ${isDarkTheme ? 'text-white' : 'bg-white text-black'}`} style={isDarkTheme ? { backgroundColor: '#181a1b' } : {}}>
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> {/* ← Header should be HERE, OUTSIDE Routes */}
          
          <main style={{ minHeight: "80vh", padding: "0" }}> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/legal" element={<LegalInfo />} />
              <Route path="/support" element={<Support />} />
              <Route path="/login" element={<LoginSignup setIsLoggedIn={setIsLoggedIn} />} /> 
              <Route path="/signup" element={<LoginSignup setIsLoggedIn={setIsLoggedIn} />} /> 
              <Route path="/dashboard" element={<UserDashboard />} /> 
              <Route path="/add-product" element={<NewProduct />} />
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              {/* Add other routes here */}
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </ThemeContext.Provider>
  )
}

export default App
