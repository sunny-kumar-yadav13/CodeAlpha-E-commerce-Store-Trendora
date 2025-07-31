// Main JavaScript for Trendora E-commerce Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    initializeNavigation();
    initializeLogoNavigation();
    initializeSearch();
    initializeNotifications();
    initializeCart();
    initializeWishlist();
    initializeAnimations();
    initializeResponsive();
    updateNavigationAuth(); // Add authentication status check
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const accountBtn = document.getElementById('accountBtn');
    const accountDropdown = document.getElementById('accountDropdown');

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Account dropdown toggle
    if (accountBtn && accountDropdown) {
        accountBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            accountDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            accountDropdown.classList.add('hidden');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Logo navigation functionality
function initializeLogoNavigation() {
    // Handle logo clicks for smooth navigation
    const logoLinks = document.querySelectorAll('a[href*="index.html"], a[href="../index.html"], a[href="/"]');
    
    logoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If we're already on the home page and clicking to go to home
            if (href === 'index.html' || href === '../index.html' || href === '/') {
                // Check if we're already on the home page
                const currentPath = window.location.pathname;
                const isHomePage = currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.endsWith('/');
                
                if (isHomePage) {
                    e.preventDefault();
                    // Smooth scroll to top of the page
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    
                    // Show a subtle notification
                    showNotification('Welcome back to Trendora!', 'info', 2000);
                }
            }
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    // Sample search data (in real app, this would come from API)
    const searchData = [
        'Women\'s Fashion',
        'Men\'s Fashion',
        'Shoes',
        'Accessories',
        'Bags',
        'Watches',
        'Jewelry',
        'Sunglasses',
        'T-shirts',
        'Jeans',
        'Dresses',
        'Jackets',
        'Sneakers',
        'Boots',
        'Sandals'
    ];

    if (searchInput && searchSuggestions) {
        let searchTimeout;

        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (query.length > 0) {
                    const suggestions = searchData.filter(item => 
                        item.toLowerCase().includes(query)
                    ).slice(0, 5);
                    
                    displaySearchSuggestions(suggestions, query);
                } else {
                    hideSearchSuggestions();
                }
            }, 300);
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                hideSearchSuggestions();
            }
        });

        // Handle search form submission
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    }

    function displaySearchSuggestions(suggestions, query) {
        if (suggestions.length === 0) {
            hideSearchSuggestions();
            return;
        }

        const suggestionsHTML = suggestions.map(suggestion => {
            const highlightedText = suggestion.replace(
                new RegExp(query, 'gi'),
                match => `<strong>${match}</strong>`
            );
            return `
                <div class="search-suggestion-item" onclick="performSearch('${suggestion}')">
                    <i class="fas fa-search mr-2 text-gray-400"></i>
                    ${highlightedText}
                </div>
            `;
        }).join('');

        searchSuggestions.innerHTML = suggestionsHTML;
        searchSuggestions.classList.remove('hidden');
    }

    function hideSearchSuggestions() {
        if (searchSuggestions) {
            searchSuggestions.classList.add('hidden');
        }
    }

    function performSearch(query) {
        if (query.trim()) {
            // In a real application, this would redirect to search results page
            console.log('Searching for:', query);
            showNotification(`Searching for "${query}"...`, 'info');
            hideSearchSuggestions();
            
            // Simulate search redirect
            setTimeout(() => {
                window.location.href = `pages/products.html?search=${encodeURIComponent(query)}`;
            }, 1000);
        }
    }
}

// Cart functionality
function initializeCart() {
    updateCartDisplay();
    
    // Add event listeners for cart buttons (will be added dynamically)
    // Only add the event listener if it hasn't been added by products.js
    if (!window.cartEventListenerAdded) {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
                const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
                
                // Prevent double-clicking and multiple event handling
                if (button.disabled || button.classList.contains('processing') || e.cartHandled) {
                    return;
                }
                
                e.preventDefault();
                e.stopPropagation();
                e.cartHandled = true;
                
                // Temporarily disable button to prevent multiple clicks
                button.disabled = true;
                button.classList.add('processing');
                
                const productId = button.getAttribute('data-product-id');
                
                // Check for quantity input (for product details page)
                const quantityInput = document.getElementById('quantity-input');
                const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
                
                // Add to cart with proper quantity
                addToCart(productId, quantity);
                
                // Re-enable button after processing
                setTimeout(() => {
                    button.disabled = false;
                    button.classList.remove('processing');
                }, 1000);
            }
            
            // Handle quick view buttons
            if (e.target.classList.contains('quick-view') || e.target.closest('.quick-view')) {
                const button = e.target.classList.contains('quick-view') ? e.target : e.target.closest('.quick-view');
                const productId = button.getAttribute('data-product-id');
                quickView(productId);
            }
        });
        window.cartEventListenerAdded = true;
    }
}

