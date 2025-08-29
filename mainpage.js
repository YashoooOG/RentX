// Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const dropdownButton = document.querySelector('.dropdown-toggle');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the selected text
            const selectedText = this.textContent;
            
            // Update the dropdown button text
            dropdownButton.textContent = selectedText;
            
            // Optional: Add any category filtering logic here
            console.log('Selected category:', selectedText);
        });
    });
});

// async function loadRandomProducts() {
//   try {
//     const response = await fetch("a-defualt-products.json"); // adjust path if needed
//     const json = await response.json();
//     const products = json.data;

//     // Shuffle + pick 20 random products
//     let randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 20);

//     const container = document.querySelector(".cardicondisplay");

//     randomProducts.forEach(product => {
//       const card = document.createElement("div");
//       card.classList.add("productcard-holder");

//       card.innerHTML = `
//         <div class="productcard-imageholder">
//           <img src="${product.images[0]}" alt="${product.name}">
//         </div>
//         <div class="productcard-info">
//           <h3>${product.name}</h3>
//           <h4>${product.price} ${product.rate_unit ? "/" + product.rate_unit : ""}</h4>
//         </div>
//         <div class="productcard-infobar">
//           <p>${product.location}</p>
//           <p>${product.seller}</p>
//         </div>
//       `;

//       container.appendChild(card);
//     });
//   } catch (err) {
//     console.error("Error loading products:", err);
//   }
// }

// loadRandomProducts();
let selectedCategory = null;
let currentSearchTerm = null;

