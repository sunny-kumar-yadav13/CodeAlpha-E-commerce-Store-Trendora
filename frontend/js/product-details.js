// Product Details Page JavaScript
class ProductDetailsManager {
    constructor() {
        this.productId = null;
        this.currentProduct = null;
        this.init();
    }

    init() {
        // Extract product ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        this.productId = urlParams.get('id');
        
        // Load product details
        this.loadProductDetails();
        
        // Load related products
        this.loadRelatedProducts();
        
        // Initialize event listeners
        this.initEventListeners();
    }

    loadProductDetails() {
        const loadingSpinner = document.getElementById('loadingSpinner');
        const productNotFound = document.getElementById('productNotFound');
        const staticProductDetails = document.getElementById('staticProductDetails');
        const productDetailsContainer = document.getElementById('productDetailsContainer');
        
        // Simulate loading time
        setTimeout(() => {
            if (this.productId && window.productManager) {
                this.currentProduct = window.productManager.getProductById(this.productId);
                
                if (this.currentProduct) {
                    // Hide loading spinner and static content
                    loadingSpinner.style.display = 'none';
                    if (staticProductDetails) {
                        staticProductDetails.style.display = 'none';
                    }
                    
                    // Render dynamic product details
                    this.renderProductDetails();
                    
                    // Update breadcrumb
                    this.updateBreadcrumb();
                    
                    // Update page title
                    document.title = `${this.currentProduct.name} - Trendora`;
                } else {
                    // Product ID provided but product not found
                    loadingSpinner.style.display = 'none';
                    if (staticProductDetails) {
                        staticProductDetails.style.display = 'none';
                    }
                    productNotFound.classList.remove('hidden');
                }
            } else {
                // No product ID or productManager not available - show static content
                loadingSpinner.style.display = 'none';
                if (staticProductDetails) {
                    staticProductDetails.style.display = 'block';
                }
                // Update page title for static content
                document.title = 'Premium Women\'s Blazer - Trendora';
                
                // Update breadcrumb for static content
                const breadcrumbElement = document.getElementById('breadcrumbProduct');
                if (breadcrumbElement) {
                    breadcrumbElement.textContent = 'Premium Women\'s Blazer';
                }
            }
        }, 500);
    }

    renderProductDetails() {
        const container = document.getElementById('productDetailsContainer');
        const product = this.currentProduct;
        
        const discountPercentage = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
        
        const wishlistItems = JSON.parse(localStorage.getItem('trendora_wishlist_items') || '[]');
        const isInWishlist = wishlistItems.some(item => item.id === product.id);
        
        const productHTML = `
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    <!-- Product Images -->
                    <div class="space-y-4">
                        <div class="relative">
                            <img src="${product.image}" alt="${product.name}" 
                                 class="w-full h-96 object-cover rounded-lg">
                            ${product.badge ? `<span class="badge ${product.badge} absolute top-4 left-4">${product.badge}</span>` : ''}
                            ${discountPercentage > 0 ? `<span class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">-${discountPercentage}%</span>` : ''}
                        </div>
                        
                        <!-- Additional Images -->
                        <div class="grid grid-cols-3 gap-2">
                            ${product.images ? product.images.slice(0, 3).map(img => `
                                <img src="${img}" alt="${product.name}" 
                                     class="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity">
                            `).join('') : ''}
                        </div>
                    </div>
                    
                    <!-- Product Info -->
                    <div class="space-y-6">
                        <!-- Title and Rating -->
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900 mb-2">${product.name}</h1>
                            <div class="flex items-center space-x-2 mb-4">
                                <div class="flex items-center">
                                    ${this.generateStarRating(product.rating)}
                                </div>
                                <span class="text-sm text-gray-500">(${product.reviews} reviews)</span>
                                <span class="text-sm text-gray-400">•</span>
                                <span class="text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}">
                                    ${product.inStock ? `In Stock (${product.stockCount})` : 'Out of Stock'}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Price -->
                        <div class="border-t border-b border-gray-200 py-4">
                            <div class="flex items-center space-x-3">
                                <span class="text-3xl font-bold text-primary">₹${product.price.toLocaleString('en-IN')}</span>
                                ${product.originalPrice ? `<span class="text-xl text-gray-500 line-through">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                            </div>
                            ${discountPercentage > 0 ? `<p class="text-green-600 font-medium mt-1">You save ₹${(product.originalPrice - product.price).toLocaleString('en-IN')} (${discountPercentage}%)</p>` : ''}
                        </div>
                        
                        <!-- Description -->
                        <div>
                            <h3 class="text-lg font-semibold mb-2">Description</h3>
                            <p class="text-gray-700 leading-relaxed">${product.description}</p>
                        </div>
                        
                        <!-- Product Details -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">Available Sizes</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${product.sizes ? product.sizes.map(size => `
                                        <button class="px-3 py-1 border border-gray-300 rounded hover:border-primary hover:text-primary transition-colors">
                                            ${size}
                                        </button>
                                    `).join('') : '<span class="text-gray-500">One Size</span>'}
                                </div>
                            </div>
                            
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">Available Colors</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${product.colors ? product.colors.map(color => `
                                        <div class="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer hover:border-primary transition-colors"
                                             style="background-color: ${this.getColorCode(color)}" title="${color}">
                                        </div>
                                    `).join('') : '<span class="text-gray-500">Default</span>'}
                                </div>
                            </div>
                        </div>
                        
                        <!-- Tags -->
                        ${product.tags ? `
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">Tags</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${product.tags.map(tag => `
                                        <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">${tag}</span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        <!-- Quantity Selector -->
                        <div class="mb-6">
                            <h4 class="font-semibold text-gray-900 mb-3">Quantity</h4>
                            <div class="flex items-center space-x-3">
                                <button class="quantity-btn decrease w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors">
                                    <i class="fas fa-minus text-sm"></i>
                                </button>
                                <input type="number" id="quantity-input" value="1" min="1" max="${product.stockCount || 10}" 
                                       class="w-16 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                                <button class="quantity-btn increase w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors">
                                    <i class="fas fa-plus text-sm"></i>
                                </button>
                                <span class="text-sm text-gray-500 ml-3">${product.stockCount ? `(${product.stockCount} available)` : ''}</span>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="pt-4 space-y-3">
                            <!-- Add to Cart Button -->
                            <button class="add-to-cart w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}" 
                                    data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                                <i class="fas fa-shopping-cart mr-3 text-xl"></i>
                                <span>${product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                                <i class="fas fa-arrow-right ml-3"></i>
                            </button>
                            
                            <!-- Buy Now Button -->
                            <button class="buy-now w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}" 
                                    data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                                <i class="fas fa-bolt mr-3 text-xl"></i>
                                <span>${product.inStock ? 'Buy Now' : 'Out of Stock'}</span>
                                <i class="fas fa-credit-card ml-3"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = productHTML;
    }

    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let starsHTML = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHTML += `<i class="fas fa-star text-yellow-400"></i>`;
        }
        
        // Half star
        if (hasHalfStar) {
            starsHTML += `<i class="fas fa-star-half-alt text-yellow-400"></i>`;
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += `<i class="far fa-star text-yellow-400"></i>`;
        }
        
        return starsHTML;
    }

