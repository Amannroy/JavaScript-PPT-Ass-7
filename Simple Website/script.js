const apiUrl = "https://fakestoreapi.com/products";
const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart-items");
const cartButton = document.getElementById("cart-button");
const cart = document.getElementById("cart");

let cartItems = [];

// Fetch product data from the API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error("Error fetching products");
    }
    return response.json();
  })
  .then(products => displayProducts(products))
  .catch(error => {
    console.error("Error:", error);
    const errorElement = document.createElement("p");
    errorElement.textContent = "Failed to fetch products. Please try again later.";
    productsContainer.appendChild(errorElement);
  });

// Display the products in the UI
function displayProducts(products) {
  // Clear any previous error message
  productsContainer.innerHTML = "";

  let row;

  products.forEach((product, index) => {
    if (index % 4 === 0) {
      row = document.createElement("div");
      row.classList.add("row");
      productsContainer.appendChild(row);
    }

    const card = createProductCard(product);
    row.appendChild(card);
  });
}

// Create a product card element
function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("product-card");

  const image = document.createElement("img");
  image.src = product.image;
  card.appendChild(image);

  const title = document.createElement("h3");
  title.textContent = product.title;
  card.appendChild(title);

  const price = document.createElement("p");
  price.textContent = "$" + product.price;
  card.appendChild(price);

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.classList.add("add-to-cart-button");
  card.appendChild(addToCartButton);

  // Add event listener to 'Add to Cart' button
  addToCartButton.addEventListener("click", () => addToCart(product));

  return card;
}

// Add product to the cart
function addToCart(product) {
  const existingCartItem = cartItems.find(item => item.id === product.id);

  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  displayCartItems();
}

// Display cart items in the UI
function displayCartItems() {
  cartContainer.innerHTML = "";

  cartItems.forEach(item => {
    const card = createCartItemCard(item);
    cartContainer.appendChild(card);
  });

  if (cartItems.length > 0) {
    cart.classList.remove("hidden");
  } else {
    cart.classList.add("hidden");
  }
}

// Create a cart item card element
function createCartItemCard(item) {
  const card = document.createElement("div");
  card.classList.add("cart-item-card");

  const image = document.createElement("img");
  image.src = item.image;
  card.appendChild(image);

  const name = document.createElement("h3");
  name.textContent = item.title;
  card.appendChild(name);

  const price = document.createElement("p");
  price.textContent = "$" + item.price;
  card.appendChild(price);

  const quantity = document.createElement("p");
  quantity.textContent = "Quantity: " + item.quantity;
  card.appendChild(quantity);

  return card;
}

// Show/hide the cart UI
function toggleCart() {
  cart.classList.toggle("hidden");
}

// Add event listener to Cart button
cartButton.addEventListener("click", toggleCart);
