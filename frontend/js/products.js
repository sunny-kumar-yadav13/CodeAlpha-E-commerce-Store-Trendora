// Products JavaScript for Trendora E-commerce Website

// Dummy Product Data (In a real app, this would come from API)
const dummyProducts = [
    {
        id: '1',
        name: 'Premium Women\'s Blazer',
        description: 'Elegant and professional blazer perfect for office wear and formal occasions.',
        price: 1459, // 20% of 7299
        originalPrice: 8999, // 90% of 9999
        category: 'women',
        subcategory: 'blazers',
        rating: 4.5,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 25,
        tags: ['professional', 'elegant', 'formal'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'Gray'],
        badge: 'sale',
        featured: true,
        trending: true
    },
    {
        id: '2',
        name: 'Men\'s Casual Sneakers',
        description: 'Comfortable and stylish sneakers for everyday wear.',
        price: 1100, // 20% of 5499
        originalPrice: 6299, // 90% of 6999
        category: 'men',
        subcategory: 'shoes',
        rating: 4.2,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 15,
        tags: ['casual', 'comfortable', 'everyday'],
        sizes: ['7', '8', '9', '10', '11', '12'],
        colors: ['White', 'Black', 'Blue'],
        badge: 'new',
        featured: false,
        trending: true
    },
    {
        id: '3',
        name: 'Designer Handbag',
        description: 'Luxury handbag made from premium leather with elegant design.',
        price: 2500, // 20% of 12500
        originalPrice: null,
        category: 'accessories',
        subcategory: 'bags',
        rating: 4.8,
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 8,
        tags: ['luxury', 'leather', 'designer'],
        sizes: ['One Size'],
        colors: ['Brown', 'Black', 'Tan'],
        badge: 'featured',
        featured: true,
        trending: false
    },
    {
        id: '4',
        name: 'Stylish Sunglasses',
        description: 'UV protection sunglasses with modern frame design.',
        price: 760, // 20% of 3799
        originalPrice: 4499, // 90% of 4999
        category: 'accessories',
        subcategory: 'sunglasses',
        rating: 4.0,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 30,
        tags: ['stylish', 'uv-protection', 'modern'],
        sizes: ['One Size'],
        colors: ['Black', 'Brown', 'Silver'],
        badge: 'sale',
        featured: false,
        trending: true
    },
    {
        id: '5',
        name: 'Women\'s Summer Dress',
        description: 'Light and breezy summer dress perfect for warm weather.',
        price: 920, // 20% of 4599
        originalPrice: null,
        category: 'women',
        subcategory: 'dresses',
        rating: 4.6,
        reviews: 98,
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 20,
        tags: ['summer', 'light', 'breezy'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Blue', 'Pink', 'White', 'Yellow'],
        badge: 'new',
        featured: true,
        trending: true
    },
    {
        id: '6',
        name: 'Men\'s Leather Jacket',
        description: 'Classic leather jacket with modern styling and premium quality.',
        price: 3340, // 20% of 16699
        originalPrice: 20999,
        category: 'men',
        subcategory: 'jackets',
        rating: 4.7,
        reviews: 45,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 12,
        tags: ['classic', 'leather', 'premium'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Brown'],
        badge: 'featured',
        featured: true,
        trending: false
    },
    {
        id: '7',
        name: 'Athletic Running Shoes',
        description: 'High-performance running shoes with advanced cushioning technology.',
        price: 2000, // 20% of 9999
        originalPrice: null,
        category: 'sports',
        subcategory: 'shoes',
        rating: 4.4,
        reviews: 201,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 35,
        tags: ['athletic', 'running', 'performance'],
        sizes: ['6', '7', '8', '9', '10', '11', '12'],
        colors: ['Red', 'Blue', 'Black', 'White'],
        badge: 'new',
        featured: false,
        trending: true
    },
    {
        id: '8',
        name: 'Vintage Watch',
        description: 'Elegant vintage-style watch with leather strap and classic design.',
        price: 1420, // 20% of 7099
        originalPrice: 9199,
        category: 'accessories',
        subcategory: 'watches',
        rating: 4.3,
        reviews: 73,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 18,
        tags: ['vintage', 'elegant', 'classic'],
        sizes: ['One Size'],
        colors: ['Brown', 'Black'],
        badge: 'sale',
        featured: true,
        trending: false
    },
    // Add more products
    {
        id: '9',
        name: 'Casual T-Shirt',
        description: 'Comfortable cotton t-shirt perfect for daily wear.',
        price: 260, // 20% of 1299
        originalPrice: 1699,
        category: 'men',
        subcategory: 't-shirts',
        rating: 4.1,
        reviews: 342,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 50,
        tags: ['casual', 'cotton', 'comfortable'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Black', 'Navy', 'Gray'],
        badge: 'new',
        featured: false,
        trending: true
    },
    {
        id: '10',
        name: 'Women\'s Jeans',
        description: 'Stylish high-waisted jeans with perfect fit.',
        price: 700, // 20% of 3499
        originalPrice: 4299,
        category: 'women',
        subcategory: 'jeans',
        rating: 4.4,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 28,
        tags: ['denim', 'high-waisted', 'stylish'],
        sizes: ['26', '28', '30', '32', '34'],
        colors: ['Blue', 'Black', 'Light Blue'],
        badge: 'sale',
        featured: true,
        trending: true
    },
    {
        id: '11',
        name: 'Sports Cap',
        description: 'Adjustable sports cap with UV protection.',
        price: 180, // 20% of 899
        originalPrice: null,
        category: 'accessories',
        subcategory: 'caps',
        rating: 4.0,
        reviews: 127,
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 45,
        tags: ['sports', 'cap', 'adjustable'],
        sizes: ['One Size'],
        colors: ['Black', 'White', 'Red', 'Blue'],
        badge: 'new',
        featured: false,
        trending: false
    },
    {
        id: '12',
        name: 'Formal Shirt',
        description: 'Premium cotton formal shirt for professional look.',
        price: 460, // 20% of 2299
        originalPrice: 2899,
        category: 'men',
        subcategory: 'shirts',
        rating: 4.5,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 33,
        tags: ['formal', 'cotton', 'professional'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Blue', 'Pink', 'Gray'],
        badge: 'featured',
        featured: true,
        trending: false
    },
    {
        id: '13',
        name: 'Women\'s Kurti',
        description: 'Traditional Indian kurti with modern design.',
        price: 380, // 20% of 1899
        originalPrice: 2499,
        category: 'women',
        subcategory: 'ethnic',
        rating: 4.6,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 22,
        tags: ['ethnic', 'traditional', 'kurti'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Pink', 'Blue', 'Green', 'Yellow'],
        badge: 'sale',
        featured: true,
        trending: true
    },
    {
        id: '14',
        name: 'Gaming Headphones',
        description: 'High-quality gaming headphones with noise cancellation.',
        price: 1000, // 20% of 4999
        originalPrice: 6499,
        category: 'electronics',
        subcategory: 'headphones',
        rating: 4.7,
        reviews: 289,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 17,
        tags: ['gaming', 'headphones', 'electronics'],
        sizes: ['One Size'],
        colors: ['Black', 'Red', 'Blue'],
        badge: 'featured',
        featured: true,
        trending: true
    },
    {
        id: '15',
        name: 'Workout Shorts',
        description: 'Comfortable athletic shorts for gym and sports.',
        price: 300, // 20% of 1499
        originalPrice: null,
        category: 'sports',
        subcategory: 'shorts',
        rating: 4.2,
        reviews: 198,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        images: [
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ],
        inStock: true,
        stockCount: 41,
        tags: ['sports', 'shorts', 'athletic'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Gray', 'Navy', 'Red'],
        badge: 'new',
        featured: false,
        trending: true
    }
];

// Product Management Functions
class ProductManager {
    constructor() {
        this.products = dummyProducts;
        this.filteredProducts = [...this.products];
        this.currentFilters = {
            category: '',
            priceRange: { min: 0, max: 50000 },
            rating: 0,
            inStock: false,
            search: '',
            sortBy: 'name'
        };
    }

    // Get all products
    getAllProducts() {
        return this.products;
    }

    // Get product by ID
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    // Get products by category
    getProductsByCategory(category) {
        return this.products.filter(product => product.category === category);
    }

    // Get featured products
    getFeaturedProducts(limit = 8) {
        return this.products.filter(product => product.featured).slice(0, limit);
    }

    // Get trending products
    getTrendingProducts(limit = 8) {
        return this.products.filter(product => product.trending).slice(0, limit);
    }

    // Search products
    searchProducts(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(lowercaseQuery) ||
            product.description.toLowerCase().includes(lowercaseQuery) ||
            product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
            product.category.toLowerCase().includes(lowercaseQuery)
        );
    }

    // Filter products
    filterProducts(filters = {}) {
        this.currentFilters = { ...this.currentFilters, ...filters };
        
        let filtered = [...this.products];

        // Category filter
        if (this.currentFilters.category) {
            filtered = filtered.filter(product => product.category === this.currentFilters.category);
        }

        // Price range filter - handle both predefined ranges and custom min/max
        if (filters.priceRange) {
            const priceRange = this.parsePriceRange(filters.priceRange);
            if (priceRange) {
                filtered = filtered.filter(product => 
                    product.price >= priceRange.min && 
                    product.price <= priceRange.max
                );
            }
        } else {
            // Use custom min/max prices
            const minPrice = filters.minPrice || 0;
            const maxPrice = filters.maxPrice || 50000;
            filtered = filtered.filter(product => 
                product.price >= minPrice && 
                product.price <= maxPrice
            );
        }

        // Rating filter
        if (this.currentFilters.rating > 0) {
            filtered = filtered.filter(product => product.rating >= this.currentFilters.rating);
        }

        // In stock filter
        if (this.currentFilters.inStock) {
            filtered = filtered.filter(product => product.inStock);
        }

        // Search filter
        if (this.currentFilters.search) {
            const query = this.currentFilters.search.toLowerCase();
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Sort products
        filtered = this.sortProducts(filtered, this.currentFilters.sortBy);

        this.filteredProducts = filtered;
        return filtered;
    }

    // Sort products
    sortProducts(products, sortBy) {
        const sortedProducts = [...products];
        
        switch (sortBy) {
            case 'name':
                return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            case 'price-low':
                return sortedProducts.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sortedProducts.sort((a, b) => b.price - a.price);
            case 'rating':
                return sortedProducts.sort((a, b) => b.rating - a.rating);
            case 'newest':
                return sortedProducts.sort((a, b) => parseInt(b.id) - parseInt(a.id));
            case 'popular':
                return sortedProducts.sort((a, b) => b.reviews - a.reviews);
            default:
                return sortedProducts;
        }
    }

    // Get categories
    getCategories() {
        const categories = [...new Set(this.products.map(product => product.category))];
        return categories.map(category => ({
            name: category,
            count: this.products.filter(product => product.category === category).length
        }));
    }

    // Get price range
    getPriceRange() {
        const prices = this.products.map(product => product.price);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    }

    // Parse price range from filter string
    parsePriceRange(rangeString) {
        switch (rangeString) {
            case '0-4000':
                return { min: 0, max: 4000 };
            case '4000-8000':
                return { min: 4000, max: 8000 };
            case '8000-16000':
                return { min: 8000, max: 16000 };
            case '16000+':
                return { min: 16000, max: 50000 };
            default:
                return null;
        }
    }
}

// Initialize ProductManager
const productManager = new ProductManager();

// DOM Ready Functions
document.addEventListener('DOMContentLoaded', function() {
    loadTrendingProducts();
    initializeProductInteractions();
});

// Load trending products on homepage
function loadTrendingProducts() {
    const trendingContainer = document.getElementById('trendingProducts');
    if (trendingContainer) {
        const trendingProducts = productManager.getTrendingProducts(4);
        trendingContainer.innerHTML = trendingProducts.map(product => createProductCard(product)).join('');
        
        // Update wishlist buttons after loading products
        setTimeout(updateWishlistButtons, 100);
    }
}

// Create product card HTML
function createProductCard(product) {
    const discountPercentage = product.originalPrice ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    const wishlistItems = JSON.parse(localStorage.getItem('trendora_wishlist_items') || '[]');
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    
    return `
        <div class="product-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
            <div class="product-image relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
                
                <!-- Badge -->
                ${product.badge ? `<span class="badge ${product.badge} absolute top-2 left-2">${product.badge}</span>` : ''}
                
                <!-- Discount Badge -->
                ${discountPercentage > 0 ? `<span class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">-${discountPercentage}%</span>` : ''}
                
                <!-- Product Overlay -->
                <div class="product-overlay">
                    <button class="add-to-wishlist" data-product-id="${product.id}" title="Add to Wishlist">
                        <i class="${isInWishlist ? 'fas' : 'far'} fa-heart ${isInWishlist ? 'text-red-500' : ''}"></i>
                    </button>
                    <button class="quick-view" data-product-id="${product.id}" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="add-to-cart" data-product-id="${product.id}" title="Add to Cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-4">
                <div class="flex items-center mb-2">
                    <div class="rating">
                        ${generateStarRating(product.rating)}
                    </div>
                    <span class="text-sm text-gray-500 ml-2">(${product.reviews})</span>
                </div>
                
                <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-3 line-clamp-2">${product.description}</p>
                
                <div class="flex items-center justify-between">
                    <div class="price-container">
                        <span class="price text-primary font-bold text-xl">₹${product.price.toLocaleString('en-IN')}</span>
                        ${product.originalPrice ? `<span class="price original text-sm ml-2">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                    </div>
                    
                    <button class="add-to-cart btn-primary px-4 py-2 text-sm rounded-lg" data-product-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
                
                <!-- Stock Status -->
                <div class="mt-2">
                    ${product.inStock ? 
                        `<span class="text-green-600 text-sm"><i class="fas fa-check-circle"></i> In Stock (${product.stockCount})</span>` :
                        `<span class="text-red-600 text-sm"><i class="fas fa-times-circle"></i> Out of Stock</span>`
                    }
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStarRating(rating, interactive = false) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += `<i class="fas fa-star star filled"></i>`;
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += `<i class="fas fa-star-half-alt star filled"></i>`;
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += `<i class="far fa-star star"></i>`;
    }
    
    return starsHTML;
}

// Initialize product interactions
function initializeProductInteractions() {
    // Only add event listener if main.js hasn't already added one
    if (!window.cartEventListenerAdded) {
        // Add event delegation for dynamically added product cards
        document.addEventListener('click', function(e) {
            // Handle add to cart
            if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
                const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
                const productId = button.getAttribute('data-product-id');
                // Prevent multiple additions by checking if event is already being handled
                if (!e.cartHandled) {
                    e.cartHandled = true;
                    handleAddToCart(productId);
                }
            }
            
            // Handle add to wishlist
            if (e.target.classList.contains('add-to-wishlist') || e.target.closest('.add-to-wishlist')) {
                const button = e.target.classList.contains('add-to-wishlist') ? e.target : e.target.closest('.add-to-wishlist');
                const productId = button.getAttribute('data-product-id');
                handleAddToWishlist(productId);
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

// Handle add to cart
function handleAddToCart(productId) {
    const product = productManager.getProductById(productId);
    if (product && product.inStock) {
        // Use the global addToCart function from main.js
        if (window.TrendoraApp && window.TrendoraApp.addToCart) {
            window.TrendoraApp.addToCart(productId);
        } else {
            addToCart(productId);
        }
    } else {
        showNotification('Product is out of stock!', 'error');
    }
}

// Handle add to wishlist
function handleAddToWishlist(productId) {
    // Use the global toggleWishlist function from main.js
    if (window.TrendoraApp && window.TrendoraApp.toggleWishlist) {
        window.TrendoraApp.toggleWishlist(productId);
    } else {
        toggleWishlist(productId);
    }
}

// Quick view function
function quickView(productId) {
    const product = productManager.getProductById(productId);
    if (product) {
        // Directly navigate to product details page
        window.location.href = `pages/product-details.html?id=${productId}`;
    }
}

// Load products for products page
function loadProductsPage(filters = {}) {
    const productsContainer = document.getElementById('productsContainer');
    if (productsContainer) {
        showLoadingSpinner(productsContainer);
        
        setTimeout(() => {
            const filteredProducts = productManager.filterProducts(filters);
            productsContainer.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
            
            // Update pagination and product count
            updateProductCount(filteredProducts.length);
            updateWishlistButtons();
        }, 500);
    }
}

// Show loading spinner
function showLoadingSpinner(container) {
    container.innerHTML = `
        <div class="col-span-full flex justify-center items-center py-12">
            <div class="loading-spinner"></div>
        </div>
    `;
}

// Update product count
function updateProductCount(count) {
    const countElement = document.getElementById('productCount');
    if (countElement) {
        countElement.textContent = `${count} Products Found`;
    }
}

// Export for use in other scripts
window.ProductManager = ProductManager;
window.productManager = productManager;
window.loadProductsPage = loadProductsPage;
