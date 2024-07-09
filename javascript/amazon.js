import { renderAmazonProducts,renderAmazonHeader } from './html-generators-js/amazon-html.js';
import {cart,addToCart} from '../data/cart.js';

renderAmazonHeader();
renderAmazonProducts();
renderCartCount();

document.querySelectorAll('.js-add-to-cart').forEach((addBtn) => {
  addBtn.addEventListener('click',() =>{
    const productId = addBtn.dataset.productId;
    
    const quantity = Number(document.querySelector(`.js-quantity-selection-${productId}`).value);

    addToCart(productId,quantity);
    
    renderCartCount();
  });
});

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


//functions
function renderCartCount(){
  document.querySelector('.js-cart-count').innerHTML=cart.length;
  document.querySelector('.js-mobile-cart-count').innerHTML=cart.length;
}
export function renderAddedMsg(product,quantity){
  const divElement = document.querySelector(`.js-added-msg-${product.id}`);
  setTimeout(() => {
    divElement.innerHTML=`<img class="checkmark-icon" src="../images/icons/checkmark.png">Added ${quantity}`;
  },0);
  setTimeout(() => {
    divElement.innerHTML='';
  },2000);
}