let theme = document.getElementById("theme");
let lightIcon = document.getElementById("light");
let darkIcon = document.getElementById("dark");

document.getElementById("nextBtn").addEventListener("click", function() {
    // Check if user is logged in, if so go to mainpage, otherwise go to login
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = "mainpage.html";
    } else {
        window.location.href = "login.html";
    }
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

// Note: Auth UI is now handled by auth.js updateNavbar() function
