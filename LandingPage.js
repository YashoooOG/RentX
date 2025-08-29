document.getElementById("nextBtn").addEventListener("click", function() {
    // Check if user is logged in, if so go to mainpage, otherwise go to login
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = "mainpage.html";
    } else {
        window.location.href = "login.html";
    }
});

// Initialize the universal theme toggle system
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggle();
});
