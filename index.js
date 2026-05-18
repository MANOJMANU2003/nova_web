
    let allProducts = [];
    let cart = [];
    let filteredProducts = [];
    let currentPage = 1;
    const productsPerPage = 10;
    async function loadProducts(){

    

      const response = await fetch(
        "https://cdn.jsdelivr.net/gh/adarshahelvar/NovaCart/products.json"
      );

      allProducts = await response.json();
      filteredProducts = allProducts;
      displayProducts();
      setupPagination();

    }

    function filterProducts(){

  const selectedCategory =
    document.getElementById("categoryFilter").value;

  if(selectedCategory === "all"){

    filteredProducts = allProducts;

  }

  else{

    filteredProducts = allProducts.filter(product =>

      product.category.toLowerCase().includes(
        selectedCategory.toLowerCase()
      )

    );

  }

  currentPage = 1;

  displayProducts();

  setupPagination();

}

    /* DISPLAY PRODUCTS */

    function displayProducts(){

      const container = document.getElementById("productContainer");
      container.innerHTML = "";
      const start = (currentPage - 1) * productsPerPage;
      const end = start + productsPerPage;
      const paginatedProducts = filteredProducts.slice(start, end);
      paginatedProducts.forEach(product => {
        container.innerHTML += `

          <div class="col-lg-3 col-md-6">
            <div class="card product-card h-100">

              <img src="${product.image}" class="product-image">

              <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="badge-category"> ${product.category} </span>

                  <div class="rating"> ★ ${product.rating}</div>

                </div>
                <div class="fw-bold mt-3"> ${product.name}</div>

                <div class="product-desc"> ${product.description}
                </div>

                <div class="mt-auto d-flex justify-content-between align-items-center">
                  <div class="price"> $${product.price}
                  </div>

                  <button class="btn btn-dark" onclick="addToCart(${product.id})">
                    <i class="bi bi-bag-plus"></i> Add</button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    }

    /* ADD TO CART */

    function addToCart(productId){

      const product = allProducts.find(item => item.id === productId);
      const existingProduct = cart.find(item => item.id === productId);

      if(existingProduct){
        existingProduct.quantity += 1;
      }
      else{

        cart.push({
          ...product,
          quantity:1
        });
      }
      updateCart();
    }

    /* UPDATE CART */

    function updateCart(){

      const cartItems = document.getElementById("cartItems");
      const cartBadge = document.querySelector(".cart-badge");
      const cartCount = document.getElementById("cartCount");
      const cartSubtotal = document.getElementById("cartSubtotal");
      const cartTotal = document.getElementById("cartTotal");

      cartItems.innerHTML = "";

      let total = 0;
      let totalItems = 0;

      cart.forEach(item => {
        total += item.price * item.quantity;
        totalItems += item.quantity;
        cartItems.innerHTML += `

          <div class="d-flex mb-4 border-bottom pb-3">

            <img src="${item.image}" width="80" height="80" class="rounded">

            <div class="ms-3 flex-grow-1">
              <div class="d-flex justify-content-between">
                <h6 class="fw-bold"> ${item.name}</h6>

                <i class="bi bi-trash text-danger" style="cursor:pointer;" onclick="removeFromCart(${item.id})"></i>
              </div>

              <small class="text-muted"> $${item.price} </small>
              <div class="mt-2 d-flex justify-content-between align-items-center">
                <div class="btn-group btn-group-sm">
                  <button class="btn btn-outline-secondary" onclick="decreaseQty(${item.id})">-</button>

                  <button class="btn btn-outline-secondary"> ${item.quantity}</button>

                  <button class="btn btn-outline-secondary" onclick="increaseQty(${item.id})">+</button>
                </div>
                <div class="fw-bold"> $${(item.price * item.quantity).toFixed(2)}
                </div></div></div></div>
        `;
      });

      cartBadge.innerText = totalItems;

      cartCount.innerText =
        totalItems + " items";

      cartSubtotal.innerText =
        "$" + total.toFixed(2);

      if(total === 0){
  cartTotal.innerText = "$0.00";
}

else{
  cartTotal.innerText =
    "$" + (total + 10).toFixed(2);
}
const shippingCost =
  document.getElementById("shippingCost");

if(total === 0){
  shippingCost.innerText = "$0.00";
}
else{
  shippingCost.innerText = "$10.00";
}
    }

    /* QUANTITY */

    function increaseQty(id){
      const item =
        cart.find(product => product.id === id);
      item.quantity++;
      updateCart();
    }
    function decreaseQty(id){
      const item =
        cart.find(product => product.id === id);
      if(item.quantity > 1){
        item.quantity--;
      }
      else{
        cart =
          cart.filter(product => product.id !== id);
      }
      updateCart();
    }

    /* REMOVE */

    function removeFromCart(id){
      cart = cart.filter(product => product.id !== id);

      updateCart();
    }

    /* CLEAR */

    function clearCart(){
      cart = [];
      updateCart();
    }
    /* PAGINATION */

    function setupPagination(){
      const pagination =
        document.getElementById("pagination");
      pagination.innerHTML = "";
      const totalPages =
        Math.ceil(filteredProducts.length / productsPerPage);
      pagination.innerHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">

          <button class="page-link"onclick="changePage(${currentPage - 1})">Previous</button>
        </li>
      `;

      for(let i = 1; i <= totalPages; i++){

        pagination.innerHTML += `

          <li class="page-item ${currentPage === i ? 'active' : ''}">

            <button class="page-link" onclick="changePage(${i})">
              ${i}</button></li>
        `;
      }

      pagination.innerHTML += `

        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">

          <button class="page-link"onclick="changePage(${currentPage + 1})">Next</button></li>
      `;
    }
    function changePage(page){

      const totalPages =
        Math.ceil(filteredProducts.length / productsPerPage);

      if(page < 1 || page > totalPages) return;

      currentPage = page;

      displayProducts();
      setupPagination();
    }
    loadProducts();


/* REGISTER */

function registerUser(){

  const username =document.getElementById("registerUsername").value;
  const email =document.getElementById("registerEmail").value;
  const password =document.getElementById("registerPassword").value;

  if( username === "" || email === "" || password === ""){
    alert("Please fill all fields");
    return;
  }

  const user = {

    username,
    email,
    password

  };

  localStorage.setItem(
    "novacartUser",
    JSON.stringify(user)
  );

  alert("Registration Successful");

  document.getElementById(
    "registerForm"
  ).reset();
}

/* LOGIN */

function loginUser(){

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const savedUser =
    JSON.parse(
      localStorage.getItem("novacartUser")
    );

  if(!savedUser){

    alert("No user found");
    return;
  }
  if(email === savedUser.email &&
    password === savedUser.password){
    alert("Login Successful Welcome " + savedUser.username);
    localStorage.setItem("isLoggedIn",true);
  }
  else{
    alert("Invalid Email or Password");
  }
}

function checkout() {

  if(cart.length === 0){
    alert("Cart is empty");
    return;
  }

  const subtotal =
    cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

  const shipping = subtotal > 0 ? 10 : 0;

  const orderData = {
    items: cart,
    subtotal: subtotal,
    shipping: shipping,
    total: subtotal + shipping,
    checkoutDate: new Date().toLocaleString()
  };

  // STORE ORDER
  localStorage.setItem(
    "checkoutData",
    JSON.stringify(orderData)
  );

  alert("Checkout Successful!");

  console.log(orderData);

  // OPTIONAL
  // clearCart();
}

/* LOGOUT */

function logoutUser(){
  localStorage.removeItem("isLoggedIn");
  alert("Logged Out");
}
