// DOM Elements
const cartIcon = document.querySelector('.cart-icon');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCart = document.querySelector('.close-cart');
const cartContent = document.querySelector('.cart-content');
const cartTotal = document.querySelector('.cart-total');
const cartCount = document.querySelector('.cart-count');
const clearCartBtn = document.querySelector('.clear-cart');
const checkoutBtn = document.querySelector('.checkout-btn');
const checkoutOverlay = document.querySelector('.checkout-overlay');
const closeCheckout = document.querySelector('.close-checkout');
const checkoutForm = document.getElementById('checkoutForm');
const orderConfirmation = document.querySelector('.order-confirmation');
const continueShopping = document.querySelector('.continue-shopping');
const closeConfirmation = document.querySelector('.close-confirmation');
const navLinks = document.querySelectorAll('nav ul li a');
const paymentOptions = document.querySelectorAll('input[name="payment"]');
const cardDetails = document.getElementById('card-details');

// Cart array
let cart = [];

// Add to cart functionality (no alerts, opens cart automatically)
function addToCart(e) {
    const id = parseInt(e.target.dataset.id);
    const productElement = e.target.closest('.product');

    const title = productElement.querySelector('.product-title').textContent;
    const price = parseFloat(productElement.querySelector('.product-price').textContent.replace('₨', '').replace(',', ''));
    const image = productElement.querySelector('.product-img').src;

    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.amount += 1;
    } else {
        cart.push({
            id,
            title,
            price,
            image,
            amount: 1
        });
    }

    updateCart();
    cartOverlay.style.display = 'flex'; // Automatically open cart
}

// Update cart display
function updateCart() {
    const totalItems = cart.reduce((total, item) => total + item.amount, 0);
    cartCount.textContent = totalItems;

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.amount), 0);
    cartTotal.textContent = totalPrice.toLocaleString('en-PK');

    cartContent.innerHTML = '';
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">₨${item.price.toLocaleString('en-PK')}</p>
                <button class="remove-item" data-id="${item.id}">remove</button>
                <div class="cart-item-amount">
                    <button class="amount-btn decrease" data-id="${item.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="item-amount">${item.amount}</span>
                    <button class="amount-btn increase" data-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        cartContent.appendChild(cartItemElement);
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', decreaseAmount);
    });

    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', increaseAmount);
    });
}

// Remove item from cart (no alert)
function removeItem(e) {
    const id = parseInt(e.target.dataset.id);
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Decrease item amount
function decreaseAmount(e) {
    const id = parseInt(e.target.dataset.id || e.target.parentElement.dataset.id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem.amount > 1) {
        cartItem.amount -= 1;
    } else {
        cart = cart.filter(item => item.id !== id);
    }
    updateCart();
}

// Increase item amount
function increaseAmount(e) {
    const id = parseInt(e.target.dataset.id || e.target.parentElement.dataset.id);
    const cartItem = cart.find(item => item.id === id);
    cartItem.amount += 1;
    updateCart();
}

// Clear cart (no alert)
function clearCart() {
    cart = [];
    updateCart();
}

// Checkout (no alert)
function checkout() {
    if (cart.length === 0) return;
    checkoutOverlay.style.display = 'flex';
    cartOverlay.style.display = 'none';
}

// Submit order (no alerts)
function submitOrder(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    if (!name || !email || !address || !phone) return;

    const orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    checkoutOverlay.style.display = 'none';
    orderConfirmation.style.display = 'flex';

    const confirmationText = document.querySelectorAll('.confirmation-content p')[0];
    confirmationText.textContent = `Thank you for your purchase. Your order #${orderNumber} has been placed successfully.`;

    clearCart();
    checkoutForm.reset();
}

// Payment method toggle
function handlePaymentChange() {
    paymentOptions.forEach(option => {
        option.addEventListener('change', function () {
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
}

// Set active navigation link
function setActiveLink() {
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Event Listeners
function initEventListeners() {
    cartIcon.addEventListener('click', () => {
        cartOverlay.style.display = 'flex';
    });

    closeCart.addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });

    clearCartBtn.addEventListener('click', clearCart);
    checkoutBtn.addEventListener('click', checkout);
    closeCheckout.addEventListener('click', () => {
        checkoutOverlay.style.display = 'none';
    });
    checkoutForm.addEventListener('submit', submitOrder);
    continueShopping.addEventListener('click', () => {
        orderConfirmation.style.display = 'none';
    });
    closeConfirmation.addEventListener('click', () => {
        orderConfirmation.style.display = 'none';
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Initialize the app
function init() {
    initEventListeners();
    setActiveLink();
    handlePaymentChange();
}

// Start the application
init();




// LOGIN/SIGNUP
function showAuth() {
    document.querySelector('.auth-container').style.display = 'flex';
    showForm('login');
}

function hideAuth() {
    document.querySelector('.auth-container').style.display = 'none';
}

function showForm(formType) {
    document.querySelectorAll('.auth-option').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === formType) btn.classList.add('active');
    });

    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.add('hidden');
    });

    document.getElementById(`${formType}Form`).classList.remove('hidden');
}

// Update event listeners
document.querySelectorAll('nav ul li a[href="#auth"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showAuth();
    });
});

// Close auth container when clicking outside
document.querySelector('.auth-container').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.auth-container')) {
        hideAuth();
    }
});

// Form submission handlers
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your login logic here
    hideAuth();
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your signup logic here
    hideAuth();
});




// Add this JavaScript MENU
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.mobile-menu').classList.add('active');
});

document.querySelector('.close-menu').addEventListener('click', () => {
    document.querySelector('.mobile-menu').classList.remove('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!document.querySelector('.mobile-menu').contains(e.target) &&
        !document.querySelector('.menu-toggle').contains(e.target)) {
        document.querySelector('.mobile-menu').classList.remove('active');
    }
});

// Close menu when clicking links
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.mobile-menu').classList.remove('active');
    });
});
