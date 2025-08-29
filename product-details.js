// Product Details Page JavaScript
let currentProduct = null;
let allProducts = [];

// Get product ID from URL parameters
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Load product details when page loads
document.addEventListener('DOMContentLoaded', function() {
    const productId = getProductIdFromURL();
    if (productId) {
        loadProductDetails(productId);
    } else {
        showNotFound();
    }
});

// Load product data and display details
async function loadProductDetails(productId) {
    try {
        console.log('Loading product details for ID:', productId);
        
        // Show loading state
        showLoading();
        
        // Load products data
        const response = await fetch('a-defualt-products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        allProducts = data.data || [];
        
        // Find the specific product
        currentProduct = allProducts.find(product => product.id === productId);
        
        if (currentProduct) {
            displayProductDetails(currentProduct);
            loadRelatedProducts(currentProduct.category, currentProduct.id);
        } else {
            showNotFound();
        }
        
    } catch (error) {
        console.error('Error loading product details:', error);
        showNotFound();
    }
}

// Display product details
function displayProductDetails(product) {
    console.log('Displaying product:', product);
    
    // Hide loading state and show product details
    hideLoading();
    showProductDetails();
    
    // Update page title
    document.title = `${product.name} - RentX`;
    
    // Handle images
    const images = Array.isArray(product.images) ? product.images : [product.images];
    const mainImage = images[0] || 'https://via.placeholder.com/400x300?text=No+Image';
    
    // Set main image
    document.getElementById('mainProductImage').src = mainImage;
    document.getElementById('mainProductImage').alt = product.name;
    
    // Handle multiple images (thumbnails)
    if (images.length > 1) {
        const thumbnailContainer = document.getElementById('thumbnailContainer');
        thumbnailContainer.classList.remove('d-none');
        
        thumbnailContainer.innerHTML = images.map((img, index) => 
            `<img src="${img}" alt="${product.name} ${index + 1}" 
                  class="thumbnail-image ${index === 0 ? 'active' : ''}" 
                  onclick="changeMainImage('${img}', ${index})"
                  onerror="this.src='https://via.placeholder.com/80x80?text=No+Image'">`
        ).join('');
    }
    
    // Basic product info
    document.getElementById('productCategory').textContent = product.category;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('categoryBadge').textContent = product.category;
    
    // Availability
    const availabilityElement = document.getElementById('availabilityBadge');
    if (product.availability === 'Available') {
        availabilityElement.textContent = 'Available';
        availabilityElement.className = 'availability-badge available';
        document.getElementById('rentNowBtn').disabled = false;
    } else {
        availabilityElement.textContent = 'Not Available';
        availabilityElement.className = 'availability-badge not-available';
        document.getElementById('rentNowBtn').disabled = true;
        document.getElementById('rentNowBtn').innerHTML = '<i class="bi bi-x-circle me-2"></i>Not Available';
    }
    
    // Price and deposit
    const rateUnit = product.rate_unit ? product.rate_unit.replace('_', ' ') : '';
    document.getElementById('productPrice').textContent = `₹${product.price}${rateUnit ? '/' + rateUnit : ''}`;
    document.getElementById('productDeposit').textContent = `₹${product.deposit || 'N/A'}`;
    
    // Seller and location
    document.getElementById('productSeller').textContent = product.seller;
    document.getElementById('productLocation').textContent = product.location;
    
    // Description
    document.getElementById('productDescription').textContent = product.description || 'No description available.';
    
    // Update wishlist button
    updateWishlistButton();
    
    // Show wishlist button for logged in users
    const currentUser = getCurrentUser();
    if (currentUser) {
        document.getElementById('wishlistBtnLarge').classList.remove('d-none');
        document.getElementById('wishlistBtn').classList.remove('d-none');
    } else {
        document.getElementById('wishlistBtn').innerHTML = '<i class="bi bi-heart me-2"></i>Login to Save';
        document.getElementById('wishlistBtn').onclick = () => window.location.href = 'login.html';
    }
}

// Change main image when thumbnail is clicked
function changeMainImage(imageSrc, index) {
    document.getElementById('mainProductImage').src = imageSrc;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail-image').forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Update wishlist button state
function updateWishlistButton() {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentProduct) return;
    
    const isInWishlist = window.WishlistManager ? WishlistManager.isInWishlist(currentProduct.id) : false;
    const wishlistBtn = document.getElementById('wishlistBtn');
    const wishlistBtnIcon = document.getElementById('wishlistBtnIcon');
    const wishlistBtnText = document.getElementById('wishlistBtnText');
    const wishlistIconLarge = document.getElementById('wishlistIcon');
    const wishlistBtnLarge = document.getElementById('wishlistBtnLarge');
    
    if (isInWishlist) {
        wishlistBtn.className = 'btn btn-danger btn-lg w-100';
        wishlistBtnIcon.className = 'bi bi-heart-fill me-2';
        wishlistBtnText.textContent = 'Remove from Wishlist';
        wishlistIconLarge.className = 'bi bi-heart-fill';
        wishlistBtnLarge.classList.add('active');
    } else {
        wishlistBtn.className = 'btn btn-outline-danger btn-lg w-100';
        wishlistBtnIcon.className = 'bi bi-heart me-2';
        wishlistBtnText.textContent = 'Add to Wishlist';
        wishlistIconLarge.className = 'bi bi-heart';
        wishlistBtnLarge.classList.remove('active');
    }
}

// Toggle product wishlist
function toggleProductWishlist() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please login to add items to wishlist');
        window.location.href = 'login.html';
        return;
    }
    
    if (!currentProduct || !window.WishlistManager) return;
    
    const isCurrentlyInWishlist = WishlistManager.isInWishlist(currentProduct.id);
    
    if (isCurrentlyInWishlist) {
        WishlistManager.removeFromWishlist(currentProduct.id);
    } else {
        WishlistManager.addToWishlist(currentProduct.id);
    }
    
    // Update button appearance
    updateWishlistButton();
}

