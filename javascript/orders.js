import { getMobileHead,renderCartCount } from "../others/shared-function.js";
import {orders} from "../others/ordersList.js";
import {renderPrice} from "../others/price.js";
import { products } from "../data/products.js";
import { cart } from "../others/cart.js";
import { tracking } from "../others/track-item.js";

getMobileHead();
renderCartCount();

let ordersHtml ='';
if(!(orders.length)){
    isEmpty();
}else{
    for(let i=(orders.length-1);i>=0;i--){
        ordersHtml+=
        `
            <div class="ordered-items-div">
                <section class="order-details">
                    <div class="todays-date">
                        Order Placed:
                        <div class="date">
                            ${(orders[i]).orderPlaced}
                        </div>
                    </div>
                    <div class="total-price">
                        Total: 
                        <div class="price">
                            ${renderPrice((orders[i]).total)}
                        </div>
                    </div>
                    <div class="order-id">
                        Order ID: 
                        <div class="id">
                            ${(orders[i]).uid}
                        </div>
                    </div>
                </section>

                <section class="products-div">
                    ${renderProducts((orders[i]).ids,(orders[i]).arrivalDay,(orders[i]).quantity)} 
                </section>
            </div>
        `;
    }
    document.querySelector('.js-display-orders').innerHTML = ordersHtml;
}

//buy again button
document.querySelectorAll('.js-buy-again-btn').forEach(btn => {
    btn.addEventListener('click',() => {
        const productId = btn.dataset.productId;
        addedMsg(btn);
        cart.addToCart(productId,1);
        renderCartCount();
    });
});

//track button
document.querySelectorAll('.js-track-btn').forEach(track => {
    track.addEventListener('click',() =>{
        const {productId,arrivalDay,quantity} = track.dataset;
        tracking(productId,arrivalDay,quantity);
        open('track.html', EventTarget="_self");
    });
});


//functions
function isEmpty(){
    ordersHtml=
    `
        <div class="empty-list-txt">
            No Orders.
        </div>
        <a href="./index.html">
            <button class="view-products-btn">
                View products
            </button>
        </a>
    `;
    document.querySelector('.js-display-orders').innerHTML = ordersHtml;
}

function renderProducts(ids,arrivalDay,quantity){
    let productHtml='';
    ids.forEach((id,index) => {
        let matching;
        products.forEach(product =>{
            if(id === product.id){
                matching = product;
            }
        });
        productHtml+=
        `
            <div class="product">
                <img src="${matching.image}" class="product-image">
                <div class="product-details">
                    <div class="product-name">
                        ${matching.name}
                    </div>
                    <div class="delivey-date">
                        Arriving on: ${arrivalDay[index]}
                    </div>
                    <div class="quantity">
                        Quantity: ${quantity[index]}
                    </div>
                    <button class="buy-again-button js-buy-again-btn" data-product-id="${matching.id}">
                        <img src="../images/icons/buy-again.png" class="buy-again-img">
                        <div class="buy-again-txt">
                            Buy it again
                        </div>
                    </button>
                </div>
                <div class="track-div">
                    <button class="track-btn js-track-btn" data-product-id="${matching.id}"
                    data-arrival-day="${arrivalDay[index]}"
                    data-quantity="${quantity[index]}">
                        Track package
                    </button>
                </div>
            </div>
        `;
    });
    return productHtml;
}

function addedMsg(btn){
    btn.innerHTML = 
    `
        <div class="added-txt">
            &#10004; Added
        </div>
    `;
    setTimeout(() => {
        btn.innerHTML =
        `
            <img src="../images/icons/buy-again.png" class="buy-again-img">
            <div class="buy-again-txt">
                Buy it again
            </div>
        `;
    },2000);
}