const User = require('../models/User');

const getUserProfile = (req, res) => {
  try {
    const { userId } = req.params;
    const user = User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't send password
    const { password, ...userProfile } = user;
    res.status(200).json({ user: userProfile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateUserProfile = (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    
    const user = User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data (excluding sensitive fields)
    const allowedFields = [
      'firstName', 'lastName', 'phoneNumber', 'address', 'city', 
      'state', 'zipCode', 'profilePhoto', 'dateOfBirth', 'occupation',
      'preferredRentalType', 'maxBudget'
    ];

    allowedFields.forEach(field => {
      if (updateData[field] !== undefined) {
        user[field] = updateData[field];
      }
    });

    const updatedUser = new User(user);
    updatedUser.save();

    // Don't send password
    const { password, ...userProfile } = updatedUser;
    res.status(200).json({ 
      message: 'Profile updated successfully',
      user: userProfile 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile };
