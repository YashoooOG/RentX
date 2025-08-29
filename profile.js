// Profile page functionality
let currentUser = null;
let products = [];

// Load user profile when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCurrentUser();
    loadProducts();
});

// Load current user from localStorage
function loadCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        // Redirect to login if no user is logged in
        alert('Please login to view your profile');
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(userData);
    console.log('Current user loaded for profile:', currentUser.username);
    displayUserProfile();
    
    // Listen for wishlist updates
    window.addEventListener('wishlistUpdated', function() {
        // Reload current user data when wishlist is updated
        const updatedUserData = localStorage.getItem('currentUser');
        if (updatedUserData) {
            currentUser = JSON.parse(updatedUserData);
            displayStats();
            displayWishlist();
        }
    });
}

// Load products data
async function loadProducts() {
    try {
        const response = await fetch('a-defualt-products.json');
        const data = await response.json();
        products = data.data || [];
        displayWishlist();
    } catch (error) {
        console.error('Error loading products:', error);
        products = [];
    }
}

// Display user profile information
function displayUserProfile() {
    if (!currentUser) return;
    
    // Header information
    document.getElementById('userFullName').textContent = currentUser.fullName;
    document.getElementById('userEmail').textContent = currentUser.email;
    document.getElementById('userLocation').textContent = currentUser.location;
    
    // Progress bar
    const progressBar = document.getElementById('profileProgress');
    const progressText = document.getElementById('profilePercentage');
    progressBar.style.width = currentUser.profileCompletion + '%';
    progressText.textContent = currentUser.profileCompletion + '%';
    
    // Overview tab details
    document.getElementById('profileFullName').textContent = currentUser.fullName;
    document.getElementById('profileUsername').textContent = currentUser.username;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profilePhone').textContent = currentUser.phone;
    document.getElementById('profileLocation').textContent = currentUser.location;
    
    // Format and display join date
    const joinDate = new Date(currentUser.joinDate);
    document.getElementById('profileJoinDate').textContent = joinDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Calculate and display stats
    displayStats();
    displayRentalHistory();
}

// Display user statistics
function displayStats() {
    const totalRentals = currentUser.rentHistory ? currentUser.rentHistory.length : 0;
    const wishlistCount = currentUser.wishlist ? currentUser.wishlist.length : 0;
    const totalSpent = currentUser.rentHistory 
        ? currentUser.rentHistory.reduce((sum, rental) => sum + rental.totalAmount, 0)
        : 0;
    
    document.getElementById('totalRentals').textContent = totalRentals;
    document.getElementById('wishlistCount').textContent = wishlistCount;
    document.getElementById('totalSpent').textContent = '₹' + totalSpent.toLocaleString();
}

// Display rental history
function displayRentalHistory() {
    const historyContent = document.getElementById('historyContent');
    
    if (!currentUser.rentHistory || currentUser.rentHistory.length === 0) {
        historyContent.innerHTML = `
            <div class="text-center py-4">
                <i class="bi bi-clock-history" style="font-size: 3rem; color: #ccc;"></i>
                <h5 class="text-muted mt-3">No rental history yet</h5>
                <p class="text-muted">Start browsing and rent your first item!</p>
                <button class="btn btn-dark" onclick="window.location.href='mainpage.html'">Start Browsing</button>
            </div>
        `;
        return;
    }
    
    const historyHTML = currentUser.rentHistory.map(rental => {
        const statusClass = getStatusClass(rental.status);
        return `
            <div class="history-item">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h6 class="mb-1">${rental.itemName}</h6>
                        <small class="text-muted">
                            <i class="bi bi-calendar"></i> ${formatDate(rental.rentDate)} - ${formatDate(rental.returnDate)}
                        </small>
                    </div>
                    <div class="col-md-3">
                        <span class="status-badge ${statusClass}">${rental.status}</span>
                    </div>
                    <div class="col-md-3 text-end">
                        <h6 class="mb-0 text-success">₹${rental.totalAmount.toLocaleString()}</h6>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    historyContent.innerHTML = historyHTML;
}

// Display wishlist items
function displayWishlist() {
    const wishlistContent = document.getElementById('wishlistContent');
    
    if (!currentUser.wishlist || currentUser.wishlist.length === 0) {
        wishlistContent.innerHTML = `
            <div class="text-center py-4">
                <i class="bi bi-heart" style="font-size: 3rem; color: #ccc;"></i>
                <h5 class="text-muted mt-3">Your wishlist is empty</h5>
                <p class="text-muted">Add items you love to your wishlist!</p>
                <button class="btn btn-dark" onclick="window.location.href='mainpage.html'">Start Browsing</button>
            </div>
        `;
        return;
    }
    
    // Get wishlist items from products
    const wishlistItems = products.filter(product => 
        currentUser.wishlist.includes(product.id)
    );
    
    if (wishlistItems.length === 0) {
        wishlistContent.innerHTML = `
            <div class="text-center py-4">
                <i class="bi bi-exclamation-triangle" style="font-size: 3rem; color: #ffc107;"></i>
                <h5 class="text-muted mt-3">Wishlist items not found</h5>
                <p class="text-muted">Some items may no longer be available.</p>
            </div>
        `;
        return;
    }
    
    // Show only first 3 items in profile tab
    const displayItems = wishlistItems.slice(0, 3);
    
    const wishlistHTML = `
        <div class="row">
            ${displayItems.map(item => `
                <div class="col-md-4 mb-3">
                    <div class="wishlist-item">
                        <div class="p-3">
                            <h6 class="mb-2">${item.name}</h6>
                            <p class="text-muted mb-2">
                                <i class="bi bi-geo-alt"></i> ${item.location}
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="text-success fw-bold">₹${item.price}/${item.rate_unit.replace('_', ' ')}</span>
                                <span class="badge ${item.availability === 'Available' ? 'bg-success' : 'bg-secondary'}">${item.availability}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        ${wishlistItems.length > 3 ? `
            <div class="text-center mt-3">
                <button class="btn btn-outline-dark" onclick="window.location.href='wishlist.html'">
                    View All ${wishlistItems.length} Items
                </button>
            </div>
        ` : ''}
    `;
    
    wishlistContent.innerHTML = wishlistHTML;
}

// Utility functions
function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'completed':
            return 'status-completed';
        case 'active':
            return 'status-active';
        case 'cancelled':
            return 'status-cancelled';
        default:
            return 'status-completed';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'LandingPage.html';
    }
}
