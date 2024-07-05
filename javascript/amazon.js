import {products} from '../data/products.js';
import {cart} from '../javascript/cart.js';

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
      <div class="added-msg js-added-msg-${product.id}" data-product-id-added-msg="${product.id}"></div>
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
    let quantity;
    products.forEach((product) => {
      if(product.id === productId){
        let matching;
        cart.forEach((cartItem) => {
          if(cartItem.productId === productId){
            matching=cartItem;
          }
        });
        const quantitySelect=document.querySelector(`.js-quantity-selection-${productId}`);
        quantity=Number(quantitySelect.value);
        if(matching){
            matching.quantity+=quantity;
        }else{
          cart.push({
            productId,
            quantity
          });
        }
        const divElement = document.querySelector(`.js-added-msg-${product.id}`);
        setTimeout(() => {
          divElement.innerHTML=`<img class="checkmark-icon" src="../images/icons/checkmark.png">Added ${quantity}`;
        },0);
        setTimeout(() => {
          divElement.innerHTML='';
        },2000);
      }
    });
    let cartQuantity=0;
    cart.forEach((cartItem) => {
      cartQuantity++;
    });
    document.querySelector('.js-cart-count').innerHTML=cartQuantity;
  });
});