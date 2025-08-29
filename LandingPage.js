let theme = document.getElementById("theme");
let lightIcon = document.getElementById("light");
let darkIcon = document.getElementById("dark");

document.getElementById("nextBtn").addEventListener("click", function() {
    window.location.href = "mainpage.html";
});

lightIcon.addEventListener("click", () => {
    document.body.classList.add("dark-mode");
    lightIcon.style.display = "none";
    darkIcon.style.display = "block";
});

darkIcon.addEventListener("click", () => {
    document.body.classList.remove("dark-mode");
    darkIcon.style.display = "none";
    lightIcon.style.display = "block";
});

// Function to check login status and update UI
function updateAuthUI() {
    // Use the same method as auth.js - check for currentUser
    const currentUser = localStorage.getItem('currentUser');
    const isLoggedIn = currentUser !== null;
    
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const authButtons = document.getElementById('authButtons');
    const authButtonMobile = document.getElementById('authButtonMobile');
    
    console.log('updateAuthUI called, isLoggedIn:', isLoggedIn); // Debug log
    
    if (isLoggedIn) {
        // User is logged in - show profile and logout buttons, hide auth buttons
        if (profileBtn) profileBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (authButtons) authButtons.style.display = 'none';
        if (authButtonMobile) authButtonMobile.style.display = 'none';
    } else {
        // User is not logged in - hide profile and logout buttons, show auth buttons
        if (profileBtn) profileBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (authButtons) authButtons.style.display = 'flex';
        if (authButtonMobile) authButtonMobile.style.display = 'block';
    }
}

// Call updateAuthUI when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure auth.js has loaded
    setTimeout(updateAuthUI, 100);
});

// Listen for storage changes (when user logs in/out in another tab)
window.addEventListener('storage', function(e) {
    if (e.key === 'currentUser') {
        updateAuthUI();
    }
});

