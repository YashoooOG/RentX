document.addEventListener('DOMContentLoaded', function() {
    loadCurrentUser();
    initializeThemeToggle();
});

// Initialize theme toggle functionality
function initializeThemeToggle() {
    const lightIcon = document.getElementById("light");
    const darkIcon = document.getElementById("dark");
    
    if (lightIcon && darkIcon) {
        function toggleDarkMode() {
            const isDarkMode = document.body.classList.contains('dark-mode');
            updateUniversalSettings(!isDarkMode);
            updateThemeIcons();
        }
        
        function updateThemeIcons() {
            const isDarkMode = document.body.classList.contains('dark-mode');
            if (isDarkMode) {
                lightIcon.style.display = "none";
                darkIcon.style.display = "block";
            } else {
                lightIcon.style.display = "block";
                darkIcon.style.display = "none";
            }
        }
        
        lightIcon.addEventListener("click", toggleDarkMode);
        darkIcon.addEventListener("click", toggleDarkMode);
        
        // Update icons after dark mode has been applied
        setTimeout(updateThemeIcons, 200);
    }
}

// Load current user from localStorage
function loadCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        // This should be handled by protectPage() in auth.js
        return;
    }
    
    currentUser = JSON.parse(userData);
}

async function updateIdFromJson() {
    try {
        const response = await fetch('a-defualt-products.json');
        const data = await response.json();
        
        // Get all valid IDs from the data array
        const validIds = data.data
            .filter(item => item.id && typeof item.id === 'number')
            .map(item => item.id);
        
        // Find the highest ID and add 1
        const highestId = Math.max(...validIds);
        const nextId = highestId + 1;
        
        // Update the p tag
        document.querySelector('.updateidfromjson').textContent = `Current Id: ${nextId}`;
        
        // Store the ID for form submission
        window.nextItemId = nextId;
        
    } catch (error) {
        console.error('Error fetching JSON:', error);
        // Keep original text if error occurs
    }
}

// Function to add more image input fields
function addImageInput() {
    const imageInputs = document.getElementById('imageInputs');
    const newInputGroup = document.createElement('div');
    newInputGroup.className = 'input-group mb-2';
    newInputGroup.innerHTML = `
        <input type="url" class="form-control" placeholder="Upload image and paste link here" name="imageUrl">
        <button type="button" class="btn btn-outline-danger" onclick="removeImageInput(this)">
            <i class="bi bi-trash"></i>
        </button>
    `;
    imageInputs.appendChild(newInputGroup);
}

// Function to remove image input field
function removeImageInput(button) {
    button.parentElement.remove();
}

// Function to set current date and time
function setCurrentDateTime() {
    const now = new Date();
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    document.getElementById('postedDate').value = localDateTime;
}

// Run when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Update ID from JSON
    updateIdFromJson();
    
    // Set current date and time
    setCurrentDateTime();
    
    // Form submission handler
    document.getElementById('addItemForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect all image URLs
        const imageInputs = document.querySelectorAll('input[name="imageUrl"]');
        const images = Array.from(imageInputs)
            .map(input => input.value.trim())
            .filter(url => url !== '');
        
        // If no images provided, add placeholder
        if (images.length === 0) {
            images.push('https://via.placeholder.com/300x200?text=No+Image');
        }
        
        // Create new item object
        const newItem = {
            id: window.nextItemId || 1041,
            name: document.getElementById('itemName').value,
            images: images,
            price: parseInt(document.getElementById('price').value),
            rate_unit: document.getElementById('rateUnit').value,
            category: document.getElementById('category').value,
            seller: document.getElementById('seller').value,
            location: document.getElementById('location').value,
            condition: document.getElementById('condition').value,
            availability: 'Available',
            deposit: parseInt(document.getElementById('deposit').value),
            min_rental_days: parseInt(document.getElementById('minDays').value),
            max_rental_days: parseInt(document.getElementById('maxDays').value),
            description: document.getElementById('description').value,
            posted_at: new Date(document.getElementById('postedDate').value).toISOString()
        };
        
        // Validate max days >= min days
        if (newItem.max_rental_days < newItem.min_rental_days) {
            alert('Maximum rental days must be greater than or equal to minimum rental days.');
            return;
        }
        
        // Log the new item (in real app, you'd send this to server)
        console.log('New item to be added:', newItem);
        
        // Show success message
        alert(`Item "${newItem.name}" added successfully with ID: ${newItem.id}!\n\n(Note: This is a demo - data is not actually saved to JSON file)`);
        
        // Optionally redirect or reset form
        if (confirm('Would you like to add another item?')) {
            // Reset form and get new ID
            this.reset();
            setCurrentDateTime();
            updateIdFromJson();
        } else {
            window.location.href = 'mainpage.html';
        }
    });
});