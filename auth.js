// Simple authentication helper functions

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user data
function getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
}

// Logout user
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'LandingPage.html';
    }
}

// Protect page - redirect to login if not logged in
function protectPage() {
    const user = getCurrentUser();
    if (!user) {
        // Redirect to login if not authenticated
        alert('Please log in to access this page.');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Check if user is logged in and redirect to main page (for login/register pages)
function redirectIfLoggedIn() {
    if (isLoggedIn()) {
        window.location.href = 'mainpage.html';
    }
}

// Update navbar based on login status
function updateNavbar() {
    const currentUser = getCurrentUser();
    
    // Find auth-related elements
    const authButtons = document.getElementById('authButtons');
    const authButtonMobile = document.getElementById('authButtonMobile');
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Debug logging
    console.log('Updating navbar. User logged in:', !!currentUser);
    console.log('Found elements:', {
        authButtons: !!authButtons,
        authButtonMobile: !!authButtonMobile, 
        profileBtn: !!profileBtn,
        logoutBtn: !!logoutBtn
    });
    
    if (currentUser) {
        // User is logged in - hide login buttons, show profile
        if (authButtons) {
            authButtons.classList.add('auth-hidden');
            authButtons.classList.remove('auth-flex');
        }
        if (authButtonMobile) {
            authButtonMobile.classList.add('auth-hidden');
            authButtonMobile.classList.remove('auth-visible');
        }
        if (profileBtn) {
            profileBtn.classList.add('auth-visible');
            profileBtn.classList.remove('auth-hidden');
        }
        if (logoutBtn) {
            logoutBtn.classList.add('auth-visible');
            logoutBtn.classList.remove('auth-hidden');
        }
        
        // Update profile button text to show username
        if (profileBtn) {
            profileBtn.innerHTML = `<i class="bi bi-person-circle"></i> ${currentUser.fullName || currentUser.username}`;
            profileBtn.title = 'My Profile';
            profileBtn.classList.add('btn-success'); // Green color when logged in
            profileBtn.classList.remove('btn-outline-dark'); // Remove outline style
        }
        
    } else {
        // User is not logged in - show login buttons, hide profile
        if (authButtons) {
            authButtons.classList.remove('auth-hidden');
            authButtons.classList.add('auth-flex');
        }
        if (authButtonMobile) {
            authButtonMobile.classList.remove('auth-hidden');
            authButtonMobile.classList.add('auth-visible');
        }
        if (profileBtn) {
            profileBtn.classList.add('auth-hidden');
            profileBtn.classList.remove('auth-visible');
        }
        if (logoutBtn) {
            logoutBtn.classList.add('auth-hidden');
            logoutBtn.classList.remove('auth-visible');
        }
    }
}

// Initialize navbar when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all elements are rendered
    setTimeout(updateNavbar, 100);
});

// Also update navbar when page becomes visible (in case of navigation)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        updateNavbar();
    }
});

// Update navbar when window loads (backup)
window.addEventListener('load', function() {
    updateNavbar();
});
