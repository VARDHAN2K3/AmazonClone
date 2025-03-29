import { products } from "../data/products.js";

class Cart{
  cartItems;
  localStorageKey;

  constructor(localStorageKey){
    this.localStorageKey = localStorageKey;
    this.loadCartFromStorage();
  }

  loadCartFromStorage(){
    this.cartItems=JSON.parse(localStorage.getItem(this.localStorageKey))
      ||[];
  }

  SaveCartToStorage(){
    localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
  }

  Length(){
    return this.cartItems.length;
  }

  addToCart(productId,dlQuantity){
    products.forEach((product) =>{
      if(product.id === productId){
        let matching;
        this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId === productId){
            matching=cartItem;
          }
        });
        if(matching){
          matching.quantity+=dlQuantity;
        }else{
          this.cartItems.push({
            productId,
            quantity:dlQuantity,
            option:'1'
          });
        }
      }
    });
    this.SaveCartToStorage();
  }

  updateCartByQuantity(productId,selectedQuantity){
    this.cartItems.forEach((cartItem) =>{
      if(cartItem.productId === productId){
        cartItem.quantity = selectedQuantity;
        this.SaveCartToStorage();
      }
    });
  }

  updateCartByDelete(productId){
    this.cartItems.forEach((cartItem,index) => {
      if(cartItem.productId === productId){
        this.cartItems.splice(index,1);
        this.SaveCartToStorage();
      }
    });
  }

  updateDeliveryOptionInCart(productId,deliveryOption){
    let matching;
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId === productId){
        matching = cartItem;
      }
    });
    matching.option = deliveryOption;
    this.SaveCartToStorage();
  }
}

export const cart = new Cart('cart');
export const bussinessCart = new Cart('bussinessCart');