// Load related products
function loadRelatedProducts(category, currentProductId) {
    const relatedContainer = document.getElementById('relatedProducts');
    
    // Filter products by same category, excluding current product
    const relatedProducts = allProducts
        .filter(product => 
            product.category === category && 
            product.id !== currentProductId &&
            product.availability === 'Available'
        )
        .slice(0, 4); // Show max 4 related products
    
    if (relatedProducts.length === 0) {
        relatedContainer.innerHTML = '<div class="col-12"><p class="text-muted">No related products found.</p></div>';
        return;
    }
    
    relatedContainer.innerHTML = relatedProducts.map(product => {
        const image = Array.isArray(product.images) ? product.images[0] : product.images || 'https://via.placeholder.com/200x150?text=No+Image';
        const rateUnit = product.rate_unit ? product.rate_unit.replace('_', ' ') : '';
        
        return `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="card related-product-card h-100" onclick="goToProduct(${product.id})" style="cursor: pointer;">
                    <img src="${image}" class="card-img-top related-product-image" alt="${product.name}"
                         onerror="this.src='https://via.placeholder.com/200x150?text=No+Image'">
                    <div class="card-body p-3">
                        <h6 class="card-title mb-2">${product.name}</h6>
                        <p class="text-success fw-bold mb-1">₹${product.price}${rateUnit ? '/' + rateUnit : ''}</p>
                        <p class="text-muted small mb-0"><i class="bi bi-geo-alt"></i> ${product.location}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Navigate to product page
function goToProduct(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

// Rent product function
function rentProduct() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please login to rent items');
        window.location.href = 'login.html';
        return;
    }
    
    if (!currentProduct || currentProduct.availability !== 'Available') {
        alert('This item is not available for rent');
        return;
    }
    
    // Placeholder for rental process
    alert(`Great choice! You want to rent "${currentProduct.name}". Rental booking system coming soon!`);
}

// Share product function
function shareProduct() {
    if (!currentProduct) return;
    
    if (navigator.share) {
        navigator.share({
            title: currentProduct.name,
            text: `Check out this item on RentX: ${currentProduct.name}`,
            url: window.location.href
        });
    } else {
        // Fallback - copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Product link copied to clipboard!');
        }).catch(() => {
            alert('Product link: ' + window.location.href);
        });
    }
}

// Report product function
function reportProduct() {
    if (!currentProduct) return;
    
    const reason = prompt('Please tell us why you\'re reporting this product:');
    if (reason) {
        alert('Thank you for reporting. We\'ll review this product shortly.');
        console.log('Product reported:', currentProduct.id, 'Reason:', reason);
    }
}

// UI state management functions
function showLoading() {
    document.getElementById('loadingState').classList.remove('d-none');
    document.getElementById('notFoundState').classList.add('d-none');
    document.getElementById('productDetails').classList.add('d-none');
}

function hideLoading() {
    document.getElementById('loadingState').classList.add('d-none');
}

function showProductDetails() {
    document.getElementById('productDetails').classList.remove('d-none');
    document.getElementById('notFoundState').classList.add('d-none');
}

function showNotFound() {
    document.getElementById('loadingState').classList.add('d-none');
    document.getElementById('productDetails').classList.add('d-none');
    document.getElementById('notFoundState').classList.remove('d-none');
}

// Listen for wishlist updates
window.addEventListener('wishlistUpdated', updateWishlistButton);
