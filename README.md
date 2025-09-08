RentX – Online Rental Management System

RentX is a web-based rental management system designed to simplify the process of listing and renting products online. It provides an intuitive platform where product owners can list items for rent and renters can browse, rent, and manage their rentals easily.

🌟 Features

User Registration and Login

Role-Based Access (Owner / Renter)

Product Listing and Management by Owners

Product Browsing and Searching by Renters

Simulated Payment Flow for Rentals

Rental History Tracking for Owners and Renters

Basic Security with Password Hashing

Responsive UI Design using React

⚙️ Tech Stack

Frontend: HTML, CSS, JavaScript, React.js

Backend: Node.js, Express.js

Database: JSON (Prototype) / MongoDB (Future Implementation)

Tools: Git, GitHub, Visual Studio Code, Figma (for UI/UX Design)

Deployment: Netlify (Frontend), Heroku / Render (Backend)

🚀 Getting Started
Prerequisites

Node.js installed on your system

Git installed for version control

Installation

Clone the repository:

git clone https://github.com/yourusername/RentX.git


Navigate to the project directory:

cd RentX


Install dependencies:

npm install


Run the development server:

npm start


Open the browser and visit:

http://localhost:3000

🧱 Project Structure
RentX/
│
├── backend/                  # Backend server (Node.js + Express)
│   ├── routes/               # API endpoints
│   └── models/               # Data models (future database)
│
├── frontend/                 # React frontend code
│   ├── components/           # Reusable UI components
│   ├── pages/                # Application pages
│   └── styles/               # CSS files
│
├── data/                     # Prototype JSON files (users.json, products.json)
│
├── public/                   # Static assets
│
├── .gitignore                # Git ignore configuration
├── package.json              # Node dependencies
└── README.md                 # Project overview

📈 Commit History

We used GitHub for version control and collaboration.
The commit graph provides a clear history of development progress, showing feature additions, bug fixes, and system improvements made by the team.

🎯 Future Scope

Integration of a real database (MongoDB or MySQL)

Payment gateway integration (Stripe, PayPal)

Direct communication between owners and renters

Admin dashboard for management

Deployment on cloud platforms for full production readiness
