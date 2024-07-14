import { cart,updateCartByQuantity,updateCartByDelete } from "../others/cart.js";
import { renderCartItems,isEmpty,renderOrderSummary } from "./html-generators/checkout-html.js"

console.log(cart);
renderCartItems();
renderOrderSummary();
renderCartCount();

//update quantity
document.querySelectorAll('.js-update-btn').forEach((updateBtn) =>{
    updateBtn.addEventListener('click',()=>{
        const productId = updateBtn.dataset.productId;
        UpdateQuantity(productId,updateBtn);
        renderOrderSummary();
    });
});

//deleting items
document.querySelectorAll('.js-delete-btn').forEach((deleteBtn) => {
    deleteBtn.addEventListener('click',() => {
        const productId = deleteBtn.dataset.productId;
        deleteItem(productId);
    });
});

document.querySelectorAll('.js-radio').forEach((radioBtn) => {
    radioBtn.addEventListener('click',() => {
        const productId = radioBtn.dataset.pI;
        console.log(productId);
        console.log(radioBtn.id);
    });
});

//function
function renderCartCount(){
    document.querySelector('.js-checkout-count').innerHTML=`${cart.length} Items`;
    document.querySelector('.js-cart-count-label').innerHTML=cart.length;
}

function UpdateQuantity(productId,updateBtn){
    let quantityDiv = document.querySelector(`.js-quantity-div-${productId}`);
    let selectedQuantity;
    if(updateBtn.innerText === "Update"){
        let quantity;
        cart.forEach((cartItem) =>{
            if(cartItem.productId === productId){
                quantity=cartItem.quantity;
            }
        });
        quantityDiv.innerHTML = `<input type="number" class="input-quantity" value="${quantity}">`;
        updateBtn.innerHTML="Save";
    }else{
        selectedQuantity = Number(document.querySelector('.input-quantity').value);
        if(selectedQuantity < 0){
            alert("Not a valid Quantity");
        }else if(selectedQuantity === 0){
            deleteItem(productId);
        }else if(selectedQuantity > 0){
            quantityDiv.innerHTML = `<label class="cart-quantity">${selectedQuantity}</label>`;
            updateBtn.innerHTML="Update";
            updateCartByQuantity(productId,selectedQuantity);
        }
    }
}

function deleteItem(productId){
    updateCartByDelete(productId);
    const productDiv = document.querySelector(`.js-product-div-${productId}`);
    productDiv.remove();
    renderOrderSummary();
    renderCartCount();
    if(!cart.length){
        isEmpty();
    }
}