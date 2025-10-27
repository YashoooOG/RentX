# RentX - Property Rental Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for property rentals with dark mode support.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend](#frontend)
- [Backend](#backend)
- [Data Flow](#data-flow)
- [Dark Mode Implementation](#dark-mode-implementation)
- [Installation & Setup](#installation--setup)

---

## 🎯 Project Overview

RentX is a property rental platform that allows users to browse, search, and rent properties. The application features user authentication, property listings, booking management, and a responsive UI with dark mode support.

---

## 🛠 Tech Stack

### Frontend
- **React.js** - UI Library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP requests
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM (Object Data Modeling)

---

## 📁 Project Structure

```
D:\2nd year\RentX\
├── MERN/
│   ├── frontend/          # React application
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/    # Reusable components
│   │   │   ├── pages/         # Page components
│   │   │   ├── context/       # Context API (Dark Mode)
│   │   │   ├── services/      # API calls
│   │   │   ├── App.js         # Main app component
│   │   │   └── index.js       # Entry point
│   │   └── package.json
│   └── backend/           # Node.js/Express server
│       ├── models/        # Mongoose schemas
│       ├── routes/        # API routes
│       ├── controllers/   # Route handlers
│       ├── middleware/    # Custom middleware
│       ├── config/        # Configuration files
│       ├── server.js      # Entry point
│       └── package.json
└── README.md
```

---

## 🎨 Frontend

### Pages & Routing

#### 1. **Home Page** (`/`)
- Hero section with search functionality
- Featured properties
- Categories section
- Call-to-action sections

#### 2. **Properties Page** (`/properties`)
- Property listings grid
- Filters (price, location, type)
- Search functionality
- Pagination

#### 3. **Property Details Page** (`/property/:id`)
- Detailed property information
- Image gallery
- Amenities list
- Booking form
- Location map

#### 4. **Login Page** (`/login`)
- User authentication form
- Email & password fields
- Redirect to dashboard after login

#### 5. **Register Page** (`/register`)
- User registration form
- Name, email, password fields
- Form validation

#### 6. **Dashboard** (`/dashboard`)
- User profile
- Booking history
- Saved properties
- Account settings

#### 7. **Add Property** (`/add-property`) - Admin/Owner
- Property creation form
- Image upload
- Property details input

### Component Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation with dark mode toggle
│   ├── Footer.jsx          # Footer section
│   ├── PropertyCard.jsx    # Individual property card
│   ├── SearchBar.jsx       # Search component
│   ├── Filter.jsx          # Filter component
│   └── DarkModeToggle.jsx  # Dark mode switch
├── pages/
│   ├── Home.jsx
│   ├── Properties.jsx
│   ├── PropertyDetails.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   └── AddProperty.jsx
└── App.js                  # Routes configuration
```

### Routing Configuration (App.js)

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/properties" element={<Properties />} />
    <Route path="/property/:id" element={<PropertyDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/add-property" element={<AddProperty />} />
  </Routes>
</BrowserRouter>
```

### Frontend Dependencies

```json
{
  "dependencies": {
    "react": "^18.x.x",              // Core library
    "react-dom": "^18.x.x",          // DOM rendering
    "react-router-dom": "^6.x.x",   // Routing
    "axios": "^1.x.x"                // HTTP client
  }
}
```

**Dependency Explanations:**
- **react**: Core library for building UI components
- **react-dom**: Renders React components to the DOM
- **react-router-dom**: Enables navigation between pages without page reload
- **axios**: Makes HTTP requests to backend API with promise-based syntax

---

## ⚙️ Backend

### Server Architecture

#### Entry Point (server.js)
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());                    // Enable CORS
app.use(express.json());            // Parse JSON
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);

app.listen(5000);
```

### Backend Dependencies

```json
{
  "dependencies": {
    "express": "^4.x.x",           // Web framework
    "mongoose": "^7.x.x",          // MongoDB ODM
    "cors": "^2.x.x",              // Cross-origin resource sharing
    "dotenv": "^16.x.x",           // Environment variables
    "bcryptjs": "^2.x.x",          // Password hashing
    "jsonwebtoken": "^9.x.x",      // JWT authentication
    "multer": "^1.x.x",            // File upload
    "validator": "^13.x.x"         // Input validation
  },
  "devDependencies": {
    "nodemon": "^3.x.x"            // Auto-restart server
  }
}
```

**Dependency Explanations:**
- **express**: Minimalist web framework for creating RESTful APIs
- **mongoose**: Object Data Modeling (ODM) library for MongoDB, provides schema validation
- **cors**: Middleware to enable Cross-Origin Resource Sharing (allows frontend to communicate with backend)
- **dotenv**: Loads environment variables from .env file (database URI, JWT secret, etc.)
- **bcryptjs**: Hashes passwords before storing in database for security
- **jsonwebtoken**: Creates and verifies JSON Web Tokens for user authentication
- **multer**: Handles multipart/form-data for file uploads (property images)
- **validator**: Validates and sanitizes user input (emails, URLs, etc.)
- **nodemon**: Development tool that auto-restarts server on file changes

### Database Models (Mongoose Schemas)

#### User Model
```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'owner', 'admin'] },
  createdAt: { type: Date, default: Date.now }
});
```

#### Property Model
```javascript
const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  type: String,
  images: [String],
  amenities: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
