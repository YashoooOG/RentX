import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiSearch, BiSun, BiMoon } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useTheme } from './App.jsx';

function Header({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const { isDarkTheme, toggleTheme } = useTheme();
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate("/login");
    };

    const toggleMobileSearch = () => {
        setShowMobileSearch(!showMobileSearch);
    };

    return (
        <header className={`${isDarkTheme ? 'shadow-lg' : 'bg-white shadow-lg'}`} style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3' } : {}}>
            <nav className="flex items-center justify-between px-4 lg:px-8 py-3">
                {/* Logo */}
                <Link to="/" className={`flex items-center space-x-2 px-3 py-2 ${isDarkTheme ? '' : 'text-black'}`} style={isDarkTheme ? { color: '#e8e6e3' } : {}}>
                    <img src="images/D1Qy2q01-cropped.svg" alt="Logo" className={`h-6 w-6 ${isDarkTheme ? 'filter invert' : ''}`} />
                    <span className="font-bold text-lg">RentX</span>
                </Link>

                {/* Search Form - Hidden on mobile */}
                <form className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className={`flex w-full border-2 ${isDarkTheme ? '' : 'border-black'}`} style={isDarkTheme ? { borderColor: '#e8e6e3' } : {}}>
                        <input
                            type="search"
                            placeholder="Search products..."
                            className={`flex-1 px-4 py-2 outline-none ${isDarkTheme ? 'placeholder-gray-400' : 'text-black bg-white'}`}
                            style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3' } : {}}
                        />
                        <button
                            type="submit"
                            className={`px-4 py-2 ${isDarkTheme ? 'hover:bg-gray-200 border-l-2' : 'bg-black text-white hover:bg-gray-800 border-l-2 border-black'} transition-colors`}
                            style={isDarkTheme ? { backgroundColor: '#e8e6e3', color: '#181a1b', borderColor: '#e8e6e3' } : {}}
                        >
                            <BiSearch className="text-lg" />
                        </button>
                    </div>
                </form>

                {/* Right side buttons */}
                <div className="flex items-center space-x-2">
                    {/* Mobile Search Button */}
                    <button 
                        onClick={toggleMobileSearch}
                        className={`md:hidden p-2 ${isDarkTheme ? '' : 'text-black'}`}
                        style={isDarkTheme ? { color: '#e8e6e3' } : {}}
                    >
                        <BiSearch className="text-lg" />
                    </button>

                    {!isLoggedIn ? (
                        <>
                            {/* Desktop Auth Buttons */}
                            <div className="hidden md:flex space-x-2">
                                <button
                                    onClick={() => navigate("/login")}
                                    className={`px-4 py-2 border-2 ${isDarkTheme ? 'hover:text-black' : 'border-black bg-white text-black hover:bg-black hover:text-white'} transition-colors font-medium`}
                                    style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3', borderColor: '#e8e6e3' } : {}}
                                    onMouseEnter={(e) => isDarkTheme && (e.target.style.backgroundColor = '#e8e6e3', e.target.style.color = '#181a1b')}
                                    onMouseLeave={(e) => isDarkTheme && (e.target.style.backgroundColor = '#181a1b', e.target.style.color = '#e8e6e3')}
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => navigate("/signup")}
                                    className={`px-4 py-2 border-2 ${isDarkTheme ? 'hover:text-white' : 'bg-black text-white border-black hover:bg-white hover:text-black'} transition-colors font-medium`}
                                    style={isDarkTheme ? { backgroundColor: '#e8e6e3', color: '#181a1b', borderColor: '#e8e6e3' } : {}}
                                    onMouseEnter={(e) => isDarkTheme && (e.target.style.backgroundColor = '#181a1b', e.target.style.color = '#e8e6e3')}
                                    onMouseLeave={(e) => isDarkTheme && (e.target.style.backgroundColor = '#e8e6e3', e.target.style.color = '#181a1b')}
                                >
                                    Create Account
                                </button>
                            </div>

                            {/* Mobile Auth Button */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => navigate("/login")}
                                    className={`px-3 py-2 border-2 ${isDarkTheme ? 'hover:text-black' : 'border-black bg-white text-black hover:bg-black hover:text-white'} transition-colors font-medium text-sm`}
                                    style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3', borderColor: '#e8e6e3' } : {}}
                                    onMouseEnter={(e) => isDarkTheme && (e.target.style.backgroundColor = '#e8e6e3', e.target.style.color = '#181a1b')}
                                    onMouseLeave={(e) => isDarkTheme && (e.target.style.backgroundColor = '#181a1b', e.target.style.color = '#e8e6e3')}
                                >
                                    Log In
                                </button>
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className={`px-4 py-2 border-2 ${isDarkTheme ? 'hover:text-white' : 'bg-black text-white border-black hover:bg-white hover:text-black'} transition-colors font-medium`}
                            style={isDarkTheme ? { backgroundColor: '#e8e6e3', color: '#181a1b', borderColor: '#e8e6e3' } : {}}
                            onMouseEnter={(e) => isDarkTheme && (e.target.style.backgroundColor = '#181a1b', e.target.style.color = '#e8e6e3')}
                            onMouseLeave={(e) => isDarkTheme && (e.target.style.backgroundColor = '#e8e6e3', e.target.style.color = '#181a1b')}
                        >
                            Logout
                        </button>
                    )}

                    {/* Theme Toggle */}
                    <div className="">
                        <button 
                            onClick={toggleTheme}
                            className={`p-2 ${isDarkTheme ? '' : 'text-black'}`}
                            style={isDarkTheme ? { color: '#e8e6e3' } : {}}
                        >
                            {isDarkTheme ? <BiSun className="text-lg" /> : <BiMoon className="text-lg" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Search Overlay */}
            {showMobileSearch && (
                <div className={`md:hidden px-4 py-3 border-t-2 ${isDarkTheme ? '' : 'border-gray-200'}`} style={isDarkTheme ? { borderColor: '#e8e6e3' } : {}}>
                    <div className={`flex border-2 ${isDarkTheme ? '' : 'border-black'}`} style={isDarkTheme ? { borderColor: '#e8e6e3' } : {}}>
                        <input
                            type="search"
                            placeholder="Search products..."
                            className={`flex-1 px-3 py-2 outline-none text-sm ${isDarkTheme ? 'placeholder-gray-400' : 'text-black bg-white'}`}
                            style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3' } : {}}
                            autoFocus
                        />
                        <button className={`px-3 py-2 ${isDarkTheme ? 'hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} transition-colors`} style={isDarkTheme ? { backgroundColor: '#e8e6e3', color: '#181a1b' } : {}}>
                            <BiSearch />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;