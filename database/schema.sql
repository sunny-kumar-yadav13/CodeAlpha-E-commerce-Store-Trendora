-- Trendora E-commerce Database Schema
-- This file contains the database schema for the Trendora e-commerce platform

-- Enable foreign key constraints (for SQLite)
PRAGMA foreign_keys = ON;

-- Users table (Custom User Model)
CREATE TABLE IF NOT EXISTS auth_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    phone_number VARCHAR(15),
    is_active BOOLEAN DEFAULT 1,
    is_staff BOOLEAN DEFAULT 0,
    is_superuser BOOLEAN DEFAULT 0,
    is_verified BOOLEAN DEFAULT 0,
    date_joined DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_of_birth DATE,
    gender VARCHAR(10),
    newsletter_subscription BOOLEAN DEFAULT 1,
    marketing_emails BOOLEAN DEFAULT 1
);

-- User Profiles table
CREATE TABLE IF NOT EXISTS accounts_userprofile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    avatar VARCHAR(100),
    bio TEXT,
    website VARCHAR(200),
    location VARCHAR(100),
    instagram VARCHAR(200),
    twitter VARCHAR(200),
    facebook VARCHAR(200),
    profile_visibility VARCHAR(10) DEFAULT 'public',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE
);

-- Addresses table
CREATE TABLE IF NOT EXISTS accounts_address (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type VARCHAR(10) NOT NULL,
    is_default BOOLEAN DEFAULT 0,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state_province VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'United States',
    delivery_instructions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE
);

-- User Activities table
CREATE TABLE IF NOT EXISTS accounts_useractivity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    activity_type VARCHAR(20) NOT NULL,
    description TEXT,
    metadata TEXT, -- JSON field
    ip_address VARCHAR(39),
    user_agent TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE
);

-- Categories table
CREATE TABLE IF NOT EXISTS products_category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(100),
    parent_id INTEGER,
    meta_title VARCHAR(60),
    meta_description VARCHAR(160),
    is_active BOOLEAN DEFAULT 1,
    featured BOOLEAN DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES products_category(id) ON DELETE CASCADE
);

-- Brands table
CREATE TABLE IF NOT EXISTS products_brand (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    logo VARCHAR(100),
    website VARCHAR(200),
    is_active BOOLEAN DEFAULT 1,
    featured BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products_product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    short_description TEXT,
    category_id INTEGER NOT NULL,
    brand_id INTEGER,
    price DECIMAL(10,2) NOT NULL,
    compare_price DECIMAL(10,2),
    cost_price DECIMAL(10,2),
    stock_quantity INTEGER DEFAULT 0,
    stock_status VARCHAR(20) DEFAULT 'in_stock',
    track_inventory BOOLEAN DEFAULT 1,
    allow_backorders BOOLEAN DEFAULT 0,
    weight DECIMAL(8,2),
    length DECIMAL(8,2),
    width DECIMAL(8,2),
    height DECIMAL(8,2),
    meta_title VARCHAR(60),
    meta_description VARCHAR(160),
    is_active BOOLEAN DEFAULT 1,
    is_featured BOOLEAN DEFAULT 0,
    is_digital BOOLEAN DEFAULT 0,
    requires_shipping BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES products_category(id) ON DELETE PROTECT,
    FOREIGN KEY (brand_id) REFERENCES products_brand(id) ON DELETE SET NULL
);

-- Product Images table
CREATE TABLE IF NOT EXISTS products_productimage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    image VARCHAR(100) NOT NULL,
    alt_text VARCHAR(200),
    is_main BOOLEAN DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products_product(id) ON DELETE CASCADE
);

-- Product Variants table
CREATE TABLE IF NOT EXISTS products_productvariant (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(10,2),
    compare_price DECIMAL(10,2),
    stock_quantity INTEGER DEFAULT 0,
    options TEXT, -- JSON field
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products_product(id) ON DELETE CASCADE,
    UNIQUE(product_id, name)
);