```

#### Booking Model
```javascript
const bookingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'] }
});
```

### API Routes

#### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile (protected)

#### Property Routes (`/api/properties`)
- `GET /` - Get all properties
- `GET /:id` - Get single property
- `POST /` - Create property (protected, owner only)
- `PUT /:id` - Update property (protected)
- `DELETE /:id` - Delete property (protected)

#### Booking Routes (`/api/bookings`)
- `GET /` - Get user bookings (protected)
- `POST /` - Create booking (protected)
- `PUT /:id` - Update booking (protected)
- `DELETE /:id` - Cancel booking (protected)

### Middleware

#### Authentication Middleware
```javascript
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
```

---

## 🔄 Data Flow

### Complete Request-Response Cycle

#### Example: Fetching Properties

1. **User Action**: User navigates to `/properties` page
2. **Frontend**: 
   - React Router renders `Properties.jsx` component
   - `useEffect` hook triggers on component mount
   - Axios makes GET request: `axios.get('http://localhost:5000/api/properties')`
3. **Backend**:
   - Express receives request at `GET /api/properties`
   - Route handler calls controller function
   - Controller queries MongoDB using Mongoose: `Property.find()`
   - Database returns property documents
   - Controller sends JSON response
4. **Frontend**:
   - Axios receives response
   - React updates state with property data
   - Component re-renders displaying properties
   - User sees property cards on screen

#### Example: User Login

1. **User Action**: Submits login form
2. **Frontend**:
   ```javascript
   const response = await axios.post('/api/auth/login', {
     email: email,
     password: password
   });
   localStorage.setItem('token', response.data.token);
   ```
3. **Backend**:
   - Express receives POST request
   - Validator checks email format
   - Controller finds user in database
   - Bcryptjs compares password hash
   - JWT creates authentication token
   - Sends token to frontend
4. **Frontend**:
   - Stores token in localStorage
   - Redirects to dashboard
   - Includes token in subsequent requests via Authorization header

#### Example: Creating a Booking

1. **Frontend**: User fills booking form and submits
2. **Request**: 
   ```javascript
   axios.post('/api/bookings', bookingData, {
     headers: { Authorization: `Bearer ${token}` }
   })
   ```
3. **Backend**:
   - Authentication middleware verifies token
   - Extracts user ID from token
   - Controller creates booking in database
   - Links booking to user and property (MongoDB references)
4. **Response**: Confirmation sent to frontend
5. **Frontend**: Updates UI, shows success message

---

## 🌓 Dark Mode Implementation

### Context API Setup

#### DarkModeContext.js
```javascript
import { createContext, useState, useEffect } from 'react';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  // Check localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Save preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    // Apply dark class to body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
```

### Using Dark Mode in Components

#### App.js Wrapper
```javascript
import { DarkModeProvider } from './context/DarkModeContext';

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        {/* Routes */}
      </BrowserRouter>
    </DarkModeProvider>
  );
}
```

#### Navbar Component
```javascript
import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <nav className={darkMode ? 'dark' : 'light'}>
      <button onClick={toggleDarkMode}>
        {darkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}
