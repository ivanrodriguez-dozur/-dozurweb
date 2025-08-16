// TiendaOnline Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Set up page transitions
    setupPageTransitions();
    
    // Initialize shopping page functionality
    setupCategoryFilters();
    setupFavoriteButtons();
    setupCountdownTimer();
    setupProductInteractions();
    
    // Initialize accessibility features
    setupAccessibility();
    
    console.log('TiendaOnline initialized successfully');
}

// Page Transitions
function setupPageTransitions() {
    const startShoppingBtn = document.getElementById('start-shopping-btn');
    const landingPage = document.getElementById('landing-page');
    const shoppingPage = document.getElementById('shopping-page');
    
    if (startShoppingBtn) {
        startShoppingBtn.addEventListener('click', function() {
            // Add loading state
            this.classList.add('loading');
            this.disabled = true;
            
            // Animate transition
            setTimeout(() => {
                landingPage.style.transform = 'translateY(-100%)';
                landingPage.style.opacity = '0';
                
                setTimeout(() => {
                    landingPage.classList.add('hidden');
                    shoppingPage.classList.remove('hidden');
                    shoppingPage.classList.add('page-transition');
                    
                    // Reset button state
                    startShoppingBtn.classList.remove('loading');
                    startShoppingBtn.disabled = false;
                }, 300);
            }, 500);
        });
    }
}

// Category Filter Functionality
function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('bg-gray-200', 'text-gray-700');
                btn.classList.remove('bg-black', 'text-white');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.classList.remove('bg-gray-200', 'text-gray-700');
            this.classList.add('bg-black', 'text-white');
            
            // Filter products (simulate filtering)
            const category = this.dataset.category;
            filterProducts(category);
            
            // Announce to screen readers
            announceToScreenReader(`Categoría ${this.textContent} seleccionada`);
        });
    });
}

// Product Filtering (Simulated)
function filterProducts(category) {
    const productGrid = document.querySelector('.grid');
    const products = productGrid.querySelectorAll('.bg-white');
    
    // Add loading animation
    productGrid.style.opacity = '0.7';
    
    setTimeout(() => {
        // Simulate filtering logic
        products.forEach((product, index) => {
            product.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s both`;
        });
        
        productGrid.style.opacity = '1';
        
        // Update section title based on category
        const sectionTitle = document.querySelector('h2');
        if (sectionTitle) {
            const categoryNames = {
                'popular': 'Producto Popular',
                'chaqueta': 'Chaquetas',
                'zapatos': 'Zapatos',
                'pantalones': 'Pantalones',
                'accesorios': 'Accesorios'
            };
            sectionTitle.textContent = categoryNames[category] || 'Productos';
        }
    }, 300);
}

// Favorite Button Functionality
function setupFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const svg = this.querySelector('svg');
            const isActive = this.classList.contains('active');
            
            if (isActive) {
                // Remove from favorites
                this.classList.remove('active');
                svg.style.fill = 'none';
                svg.style.color = '#9ca3af';
                announceToScreenReader('Producto removido de favoritos');
            } else {
                // Add to favorites
                this.classList.add('active');
                svg.style.fill = '#ef4444';
                svg.style.color = '#ef4444';
                announceToScreenReader('Producto agregado a favoritos');
                
                // Add heart animation
                this.style.animation = 'heartBeat 0.6s ease-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            }
            
            // Update favorites count (simulate)
            updateFavoritesCount();
        });
    });
}

// Countdown Timer Functionality
function setupCountdownTimer() {
    const countdownElement = document.querySelector('.bg-lime-custom');
    
    if (countdownElement && countdownElement.textContent.includes('h')) {
        let hours = 10;
        let minutes = 4;
        let seconds = 0;
        
        const updateCountdown = () => {
            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else if (hours > 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            }
            
            const formattedTime = `${hours}h ${minutes}m ${seconds}s`;
            countdownElement.textContent = formattedTime;
            
            // Add pulse animation when time is low
            if (hours === 0 && minutes < 5) {
                countdownElement.classList.add('countdown-badge');
            }
        };
        
        // Update every second
        setInterval(updateCountdown, 1000);
    }
}

// Product Interaction Setup
function setupProductInteractions() {
    const productCards = document.querySelectorAll('.bg-white.rounded-2xl');
    
    productCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.classList.add('product-card');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('product-card');
        });
        
        // Add click functionality
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking favorite button
            if (e.target.closest('.favorite-btn')) return;
            
            const productName = this.querySelector('h3').textContent;
            const productPrice = this.querySelector('.bg-black').textContent;
            
            // Simulate product view
            showProductModal(productName, productPrice);
        });
        
        // Add keyboard navigation
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Ver detalles del producto ${card.querySelector('h3').textContent}`);
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Product Modal (Simulated)
function showProductModal(name, price) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-6 max-w-sm w-full transform transition-all duration-300 scale-95">
            <div class="text-center">
                <h3 class="text-xl font-bold mb-2">${name}</h3>
                <p class="text-2xl font-bold text-lime-custom mb-4">${price}</p>
                <p class="text-gray-600 mb-6">¡Producto agregado a tu carrito!</p>
                <button class="bg-lime-custom text-black px-6 py-3 rounded-full font-semibold hover:bg-lime-400 transition-colors" onclick="closeModal()">
                    Continuar Comprando
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.querySelector('div').style.transform = 'scale(1)';
    }, 10);
    
    // Auto close after 3 seconds
    setTimeout(() => {
        closeModal();
    }, 3000);
    
    // Close on click outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close Modal Function
function closeModal() {
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
        modal.querySelector('div').style.transform = 'scale(0.95)';
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Bottom Navigation Functionality
function setupBottomNavigation() {
    const navButtons = document.querySelectorAll('.bottom-nav button');
    
    navButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Remove active state from all buttons
            navButtons.forEach(btn => {
                btn.classList.remove('bg-lime-custom');
                btn.querySelector('svg').classList.remove('text-black');
                btn.querySelector('svg').classList.add('text-white');
            });
            
            // Add active state to clicked button
            this.classList.add('bg-lime-custom');
            this.querySelector('svg').classList.add('text-black');
            this.querySelector('svg').classList.remove('text-white');
            
            // Simulate navigation
            const navItems = ['Inicio', 'Favoritos', 'Carrito', 'Perfil'];
            announceToScreenReader(`Navegando a ${navItems[index]}`);
        });
    });
}

