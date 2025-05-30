        // script.js
        // Mock data for products
        const mockProducts = [
            {
                id: '1',
                name: 'Wireless Bluetooth Headphones',
                price: 1999,
                rating: 4.5,
                imageUrl: 'images/head.png',
                description: 'Immerse yourself in rich, clear sound with these comfortable wireless headphones. Featuring long-lasting battery life and intuitive controls.',
                details: [
                    'Noise-cancelling technology',
                    'Up to 30 hours battery life',
                    'Bluetooth 5.0 connectivity',
                    'Ergonomic design for comfort',
                    'Built-in microphone for calls'
                ]
            },
            {
                id: '2',
                name: 'Smartwatch with Fitness Tracker',
                price: 3499,
                rating: 4.2,
                imageUrl: 'images/watch.png',
                description: 'Track your fitness goals and stay connected with this sleek smartwatch. Monitor heart rate, steps, and receive notifications.',
                details: [
                    'Heart rate monitoring',
                    'Step and calorie tracking',
                    'Sleep analysis',
                    'Notifications for calls and messages',
                    'Water-resistant design'
                ]
            },
            {
                id: '3',
                name: 'Portable Bluetooth Speaker',
                price: 1299,
                rating: 4.7,
                imageUrl: 'images/speaker.webp',
                description: 'Enjoy powerful sound on the go with this compact and durable Bluetooth speaker. Perfect for outdoor adventures or home use.',
                details: [
                    'High-fidelity audio',
                    '10-hour battery life',
                    'IPX7 waterproof rating',
                    'Built-in strap for portability',
                    'Stereo pairing capability'
                ]
            },
            {
                id: '4',
                name: 'Ergonomic Office Chair',
                price: 8999,
                rating: 4.0,
                imageUrl: 'images/chair.png',
                description: 'Experience ultimate comfort and support during long work hours with this ergonomic office chair. Adjustable features for personalized seating.',
                details: [
                    'Adjustable lumbar support',
                    'Breathable mesh back',
                    'Padded armrests',
                    'Smooth-rolling casters',
                    '360-degree swivel'
                ]
            },
            {
                id: '5',
                name: '4K Ultra HD Smart TV',
                price: 39999,
                rating: 4.8,
                imageUrl: 'images/tv.png',
                description: 'Bring cinematic experience home with this stunning 4K Ultra HD Smart TV. Vibrant colors and smart features for endless entertainment.',
                details: [
                    'Crystal-clear 4K resolution',
                    'Built-in streaming apps',
                    'Voice control remote',
                    'Multiple HDMI ports',
                    'Sleek, thin bezel design'
                ]
            },
            {
                id: '6',
                name: 'Electric Kettle (1.7L)',
                price: 799,
                rating: 4.3,
                imageUrl: 'images/kettle.png',
                description: 'Boil water quickly and safely with this efficient electric kettle. Ideal for tea, coffee, or instant meals.',
                details: [
                    '1.7-liter capacity',
                    'Fast boiling technology',
                    'Auto shut-off and boil-dry protection',
                    '360-degree rotational base',
                    'Stainless steel interior'
                ]
            },
        ];

        let cartItems = [];
        let selectedProduct = null;

        // Function to navigate between pages
        function navigateTo(pageId, productId = null) {
            // Hide all page sections
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
            });

            // Show the requested page section
            const targetPage = document.getElementById(pageId);
            if (targetPage) { // Add null check here
                targetPage.classList.add('active');
            } else {
                console.error(`Error: Page section with ID '${pageId}' not found.`);
                return; // Exit if page not found
            }

            // Handle specific page rendering
            if (pageId === 'home-page') {
                renderProducts();
            } else if (pageId === 'product-detail-page' && productId) {
                selectedProduct = mockProducts.find(p => p.id === productId);
                renderProductDetail();
            } else if (pageId === 'cart-page') {
                renderCart();
            }

            // Scroll to top of the page
            window.scrollTo(0, 0);
        }

        // Function to update cart item count in header
        function updateCartCount() {
            const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            const cartCountElement = document.getElementById('cart-item-count');
            if (cartCountElement) { // Add null check here
                cartCountElement.textContent = count;
            }
        }

        // Function to render product cards on the home page
        function renderProducts() {
            const productGrid = document.getElementById('product-grid');
            if (!productGrid) return; // Add null check

            productGrid.innerHTML = ''; // Clear previous products

            mockProducts.forEach(product => {
                const productCardHtml = `
                    <div class="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 cursor-pointer flex flex-col"
                        onclick="navigateTo('product-detail-page', '${product.id}')">
                        <img
                            src="${product.imageUrl}"
                            alt="${product.name}"
                            class="w-full h-48 object-cover"
                            onerror="this.onerror=null;this.src='https://placehold.co/400x400/F0F0F0/333333?text=Image+Error';"
                        />
                        <div class="p-4 flex flex-col flex-grow">
                            <h3 class="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">${product.name}</h3>
                            <div class="flex items-center mb-2">
                                <span class="text-yellow-500 flex">
                                    ${Array(5).fill().map((_, i) => `
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    `).join('')}
                                </span>
                                <span class="text-sm text-gray-600 ml-2">${product.rating}</span>
                            </div>
                            <p class="text-xl font-bold text-gray-900 mt-auto">₹${product.price.toLocaleString('en-IN')}</p>
                            <button
                                onclick="event.stopPropagation(); handleAddToCart('${product.id}')"
                                class="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-colors shadow-md"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;
                productGrid.insertAdjacentHTML('beforeend', productCardHtml);
            });
        }

        // Function to render product detail page
        function renderProductDetail() {
            const productDetailContent = document.getElementById('product-detail-content');
            if (!productDetailContent) return; // Add null check

            productDetailContent.innerHTML = ''; // Clear previous content

            if (!selectedProduct) {
                productDetailContent.innerHTML = `
                    <div class="text-center w-full">
                        <p class="text-xl text-gray-700 mb-4">Product not found.</p>
                    </div>
                `;
                return;
            }

            const productDetailsHtml = `
                <div class="md:w-1/2 flex justify-center items-center">
                    <img
                        src="${selectedProduct.imageUrl}"
                        alt="${selectedProduct.name}"
                        class="max-w-full h-auto rounded-lg shadow-lg"
                        onerror="this.onerror=null;this.src='https://placehold.co/600x600/F0F0F0/333333?text=Image+Error';"
                    />
                </div>

                <div class="md:w-1/2">
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">${selectedProduct.name}</h1>
                    <div class="flex items-center mb-4">
                        <span class="text-yellow-500 flex">
                            ${Array(5).fill().map((_, i) => `
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'fill-current' : ''}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            `).join('')}
                        </span>
                        <span class="text-lg text-gray-600 ml-2">${selectedProduct.rating} out of 5 stars</span>
                    </div>

                    <p class="text-4xl font-bold text-gray-900 mb-4">₹${selectedProduct.price.toLocaleString('en-IN')}</p>

                    <p class="text-gray-700 mb-6 leading-relaxed">${selectedProduct.description}</p>

                    <h3 class="text-xl font-semibold text-gray-800 mb-2">About this item:</h3>
                    <ul class="list-disc list-inside text-gray-700 mb-6 space-y-1">
                        ${selectedProduct.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>

                    <div class="flex flex-col sm:flex-row gap-4">
                        <button
                            onclick="handleAddToCart('${selectedProduct.id}')"
                            class="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md transition-colors shadow-lg text-lg"
                        >
                            Add to Cart
                        </button>
                        <button
                            onclick="handleAddToCart('${selectedProduct.id}'); navigateTo('cart-page');"
                            class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md transition-colors shadow-lg text-lg"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            `;
            productDetailContent.insertAdjacentHTML('beforeend', productDetailsHtml);
        }

        // Function to render cart page
        function renderCart() {
            const cartContent = document.getElementById('cart-content');
            if (!cartContent) return; // Add null check
            
            cartContent.innerHTML = ''; // Clear previous content

            if (cartItems.length === 0) {
                cartContent.innerHTML = `
                    <div class="bg-white rounded-lg shadow-md p-6 text-center">
                        <p class="text-xl text-gray-700 mb-4">Your cart is empty.</p>
                        <button
                            onclick="navigateTo('home-page')"
                            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors shadow-md"
                        >
                            Start Shopping
                        </button>
                    </div>
                `;
                return;
            }

            let cartItemsHtml = '';
            let total = 0;

            cartItems.forEach(item => {
                total += item.price * item.quantity;
                cartItemsHtml += `
                    <div class="flex items-center border-b border-gray-200 py-4 last:border-b-0">
                        <img
                            src="${item.imageUrl}"
                            alt="${item.name}"
                            class="w-24 h-24 object-cover rounded-md mr-4"
                            onerror="this.onerror=null;this.src='https://placehold.co/100x100/F0F0F0/333333?text=Image+Error';"
                        />
                        <div class="flex-grow">
                            <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
                            <p class="text-gray-600">₹${item.price.toLocaleString('en-IN')}</p>
                            <div class="flex items-center mt-2">
                                <button
                                    onclick="handleRemoveFromCart('${item.id}', 1)"
                                    class="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-bold py-1 px-2 rounded-l-md transition-colors"
                                >
                                    -
                                </button>
                                <span class="bg-gray-100 text-gray-800 text-sm font-bold py-1 px-3 border-y border-gray-200">
                                    ${item.quantity}
                                </span>
                                <button
                                    onclick="handleAddToCart('${item.id}')"
                                    class="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-bold py-1 px-2 rounded-r-md transition-colors"
                                >
                                    +
                                </button>
                                <button
                                    onclick="handleRemoveFromCart('${item.id}', ${item.quantity})"
                                    class="ml-4 text-red-600 hover:text-red-800 text-sm font-semibold"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                        <p class="text-lg font-bold text-gray-900">₹${(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                `;
            });

            const orderSummaryHtml = `
                <div class="flex flex-col lg:flex-row gap-6">
                    <div class="lg:w-2/3 bg-white rounded-lg shadow-md p-6">
                        ${cartItemsHtml}
                    </div>

                    <div class="lg:w-1/3 bg-white rounded-lg shadow-md p-6 h-fit">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
                        <div class="flex justify-between text-gray-700 mb-2">
                            <span>Subtotal (${cartItems.length} items):</span>
                            <span>₹${total.toLocaleString('en-IN')}</span>
                        </div>
                        <div class="flex justify-between text-gray-700 mb-4">
                            <span>Shipping:</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div class="flex justify-between text-2xl font-bold text-gray-900 border-t pt-4 mt-4">
                            <span>Total:</span>
                            <span>₹${total.toLocaleString('en-IN')}</span>
                        </div>
                        <button
                            onclick="alert('Proceeding to checkout! (This is a frontend-only demo)')"
                            class="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md transition-colors shadow-lg text-lg"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            `;
            cartContent.insertAdjacentHTML('beforeend', orderSummaryHtml);
        }

        // Function to add item to cart or increment quantity
        function handleAddToCart(productId) {
            const productToAdd = mockProducts.find(p => p.id === productId);
            if (!productToAdd) return;

            const existingItemIndex = cartItems.findIndex(item => item.id === productId);

            if (existingItemIndex > -1) {
                // Item exists, increment quantity
                cartItems[existingItemIndex].quantity += 1;
            } else {
                // Item does not exist, add new
                cartItems.push({ ...productToAdd, quantity: 1 });
            }
            updateCartCount();
            // Optionally re-render cart if on cart page
            if (document.getElementById('cart-page').classList.contains('active')) {
                renderCart();
            }
        }

        // Function to remove item from cart or decrement quantity
        function handleRemoveFromCart(productId, quantityToRemove = 1) {
            const existingItemIndex = cartItems.findIndex(item => item.id === productId);

            if (existingItemIndex > -1) {
                if (cartItems[existingItemIndex].quantity > quantityToRemove) {
                    cartItems[existingItemIndex].quantity -= quantityToRemove;
                } else {
                    // Remove item completely if quantity is 0 or less
                    cartItems = cartItems.filter(item => item.id !== productId);
                }
            }
            updateCartCount();
            // Re-render cart if on cart page
            if (document.getElementById('cart-page').classList.contains('active')) {
                renderCart();
            }
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', () => {
            // Ensure the initial page is correctly set after DOM is fully loaded
            navigateTo('home-page');
            updateCartCount(); // Initialize cart count
        });
    