function addToCart(productId, quantity = 1) {
    let cart = getCart();
    
    if (cart[productId]) {
        cart[productId].quantity += quantity;
    } else {
        // Get product details from productManager if available
        let productData;
        if (window.productManager) {
            productData = window.productManager.getProductById(productId);
        }
        
        if (productData) {
            cart[productId] = {
                id: productId,
                name: productData.name,
                price: productData.price,
                quantity: quantity,
                image: productData.image,
                description: productData.description
            };
        } else {
            // Fallback for when productManager is not available
            cart[productId] = {
                id: productId,
                name: `Product ${productId}`,
                price: Math.floor(Math.random() * 5000) + 1000,
                quantity: quantity,
                image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
                description: 'Product description'
            };
        }
    }
    
    saveCart(cart);
    updateCartDisplay();
    showNotification('Product added to cart!', 'success');
    
    // Add animation to cart icon
    const cartIcon = document.querySelector('#cartCount')?.parentElement;
    if (cartIcon) {
        cartIcon.classList.add('animate-bounce');
        setTimeout(() => {
            cartIcon.classList.remove('animate-bounce');
        }, 1000);
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    delete cart[productId];
    saveCart(cart);
    updateCartDisplay();
    showNotification('Product removed from cart!', 'info');
}

function updateCartQuantity(productId, quantity) {
    let cart = getCart();
    if (cart[productId]) {
        if (quantity <= 0) {
            delete cart[productId];
        } else {
            cart[productId].quantity = quantity;
        }
        saveCart(cart);
        updateCartDisplay();
    }
}

function getCart() {
    return JSON.parse(localStorage.getItem('trendora_cart') || '{}');
}

function saveCart(cart) {
    localStorage.setItem('trendora_cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cart = getCart();
    const cartCount = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        
        // Add visual feedback for cart updates
        if (cartCount > 0) {
            cartCountElement.classList.add('animate-pulse');
            setTimeout(() => {
                cartCountElement.classList.remove('animate-pulse');
            }, 1000);
        }
    }
}

function getCartTotal() {
    const cart = getCart();
    return Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Wishlist functionality
function initializeWishlist() {
    updateWishlistDisplay();
    
    // Check if wishlist manager is available after a short delay
    // to account for script loading order
    setTimeout(() => {
        if (!window.wishlistManager) {
            // Only add event listener if wishlist manager is not available
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('add-to-wishlist') || e.target.closest('.add-to-wishlist')) {
                    const button = e.target.classList.contains('add-to-wishlist') ? e.target : e.target.closest('.add-to-wishlist');
                    const productId = button.getAttribute('data-product-id');
                    toggleWishlist(productId);
                }
            });
        }
    }, 100);
}

function toggleWishlist(productId) {
    // Use the global wishlist manager if available
    if (window.wishlistManager) {
        return window.wishlistManager.toggleWishlist(productId);
    }
    
    // Fallback implementation (should not be used if wishlist.js is loaded)
    console.warn('Global wishlist manager not found, using fallback');
    return false;
}

// New wishlist functions that store full product data
function getWishlistItems() {
    return JSON.parse(localStorage.getItem('trendora_wishlist_items') || '[]');
}

function saveWishlistItems(wishlistItems) {
    localStorage.setItem('trendora_wishlist_items', JSON.stringify(wishlistItems));
}

function getProductData(productId) {
    // Try to get product data from productManager first
    if (window.productManager) {
        const product = window.productManager.getProductById(productId);
        if (product) {
            return product;
        }
    }
    
    // Fallback: create basic product data
    return {
        id: productId,
        name: `Product ${productId}`,
        price: Math.floor(Math.random() * 5000) + 1000,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Product description',
        rating: 4.0,
        reviews: Math.floor(Math.random() * 100) + 10,
        category: 'general',
        inStock: true,
        stockCount: Math.floor(Math.random() * 50) + 5
    };
}

// Legacy functions for backward compatibility
function getWishlist() {
    const wishlistItems = getWishlistItems();
    return wishlistItems.map(item => item.id);
}

function saveWishlist(wishlist) {
    // This is now mainly for backward compatibility
    // Convert ID array to full items if needed
    const currentItems = getWishlistItems();
    const newItems = wishlist.map(id => {
        const existing = currentItems.find(item => item.id === id);
        return existing || getProductData(id);
    });
    saveWishlistItems(newItems);
}

