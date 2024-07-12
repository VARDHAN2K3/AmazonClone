import { cart,updateCartByQuantity,updateCartByDelete } from "../data/cart.js";
import { products } from "../data/products.js";
import { renderPrice } from "../others/price.js";

console.log(cart);

renderCartCount();

renderCartItems();

//update quantity
document.querySelectorAll('.js-update-btn').forEach((updateBtn) =>{
    updateBtn.addEventListener('click',()=>{
        const productId = updateBtn.dataset.productId;
        
        UpdateQuantity(productId,updateBtn);

    });
});

//deleting items
document.querySelectorAll('.js-delete-btn').forEach((deleteBtn) => {
    deleteBtn.addEventListener('click',() => {
        const productId = deleteBtn.dataset.productId;
        updateCartByDelete(productId);
        renderCartItems();
        renderCartCount();
        console.log(cart);
    });
});


//function
function renderCartCount(){
    document.querySelector('.js-checkout-count').innerHTML=`${cart.length} Items`;
}

function renderCartItems(){
    let bodyHtml='';
    if(cart.length){
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
                                        <div class="js-quantity-div-${productId}">
                                            <label class="cart-quantity">${cartItem.quantity}</label>
                                        </div>
                                        <button class="update-btn js-update-btn" data-product-id="${productId}">Update</button>
                                        <button class="delete-btn js-delete-btn" data-product-id=${productId}>Delete</button>
                                    </div>
                                    
                                </div>
                                <div class="delivery-div">
                                    <div class="option-head">
                                        Choose A delivery option:
                                    </div>
                                    <div class="select-option">
                                        <input type="radio" name="select-delivery-option-${productId}" class="radio" checked>
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
                                        <input type="radio" name="select-delivery-option-${productId}" class="radio">
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
                                        <input type="radio" name="select-delivery-option-${productId}" class="radio">
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
    }else if(!cart.length){
        bodyHtml+=
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
    }
    document.querySelector('.js-cart-list').innerHTML=bodyHtml;
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
            updateCartByDelete(productId);
            renderCartItems();
            renderCartCount();
        }else if(selectedQuantity > 0){
            quantityDiv.innerHTML = `<label class="cart-quantity">${selectedQuantity}</label>`;
            updateBtn.innerHTML="Update";
            updateCartByQuantity(productId,selectedQuantity);
        }
    }
}