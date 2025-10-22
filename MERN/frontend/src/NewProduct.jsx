import { useState, useEffect } from 'react';
import { useTheme } from './App.jsx';
import { useNavigate } from 'react-router-dom';
import { BiPlus, BiMinus } from 'react-icons/bi';

const NewProduct = () => {
  const { isDarkTheme } = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [productId, setProductId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    images: [''],
    price: '',
    rate_unit: 'per_day',
    category: 'Electronics',
    customCategory: '',
    location: '',
    condition: 'New',
    availability: 'Available',
    deposit: '',
    min_rental_days: 1,
    max_rental_days: 30,
    description: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
    
    // Generate product ID
    const timestamp = Date.now();
    setProductId(`PROD-${timestamp}`);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        images: newImages
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validation
    if (!formData.name || !formData.price || !formData.location || !formData.description) {
      setMessage('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    // Filter out empty image URLs
    const validImages = formData.images.filter(img => img.trim() !== '');
    if (validImages.length === 0) {
      setMessage('Please add at least one image URL');
      setIsLoading(false);
      return;
    }

    try {
      const finalCategory = formData.category === 'Other' && formData.customCategory 
        ? formData.customCategory 
        : formData.category;

      const productData = {
        ...formData,
        category: finalCategory,
        images: validImages,
        price: parseFloat(formData.price),
        deposit: parseFloat(formData.deposit) || 0,
        min_rental_days: parseInt(formData.min_rental_days),
        max_rental_days: parseInt(formData.max_rental_days),
        seller: user.username,
        userId: user.id,
        posted_at: new Date().toISOString()
      };

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Product listed successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setMessage(data.message || 'Failed to add product');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (!user) return null;

  return (
    <div 
      className="min-h-screen font-[Poppins] p-4 md:p-6"
      style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3' } : { backgroundColor: '#f0f2f5', color: '#333' }}
    >
      <div className="max-w-4xl mx-auto">
        {message && (
          <div className={`mb-4 px-4 py-2 rounded ${
            message.includes('successfully') ? 'bg-green-500' : 'bg-red-500'
          } text-white text-center`}>
            {message}
          </div>
        )}

        <div 
          className="rounded-lg shadow-lg p-4 md:p-8"
          style={isDarkTheme ? { backgroundColor: '#1e2022' } : { backgroundColor: 'white' }}
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Add New Product</h1>

          <form onSubmit={handleSubmit}>
            {/* Top Section - Read Only Fields */}
            <div className="mb-6 pb-6 border-b-2" style={isDarkTheme ? { borderColor: '#999' } : { borderColor: '#ddd' }}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product ID</label>
                  <input
                    type="text"
                    value={productId}
                    className="w-full px-3 py-2 border-2 rounded-md opacity-70"
                    style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : { borderColor: '#999' }}
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Seller Name</label>
                  <input
                    type="text"
                    value={user.username}
                    className="w-full px-3 py-2 border-2 rounded-md opacity-70"
                    style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : { borderColor: '#999' }}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 rounded-md outline-none"
                    style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : { borderColor: '#999' }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 rounded-md outline-none"
                    style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : { borderColor: '#999' }}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Property">Property</option>
                    <option value="Tools">Tools</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {formData.category === 'Other' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Custom Category *</label>
                    <input
                      type="text"
                      name="customCategory"
                      value={formData.customCategory}
                      onChange={handleInputChange}
                      placeholder="Enter your category"
                      className="w-full px-3 py-2 border-2 rounded-md outline-none"
                      style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : { borderColor: '#999' }}
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 rounded-md outline-none"
                    style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : { borderColor: '#999' }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Rate Unit</label>
                  <select
                    name="rate_unit"
                    value={formData.rate_unit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 rounded-md outline-none"
                    style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : { borderColor: '#999' }}
                  >
                    <option value="per_day">Per Day</option>
                    <option value="per_week">Per Week</option>
                    <option value="per_month">Per Month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Deposit Amount</label>
                  <input
                    type="number"
                    name="deposit"
                    value={formData.deposit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 rounded-md outline-none"
                    style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : { borderColor: '#999' }}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, State"
                    className="w-full px-3 py-2 border-2 rounded-md outline-none"
                    style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : { borderColor: '#999' }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 rounded-md outline-none"
                    style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : { borderColor: '#999' }}
                  >
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Refurbished">Refurbished</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Min Days</label>
                    <input
                      type="number"
                      name="min_rental_days"
                      value={formData.min_rental_days}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-md outline-none"
                      style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : { borderColor: '#999' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Max Days</label>
                    <input
                      type="number"
                      name="max_rental_days"
                      value={formData.max_rental_days}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-md outline-none"
                      style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : { borderColor: '#999' }}
                    />
                  </div>
                </div>

                {/* Dynamic Image URLs */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">Image URLs *</label>
                    <button
                      type="button"
                      onClick={addImageField}
                      className="flex items-center gap-1 px-2 py-1 text-sm border rounded"
                      style={isDarkTheme ? { borderColor: '#999', color: '#e8e6e3' } : { borderColor: '#999' }}
                    >
                      <BiPlus /> Add
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="url"
                          value={image}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          placeholder={`Image URL ${index + 1}`}
                          className="flex-1 px-3 py-2 border-2 rounded-md outline-none"
                          style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : { borderColor: '#999' }}
                        />
                        {formData.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeImageField(index)}
                            className="px-2 py-1 border-2 rounded-md"
                            style={isDarkTheme ? { borderColor: '#999', color: '#e8e6e3' } : { borderColor: '#999' }}
                          >
                            <BiMinus />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description - Full Width */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border-2 rounded-md outline-none"
                style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : { borderColor: '#999' }}
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 font-bold border-2 transition-colors disabled:opacity-50"
                style={isDarkTheme ? { 
                  backgroundColor: '#f5f5f5', 
                  color: '#333', 
                  borderColor: '#f5f5f5' 
                } : { 
                  backgroundColor: 'black', 
                  color: 'white', 
                  borderColor: 'black' 
                }}
              >
                {isLoading ? 'Adding Product...' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-3 font-bold border-2 transition-colors"
                style={isDarkTheme ? { 
                  backgroundColor: '#1e2022', 
                  color: '#e8e6e3', 
                  borderColor: '#999' 
                } : { 
                  backgroundColor: 'white', 
                  color: 'black', 
                  borderColor: '#999' 
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