// Accessibility Features
function setupAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-lime-custom text-black px-4 py-2 rounded z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const shoppingPage = document.getElementById('shopping-page');
    if (shoppingPage) {
        shoppingPage.setAttribute('id', 'main-content');
        shoppingPage.setAttribute('role', 'main');
    }
    
    // Improve form labels and descriptions
    const searchButton = document.querySelector('[aria-label="Buscar productos"]');
    if (searchButton) {
        searchButton.setAttribute('aria-describedby', 'search-description');
        const description = document.createElement('span');
        description.id = 'search-description';
        description.className = 'sr-only';
        description.textContent = 'Buscar productos en la tienda';
        searchButton.appendChild(description);
    }
}

// Screen Reader Announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Update Favorites Count (Simulated)
function updateFavoritesCount() {
    const favoriteCount = document.querySelectorAll('.favorite-btn.active').length;
    const notificationBadge = document.querySelector('.bg-red-500');
    
    if (notificationBadge) {
        notificationBadge.textContent = favoriteCount + 2; // +2 for existing notifications
    }
}

// Utility Functions
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

// Performance Optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading="lazy" for better performance
        img.setAttribute('loading', 'lazy');
        
        // Add error handling
        img.addEventListener('error', function() {
            this.style.backgroundColor = '#f3f4f6';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.innerHTML = '<span style="color: #6b7280; font-size: 0.875rem;">Imagen no disponible</span>';
        });
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    optimizeImages();
    setupBottomNavigation();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', debounce(function() {
    // Adjust layout for different screen sizes
    const isMobile = window.innerWidth < 768;
    const body = document.body;
    
    if (isMobile) {
        body.classList.add('mobile-layout');
    } else {
        body.classList.remove('mobile-layout');
    }
}, 250));

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Note: Service worker file would need to be created separately
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes heartBeat {
        0% { transform: scale(1); }
        25% { transform: scale(1.2); }
        50% { transform: scale(1); }
        75% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    .sr-only:focus {
        position: static;
        width: auto;
        height: auto;
        padding: inherit;
        margin: inherit;
        overflow: visible;
        clip: auto;
        white-space: normal;
    }
`;
document.head.appendChild(style);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        setupPageTransitions,
        setupCategoryFilters,
        filterProducts,
        announceToScreenReader
    };
}
