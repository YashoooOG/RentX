// --- FORM SLIDING ANIMATION (for Desktop) ---

// Get the buttons and the main container from the HTML
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const registerButton = document.getElementById('registerButton');
const container = document.getElementById('container');

// Function to clear all input fields
const clearInputFields = () => {
    const inputs = document.querySelectorAll('.form-container input');
    inputs.forEach(input => input.value = '');
};

// Load accounts data
let accounts = { users: [] };

async function loadAccounts() {
    try {
        const response = await fetch('accounts.json');
        accounts = await response.json();
    } catch (error) {
        console.error('Error loading accounts:', error);
        accounts = { users: [] };
    }
}

// Load accounts when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadAccounts();
});

// Add a 'click' event listener to the "Register" button in the overlay
if (signUpButton) {
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
        clearInputFields();
    });
}

// Add a 'click' event listener to the "Login" button in the overlay
if (signInButton) {
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
        clearInputFields();
    });
}

// Add a 'click' event listener to the main "Register" button
if (registerButton) {
    registerButton.addEventListener('click', (event) => {
        event.preventDefault();
        
        const username = document.querySelector('.sign-up-container input[placeholder="Username"]').value;
        const email = document.querySelector('.sign-up-container input[placeholder="Email"]').value;
        const password = document.querySelector('.sign-up-container input[placeholder="Password"]').value;

        if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        // Check if username or email already exists
        const existingUser = accounts.users.find(user => 
            user.username === username || user.email === email
        );

        if (existingUser) {
            alert('Username or email already exists!');
            return;
        }

        // Create new user (in a real app, you'd save this to a database)
        const newUser = {
            id: accounts.users.length + 1,
            username: username,
            email: email,
            password: password, // In real app, this should be hashed
            fullName: username, // Default to username, can be updated later
            phone: '',
            location: '',
            joinDate: new Date().toISOString().split('T')[0],
            avatar: 'images/default-avatar.png',
            rentHistory: [],
            wishlist: [],
            profileCompletion: 40
        };

        // Save to localStorage (simulating account creation)
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        alert('Account created successfully!');
        window.location.href = 'mainpage.html';
    });
}

// Add login functionality
const loginButton = document.getElementById('loginButton');
if (loginButton) {
    loginButton.addEventListener('click', async (event) => {
        event.preventDefault();
        
        const username = document.querySelector('.sign-in-container input[placeholder="Username"]').value;
        const password = document.querySelector('.sign-in-container input[placeholder="Password"]').value;

        if (username.trim() === '' || password.trim() === '') {
            alert('Please enter username and password');
            return;
        }

        // Find user in accounts
        const user = accounts.users.find(u => 
            (u.username === username || u.email === username) && u.password === password
        );

        if (user) {
            // Save user to localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful!');
            window.location.href = 'mainpage.html';
        } else {
            alert('Invalid username or password!');
        }
    });
}

// --- FORM SWITCHING (for Mobile) ---
const mobileSwitchToRegister = document.getElementById('mobileSwitchToRegister');
const mobileSwitchToLogin = document.getElementById('mobileSwitchToLogin');

if (mobileSwitchToRegister) {
    mobileSwitchToRegister.addEventListener('click', () => {
        container.classList.add('mobile-register-active');
        clearInputFields();
    });
}

if (mobileSwitchToLogin) {
    mobileSwitchToLogin.addEventListener('click', () => {
        container.classList.remove('mobile-register-active');
        clearInputFields();
    });
}

// --- THEME TOGGLE ---
let theme = document.getElementById("theme");
let lightIcon = document.getElementById("light");
let darkIcon = document.getElementById("dark");

// Light icon click - switch to dark mode
lightIcon.addEventListener("click", () => {
    document.body.classList.add("dark-mode");
    lightIcon.style.display = "none";
    darkIcon.style.display = "block";
});

// Dark icon click - switch to light mode
darkIcon.addEventListener("click", () => {
    document.body.classList.remove("dark-mode");
    darkIcon.style.display = "none";
    lightIcon.style.display = "block";
});