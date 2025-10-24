import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from './App.jsx';

const MainPage = () => {
  const { isDarkTheme } = useTheme();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("Any");

  useEffect(() => {
    // Fetch products from backend
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        const prods = data.products || [];
        setProducts(prods);

        // Get unique categories
        const cats = Array.from(new Set(prods.map(p => p.category))).filter(Boolean);
        setCategories(["All", ...cats]);

        // Unique cities (from location, take first part before comma or first word)
        const cityList = Array.from(new Set(
          prods
            .map(p => (p.location || '').split(',')[0].trim())
            .filter(Boolean)
        ));
        setCities(["Any", ...cityList]);
      });
  }, []);

  const filteredProducts = products.filter(p => {
    const catMatch = selectedCategory === "All" || p.category === selectedCategory;
    const cityMatch = selectedCity === "Any" || (p.location && p.location.startsWith(selectedCity));
    return catMatch && cityMatch;
  });

  return (
    <div
      className="min-h-screen font-[Poppins] flex justify-center"
      style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3' } : { backgroundColor: '#f0f2f5', color: '#333' }}
    >
      <div
        className="w-full lg:w-[95%] max-w-7xl px-1 md:px-7 py-8 shadow-2xl border"
        style={isDarkTheme
          ? { backgroundColor: '#23272b', color: '#e8e6e3', borderColor: '#222' }
          : { backgroundColor: '#fff', color: '#222', borderColor: '#e5e7eb' }
        }
      >
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center mb-6">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <span className="font-semibold">Category:</span>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 shadow-sm"
              style={isDarkTheme ? { backgroundColor: '#1e2022', color: '#e8e6e3', borderColor: '#444' } : { borderColor: '#ccc' }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {/* City Dropdown */}
          <div className="flex items-center gap-2">
            <span className="font-semibold">City:</span>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 shadow-sm"
              style={isDarkTheme ? { backgroundColor: '#1e2022', color: '#e8e6e3', borderColor: '#444' } : { borderColor: '#ccc' }}
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Centered Thin Line */}
        <div className="flex justify-center my-4">
          <div
            style={{
              width: "90%",
              borderBottom: isDarkTheme ? "2px solid #444" : "2px solid #ccc",
              margin: "0 auto"
            }}
          />
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center opacity-70 py-12">No products found.</div>
          ) : (
            filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="block cursor-pointer w-full"
              >
                <div
                  className="border overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={isDarkTheme
                    ? { backgroundColor: '#1e2022', borderColor: '#333' }
                    : { backgroundColor: 'white', borderColor: '#ddd' }
                  }
                >
                  {/* Image Container */}
                  <div
                    className="w-full h-60 overflow-hidden flex justify-center items-center"
                    style={{ backgroundColor: '#ecececff' }}
                  >
                    <img
                      src={product.images && product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-3">
                    <h3
                      className="text-lg font-bold mb-1 line-clamp-1"
                      style={isDarkTheme ? { color: '#e8e6e3' } : { color: '#000' }}
                    >
                      {product.name}
                    </h3>
                    <h4
                      className="text-base font-semibold mb-2"
                      style={isDarkTheme ? { color: '#e8e6e3' } : { color: '#1a1a1a' }}
                    >
                      ₹{product.price} <span className="text-xs font-normal opacity-70">/ {product.rate_unit.replace('_', ' ')}</span>
                    </h4>
                    
                    {/* Bottom Info */}
                    <div
                      className="flex justify-between items-center text-xs pt-2 border-t"
                      style={isDarkTheme ? { color: '#999', borderColor: '#333' } : { color: '#666', borderColor: '#eee' }}
                    >
                      <p className="truncate flex-1">{product.location}</p>
                      <p className="ml-2 truncate">{product.seller}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;