    getColorCode(colorName) {
        const colorMap = {
            'black': '#000000',
            'white': '#ffffff',
            'red': '#ef4444',
            'blue': '#3b82f6',
            'green': '#10b981',
            'yellow': '#f59e0b',
            'pink': '#ec4899',
            'purple': '#8b5cf6',
            'gray': '#6b7280',
            'brown': '#92400e',
            'navy': '#1e3a8a',
            'tan': '#d2b48c',
            'silver': '#c0c0c0'
        };
        return colorMap[colorName.toLowerCase()] || '#6b7280';
    }

    updateBreadcrumb() {
        const breadcrumbElement = document.getElementById('breadcrumbProduct');
        if (breadcrumbElement && this.currentProduct) {
            breadcrumbElement.textContent = this.currentProduct.name;
        }
    }

    loadRelatedProducts() {
        if (window.productManager) {
            // Get products from same category or trending products
            let relatedProducts = [];
            
            if (this.currentProduct) {
                // Try to get products from same category
                relatedProducts = window.productManager.getProductsByCategory(this.currentProduct.category)
                    .filter(p => p.id !== this.currentProduct.id)
                    .slice(0, 4);
            }
            
            // If not enough related products, fill with trending products
            if (relatedProducts.length < 4) {
                const trendingProducts = window.productManager.getTrendingProducts(8)
                    .filter(p => !this.currentProduct || p.id !== this.currentProduct.id);
                relatedProducts = [...relatedProducts, ...trendingProducts].slice(0, 4);
            }
            
            const container = document.getElementById('relatedProducts');
            if (container && window.createProductCard) {
                container.innerHTML = relatedProducts
                    .map(product => window.createProductCard(product))
                    .join('');
                    
                // Update wishlist buttons after loading
                setTimeout(() => {
                    if (window.updateWishlistButtons) {
                        window.updateWishlistButtons();
                    }
                }, 100);
            }
        }
    }

    initEventListeners() {
        // Handle size selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.size-btn')) {
                document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
                e.target.closest('.size-btn').classList.add('selected');
            }
            
            // Handle quantity buttons
            if (e.target.closest('.quantity-btn')) {
                const button = e.target.closest('.quantity-btn');
                const quantityInput = document.getElementById('quantity-input');
                if (quantityInput) {
                    let currentValue = parseInt(quantityInput.value) || 1;
                    const max = parseInt(quantityInput.getAttribute('max')) || 10;
                    const min = parseInt(quantityInput.getAttribute('min')) || 1;
                    
                    if (button.classList.contains('increase') && currentValue < max) {
                        quantityInput.value = currentValue + 1;
                    } else if (button.classList.contains('decrease') && currentValue > min) {
                        quantityInput.value = currentValue - 1;
                    }
                }
            }
            
            
            // Handle Buy Now button
            if (e.target.closest('.buy-now')) {
                const button = e.target.closest('.buy-now');
                const productId = button.getAttribute('data-product-id');
                const quantityInput = document.getElementById('quantity-input');
                const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
                
                // Add to cart first
                if (window.TrendoraApp && window.TrendoraApp.addToCart) {
                    window.TrendoraApp.addToCart(productId, quantity);
                }
                
                // Add visual feedback
                button.innerHTML = `
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Processing...</span>
                `;
                
                // Redirect to checkout page immediately
                setTimeout(() => {
                    window.location.href = 'checkout.html';
                }, 500);
            }
        });
        
        // Handle quantity input changes
        document.addEventListener('change', (e) => {
            if (e.target.id === 'quantity-input') {
                const input = e.target;
                const max = parseInt(input.getAttribute('max')) || 10;
                const min = parseInt(input.getAttribute('min')) || 1;
                let value = parseInt(input.value) || 1;
                
                if (value > max) {
                    value = max;
                } else if (value < min) {
                    value = min;
                }
                
                input.value = value;
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductDetailsManager();
});

