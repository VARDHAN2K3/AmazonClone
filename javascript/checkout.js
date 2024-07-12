import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { renderPrice } from "../others/price.js";

document.querySelector('.js-checkout-count').innerHTML=`${cart.length} Items`;
let bodyHtml='';
products.forEach((product) =>{
    const productId=product.id;
    cart.forEach((cartItem) =>{
        const cartProductId=cartItem.productId;
        if(productId === cartProductId){
            bodyHtml+=
                `
                    <div class="product-div">
                        <div class="delivery-selected-head">
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
                                    <label class="js-cart-quantity-${product.id}">${cartItem.quantity}</label>
                                    <input type="number" class="input-quantity" value="1">
                                    <div class="update-btn js-update-btn" data-product-id="${product.id}">Update</div>
                                    <div class="delete-btn">Delete</div>
                                </div>
                            </div>
                            <div class="delivery-div">
                                <div class="option-head">
                                    Choose A delivery option:
                                </div>
                                <div class="select-option">
                                    <input type="radio" name="select-delivery-option-${product.id}" class="radio" checked>
                                    <div>
                                        <div class="delivery-date">
                                            Wednesday, July 17
                                        </div>
                                        <div class="shipping-price">
                                            FREE Shipping
                                        </div>
                                    </div>
                                </div>
                                <div class="select-option">
                                    <input type="radio" name="select-delivery-option-${product.id}" class="radio">
                                    <div>
                                        <div class="delivery-date">
                                            Wednesday, July 11
                                        </div>
                                        <div class="shipping-price">
                                            $4.99 - Shipping
                                        </div>
                                    </div>
                                </div>
                                <div class="select-option">
                                    <input type="radio" name="select-delivery-option-${product.id}" class="radio">
                                    <div>
                                        <div class="delivery-date">
                                            Wednesday, July 9
                                        </div>
                                        <div class="shipping-price">
                                            $9.99 - Shipping
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        }
    });
});
document.querySelector('.js-cart-list').innerHTML=bodyHtml;

document.querySelectorAll('.js-update-btn').forEach((updateDiv) =>{
    updateDiv.addEventListener('click',()=>{
        const productId = updateDiv.dataset.productId;
    });
});