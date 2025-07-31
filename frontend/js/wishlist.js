// Wishlist Management System for Trendora E-commerce

class WishlistManager {
    constructor() {
        this.storageKey = 'trendora_wishlist_items';
        this.init();
    }

    init() {
        this.updateWishlistCount();
        this.initializeEventListeners();
    }

    // Get wishlist items from localStorage
    getWishlistItems() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey)) || [];
        } catch (error) {
            console.error('Error loading wishlist:', error);
            return [];
        }
    }

    // Save wishlist items to localStorage
    saveWishlistItems(items) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(items));
            this.updateWishlistCount();
        } catch (error) {
            console.error('Error saving wishlist:', error);
        }
    }

    // Get product data from productManager or create fallback
    getProductData(productId) {
        // Try to get from global productManager first
        if (window.productManager && typeof window.productManager.getProductById === 'function') {
            const product = window.productManager.getProductById(productId);
            if (product) {
                return product;
            }
        }

        // Fallback product data
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

    // Add product to wishlist
    addToWishlist(productId, showNotification = true) {
        const wishlistItems = this.getWishlistItems();
        
        // Check if already exists
        if (wishlistItems.some(item => item.id === productId)) {
            if (showNotification) {
                this.showMessage('Product is already in wishlist!', 'warning');
            }
            return false;
        }

        // Get product data and add to wishlist
        const productData = this.getProductData(productId);
        if (productData) {
            wishlistItems.push(productData);
            this.saveWishlistItems(wishlistItems);
            this.updateWishlistButtons();
            if (showNotification) {
                this.showMessage('Added to wishlist!', 'success');
            }
            return true;
        }
        
        if (showNotification) {
            this.showMessage('Error adding to wishlist!', 'error');
        }
        return false;
    }

    // Remove product from wishlist
    removeFromWishlist(productId, showNotification = true) {
        const wishlistItems = this.getWishlistItems();
        const filteredItems = wishlistItems.filter(item => item.id !== productId);
        
        if (filteredItems.length < wishlistItems.length) {
            this.saveWishlistItems(filteredItems);
            this.updateWishlistButtons();
            if (showNotification) {
                this.showMessage('Removed from wishlist!', 'info');
            }
            return true;
        }
        
        return false;
    }

    // Toggle wishlist status
    toggleWishlist(productId) {
        // Clear any existing notifications first
        this.clearNotifications();
        
        const wishlistItems = this.getWishlistItems();
        const isInWishlist = wishlistItems.some(item => item.id === productId);
        
        if (isInWishlist) {
            return this.removeFromWishlist(productId, true);
        } else {
            return this.addToWishlist(productId, true);
        }
    }

    // Check if product is in wishlist
    isInWishlist(productId) {
        return this.getWishlistItems().some(item => item.id === productId);
    }

    // Update wishlist count in navigation
    updateWishlistCount() {
        const wishlistItems = this.getWishlistItems();
        const count = wishlistItems.length;
        
        // Update all wishlist count elements
        const countElements = document.querySelectorAll('#wishlistCount, #wishlist-count');
        countElements.forEach(element => {
            if (element) {
                element.textContent = count;
            }
        });
    }

    // Update wishlist button states
    updateWishlistButtons() {
        const wishlistItems = this.getWishlistItems();
        const wishlistIds = wishlistItems.map(item => item.id);
        
        document.querySelectorAll('.add-to-wishlist, .wishlist-btn').forEach(button => {
            const productId = button.getAttribute('data-product-id') || button.dataset.productId;
            if (!productId) return;
            
            const icon = button.querySelector('i');
            if (!icon) return;
            
            if (wishlistIds.includes(productId)) {
                // Product is in wishlist
                icon.classList.remove('far');
                icon.classList.add('fas', 'text-red-500');
                button.classList.add('text-red-500');
                button.title = 'Remove from Wishlist';
            } else {
                // Product not in wishlist
                icon.classList.remove('fas', 'text-red-500');
                icon.classList.add('far');
                button.classList.remove('text-red-500');
                button.title = 'Add to Wishlist';
            }
        });
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Use event delegation for dynamic content
        document.addEventListener('click', (e) => {
            // Handle wishlist button clicks
            if (e.target.closest('.add-to-wishlist') || e.target.closest('.wishlist-btn')) {
                e.preventDefault();
                const button = e.target.closest('.add-to-wishlist') || e.target.closest('.wishlist-btn');
                const productId = button.getAttribute('data-product-id') || button.dataset.productId;
                
                if (productId && !window.location.pathname.includes('wishlist.html')) {
                    this.toggleWishlist(productId);
                }
            }
        });

        // Update buttons when page loads
        setTimeout(() => {
            this.updateWishlistButtons();
        }, 100);
    }

    // Clear all existing notifications
    clearNotifications() {
        const existingNotifications = document.querySelectorAll('.wishlist-notification, .notification');
        existingNotifications.forEach(n => n.remove());
    }

    // Show notification message
    showMessage(message, type = 'info') {
        // Clear existing notifications first
        this.clearNotifications();

        const notification = document.createElement('div');
        notification.className = `wishlist-notification fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-medium z-50 transform translate-x-full transition-transform duration-300`;
        
        // Set color based on type
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };
        
        notification.classList.add(colors[type] || colors.info);
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // Load wishlist items for wishlist page
    loadWishlistPage() {
        const container = document.getElementById('wishlist-items');
        const emptyState = document.getElementById('empty-wishlist');
        
        if (!container) return;
        
        const wishlistItems = this.getWishlistItems();
        
        if (wishlistItems.length === 0) {
            container.innerHTML = '';
            if (emptyState) {
                emptyState.classList.remove('hidden');
            }
            return;
        }
        
        if (emptyState) {
            emptyState.classList.add('hidden');
        }
        
        container.innerHTML = wishlistItems.map(item => this.createWishlistItemHTML(item)).join('');
        this.attachWishlistPageEventListeners();
    }

    // Create HTML for wishlist item
    createWishlistItemHTML(item) {
        const discountPercentage = item.originalPrice ? 
            Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;

        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" data-id="${item.id}">
                <div class="relative">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
                    ${discountPercentage > 0 ? `<span class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">-${discountPercentage}%</span>` : ''}
                    <button class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors remove-wishlist" data-id="${item.id}">
                        <i class="fas fa-times text-sm"></i>
                    </button>
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">${item.name}</h3>
                    <div class="flex items-center mb-2">
                        <div class="flex text-yellow-400">
                            ${this.generateStars(item.rating || 4)}
                        </div>
                        <span class="text-sm text-gray-500 ml-1">(${item.reviews || 0})</span>
                    </div>
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <span class="text-lg font-bold text-gray-900">₹${item.price.toLocaleString()}</span>
                            ${item.originalPrice ? `<span class="text-sm text-gray-500 line-through ml-2">₹${item.originalPrice.toLocaleString()}</span>` : ''}
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button class="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors add-to-cart" data-id="${item.id}">
                            <i class="fas fa-shopping-cart mr-2"></i>
                            Add to Cart
                        </button>
                        <a href="product-details.html?id=${item.id}" class="flex items-center justify-center px-3 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                            <i class="fas fa-eye"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    // Generate star rating HTML
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        return stars;
    }

    // Attach event listeners for wishlist page
    attachWishlistPageEventListeners() {
        // Remove from wishlist
        document.querySelectorAll('.remove-wishlist').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.dataset.id;
                if (this.removeFromWishlist(productId)) {
                    this.loadWishlistPage(); // Reload the page
                }
            });
        });

        // Add to cart from wishlist
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.dataset.id;
                const wishlistItems = this.getWishlistItems();
                const product = wishlistItems.find(p => p.id === productId);
                
                if (product) {
                    this.addToCart(product);
                }
            });
        });
    }

    // Add product to cart
    addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('trendora_cart')) || {};
        
        if (cart[product.id]) {
            cart[product.id].quantity += 1;
        } else {
            cart[product.id] = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
                description: product.description || 'Product description'
            };
        }
        
        localStorage.setItem('trendora_cart', JSON.stringify(cart));
        this.updateCartCount();
        this.showMessage('Product added to cart!', 'success');
    }

    // Update cart count
    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('trendora_cart')) || {};
        const count = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
        
        const cartCountElements = document.querySelectorAll('#cartCount, #cart-count');
        cartCountElements.forEach(element => {
            if (element) {
                element.textContent = count;
            }
        });
    }
}

// Initialize wishlist manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.wishlistManager = new WishlistManager();
    
    // If we're on the wishlist page, load the items
    if (window.location.pathname.includes('wishlist.html')) {
        window.wishlistManager.loadWishlistPage();
    }
});

// Export for global access
window.WishlistManager = WishlistManager;
