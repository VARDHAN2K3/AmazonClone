import { products } from "./products.js";

export let cart;
loadCartFromStorage();

function loadCartFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'))||[];
}

export function SaveCartToStorage(){
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

export function updateCartByQuantity(productId,selectedQuantity){
  cart.forEach((cartItem) =>{
    if(cartItem.productId === productId){
      cartItem.quantity = selectedQuantity;
      SaveCartToStorage();
    }
  });
}

export function updateCartByDelete(productId){
  cart.forEach((cartItem,index) => {
    if(cartItem.productId === productId){
      cart.splice(index,1);
      SaveCartToStorage();
    }
  });
}