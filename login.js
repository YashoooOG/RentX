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
                // When clicked, add the 'right-panel-active' class to the container
                // This triggers the CSS animations to slide the panels
                container.classList.add("right-panel-active");
                clearInputFields();
            });
        }

        // Add a 'click' event listener to the "Login" button in the overlay
        if (signInButton) {
            signInButton.addEventListener('click', () => {
                // When clicked, remove the 'right-panel-active' class
                // This makes the panels slide back to their original position
                container.classList.remove("right-panel-active");
                clearInputFields();
            });
        }
        
        // Add a 'click' event listener to the main "Register" button
        if (registerButton) {
            registerButton.addEventListener('click', (event) => {
                // Prevent the form from submitting and reloading the page
                event.preventDefault();
                
                // Switch back to the login panel
                container.classList.remove('right-panel-active');
                clearInputFields();
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


        // --- DARK & LIGHT THEME TOGGLE ---

        // Get the theme toggle icons from the HTML
        const lightIcon = document.getElementById('light-icon');
        const darkIcon = document.getElementById('dark-icon');
        const body = document.body; // Get the body element

        // Add a 'click' event listener to the sun (light mode) icon
        if (lightIcon) {
            lightIcon.addEventListener('click', () => {
                // 1. Add the 'dark-mode' class to the body
                body.classList.add('dark-mode');
                // 2. Hide the sun icon
                lightIcon.style.display = 'none';
                // 3. Show the moon icon
                darkIcon.style.display = 'block';
            });
        }

        // Add a 'click' event listener to the moon (dark mode) icon
        if (darkIcon) {
            darkIcon.addEventListener('click', () => {
                // 1. Remove the 'dark-mode' class from the body
                body.classList.remove('dark-mode');
                // 2. Show the sun icon
                lightIcon.style.display = 'block';
                // 3. Hide the moon icon
                darkIcon.style.display = 'none';
            });
        }