const bcrypt = require('bcryptjs');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Registration attempt:', { username, email, password: '***' });

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = User.findByEmail(email) || User.findByUsername(username);
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists with this email or username' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Password hashed successfully');

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    newUser.save();
    console.log('User saved to JSON file:', { id: newUser.id, username: newUser.username });

    res.status(201).json({ 
      message: 'User registered successfully',
      user: { 
        id: newUser.id, 
        username: newUser.username, 
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user by username or email
    const user = User.findByUsername(username) || User.findByEmail(username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
        profilePhoto: user.profilePhoto,
        dateOfBirth: user.dateOfBirth,
        occupation: user.occupation,
        preferredRentalType: user.preferredRentalType,
        maxBudget: user.maxBudget,
        isVerified: user.isVerified,
        memberSince: user.memberSince
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register, login };