async function loadProducts(category = null, searchTerm = null) {
  try {
    const response = await fetch("a-defualt-products.json");
    const json = await response.json();
    let products = json.data;

    // Debug: Log all available categories to see what's in the data
    const availableCategories = [...new Set(products.map(p => p.category))];
    console.log('Available categories in JSON:', availableCategories);
    console.log('Requested category:', category);
    console.log('Search term:', searchTerm);

    // Exclude "Booked" products
    products = products.filter(p => p.availability !== "Booked");

    // Apply search filter if searchTerm is provided
    if (searchTerm) {
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();
      products = products.filter(p => {
        return p.name.toLowerCase().includes(normalizedSearchTerm);
      });
      console.log(`Found ${products.length} products for search term: ${searchTerm}`);
    }

    // Apply category filter if category is provided
    if (category) {
      // Case-insensitive category matching with variations
      const normalizedCategory = category.toLowerCase().trim();
      
      products = products.filter(p => {
        const productCategory = p.category ? p.category.toLowerCase().trim() : '';
        
        // Handle different variations of category names
        if (normalizedCategory === 'vehicles') {
          return productCategory === 'vehicles' || 
                 productCategory === 'vehicle' || 
                 productCategory === 'cars' || 
                 productCategory === 'automotive' ||
                 productCategory === 'bikes' ||
                 productCategory === 'motorcycles';
        }
        
        return productCategory === normalizedCategory;
      });
      
      console.log(`Found ${products.length} products for category: ${category}`);
      
      // If no products found, try exact match (case sensitive)
      if (products.length === 0) {
        products = json.data.filter(p => {
          return p.availability !== "Booked" && p.category === category;
        });
        console.log(`Exact match found ${products.length} products for: ${category}`);
      }
    } else if (!searchTerm) {
      // if no category and no search, pick 12 random
      products = products.sort(() => 0.5 - Math.random()).slice(0, 12);
    }

    const container = document.querySelector(".cardicondisplay");
    container.innerHTML = ""; // clear old cards

    if (products.length === 0) {
      let message = "No products found";
      if (searchTerm && category) {
        message = `No products found for "${searchTerm}" in "${category}" category`;
      } else if (searchTerm) {
        message = `No products found for "${searchTerm}"`;
      } else if (category) {
        message = `No products found in "${category}" category`;
      }
      
      container.innerHTML = `
        <div style="text-align: center; width: 100%; padding: 40px; color: #666;">
          <h3>${message}</h3>
          ${!searchTerm && category ? `<p>Available categories: ${availableCategories.join(', ')}</p>` : ''}
        </div>
      `;
      return;
    }

    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-4");
      
      // Check if item is in wishlist (if user is logged in)
      const isInWishlist = window.WishlistManager ? WishlistManager.isInWishlist(product.id) : false;
      const isLoggedIn = getCurrentUser() !== null;
      
      // Get the first image, handle both single image and array
      const imageUrl = Array.isArray(product.images) ? product.images[0] : product.images || 'https://via.placeholder.com/300x200?text=No+Image';
      
      card.innerHTML = `
        <div class="card productcard-holder h-100">
          <div class="productcard-imageholder">
            <img src="${imageUrl}" alt="${product.name}" class="card-img-top" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            ${isLoggedIn ? `
              <button class="btn btn-sm wishlist-btn ${isInWishlist ? 'wishlist-active' : ''}" 
                      onclick="toggleWishlist(${product.id}, this)" 
                      title="${isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
                <i class="bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'}"></i>
              </button>
            ` : ''}
          </div>
          <div class="card-body d-flex flex-column p-3">
            <div class="productcard-info">
              <h5 class="card-title mb-1">${product.name}</h5>
              <h4 class="text-success fw-bold mb-1">₹${product.price}${product.rate_unit ? "/" + product.rate_unit.replace('_', ' ') : ""}</h4>
              <span class="badge bg-secondary mb-2">${product.category}</span>
            </div>
            <div class="productcard-infobar mb-2">
              <p class="text-muted mb-0 small"><i class="bi bi-geo-alt"></i> ${product.location}</p>
              <p class="text-muted mb-0 small"><i class="bi bi-person"></i> ${product.seller}</p>
            </div>
            <div class="productcard-actions mt-auto">
              <button class="btn btn-primary flex-grow-1 me-2" onclick="rentItem(${product.id})">
                <i class="bi bi-calendar-check"></i> Rent Now
              </button>
              <div class="text-center">
                <small class="text-muted">Deposit: ₹${product.deposit || 'N/A'}</small>
              </div>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading products:", err);
    const container = document.querySelector(".cardicondisplay");
    container.innerHTML = `
      <div style="text-align: center; width: 100%; padding: 40px; color: #666;">
        <h3>Error loading products</h3>
        <p>Please check the console for details.</p>
      </div>
    `;
  }
}

// Search functionality
function performSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.trim();
  
  if (searchTerm) {
    currentSearchTerm = searchTerm;
    // Clear category selection when searching
    selectedCategory = null;
    document.querySelectorAll(".category-item a, .dropdown-menu a").forEach(el => {
      el.classList.remove("active-category");
    });
    
    loadProducts(null, searchTerm);
  } else {
    // If search is empty, clear search and show default products
    currentSearchTerm = null;
    loadProducts();
  }
}

// Clear search function
function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.value = '';
  currentSearchTerm = null;
  loadProducts(selectedCategory); // Keep category filter if active
}

// Highlight toggle (updated to work with search)
function toggleCategory(element, category) {
  if (selectedCategory === category) {
    // deselect
    selectedCategory = null;
    element.classList.remove("active-category");
    loadProducts(null, currentSearchTerm); // Keep search filter if active
  } else {
    // reset all
    document.querySelectorAll(".category-item a, .dropdown-menu a").forEach(el => {
      el.classList.remove("active-category");
    });
    // set selected
    selectedCategory = category;
    element.classList.add("active-category");
    loadProducts(category, currentSearchTerm); // Apply both filters
  }
}

// Attach listeners
document.addEventListener("DOMContentLoaded", () => {
  // Search form event listeners
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  // Handle form submission
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    performSearch();
  });

  // Handle search button click
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    performSearch();
  });

  // Handle Enter key in search input
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });

  // Optional: Real-time search as user types (uncomment if desired)
  // searchInput.addEventListener('input', (e) => {
  //   const searchTerm = e.target.value.trim();
  //   if (searchTerm.length >= 2) { // Start searching after 2 characters
  //     currentSearchTerm = searchTerm;
  //     loadProducts(selectedCategory, searchTerm);
  //   } else if (searchTerm.length === 0) {
  //     currentSearchTerm = null;
  //     loadProducts(selectedCategory);
  //   }
  // });

  // Desktop category listeners
  document.querySelectorAll(".category-item a").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      const categoryText = el.textContent.trim();
      console.log('Desktop category clicked:', categoryText);
      toggleCategory(el, categoryText);
    });
  });

  // Mobile category listeners
  document.querySelectorAll(".dropdown-menu a").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      const categoryText = el.textContent.trim();
      console.log('Mobile category clicked:', categoryText);
      toggleCategory(el, categoryText);
    });
  });

  // Load default random cards
  loadProducts();
});

// Wishlist toggle function
function toggleWishlist(itemId, buttonElement) {
  if (!getCurrentUser()) {
    alert('Please login to add items to wishlist');
    return;
  }
  
  if (window.WishlistManager) {
    const isCurrentlyInWishlist = WishlistManager.isInWishlist(itemId);
    
    if (isCurrentlyInWishlist) {
      WishlistManager.removeFromWishlist(itemId);
      // Update button appearance
      buttonElement.classList.remove('wishlist-active');
      buttonElement.innerHTML = '<i class="bi bi-heart"></i>';
      buttonElement.title = 'Add to wishlist';
    } else {
      WishlistManager.addToWishlist(itemId);
      // Update button appearance
      buttonElement.classList.add('wishlist-active');
      buttonElement.innerHTML = '<i class="bi bi-heart-fill"></i>';
      buttonElement.title = 'Remove from wishlist';
    }
  }
}

// Rent item function (placeholder)
function rentItem(itemId) {
  if (!getCurrentUser()) {
    alert('Please login to rent items');
    return;
  }
  alert('Rental booking feature coming soon! Item ID: ' + itemId);
}

// Update wishlist buttons when wishlist changes
function updateWishlistButtons() {
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  wishlistButtons.forEach(button => {
    const itemId = parseInt(button.getAttribute('onclick').match(/\d+/)[0]);
    const isInWishlist = window.WishlistManager ? WishlistManager.isInWishlist(itemId) : false;
    
    if (isInWishlist) {
      button.classList.add('wishlist-active');
      button.innerHTML = '<i class="bi bi-heart-fill"></i>';
      button.title = 'Remove from wishlist';
    } else {
      button.classList.remove('wishlist-active');
      button.innerHTML = '<i class="bi bi-heart"></i>';
      button.title = 'Add to wishlist';
    }
  });
}
