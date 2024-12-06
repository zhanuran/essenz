const products = [
    { id: 1, name: "Blue Shirt", price: 25, size: "SML", image: "images/shirt.jpg" },
    { id: 2, name: "White Top", price: 15, size: "SML", image: "images/top.jpg" },
    { id: 3, name: "Brown Blazer", price: 50, size: "OneSize", image: "images/blazer.jpg" },
    { id: 4, name: "Brown Pants", price: 30, size: "SML", image: "images/pants.jpg" },
    { id: 5, name: "White Skirt", price: 20, size: "OneSize", image: "images/skirt.jpg" },
];

// Массив для хранения товаров в корзине
let cart = [];

// Функция для отображения продуктов в каталоге
const productList = document.getElementById('product-list');
if (productList) {
    renderProducts(products);
}

function renderProducts(productListData) {
    productList.innerHTML = ''; // Очищаем список перед перерисовкой
    productListData.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 100px; height: auto;">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Size: ${product.size}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Функция для добавления товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        alert(`${product.name} added to cart!`);
        updateCart();
        updateCartCount(); // Обновляем счетчик
    }
}

// Обновление корзины
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    if (cartItems && totalPriceElement) {
        cartItems.innerHTML = ''; // Очищаем список товаров в корзине
        let totalPrice = 0;
        cart.forEach((product, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <h4>${product.name}</h4>
                <p>Price: $${product.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItems.appendChild(itemDiv);
            totalPrice += product.price;
        });
        totalPriceElement.textContent = totalPrice.toFixed(2); // Отображаем общую стоимость
    }
}

// Функция для удаления товара из корзины
function removeFromCart(index) {
    cart.splice(index, 1); // Удаляем товар из массива
    updateCart();
    updateCartCount(); // Обновляем счетчик
}

// Функция для очистки корзины
const clearCartButton = document.getElementById('clear-cart-button');
if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
        cart = []; // Очищаем массив корзины
        updateCart();
        updateCartCount();
        alert('Cart cleared!');
    });
}

// Обновление счетчика товаров в корзине
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Функция для поиска товаров
const searchInput = document.getElementById('search');
if (searchInput) {
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );

        renderProducts(filteredProducts);
    });
}
// Обработчик оформления заказа
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        // Получаем данные из формы
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        if (cart.length === 0) {
            alert('Your cart is empty. Add items to proceed.');
            return;
        }

        // Имитация отправки данных
        alert(`Thank you, ${name}! Your order has been placed.
Details:
Email: ${email}
Address: ${address}
Total: $${document.getElementById('total-price').textContent}`);

        // Очищаем корзину после заказа
        cart = [];
        updateCart();
        updateCartCount();
    });
}
