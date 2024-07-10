import { products } from "./products.js";
import { renderAddedMsg } from "../javascript/amazon.js";


export const cart=JSON.parse(localStorage.getItem('cart'))||[];

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

            localStorage.setItem('cart',JSON.stringify(cart));

            renderAddedMsg(product,quantity);

        }
    });
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