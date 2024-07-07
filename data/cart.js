import { products } from "./products.js";
import { renderAddedMsg,renderCartCount } from "../javascript/amazon.js";

export const cart=JSON.parse(localStorage.getItem('cart'))||[];
let cartQuantity=Number(localStorage.getItem('cartQuantity')) || 0;

renderCartCount(cartQuantity);

//funtions
export function addToCart(productId,quantity){

    products.forEach((product) => {
        if(product.id === productId){

            addingToCart(productId,quantity);

            localStorage.setItem('cart',JSON.stringify(cart));

            renderAddedMsg(product,quantity);

        }
    });
}

//functions
function addingToCart(productId,quantity){
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
}

export function updateCartCount(){
    cartQuantity = cart.length;
    localStorage.setItem('cartQuantity',String(cartQuantity));
    renderCartCount(cartQuantity);
}