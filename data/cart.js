import { products } from "./products.js";

export const cart=[];

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
    console.log(cart);
}