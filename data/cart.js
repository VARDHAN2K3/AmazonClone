import { products } from "./products.js";
import { renderAddedMsg } from "../javascript/amazon.js";


export let cart;

loadCartFromStorage();
function loadCartFromStorage(){
    cart=JSON.parse(localStorage.getItem('cart'))||[];
}
function loadCartToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

//funtions
export function addToCart(productId,quantity){
    let matching;
    products.forEach((product) => {
        if(product.id === productId){
            cart.forEach((cartItem) => {
                if(cartItem.productId === productId){
                    matching=cartItem;
                }
            });
            if(matching){
                matching.quantity+=quantity;
            }else{
            cart.push({
                productId,
                quantity
            });
            }

            //addingToCart(productId,quantity);

            loadCartToStorage();

            renderAddedMsg(product,quantity);

        }
    });
    console.log(cart);
}

//functions
/*function addingToCart(productId,quantity){
    const matching = checkOutCart(productId);
    if(matching){
        matching.quantity+=quantity;
    }else{
    cart.push({
        productId,
        quantity
    });
    }
}

function checkOutCart(productId){
    let matching;
    cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
            matching=cartItem;
        }
    });
    return matching;
}*/