function updateWishlistDisplay() {
    const wishlistItems = getWishlistItems();
    const wishlistCountElements = document.querySelectorAll('#wishlistCount, #wishlist-count');
    
    wishlistCountElements.forEach(element => {
        if (element) {
            element.textContent = wishlistItems.length;
        }
    });
}

function updateWishlistButtons() {
    const wishlistItems = getWishlistItems();
    const wishlistIds = wishlistItems.map(item => item.id);
    
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        const productId = button.getAttribute('data-product-id');
        const icon = button.querySelector('i');
        
        if (wishlistIds.includes(productId)) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.classList.add('text-red-500');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.classList.remove('text-red-500');
        }
    });
}

// Notification system
function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notificationContainer')) {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.className = 'fixed top-4 right-4 z-50 space-y-2';
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };
    
    notification.className = `notification ${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 transform translate-x-full transition-transform duration-300`;
    notification.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
        <button class="ml-2 text-white hover:text-gray-200" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, duration);
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.category-card, .product-card, .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Add loading animations
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('animate-fade-in');
        });
    });
}

// Responsive functionality
function initializeResponsive() {
    // Handle window resize
    window.addEventListener('resize', debounce(handleResize, 250));
    
    function handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth >= 768) {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
        
        // Update any responsive calculations
        updateResponsiveElements();
    }
    
    function updateResponsiveElements() {
        // Add any responsive updates here
        const elements = document.querySelectorAll('.responsive-element');
        elements.forEach(el => {
            // Update element properties based on screen size
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return re.test(password);
}

function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        const errorElement = input.parentElement.querySelector('.form-error');
        
        // Remove previous error styles
        input.classList.remove('error', 'success');
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        // Validate based on input type
        if (!value) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(value)) {
            showFieldError(input, 'Please enter a valid email address');
            isValid = false;
        } else if (input.type === 'password' && !validatePassword(value)) {
            showFieldError(input, 'Password must be at least 8 characters with uppercase, lowercase, and number');
            isValid = false;
        } else {
            input.classList.add('success');
        }
    });
    
    return isValid;
}

function showFieldError(input, message) {
    input.classList.add('error');
    let errorElement = input.parentElement.querySelector('.form-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        input.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// API simulation functions (replace with real API calls)
function simulateApiCall(endpoint, data, delay = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random success/failure
            if (Math.random() > 0.1) {
                resolve({
                    success: true,
                    data: data,
                    message: 'Operation completed successfully'
                });
            } else {
                reject({
                    success: false,
                    message: 'An error occurred. Please try again.'
                });
            }
        }, delay);
    });
}

// Category navigation function
function navigateToCategory(category) {
    window.location.href = `pages/categories.html?category=${category}`;
}

// Trending products filter functionality
let currentFilter = 'all';

function filterTrendingProducts(filter) {
    currentFilter = filter;
    
    // Update filter tabs visual state
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active', 'border-primary-200', 'text-primary-700', 'bg-primary-50');
        tab.classList.add('border-gray-200', 'text-gray-600');
    });
    
    // Activate clicked tab
    event.target.classList.add('active', 'border-primary-200', 'text-primary-700');
    event.target.classList.remove('border-gray-200', 'text-gray-600');
    
    // Show loading
    showProductsLoading(true);
    
    // Filter products (simulate API call)
    setTimeout(() => {
        loadTrendingProducts(filter);
        showProductsLoading(false);
    }, 800);
    
    showNotification(`Showing ${filter === 'all' ? 'all' : filter} products`, 'info');
}

function showProductsLoading(show) {
    const loading = document.getElementById('productsLoading');
    const productsGrid = document.getElementById('trendingProducts');
    
    if (show) {
        loading.classList.remove('hidden');
        productsGrid.style.opacity = '0.5';
    } else {
        loading.classList.add('hidden');
        productsGrid.style.opacity = '1';
    }
}

// Enhanced product loading with sample data
function loadTrendingProducts(filter = 'all') {
    const productsGrid = document.getElementById('trendingProducts');
    const sampleProducts = generateSampleProducts(filter);
    
    productsGrid.innerHTML = '';
    
    sampleProducts.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
    });
    
    // Update wishlist button states
    setTimeout(() => {
        updateWishlistButtons();
    }, 100);
}

