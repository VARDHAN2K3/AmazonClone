import {products} from '../data/products.js';
import {cart,addToCart} from '../javascript/cart.js';

let cartQuantity=Number(localStorage.getItem('cartQuantity')) || 0;
let html='';
products.forEach((product) => {
  html+=`
    <section class="products-display">
      <div class="product-image-display">
        <img class="products-image" src="../${product.image}">
      </div>
      <div class="products-details">
        ${product.name}
      </div>
      <div class="ratings-display">
        <div>
          <img class="stars" src="../images/ratings/rating-${product.rating.stars * 10}.png">
        </div>
        <div class="count">${product.rating.count}</div>
      </div>
      <div class="product-cost">
        $${(product.priceCents / 100).toFixed(2)}
      </div>
      <div class="quantity-selection-display">
        <select class="quantity-selection js-quantity-selection-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div class="added-msg js-added-msg-${product.id}"></div>
      <!-- use productId in data instead for uniqueness-->
      <button class="add-to-cart js-add-to-cart" data-product-Id="${product.id}">
        Add to Cart
      </button>
    </section>
  `;
  document.querySelector('.js-products-main').innerHTML=html;
});


document.querySelectorAll('.js-add-to-cart').forEach((addBtn) => {
  addBtn.addEventListener('click',() =>{
    const productId = addBtn.dataset.productId;
    
    addToCart(productId);

    
    renderCartCount(cartQuantity);    
  });
});

//functions
function renderCartCount(cartQuantity){
    cart.forEach((cartItem) => {
      cartQuantity++;
    });
    localStorage.setItem('cartQuantity',String(cartQuantity));
    document.querySelector('.js-cart-count').innerHTML=cartQuantity;
    
}
