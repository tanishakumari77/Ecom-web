document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const cartBadge = document.querySelector('.cart-badge'); // Select the badge element
    const totalPriceElement = document.querySelector('.total-price'); // Select the total price element
    const totalPriceValue = document.querySelector('.total-price-value'); // Select the total price value
    let cart = [];

    document.querySelector('.fa-user').addEventListener('click', function (e) {
        e.preventDefault();
        const loginSection = document.getElementById('userlogin');
        loginSection.scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelector('.fa-shopping-cart').addEventListener('click', function (e) {
        e.preventDefault();
        const cartSection = document.getElementById('carticon');
        cartSection.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === '1234') {
            alert(`Login successful! Welcome, ${username}.`);
            window.location.href = '#home';
        } else {
            alert('Invalid username or password.');
        }
    });

    // Attach event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default anchor behavior
            const productName = button.getAttribute('data-name');
            const productPrice = button.getAttribute('data-price');

            const existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: productName, price: parseFloat(productPrice), quantity: 1 });
            }

            updateCartUI();
            updateCartBadge(); // Update the cart badge
            updateTotalPrice(); // Update the total price
        });
    });

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty. Start adding items!</p>';
            checkoutBtn.style.display = 'none';
            totalPriceElement.style.display = 'none'; // Hide total price when cart is empty
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <span>${item.name} x ${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            checkoutBtn.style.display = 'block';
            totalPriceElement.style.display = 'block'; // Show total price when cart has items
        }

        // Add event listeners to the remove buttons
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                removeItemFromCart(index);
            });
        });
    }

    function removeItemFromCart(index) {
        cart.splice(index, 1); // Remove the item from the cart
        updateCartUI(); // Update the cart UI
        updateCartBadge(); // Update the cart badge
        updateTotalPrice(); // Update the total price
    }

    function updateCartBadge() {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartBadge.textContent = totalItems; // Update the badge text
        cartBadge.style.display = totalItems > 0 ? 'inline-block' : 'none'; // Show or hide the badge
    }

    function updateTotalPrice() {
        const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        totalPriceValue.textContent = totalPrice.toFixed(2); // Update the total price value
    }

    checkoutBtn.addEventListener('click', () => {
        alert('Proceeding to checkout!');
        cart = [];
        updateCartUI();
        updateCartBadge(); // Reset the badge when checking out
        updateTotalPrice(); // Reset the total price when checking out
    });
});