function generateSampleProducts(filter) {
    const allProducts = [
        {
            id: 'prod-001',
            name: 'Premium Silk Dress',
            price: 2999,
            originalPrice: 3999,
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            category: 'womens',
            rating: 4.8,
            reviews: 124,
            badge: 'Sale',
            discount: 25
        },
        {
            id: 'prod-002',
            name: 'Classic Cotton Shirt',
            price: 1299,
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            category: 'mens',
            rating: 4.6,
            reviews: 89,
            badge: 'New'
        },
        {
            id: 'prod-003',
            name: 'Running Sneakers',
            price: 4999,
            originalPrice: 5999,
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            category: 'shoes',
            rating: 4.9,
            reviews: 234,
            badge: 'Featured',
            discount: 17
        },
        {
            id: 'prod-004',
            name: 'Leather Handbag',
            price: 3999,
            image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            category: 'accessories',
            rating: 4.7,
            reviews: 67,
            badge: 'New'
        },
        {
            id: 'prod-005',
            name: 'Casual Blazer',
            price: 2499,
            originalPrice: 2999,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            category: 'mens',
            rating: 4.5,
            reviews: 156,
            badge: 'Sale',
            discount: 17
        },
        {
            id: 'prod-006',
            name: 'Summer Top',
            price: 899,
            image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            category: 'womens',
            rating: 4.4,
            reviews: 93,
            badge: 'New'
        },
        {
            id: 'prod-007',
            name: 'Dress Shoes',
            price: 3499,
            image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            category: 'shoes',
            rating: 4.6,
            reviews: 78,
            badge: 'Featured'
        },
        {
            id: 'prod-008',
            name: 'Gold Watch',
            price: 8999,
            originalPrice: 9999,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            category: 'accessories',
            rating: 4.9,
            reviews: 145,
            badge: 'Sale',
            discount: 10
        }
    ];
    
    if (filter === 'all') {
        return allProducts;
    }
    
    return allProducts.filter(product => product.category === filter);
}

function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card group cursor-pointer animate-slide-up';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    card.innerHTML = `
        <div class="relative overflow-hidden rounded-3xl bg-white shadow-soft hover:shadow-large transition-all duration-500 group-hover:-translate-y-2">
            <div class="relative overflow-hidden">
                <img src="${product.image}" alt="${product.name}" 
                     class="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-110">
                
                <!-- Badge -->
                ${product.badge ? `
                <div class="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${getBadgeColors(product.badge)} text-white text-xs font-bold rounded-full shadow-soft">
                    ${product.badge}
                </div>
                ` : ''}
                
                <!-- Discount Badge -->
                ${discount > 0 ? `
                <div class="absolute top-4 right-4 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-soft">
                    -${discount}%
                </div>
                ` : ''}
                
                <!-- Overlay Actions -->
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                    <button class="add-to-wishlist w-12 h-12 bg-white/90 backdrop-blur-sm text-red-500 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 transform hover:scale-110" data-product-id="${product.id}">
                        <i class="far fa-heart text-lg"></i>
                    </button>
                    <button class="quick-view w-12 h-12 bg-white/90 backdrop-blur-sm text-primary-600 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 transform hover:scale-110" data-product-id="${product.id}">
                        <i class="fas fa-eye text-lg"></i>
                    </button>
                    <button class="add-to-cart w-12 h-12 bg-white/90 backdrop-blur-sm text-accent-600 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 transform hover:scale-110" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart text-lg"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <!-- Rating -->
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-1">
                        ${generateStarRating(product.rating)}
                        <span class="text-xs text-neutral-500 ml-1">(${product.reviews})</span>
                    </div>
                    <div class="text-xs text-neutral-400 uppercase tracking-wide font-medium">${getCategoryName(product.category)}</div>
                </div>
                
                <!-- Product Name -->
                <h3 class="text-lg font-display font-semibold text-neutral-800 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    ${product.name}
                </h3>
                
                <!-- Price -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <span class="text-xl font-bold text-neutral-800">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span class="text-sm text-neutral-500 line-through">${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

function getBadgeColors(badge) {
    const colors = {
        'New': 'from-green-500 to-green-600',
        'Sale': 'from-red-500 to-red-600',
        'Featured': 'from-purple-500 to-purple-600'
    };
    return colors[badge] || 'from-gray-500 to-gray-600';
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star text-yellow-400 text-xs"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt text-yellow-400 text-xs"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star text-gray-300 text-xs"></i>';
    }
    
    return stars;
}

function getCategoryName(category) {
    const names = {
        'womens': "Women's",
        'mens': "Men's",
        'shoes': 'Footwear',
        'accessories': 'Accessories'
    };
    return names[category] || category;
}

// Quick view functionality
function quickView(productId) {
    showNotification('Quick view feature coming soon!', 'info');
    // In a real app, this would open a modal with product details
}

