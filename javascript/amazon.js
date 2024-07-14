import { renderProducts } from "./html-generators/amazon-html.js";
import { cart,addToCart } from "../others/cart.js";



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

renderCartCount();
renderProducts();

//adding into cart
document.querySelectorAll('.js-add-to-cart').forEach((addBtn) => {
  addBtn.addEventListener('click',() =>{
    const productId = addBtn.dataset.productId;
    
    const dlQuantity = Number(document.querySelector(`.js-quantity-selection-${productId}`).value);

    addToCart(productId,dlQuantity);

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
  document.querySelector('.js-cart-count').innerHTML=cart.length;
  document.querySelector('.js-mobile-cart-count').innerHTML=cart.length;
}