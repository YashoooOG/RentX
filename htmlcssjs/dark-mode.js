// Universal Dark Mode Manager for RentX

// Immediately apply dark mode if saved (before page renders)
(function() {
    try {
        const localSettings = localStorage.getItem('rentx-settings');
        if (localSettings) {
            const settings = JSON.parse(localSettings);
            if (settings.darkMode) {
                document.documentElement.classList.add('dark-mode');
                if (document.body) {
                    document.body.classList.add('dark-mode');
                }
            }
        }
    } catch (error) {
        console.log('Error loading initial dark mode state');
    }
})();

// Load settings function for any page - executes immediately
async function loadUniversalSettings() {
    try {
        // First try localStorage (faster and more reliable)
        const localSettings = localStorage.getItem('rentx-settings');
        if (localSettings) {
            const settings = JSON.parse(localSettings);
            applyDarkMode(settings.darkMode);
            console.log('Dark mode loaded from localStorage:', settings.darkMode);
            return;
        }

        // Fallback to settings.json
        const response = await fetch('settings.json');
        const settings = await response.json();
        
        applyDarkMode(settings.darkMode);
        
        // Save to localStorage for faster future loads
        localStorage.setItem('rentx-settings', JSON.stringify(settings));
        console.log('Dark mode loaded from settings.json:', settings.darkMode);
    } catch (error) {
        console.log('No settings found, using light mode');
        applyDarkMode(false);
    }
}

// Apply dark mode to document
function applyDarkMode(isDarkMode) {
    if (isDarkMode) {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
    } else {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
    }
}

// Update settings function - used by all pages
function updateUniversalSettings(isDarkMode) {
    const settings = {
        darkMode: isDarkMode,
        theme: isDarkMode ? 'dark' : 'light',
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('rentx-settings', JSON.stringify(settings));
    
    // Apply immediately
    applyDarkMode(isDarkMode);
    
    console.log('Settings updated:', JSON.stringify(settings, null, 2));
}

// Universal toggle function - works on any page
function toggleUniversalDarkMode() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    updateUniversalSettings(!isDarkMode);
}

// For compatibility with existing code
function toggleDarkMode() {
    toggleUniversalDarkMode();
}

// When DOM is ready, ensure settings are applied and update theme icons
document.addEventListener('DOMContentLoaded', function() {
    // Ensure settings are applied
    loadUniversalSettings();
    
    // Update theme icons after a short delay
    setTimeout(updateAllThemeIcons, 100);
});

// Update all theme icons on the page
function updateAllThemeIcons() {
    const lightIcon = document.getElementById("light");
    const darkIcon = document.getElementById("dark");
    
    if (lightIcon && darkIcon) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (isDarkMode) {
            lightIcon.style.display = "none";
            darkIcon.style.display = "block";
        } else {
            lightIcon.style.display = "block";
            darkIcon.style.display = "none";
        }
    }
}

// Export for other scripts
window.loadUniversalSettings = loadUniversalSettings;
window.updateUniversalSettings = updateUniversalSettings;
window.toggleUniversalDarkMode = toggleUniversalDarkMode;
window.updateAllThemeIcons = updateAllThemeIcons;
