let theme = document.getElementById("theme");
let lightIcon = document.getElementById("light");
let darkIcon = document.getElementById("dark");
// let mode = "light"; // Default mode

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