-- Tags table
CREATE TABLE IF NOT EXISTS products_tag (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    color VARCHAR(7) DEFAULT '#007bff',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Product Tags (Many-to-Many)
CREATE TABLE IF NOT EXISTS products_product_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products_product(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES products_tag(id) ON DELETE CASCADE,
    UNIQUE(product_id, tag_id)
);

-- Product Attributes table
CREATE TABLE IF NOT EXISTS products_productattribute (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

-- Product Attribute Values table
CREATE TABLE IF NOT EXISTS products_productattributevalue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    attribute_id INTEGER NOT NULL,
    value VARCHAR(200) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products_product(id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES products_productattribute(id) ON DELETE CASCADE,
    UNIQUE(product_id, attribute_id)
);

-- Product Reviews table
CREATE TABLE IF NOT EXISTS products_productreview (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200) NOT NULL,
    comment TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT 0,
    is_verified_purchase BOOLEAN DEFAULT 0,
    helpful_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products_product(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE,
    UNIQUE(product_id, user_id)
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS products_wishlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_product(id) ON DELETE CASCADE,
    UNIQUE(user_id, product_id)
);

-- Shopping Cart table
CREATE TABLE IF NOT EXISTS cart_cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    session_key VARCHAR(40),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE
);

-- Cart Items table
CREATE TABLE IF NOT EXISTS cart_cartitem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    variant_id INTEGER,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES cart_cart(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_product(id) ON DELETE CASCADE,
    FOREIGN KEY (variant_id) REFERENCES products_productvariant(id) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders_order (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number VARCHAR(20) UNIQUE NOT NULL,
    user_id INTEGER,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    
    -- Billing Address
    billing_full_name VARCHAR(100) NOT NULL,
    billing_address_line_1 VARCHAR(255) NOT NULL,
    billing_address_line_2 VARCHAR(255),
    billing_city VARCHAR(100) NOT NULL,
    billing_state_province VARCHAR(100) NOT NULL,
    billing_postal_code VARCHAR(20) NOT NULL,
    billing_country VARCHAR(100) NOT NULL,
    billing_phone VARCHAR(15),
    
    -- Shipping Address
    shipping_full_name VARCHAR(100) NOT NULL,
    shipping_address_line_1 VARCHAR(255) NOT NULL,
    shipping_address_line_2 VARCHAR(255),
    shipping_city VARCHAR(100) NOT NULL,
    shipping_state_province VARCHAR(100) NOT NULL,
    shipping_postal_code VARCHAR(20) NOT NULL,
    shipping_country VARCHAR(100) NOT NULL,
    shipping_phone VARCHAR(15),
    
    payment_method VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'pending',
    notes TEXT,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE SET NULL
);

-- Order Items table
CREATE TABLE IF NOT EXISTS orders_orderitem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    variant_id INTEGER,
    product_name VARCHAR(200) NOT NULL,
    product_sku VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders_order(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products_product(id) ON DELETE PROTECT,
    FOREIGN KEY (variant_id) REFERENCES products_productvariant(id) ON DELETE PROTECT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_auth_user_email ON auth_user(email);
CREATE INDEX IF NOT EXISTS idx_auth_user_is_active ON auth_user(is_active);
CREATE INDEX IF NOT EXISTS idx_products_product_category ON products_product(category_id, is_active);
CREATE INDEX IF NOT EXISTS idx_products_product_brand ON products_product(brand_id, is_active);
CREATE INDEX IF NOT EXISTS idx_products_product_featured ON products_product(is_featured, is_active);
CREATE INDEX IF NOT EXISTS idx_products_product_slug ON products_product(slug);
CREATE INDEX IF NOT EXISTS idx_products_product_sku ON products_product(sku);
CREATE INDEX IF NOT EXISTS idx_orders_order_user ON orders_order(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON orders_order(status);
CREATE INDEX IF NOT EXISTS idx_accounts_useractivity_user_timestamp ON accounts_useractivity(user_id, timestamp);

-- Insert some sample data
INSERT OR IGNORE INTO products_category (name, slug, description, is_active, featured) VALUES
('Women''s Fashion', 'womens-fashion', 'Latest trends in women''s clothing and accessories', 1, 1),
('Men''s Fashion', 'mens-fashion', 'Contemporary styles for modern men', 1, 1),
('Accessories', 'accessories', 'Fashion accessories to complete your look', 1, 1),
('Footwear', 'footwear', 'Shoes and sandals for every occasion', 1, 1);

INSERT OR IGNORE INTO products_brand (name, slug, description, is_active, featured) VALUES
('Trendora Collection', 'trendora-collection', 'Our exclusive in-house brand', 1, 1),
('Urban Style', 'urban-style', 'Modern urban fashion brand', 1, 0),
('Classic Elegance', 'classic-elegance', 'Timeless elegant designs', 1, 0);

INSERT OR IGNORE INTO products_tag (name, slug, color) VALUES
('New Arrival', 'new-arrival', '#28a745'),
('Best Seller', 'best-seller', '#dc3545'),
('Limited Edition', 'limited-edition', '#ffc107'),
('Eco Friendly', 'eco-friendly', '#20c997');

-- Create a sample admin user (password: admin123)
-- Note: In production, use proper password hashing
INSERT OR IGNORE INTO auth_user (
    email, password, first_name, last_name, is_active, is_staff, is_superuser, is_verified
) VALUES (
    'admin@trendora.com', 
    'pbkdf2_sha256$600000$your-hashed-password-here',
    'Admin', 
    'User',
    1, 1, 1, 1
);
