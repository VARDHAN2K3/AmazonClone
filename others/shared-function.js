import { cart } from "./cart.js";

export function renderCartCount(){
    document.querySelector('.js-cart-count').innerHTML=cart.Length();
    document.querySelector('.js-mobile-cart-count').innerHTML=cart.Length();
}

export function getMobileHead(){
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
}