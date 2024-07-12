import { products } from "./products.js";

export let cart;
loadCartFromStorage();

function loadCartFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'))||[];
}

function SaveCartToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,dlQuantity){
    products.forEach((product) =>{
      if(product.id === productId){
        let matching;
        cart.forEach((cartItem)=>{
          if(cartItem.productId === productId){
            matching=cartItem;
          }
        });
        if(matching){
          matching.quantity+=dlQuantity;
        }else{
          cart.push({
            productId,
            quantity:dlQuantity
          });
        }
      }
    });
    SaveCartToStorage();
}