// Wishlist functionality enhancement
function addToWishlist(productId) {
    if (window.wishlistManager) {
        window.wishlistManager.toggleWishlist(productId);
    } else {
        // Fallback
        showNotification('Added to wishlist!', 'success');
        updateWishlistDisplay();
    }
}

// Countdown timer functionality
function startCountdown() {
    const timer = document.getElementById('countdownTimer');
    if (!timer) return;
    
    // Set end date (2 days from now)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;
        
        if (distance < 0) {
            timer.textContent = 'Sale Ended';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Footer functionality
function handleNewsletterSubmission(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button');
    const originalText = button.textContent;
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Successfully subscribed to newsletter!', 'success');
        form.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
}

// Handle newsletter form with proper function name
function handleNewsletterSubmit(event) {
    return handleNewsletterSubmission(event);
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Back to top functionality
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Footer animations on scroll
function initializeFooterAnimations() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(footer);
}

// Initialize trending products when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load trending products
    if (document.getElementById('trendingProducts')) {
        loadTrendingProducts('all');
    }
    
    // Start countdown timer
    if (document.getElementById('countdownTimer')) {
        startCountdown();
    }
    
    // Initialize footer functionality
    initializeBackToTop();
    initializeFooterAnimations();
    
    // Add newsletter form submission handler
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmission);
    }
});

// Authentication management functions
function updateNavigationAuth() {
    const userData = JSON.parse(localStorage.getItem('trendora_user') || '{}');
    const isLoggedIn = userData.isLoggedIn || false;
    
    const usernameDisplay = document.getElementById('usernameDisplay');
    const accountSubtitle = document.getElementById('accountSubtitle');
    const welcomeText = document.getElementById('welcomeText');
    const welcomeSubtext = document.getElementById('welcomeSubtext');
    const authLinks = document.getElementById('authLinks');
    const userLinks = document.getElementById('userLinks');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (isLoggedIn && userData.name) {
        // User is logged in - show username and user options
        if (usernameDisplay) {
            usernameDisplay.textContent = userData.name;
        }
        if (accountSubtitle) {
            accountSubtitle.textContent = 'Manage Account';
        }
        if (welcomeText) {
            welcomeText.textContent = `Welcome back, ${userData.name}!`;
        }
        if (welcomeSubtext) {
            welcomeSubtext.textContent = 'Manage your profile and orders';
        }
        if (authLinks) {
            authLinks.classList.add('hidden');
        }
        if (userLinks) {
            userLinks.classList.remove('hidden');
        }
    } else {
        // User is not logged in - show login/register options
        if (usernameDisplay) {
            usernameDisplay.textContent = 'Account';
        }
        if (accountSubtitle) {
            accountSubtitle.textContent = 'Profile & Settings';
        }
        if (welcomeText) {
            welcomeText.textContent = 'Welcome to Trendora';
        }
        if (welcomeSubtext) {
            welcomeSubtext.textContent = 'Manage your account';
        }
        if (authLinks) {
            authLinks.classList.remove('hidden');
        }
        if (userLinks) {
            userLinks.classList.add('hidden');
        }
    }
    
    // Add logout functionality
    if (logoutBtn) {
        logoutBtn.onclick = handleLogout;
    }
}

function handleLogout() {
    // Clear user data from localStorage
    localStorage.removeItem('trendora_user');
    
    // Show success notification
    showNotification('Successfully logged out!', 'success');
    
    // Update navigation to show login/register options
    updateNavigationAuth();
    
    // Redirect to home page after a brief delay
    setTimeout(() => {
        const currentPath = window.location.pathname;
        const isHomePage = currentPath === '/' || currentPath.endsWith('/index.html') || currentPath === '/index.html';
        
        if (!isHomePage) {
            // Determine correct path to home based on current location
            if (currentPath.includes('/pages/')) {
                // We're in a subfolder, go up one level
                window.location.href = '../index.html';
            } else {
                // We're at root level
                window.location.href = './index.html';
            }
        } else {
            // Already on home page, just close any dropdowns
            const accountDropdown = document.getElementById('accountDropdown');
            if (accountDropdown) {
                accountDropdown.classList.add('hidden');
            }
        }
    }, 1500);
}

// Check and update authentication status on page load
function checkAuthStatus() {
    updateNavigationAuth();
}

// Export functions for use in other scripts
window.TrendoraApp = {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    toggleWishlist,
    showNotification,
    formatPrice,
    formatDate,
    validateForm,
    navigateToCategory,
    filterTrendingProducts,
    loadTrendingProducts,
    addToWishlist,
    quickView,
    startCountdown,
    updateNavigationAuth,
    handleLogout,
    checkAuthStatus
};
