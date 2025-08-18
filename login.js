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

        if (username.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
            container.classList.remove('right-panel-active');
            container.classList.remove('mobile-register-active');
            clearInputFields();
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