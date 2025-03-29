//import { renderCartItems,isEmpty,renderOrderSummary } from "./html-generators/checkout-html.js";
import { cart } from "../others/cart.js";
import { products } from "../data/products.js";
import { renderPrice } from "../others/price.js";
import { deliveryOptions } from "../others/delivery-option.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {moveToOrdersList,orders} from "../others/ordersList.js";

let itemsPrice = 0;
let shippinPrice = 0;
let totalBeforeTax = 0;
let tax = 0;
let total = 0;

function renderCheckOut(){

    let bodyHtml='';
    if(!cart.Length()){
        isEmpty();
    }else{
        let matching;
        cart.cartItems.forEach((cartItem) => {
            products.forEach((product) => {
                if(cartItem.productId === product.id){
                    matching = product;
                }
            });
            let deliveryOptionMatch;
            deliveryOptions.forEach((dOption) => {
                if(dOption.option === cartItem.option){
                    deliveryOptionMatch = dOption;
                }
            });
            const today = dayjs();
            const dateString = (today.add(deliveryOptionMatch.time,'day'))
                .format('dddd, MMMM D');
            bodyHtml+=
            `
                <div class="product-div js-product-div-${matching.id}">
                    <div class="delivery-selected-head">
                        Deliver date: ${dateString}
                    </div>
                    <div class="product-details-div">
                        <div>
                            <img src="../${matching.image}" class="product-img">
                        </div>
                        <div class="product-details">
                            <div class="product-name">
                                ${matching.name}
                            </div>
                            <div class="product-cost">
                                ${renderPrice(matching.priceCents)}
                            </div>
                            <div class="quantity-div">
                                <div class="quantity-txt">Quantity:</div>
                                <div class="js-quantity-div-${matching.id}">
                                    <label class="cart-quantity">${cartItem.quantity}</label>
                                </div>
                                <button class="update-btn js-update-btn" data-product-id="${matching.id}">Update</button>
                                <button class="delete-btn js-delete-btn" data-product-id=${matching.id}>Delete</button>
                            </div>
                        </div>
                        
                        <div class="delivery-div js-delivery-div">
                            <div class="option-head">
                                Choose A delivery option:
                            </div>
                            ${deliveryOption(matching.id,cartItem.option)}
                        </div>
                    </div>
                </div>
            `;
            document.querySelector('.js-cart-list').innerHTML=bodyHtml;
        });
    }

    orderSummaryCalculation();

    renderCartCount();

    if(!cart.Length()){
        document.querySelector('.js-place-order-btn').classList.add('place-order-btn2');
    }

    //update quantity
    document.querySelectorAll('.js-update-btn').forEach((updateBtn) =>{
        updateBtn.addEventListener('click',()=>{
            const {productId} = updateBtn.dataset;
            UpdateQuantity(productId,updateBtn);
        });
    });

    //deleting items
    document.querySelectorAll('.js-delete-btn').forEach((deleteBtn) => {
        deleteBtn.addEventListener('click',() => {
            const productId = deleteBtn.dataset.productId;
            deleteItem(productId);
        });
    });

    //delivery selecting
    document.querySelectorAll('.js-select-option').forEach((element) => {
        element.addEventListener('click',() =>{
            const {productId,deliveryOption} = element.dataset;
            cart.updateDeliveryOptionInCart(productId,deliveryOption);
            cart.SaveCartToStorage();
            renderCheckOut();
        });
    });


    //functions
    function isEmpty(){
        bodyHtml=
        `
            <div class="empty-list-txt">
                Your cart is empty.
            </div>
            <a href="./index.html">
                <button class="view-products-btn">
                    View products
                </button>
            </a>
        `;
        document.querySelector('.js-cart-list').innerHTML=bodyHtml;
    }

    function deliveryOption(productId,theOption){
        let deliveryOptionsHtml='';
        
        deliveryOptions.forEach((dOption) => {
            const today = dayjs();
            const dateString = (today.add(dOption.time,'day'))
                .format('dddd, MMMM D');
            const price = dOption.priceCents 
                ? renderPrice(dOption.priceCents) 
                : 'FREE';
            const isChecked = theOption === dOption.option 
                ? 'checked' 
                : '';
            deliveryOptionsHtml +=
            `
                <div class="select-option js-select-option"
                data-product-id="${productId}" data-delivery-option="${dOption.option}">
                    <input type="radio" name="select-delivery-option-${productId}" class="radio js-radio" ${isChecked}>
                    <div class="delivery-info">
                        <div class="delivery-date">
                            ${dateString}
                        </div>
                        <div class="shipping-price">
                            ${price} - Shipping
                        </div>
                    </div>
                </div>
            `;
        });
        return deliveryOptionsHtml;
    }

    function renderCartCount(){
        document.querySelector('.js-checkout-count').innerHTML=`${cart.Length()} Items`;
        document.querySelector('.js-cart-count-label').innerHTML=cart.Length();
    }

    function renderOrderSummary(){
        const orderSummary =
        `
            <div class="items-cost-div">
                <div>Items(<label class="js-cart-count-label">0</label>):</div>
                <div class="price">${renderPrice(itemsPrice)}</div>
            </div>
            <div class="shipping-div">
                <div class="shipping">Shipping & handling:</div>
                <div class="price">${renderPrice(shippinPrice)}</div>
            </div>
            <div class="total-before-tax-div">
                <div class="t-b-t">Total before tax:</div>
                <div class="total-cost-btax">${renderPrice(totalBeforeTax)}</div>
            </div>
            <div class="tax-div">
                <div>Estimated tax(10%):</div>
                <div class="price">${renderPrice(tax)}</div>
            </div>
            <div class="total">
                <div>Order total:</div>
                <div class="total-price">${renderPrice(total)}</div>
            </div>
        `;
        document.querySelector('.js-order-summmary').innerHTML=orderSummary;
    }

    function UpdateQuantity(productId,updateBtn){
        let quantityDiv = document.querySelector(`.js-quantity-div-${productId}`);
        let selectedQuantity;
        if(updateBtn.innerText === "Update"){
            let quantity;
            cart.cartItems.forEach((cartItem) =>{
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
                cart.updateCartByQuantity(productId,selectedQuantity);
                renderCheckOut();
            }
        }
    }

    function deleteItem(productId){
        cart.updateCartByDelete(productId);
        const productDiv = document.querySelector(`.js-product-div-${productId}`);
        productDiv.remove();
        renderCartCount();
        cart.SaveCartToStorage();
        renderCheckOut();
        if(!cart.Length()){
            isEmpty();
        }
    }

    function orderSummaryCalculation(){
        itemsPrice = 0;
        shippinPrice = 0;
        totalBeforeTax = 0;
        tax = 0;
        total = 0;
        cart.cartItems.forEach((cartItem) => {
            products.forEach((product) => {
                if(cartItem.productId === product.id){
                    itemsPrice += (product.priceCents * cartItem.quantity);
                }
            });
            deliveryOptions.forEach((dOption) => {
                if(cartItem.option === dOption.option){
                    shippinPrice += dOption.priceCents;
                }
            });
        });
        totalBeforeTax += (itemsPrice + shippinPrice);
        tax += (totalBeforeTax * 0.1);
        total += (totalBeforeTax + tax);
        renderOrderSummary();
    }
} //renderCheckOut(); ends

document.querySelector('.js-place-order-btn').addEventListener('click',() => {
    if(cart.Length()){
        moveToOrdersList(total);
        localStorage.removeItem('cart');
        //open('../orders.html',EventTarget="_self");
    }
});


renderCheckOut();
