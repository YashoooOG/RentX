import { useState, useEffect } from 'react';
import { useTheme } from './App.jsx';
import { useNavigate } from 'react-router-dom';
import { BiUser, BiHistory, BiListUl, BiPlus } from 'react-icons/bi';

const UserDashboard = () => {
  const { isDarkTheme } = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('userInfo');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [myListings, setMyListings] = useState([]);
  const [rentalHistory, setRentalHistory] = useState([]);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditData(parsedUser);
      calculateCompletion(parsedUser);
      fetchMyListings(parsedUser.id);
      fetchRentalHistory(parsedUser.id);
    }
  }, []);

  const calculateCompletion = (userData) => {
    const fields = [
      'username', 'email', 'password', 'firstName', 'lastName', 
      'phoneNumber', 'address', 'city', 'zipCode', 'dateOfBirth'
    ];
    const filledFields = fields.filter(field => userData[field] && userData[field] !== '').length;
    const percentage = Math.round((filledFields / fields.length) * 100);
    setCompletionPercentage(percentage);
  };

  const fetchMyListings = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setMyListings(data.products || []);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const fetchRentalHistory = async (userId) => {
    // Mock data for now - implement actual API later
    setRentalHistory([
      { id: 1, productName: 'MacBook Pro 2021', rentedOn: '2024-01-15', returnedOn: '2024-01-20', amount: 3000 },
      { id: 2, productName: 'Canon EOS R5', rentedOn: '2024-01-10', returnedOn: '2024-01-12', amount: 1500 }
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMessage('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(user);
    setMessage('');
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`http://localhost:5000/api/user/profile/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setEditData(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsEditing(false);
        setMessage('Profile updated successfully!');
        calculateCompletion(data.user);
      } else {
        setMessage(data.message || 'Update failed');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAvailability = async (productId, currentAvailability) => {
    try {
      const newAvailability = currentAvailability === 'Available' ? 'Not Available' : 'Available';
      
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availability: newAvailability }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the listing in state
        setMyListings(prevListings => 
          prevListings.map(item => 
            item.id === productId ? { ...item, availability: newAvailability } : item
          )
        );
        setMessage(`Product ${newAvailability.toLowerCase()}`);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message || 'Failed to update availability');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Please login to view your dashboard</div>
      </div>
    );
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div 
      className="min-h-screen font-[Poppins] p-4 md:p-6"
      style={isDarkTheme ? { backgroundColor: '#181a1b', color: '#e8e6e3' } : { backgroundColor: '#f0f2f5', color: '#333' }}
    >
      <div className="max-w-6xl mx-auto">
        {message && (
          <div className={`mb-4 px-4 py-2 rounded ${
            message.includes('successfully') ? 'bg-green-500' : 'bg-red-500'
          } text-white text-center`}>
            {message}
          </div>
        )}

        {/* Profile Header Section */}
        <div 
          className="rounded-lg shadow-lg p-6 md:p-8 mb-6"
          style={isDarkTheme ? { backgroundColor: '#1e2022' } : { backgroundColor: 'white' }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Photo and Info */}
            <div className="flex flex-col md:flex-row items-center gap-6 flex-1">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-300 flex items-center justify-center">
                {user.profilePhoto ? (
                  <img src={user.profilePhoto} alt="Profile" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover" />
                ) : (
                  <span className="text-3xl md:text-4xl text-gray-600">
                    {user.firstName ? user.firstName.charAt(0) : user.username.charAt(0)}
                  </span>
                )}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold mb-1">
                  {user.firstName || user.lastName ? `${user.firstName} ${user.lastName}` : user.username}
                </h2>
                <p className="text-base md:text-lg opacity-80 mb-2">@{user.username}</p>
                <p className="text-xs md:text-sm opacity-60">Member since {new Date(user.memberSince || user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Completion Circle */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 md:w-36 md:h-36">
                <svg className="transform -rotate-90 w-full h-full">
                  {/* Background circle */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke={isDarkTheme ? '#3a3a3a' : '#e5e5e5'}
                    strokeWidth="8"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke={completionPercentage === 100 ? '#10b981' : isDarkTheme ? '#e8e6e3' : '#000'}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold">{completionPercentage}%</span>
                  <span className="text-xs opacity-70">Complete</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('userInfo')}
              className={`flex items-center gap-2 px-6 py-3 border-2 font-medium transition-colors ${
                activeTab === 'userInfo' ? 'font-bold' : ''
              }`}
              style={activeTab === 'userInfo' 
                ? (isDarkTheme 
                  ? { backgroundColor: '#e8e6e3', color: '#181a1b', borderColor: '#e8e6e3' }
                  : { backgroundColor: '#000', color: '#fff', borderColor: '#000' })
                : (isDarkTheme
                  ? { backgroundColor: '#1e2022', color: '#e8e6e3', borderColor: '#999' }
                  : { backgroundColor: '#fff', color: '#000', borderColor: '#999' })
              }
            >
              <BiUser className="text-xl" />
              <span>User Info</span>
            </button>
            
            <button
              onClick={() => setActiveTab('rentalHistory')}
              className={`flex items-center gap-2 px-6 py-3 border-2 font-medium transition-colors ${
                activeTab === 'rentalHistory' ? 'font-bold' : ''
              }`}
              style={activeTab === 'rentalHistory' 
                ? (isDarkTheme 
                  ? { backgroundColor: '#e8e6e3', color: '#181a1b', borderColor: '#e8e6e3' }
                  : { backgroundColor: '#000', color: '#fff', borderColor: '#000' })
                : (isDarkTheme
                  ? { backgroundColor: '#1e2022', color: '#e8e6e3', borderColor: '#999' }
                  : { backgroundColor: '#fff', color: '#000', borderColor: '#999' })
              }
            >
              <BiHistory className="text-xl" />
              <span>My Rental History</span>
            </button>
            
            <button
              onClick={() => setActiveTab('myListings')}
              className={`flex items-center gap-2 px-6 py-3 border-2 font-medium transition-colors ${
                activeTab === 'myListings' ? 'font-bold' : ''
              }`}
              style={activeTab === 'myListings' 
                ? (isDarkTheme 
                  ? { backgroundColor: '#e8e6e3', color: '#181a1b', borderColor: '#e8e6e3' }
                  : { backgroundColor: '#000', color: '#fff', borderColor: '#000' })
                : (isDarkTheme
                  ? { backgroundColor: '#1e2022', color: '#e8e6e3', borderColor: '#999' }
                  : { backgroundColor: '#fff', color: '#000', borderColor: '#999' })
              }
            >
              <BiListUl className="text-xl" />
              <span>My Listings</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div 
          className="rounded-lg shadow-lg p-4 md:p-8"
          style={isDarkTheme ? { backgroundColor: '#1e2022' } : { backgroundColor: 'white' }}
        >
          {/* User Info Tab */}
          {activeTab === 'userInfo' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-6">Personal Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={editData.firstName || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md"
                          style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : {}}
                        />
                      ) : (
                        <p className="px-3 py-2 border rounded-md opacity-70" style={isDarkTheme ? { borderColor: '#999' } : {}}>
                          {user.firstName || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="lastName"
                          value={editData.lastName || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md"
                          style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : {}}
                        />
                      ) : (
                        <p className="px-3 py-2 border rounded-md opacity-70" style={isDarkTheme ? { borderColor: '#999' } : {}}>
                          {user.lastName || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <p className="px-3 py-2 border rounded-md opacity-70" style={isDarkTheme ? { borderColor: '#999' } : {}}>
                        {user.email}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={editData.phoneNumber || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md"
                          style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : {}}
                        />
                      ) : (
                        <p className="px-3 py-2 border rounded-md opacity-70" style={isDarkTheme ? { borderColor: '#999' } : {}}>
                          {user.phoneNumber || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={editData.dateOfBirth || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md"
                          style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : {}}
                        />
                      ) : (
                        <p className="px-3 py-2 border rounded-md opacity-70" style={isDarkTheme ? { borderColor: '#999' } : {}}>
                          {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Address Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Address</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={editData.address || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md"
                          style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : {}}
                        />
                      ) : (
                        <p className="px-3 py-2 border rounded-md opacity-70" style={isDarkTheme ? { borderColor: '#999' } : {}}>
                          {user.address || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={editData.city || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md"
                          style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : {}}
                        />
                      ) : (
                        <p className="px-3 py-2 border rounded-md opacity-70" style={isDarkTheme ? { borderColor: '#999' } : {}}>
                          {user.city || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Zip Code</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="zipCode"
                          value={editData.zipCode || ''}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md"
                          style={isDarkTheme ? { backgroundColor: '#1e2022', borderColor: '#999', color: '#f5f5f5' } : {}}
                        />
                      ) : (
                        <p className="px-3 py-2 border rounded-md opacity-70" style={isDarkTheme ? { borderColor: '#999' } : {}}>
                          {user.zipCode || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="px-6 py-2 font-bold border-2 transition-colors"
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
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Rental History Tab */}
          {activeTab === 'rentalHistory' && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-6">My Rental History</h2>
              
              {rentalHistory.length === 0 ? (
                <p className="text-center opacity-70 py-8">No rental history yet</p>
              ) : (
                <div className="space-y-4">
                  {rentalHistory.map((rental) => (
                    <div 
                      key={rental.id}
                      className="border-2 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                      style={isDarkTheme ? { borderColor: '#999' } : { borderColor: '#ddd' }}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{rental.productName}</h3>
                        <p className="text-sm opacity-70">Rented: {new Date(rental.rentedOn).toLocaleDateString()}</p>
                        <p className="text-sm opacity-70">Returned: {new Date(rental.returnedOn).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{rental.amount}</p>
                        <p className="text-sm text-green-500">Completed</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* My Listings Tab */}
          {activeTab === 'myListings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold">My Listings</h2>
                <button
                  onClick={() => navigate('/add-product')}
                  className="flex items-center gap-2 px-4 py-2 font-bold border-2 transition-colors"
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
                  <BiPlus className="text-xl" />
                  Add Item
                </button>
              </div>
              
              {myListings.length === 0 ? (
                <p className="text-center opacity-70 py-8">No listings yet. Click "Add Item" to create your first listing!</p>
              ) : (
                <div className="space-y-4">
                  {myListings.map((item) => (
                    <div 
                      key={item.id}
                      className="border-2 rounded-lg p-4 flex flex-col md:flex-row gap-4"
                      style={isDarkTheme ? { borderColor: '#999' } : { borderColor: '#ddd' }}
                    >
                      {/* Product Image */}
                      <div className="w-full md:w-32 h-32 flex-shrink-0">
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                          <p className="text-sm opacity-70 mb-2">{item.category} • {item.location}</p>
                          <p className="text-sm opacity-80 line-clamp-2">{item.description}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="text-sm px-2 py-1 rounded" style={isDarkTheme ? { backgroundColor: '#3a3a3a' } : { backgroundColor: '#f0f0f0' }}>
                            {item.condition}
                          </span>
                          <span className="text-sm px-2 py-1 rounded" style={isDarkTheme ? { backgroundColor: '#3a3a3a' } : { backgroundColor: '#f0f0f0' }}>
                            Min: {item.min_rental_days} days
                          </span>
                        </div>
                      </div>

                      {/* Price and Availability Toggle */}
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:w-48 flex-shrink-0">
                        <div className="text-left md:text-right">
                          <p className="font-bold text-xl">₹{item.price}</p>
                          <p className="text-sm opacity-70">/ {item.rate_unit}</p>
                        </div>

                        {/* Availability Toggle Switch */}
                        <div className="flex flex-col items-center gap-2">
                          <button
                            onClick={() => handleToggleAvailability(item.id, item.availability)}
                            className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none"
                            style={{
                              backgroundColor: item.availability === 'Available' 
                                ? '#10b981' 
                                : isDarkTheme ? '#666' : '#ccc'
                            }}
                          >
                            <span
                              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                item.availability === 'Available' ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <span className={`text-xs font-medium ${
                            item.availability === 'Available' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {item.availability === 'Available' ? 'Available' : 'Not Available'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
