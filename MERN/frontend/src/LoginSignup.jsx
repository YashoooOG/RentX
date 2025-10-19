import { useState } from "react";
import { useTheme } from './App.jsx';

const LoginSignup = () => {
  const { isDarkTheme } = useTheme();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isMobileRegister, setIsMobileRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearInputFields = () => {
    setFormData({
      username: '',
      email: '',
      password: ''
    });
  };

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
    clearInputFields();
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
    clearInputFields();
  };

  const handleMobileSwitchToRegister = () => {
    setIsMobileRegister(true);
    clearInputFields();
  };

  const handleMobileSwitchToLogin = () => {
    setIsMobileRegister(false);
    clearInputFields();
  };

  return (
    <main 
      className={`flex justify-center items-center min-h-screen font-[Poppins] px-4 py-8`}
      style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3' } : { backgroundColor: '#f0f2f5', color: '#333' }}
    >
      <div
        className={`relative overflow-hidden w-full max-w-4xl min-h-[500px] rounded-lg transition-all duration-700 ease-in-out shadow-2xl
        md:w-[768px] md:min-h-[480px]
        ${isRightPanelActive ? "right-panel-active" : ""} 
        ${isMobileRegister ? "mobile-register-active" : ""}`}
        style={isDarkTheme ? { backgroundColor: '#1e2022' } : { backgroundColor: '#f5f5f5' }}
      >
        {/* Sign Up Form */}
        <div
          className={`absolute top-0 h-full flex flex-col justify-center items-center px-8 md:px-12 text-center w-full md:w-1/2 transition-all duration-700 ease-in-out
          ${isMobileRegister ? "opacity-100 z-10" : "opacity-0 z-0 md:opacity-0"}
          ${isRightPanelActive ? "md:opacity-100 md:translate-x-full md:z-10" : "md:opacity-0 md:z-0"}`}
        >
          <h1 className={`text-2xl md:text-3xl font-bold mb-6`} style={isDarkTheme ? { color: '#f5f5f5' } : { color: '#333' }}>
            Create Account
          </h1>
          
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-3 my-2 border-2 outline-none font-medium"
            style={isDarkTheme ? { 
              backgroundColor: '#1e2022', 
              color: '#f5f5f5', 
              borderColor: '#999'
            } : { 
              backgroundColor: '#e8e6e3', 
              color: '#333', 
              borderColor: '#999' 
            }}
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 my-2 border-2 outline-none font-medium"
            style={isDarkTheme ? { 
              backgroundColor: '#1e2022', 
              color: '#f5f5f5', 
              borderColor: '#999'
            } : { 
              backgroundColor: '#e8e6e3', 
              color: '#333', 
              borderColor: '#999' 
            }}
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 my-2 border-2 outline-none font-medium"
            style={isDarkTheme ? { 
              backgroundColor: '#1e2022', 
              color: '#f5f5f5', 
              borderColor: '#999'
            } : { 
              backgroundColor: '#e8e6e3', 
              color: '#333', 
              borderColor: '#999' 
            }}
          />
          
          <button 
            className="w-full md:w-auto px-8 py-3 mt-4 border-2 font-bold transition-colors"
            style={isDarkTheme ? { 
              backgroundColor: '#f5f5f5', 
              color: '#333', 
              borderColor: '#f5f5f5' 
            } : { 
              backgroundColor: 'black', 
              color: 'white', 
              borderColor: 'black' 
            }}
            onMouseEnter={(e) => {
              if (isDarkTheme) {
                e.target.style.backgroundColor = '#1e2022';
                e.target.style.color = '#f5f5f5';
              } else {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = 'black';
              }
            }}
            onMouseLeave={(e) => {
              if (isDarkTheme) {
                e.target.style.backgroundColor = '#f5f5f5';
                e.target.style.color = '#333';
              } else {
                e.target.style.backgroundColor = 'black';
                e.target.style.color = 'white';
              }
            }}
          >
            REGISTER
          </button>
          
          <button
            type="button"
            className="mt-6 underline font-medium md:hidden"
            style={isDarkTheme ? { color: '#f5f5f5' } : { color: '#555' }}
            onClick={handleMobileSwitchToLogin}
          >
            Already have an account? Login
          </button>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 h-full flex flex-col justify-center items-center px-8 md:px-12 text-center w-full md:w-1/2 transition-all duration-700 ease-in-out
          ${!isMobileRegister ? "opacity-100 z-10" : "opacity-0 z-0 md:opacity-100"}
          ${isRightPanelActive ? "md:translate-x-full md:opacity-0 md:z-0" : "md:z-10 md:opacity-100"}`}
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-6" style={isDarkTheme ? { color: '#f5f5f5' } : { color: '#333' }}>
            Login
          </h1>
          
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-3 my-2 border-2 outline-none font-medium"
            style={isDarkTheme ? { 
              backgroundColor: '#1e2022', 
              color: '#f5f5f5', 
              borderColor: '#999'
            } : { 
              backgroundColor: '#e8e6e3', 
              color: '#333', 
              borderColor: '#999' 
            }}
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 my-2 border-2 outline-none font-medium"
            style={isDarkTheme ? { 
              backgroundColor: '#1e2022', 
              color: '#f5f5f5', 
              borderColor: '#999'
            } : { 
              backgroundColor: '#e8e6e3', 
              color: '#333', 
              borderColor: '#999' 
            }}
          />
          
          <a href="#" className="text-sm my-3 hover:underline font-medium" style={isDarkTheme ? { color: '#f5f5f5' } : { color: '#555' }}>
            Forgot your password?
          </a>
          
          <button 
            className="w-full md:w-auto px-8 py-3 mt-4 border-2 font-bold transition-colors"
            style={isDarkTheme ? { 
              backgroundColor: '#f5f5f5', 
              color: '#333', 
              borderColor: '#f5f5f5' 
            } : { 
              backgroundColor: 'black', 
              color: 'white', 
              borderColor: 'black' 
            }}
            onMouseEnter={(e) => {
              if (isDarkTheme) {
                e.target.style.backgroundColor = '#1e2022';
                e.target.style.color = '#f5f5f5';
              } else {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = 'black';
              }
            }}
            onMouseLeave={(e) => {
              if (isDarkTheme) {
                e.target.style.backgroundColor = '#f5f5f5';
                e.target.style.color = '#333';
              } else {
                e.target.style.backgroundColor = 'black';
                e.target.style.color = 'white';
              }
            }}
          >
            LOGIN
          </button>
          
          <button
            type="button"
            className="mt-6 underline font-medium md:hidden"
            style={isDarkTheme ? { color: '#f5f5f5' } : { color: '#555' }}
            onClick={handleMobileSwitchToRegister}
          >
            Don't have an account? Register
          </button>
        </div>

        {/* Overlay Section - Desktop Only */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out hidden md:block z-50
          ${isRightPanelActive ? "-translate-x-full" : ""}`}
        >
          <div
            className={`absolute left-[-100%] w-[200%] h-full flex transition-transform duration-700 ease-in-out
            ${isRightPanelActive ? "translate-x-1/2" : "translate-x-0"}`}
            style={isDarkTheme ? { backgroundColor: '#f5f5f5', color: '#333' } : { backgroundColor: 'black', color: 'white' }}
          >
            {/* Overlay Left */}
            <div className="flex flex-col justify-center items-center text-center px-10 w-1/2">
              <h1 className="text-2xl font-bold mb-4" style={isDarkTheme ? { color: '#333' } : { color: 'white' }}>
                Welcome Back!
              </h1>
              <p className="mb-6 leading-relaxed" style={isDarkTheme ? { color: '#333' } : { color: '#e0e0e0' }}>
                Already have an account? Please login with your personal info
              </p>
              <button
                className="border-2 px-8 py-3 font-bold transition-colors bg-transparent"
                style={isDarkTheme ? { borderColor: '#333', color: '#333' } : { borderColor: 'white', color: 'white' }}
                onClick={handleSignInClick}
                onMouseEnter={(e) => {
                  if (isDarkTheme) {
                    e.target.style.backgroundColor = '#333';
                    e.target.style.color = '#f5f5f5';
                  } else {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = 'black';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  if (isDarkTheme) {
                    e.target.style.color = '#333';
                  } else {
                    e.target.style.color = 'white';
                  }
                }}
              >
                LOGIN
              </button>
            </div>
            
            {/* Overlay Right */}
            <div className="flex flex-col justify-center items-center text-center px-10 w-1/2">
              <h1 className="text-2xl font-bold mb-4" style={isDarkTheme ? { color: '#333' } : { color: 'white' }}>
                Hello, Welcome!
              </h1>
              <p className="mb-6 leading-relaxed" style={isDarkTheme ? { color: '#333' } : { color: '#e0e0e0' }}>
                Don't have an account? Enter your details and start your journey
              </p>
              <button
                className="border-2 px-8 py-3 font-bold transition-colors bg-transparent"
                style={isDarkTheme ? { borderColor: '#333', color: '#333' } : { borderColor: 'white', color: 'white' }}
                onClick={handleSignUpClick}
                onMouseEnter={(e) => {
                  if (isDarkTheme) {
                    e.target.style.backgroundColor = '#333';
                    e.target.style.color = '#f5f5f5';
                  } else {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = 'black';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  if (isDarkTheme) {
                    e.target.style.color = '#333';
                  } else {
                    e.target.style.color = 'white';
                  }
                }}
              >
                REGISTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginSignup;
