import { useState, createContext, useContext } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import Home from './Home.jsx';
import Footer from './Footer.jsx';
import LegalInfo from './LegalInfo.jsx';
import Support from './Support.jsx';
import LoginSignup from './LoginSignup.jsx'; // Updated import
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

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <div className={`min-h-screen ${isDarkTheme ? 'text-white' : 'bg-white text-black'}`} style={isDarkTheme ? { backgroundColor: '#181a1b' } : {}}>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        
        <main style={{ minHeight: "80vh", padding: "0" }}> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/legal" element={<LegalInfo />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<LoginSignup />} /> 
            <Route path="/signup" element={<LoginSignup />} /> 
            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
