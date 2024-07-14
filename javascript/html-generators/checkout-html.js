import { products } from "../../data/products.js";
import { renderPrice } from "../../others/price.js";
import { cart } from "../../others/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../others/delivery-option.js";



//prices
let itemsPrice=0;
let shippingPrice=0;
let totalBeforeTax=0;
let tax=0;
let total=0;
let bodyHtml='';

export function renderCartItems(){
    if(!cart.length){
        isEmpty();
    }
    cart.forEach((cartItem) => {
        const cartProductId=cartItem.productId;
        products.forEach((product) => {
            const productId=product.id;
            if(cartProductId === productId){
                bodyHtml+=
                `
                    <div class="product-div js-product-div-${productId}">
                        <div class="delivery-selected-head js-delivery-date-opted-${productId}">
                            Deliver date: Friday, July 12
                        </div>
                        <div class="product-details-div">
                            <div>
                                <img src="../${product.image}" class="product-img">
                            </div>
                            <div class="product-details">
                                <div class="product-name">
                                    ${product.name}
                                </div>
                                <div class="product-cost">
                                    ${renderPrice(product.priceCents)}
                                </div>
                                <div class="quantity-div">
                                    <div class="quantity-txt">Quantity:</div>
                                    <div class="js-quantity-div-${productId}">
                                        <label class="cart-quantity">${cartItem.quantity}</label>
                                    </div>
                                    <button class="update-btn js-update-btn" data-product-id="${productId}">Update</button>
                                    <button class="delete-btn js-delete-btn" data-product-id=${productId}>Delete</button>
                                </div>
                            </div>
                            
                            <div class="delivery-div js-delivery-div">
                                <div class="option-head">
                                    Choose A delivery option:
                                </div>
                                ${deliveryOption(productId,cartItem.option)}
                            </div>
                        </div>
                    </div>
                `;
            }
        });
    });
    document.querySelector('.js-cart-list').innerHTML=bodyHtml;
}

function deliveryOption(productId,selectedOption){
    let deliveryOptionsHtml='';
    
    deliveryOptions.forEach((option) => {
        const today = dayjs();
        const dateString = (today.add(option.time,'day'))
            .format('dddd, MMMM D');
        const price = option.priceCents 
            ? renderPrice(option.priceCents) 
            : 'FREE';
        const isChecked = selectedOption === option.option 
            ? 'checked' 
            : '';
        deliveryOptionsHtml +=
        `
            <div class="select-option">
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

export function isEmpty(){
    bodyHtml=
    `
        <div class="empty-list-txt">
            Your cart is empty.
        </div>
        <a href="./amazon.html">
            <button class="view-products-btn">
                View products
            </button>
        </a>
    `;
    document.querySelector('.js-cart-list').innerHTML=bodyHtml;
}

function priceCalculation(){
    itemsPrice=0;
    shippingPrice=0;
    totalBeforeTax=0;
    tax=0;
    total=0;
    cart.forEach((cartItem) =>{
        products.forEach((product) =>{
            if(cartItem.productId === product.id){
                itemsPrice += (product.priceCents * cartItem.quantity);
            }
        });
    });
    totalBeforeTax += (shippingPrice+itemsPrice);
    tax += totalBeforeTax * 0.1;
    total += totalBeforeTax + tax;
}
export function renderOrderSummary(){
    priceCalculation();
    const orderSummaryHtml=
    `
        <div class="items-cost-div">
            <div>Items(<label class="js-cart-count-label">0</label>):</div>
            <div class="price">${renderPrice(itemsPrice)}</div>
        </div>
        <div class="shipping-div">
            <div class="shipping">Shipping & handling:</div>
            <div class="price">${renderPrice(shippingPrice)}</div>
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
    document.querySelector('.order-summary').innerHTML=orderSummaryHtml;
}