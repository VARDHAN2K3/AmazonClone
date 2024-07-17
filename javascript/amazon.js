//import { renderProducts } from "./html-generators/amazon-html.js";
import { products } from "../../data/products.js";
import { renderPrice } from "../../others/price.js";
import {cart} from "../others/cart.js";

let isDisplay=false;
document.querySelector('.js-hamburger-menu').addEventListener('click',() => {
  const mobileHeader = document.querySelector('.js-mobile-header-div');
  if(!isDisplay){
    mobileHeader.classList.add('mobile-header-div-display');
    isDisplay = true;
  }else{
    mobileHeader.classList.remove('mobile-header-div-display');
    isDisplay = false;
  }
});

let html='';
products.forEach((product) => {
html+=
    `
    <main class="products-display">
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
        ${renderPrice(product.priceCents)}
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
    </main>
    `;
});
document.querySelector('.js-products-main').innerHTML=html;

renderCartCount();

//adding into cart
document.querySelectorAll('.js-add-to-cart').forEach((addBtn) => {
  addBtn.addEventListener('click',() =>{
    const {productId} = addBtn.dataset;
    
    const dlQuantity = Number(document.querySelector(`.js-quantity-selection-${productId}`).value);

    cart.addToCart(productId,dlQuantity);

    renderAddedMsg(productId,dlQuantity);
    renderCartCount();
  });
});


//functions
function renderAddedMsg(productId,dlQuantity){
  const divAdded=document.querySelector(`.js-added-msg-${productId}`);
  setTimeout(() => {
    divAdded.innerHTML=`<img class="checkmark-icon" src="../images/icons/checkmark.png"> Added ${dlQuantity}`;
  },0);
  setTimeout(() =>{
    divAdded.innerHTML='';
  },2000);
}

function renderCartCount(){
  document.querySelector('.js-cart-count').innerHTML=cart.Length();
  document.querySelector('.js-mobile-cart-count').innerHTML=cart.Length();
}