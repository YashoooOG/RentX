// Centralized wishlist management system
// This file manages wishlist synchronization across profile and wishlist pages

// Global wishlist management functions
window.WishlistManager = {
    // Add item to wishlist
    addToWishlist: function(itemId) {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            alert('Please login to add items to wishlist');
            return false;
        }

        // Initialize wishlist if it doesn't exist
        if (!currentUser.wishlist) {
            currentUser.wishlist = [];
        }

        // Check if already in wishlist
        if (currentUser.wishlist.includes(itemId)) {
            this.showToast('Item is already in your wishlist!', 'warning');
            return false;
        }

        // Add to wishlist
        currentUser.wishlist.push(itemId);
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update all wishlist displays
        this.updateAllWishlistDisplays();
        
        this.showToast('Item added to wishlist!', 'success');
        return true;
    },

    // Remove item from wishlist
    removeFromWishlist: function(itemId) {
        const currentUser = getCurrentUser();
        if (!currentUser || !currentUser.wishlist) {
            return false;
        }

        // Remove from wishlist
        currentUser.wishlist = currentUser.wishlist.filter(id => id !== itemId);
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update all wishlist displays
        this.updateAllWishlistDisplays();
        
        this.showToast('Item removed from wishlist!', 'info');
        return true;
    },

    // Check if item is in wishlist
    isInWishlist: function(itemId) {
        const currentUser = getCurrentUser();
        if (!currentUser || !currentUser.wishlist) {
            return false;
        }
        return currentUser.wishlist.includes(itemId);
    },

    // Get wishlist count
    getWishlistCount: function() {
        const currentUser = getCurrentUser();
        if (!currentUser || !currentUser.wishlist) {
            return 0;
        }
        return currentUser.wishlist.length;
    },

    // Update all wishlist displays across pages
    updateAllWishlistDisplays: function() {
        // Dispatch custom event to notify all listeners
        const event = new CustomEvent('wishlistUpdated', {
            detail: { wishlist: this.getCurrentWishlist() }
        });
        window.dispatchEvent(event);

        // Update profile stats if on profile page
        if (window.displayStats && typeof window.displayStats === 'function') {
            window.displayStats();
        }

        // Update profile wishlist if on profile page
        if (window.displayWishlist && typeof window.displayWishlist === 'function') {
            window.displayWishlist();
        }

        // Update wishlist page if on wishlist page
        if (window.displayWishlistItems && typeof window.displayWishlistItems === 'function') {
            window.displayWishlistItems();
        }

        // Update main page wishlist buttons if on main page
        if (window.updateWishlistButtons && typeof window.updateWishlistButtons === 'function') {
            window.updateWishlistButtons();
        }
    },

    // Get current user's wishlist
    getCurrentWishlist: function() {
        const currentUser = getCurrentUser();
        return currentUser && currentUser.wishlist ? currentUser.wishlist : [];
    },

    // Show toast notification
    showToast: function(message, type = 'success') {
        // Create toast element
        const toast = document.createElement('div');
        const bgClass = type === 'success' ? 'bg-success' : 
                       type === 'warning' ? 'bg-warning' : 
                       type === 'info' ? 'bg-info' : 'bg-secondary';
        
        toast.className = `position-fixed top-0 end-0 m-3 p-3 text-white ${bgClass} rounded shadow-sm`;
        toast.style.zIndex = '9999';
        toast.style.maxWidth = '300px';
        toast.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-heart-fill me-2"></i>
                <span>${message}</span>
                <button type="button" class="btn-close btn-close-white ms-2" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }
};

// Listen for storage changes from other tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'currentUser') {
        // Update wishlist displays when user data changes in other tabs
        WishlistManager.updateAllWishlistDisplays();
    }
});

// Initialize wishlist manager when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Setup global wishlist event listeners
    window.addEventListener('wishlistUpdated', function(e) {
        console.log('Wishlist updated:', e.detail);
    });
});