```

### CSS Implementation

#### styles.css
```css
/* Light mode (default) */
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
  --card-bg: #f5f5f5;
}

/* Dark mode */
.dark-mode {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
  --card-bg: #2d2d2d;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.card {
  background-color: var(--card-bg);
}
```

**How It Works:**
1. Context stores dark mode state globally
2. Toggle button updates state
3. State change triggers useEffect
4. CSS class added/removed from body
5. CSS variables update colors throughout app
6. Preference saved to localStorage for persistence

---

## 🔌 Frontend-Backend Connection

### API Service Layer (api.js)

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
export const getProperties = () => api.get('/properties');
export const getProperty = (id) => api.get(`/properties/${id}`);
export const createBooking = (data) => api.post('/bookings', data);
export const login = (credentials) => api.post('/auth/login', credentials);
```

### CORS Configuration (Backend)

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',  // Frontend URL
  credentials: true
}));
```

**Connection Flow:**
1. Frontend runs on `localhost:3000` (React dev server)
2. Backend runs on `localhost:5000` (Express server)
3. CORS middleware allows cross-origin requests
4. Axios sends HTTP requests with base URL
5. Interceptor adds auth token automatically
6. Backend processes request and sends response
7. Frontend receives data and updates UI

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd "D:\2nd year\RentX\MERN\backend"
npm install
```

Create `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/rentx
JWT_SECRET=your_secret_key_here
PORT=5000
```

Start server:
```bash
npm run dev    # with nodemon
# or
npm start      # without nodemon
```

### Frontend Setup

```bash
cd "D:\2nd year\RentX\MERN\frontend"
npm install
npm start
```

The application will open at `http://localhost:3000`

---

## 🚀 Features

- ✅ User Authentication (Register/Login)
- ✅ Property Listings with Search & Filters
- ✅ Property Details Page
- ✅ Booking System
- ✅ User Dashboard
- ✅ Dark Mode Toggle
- ✅ Responsive Design
- ✅ Protected Routes
- ✅ Image Upload for Properties
- ✅ Real-time Data Updates

---

## 📝 Key Concepts

### State Management
- **React useState**: Local component state
- **Context API**: Global state (dark mode, user authentication)
- **localStorage**: Persistent storage (tokens, preferences)

### Authentication Flow
1. User registers/logs in
2. Backend generates JWT token
3. Frontend stores token
4. Token sent with protected requests
5. Backend verifies token
6. Access granted/denied

### Database Relationships
- Users → Properties (one-to-many)
- Users → Bookings (one-to-many)
- Properties → Bookings (one-to-many)

---

## 🎓 Learning Points

By studying this project, you'll understand:

1. **Full-stack Architecture**: How frontend and backend communicate
2. **RESTful API Design**: CRUD operations with proper HTTP methods
3. **Database Modeling**: Schema design with Mongoose
4. **Authentication**: JWT-based secure authentication
5. **State Management**: React Context API for global state
6. **Routing**: Client-side routing with React Router
7. **Styling**: CSS variables and theming
8. **File Upload**: Handling multipart form data
9. **Error Handling**: Try-catch blocks and error responses
10. **Security**: Password hashing, token verification, input validation

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Author

Developed as a learning project for understanding MERN stack development.

