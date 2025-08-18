// Wishlist page functionality
let currentUser = null;
let products = [];

// Load user and products when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCurrentUser();
    loadProducts();
});

// Load current user from localStorage
function loadCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        // This should be handled by protectPage() in auth.js
        return;
    }
    
    currentUser = JSON.parse(userData);
}

// Load products data
async function loadProducts() {
    try {
        const response = await fetch('a-defualt-products.json');
        const data = await response.json();
        products = data.data || [];
        displayWishlistItems();
    } catch (error) {
        console.error('Error loading products:', error);
        products = [];
        displayWishlistItems();
    }
}

// Display wishlist items
function displayWishlistItems() {
    const wishlistContainer = document.getElementById('wishlistItems');
    const emptyWishlist = document.getElementById('emptyWishlist');
    
    if (!currentUser || !currentUser.wishlist || currentUser.wishlist.length === 0) {
        // Show empty wishlist message
        emptyWishlist.style.display = 'block';
        wishlistContainer.innerHTML = '';
        return;
    }
    
    // Get wishlist items from products
    const wishlistItems = products.filter(product => 
        currentUser.wishlist.includes(product.id)
    );
    
    if (wishlistItems.length === 0) {
        // Show message if wishlist items not found
        emptyWishlist.innerHTML = `
            <i class="bi bi-exclamation-triangle" style="font-size: 4rem; color: #ffc107;"></i>
            <h4 class="text-muted mt-3">Wishlist items not found</h4>
            <p class="text-muted">Some items may no longer be available.</p>
            <button class="btn btn-dark" onclick="window.location.href='mainpage.html'">Start Shopping</button>
        `;
        emptyWishlist.style.display = 'block';
        wishlistContainer.innerHTML = '';
        return;
    }
    
    // Hide empty message and show items
    emptyWishlist.style.display = 'none';
    
    const wishlistHTML = wishlistItems.map(item => {
        const availabilityBadge = item.availability === 'Available' 
            ? '<span class="badge bg-success">Available</span>'
            : '<span class="badge bg-secondary">Not Available</span>';
            
        return `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card wishlist-item h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title">${item.name}</h5>
                            <button class="btn btn-sm btn-outline-danger" onclick="removeFromWishlist(${item.id})" title="Remove from wishlist">
                                <i class="bi bi-heart-fill"></i>
                            </button>
                        </div>
                        
                        <div class="mb-2">
                            <span class="badge bg-secondary">${item.category}</span>
                            ${availabilityBadge}
                        </div>
                        
                        <p class="text-muted mb-2">
                            <i class="bi bi-geo-alt"></i> ${item.location}
                        </p>
                        
                        <p class="text-muted small mb-2">${item.description}</p>
                        
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <div>
                                <strong class="text-success">₹${item.price}</strong>
                                <small class="text-muted">/${item.rate_unit.replace('_', ' ')}</small>
                            </div>
                            <div>
                                ${item.availability === 'Available' 
                                    ? `<button class="btn btn-primary btn-sm" onclick="rentItem(${item.id})">Rent Now</button>`
                                    : `<button class="btn btn-secondary btn-sm" disabled>Not Available</button>`
                                }
                            </div>
                        </div>
                        
                        <div class="mt-2">
                            <small class="text-muted">
                                <i class="bi bi-person"></i> ${item.seller} | 
                                <i class="bi bi-shield-check"></i> ₹${item.deposit} deposit
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    wishlistContainer.innerHTML = wishlistHTML;
}

// Remove item from wishlist
function removeFromWishlist(itemId) {
    if (!currentUser) return;
    
    if (confirm('Remove this item from your wishlist?')) {
        // Remove from user's wishlist
        currentUser.wishlist = currentUser.wishlist.filter(id => id !== itemId);
        
        // Update localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Refresh display
        displayWishlistItems();
        
        // Show success message
        showToast('Item removed from wishlist!');
    }
}

// Rent item function (placeholder - you can enhance this)
function rentItem(itemId) {
    const item = products.find(p => p.id === itemId);
    if (item) {
        alert(`Great choice! You selected "${item.name}". Rental booking feature coming soon!`);
    }
}

// Simple toast notification function
function showToast(message) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = 'position-fixed top-0 end-0 m-3 alert alert-success alert-dismissible fade show';
    toast.style.zIndex = '9999';
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}
