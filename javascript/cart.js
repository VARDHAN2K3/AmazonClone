import { products } from "../data/products.js";

export const cart=[];

//funtions
export function addToCart(productId){
    let quantity;
    products.forEach((product) => {
        if(product.id === productId){
            const quantitySelect=document.querySelector(`.js-quantity-selection-${productId}`);
            quantity=Number(quantitySelect.value);
            
            let matching;
            addingToCart(productId,quantity,matching);

            renderAddedMsg(product,quantity);
        }
    });
    console.log(cart);
}

function addingToCart(productId,quantity,matching){
    matching=checkInCart(productId,matching) ;
    if(matching){
        matching.quantity+=quantity;
    }else{
    cart.push({
        productId,
        quantity
    });
    }
}

function checkInCart(productId,matching){
    cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
            matching=cartItem;
        }
    });
    return matching;
}

function renderAddedMsg(product,quantity){
    const divElement = document.querySelector(`.js-added-msg-${product.id}`);
    setTimeout(() => {
    divElement.innerHTML=`<img class="checkmark-icon" src="../images/icons/checkmark.png">Added ${quantity}`;
    },0);
    setTimeout(() => {
    divElement.innerHTML='';
    },2000);
}