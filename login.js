// --- Overlay Animation ---
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

if (signUpButton) {
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });
}

if (signInButton) {
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}


// --- Dark Mode Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Function to apply the theme and set the toggle state
const applyTheme = (theme) => {
    body.classList.remove('dark-mode', 'light-mode');

    if (theme === 'dark') {
        body.classList.add('dark-mode');
        if(themeToggle) themeToggle.checked = true; // "On" for dark mode
    } else {
        body.classList.add('light-mode');
        if(themeToggle) themeToggle.checked = false; // "Off" for light mode
    }
};

// Check for saved theme in localStorage or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    applyTheme(savedTheme);
} else {
    // If no theme is saved, use system preference
    applyTheme(prefersDark ? 'dark' : 'light'); 
}

// Event listener for the toggle switch
if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        // If the toggle is checked (on), set theme to dark. Otherwise, light.
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}