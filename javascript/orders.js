import { getMobileHead,renderCartCount } from "../others/shared-function.js";
import {orders} from "../others/ordersList.js";
import {renderPrice} from "../others/price.js";
import { cart } from "../others/cart.js";

getMobileHead();
renderCartCount();
console.log(orders);

let ordersHtml ='';
orders.forEach(order =>{
    ordersHtml+=
    `
        <div class="ordered-items-div">
            <section class="order-details">
                <div class="todays-date">
                    Order Placed:
                    <div class="date">
                        ${order.orderPlaced}
                    </div>
                </div>
                <div class="total-price">
                    Total: 
                    <div class="price">
                        ${renderPrice(order.total)}
                    </div>
                </div>
                <div class="order-id">
                    Order ID: 
                    <div class="id">
                        ${order.uid}
                    </div>
                </div>
            </section>
            <section class="products-div">
                <div class="product">
                    <img src="../images/products/athletic-cotton-socks-6-pairs.jpg" class="product-image">
                    <div class="product-details">
                        <div class="product-name">
                            Black and Gray Athletic Cotton Socks - 6 Pairs
                        </div>
                        <div class="delivey-date">
                            Arriving on: August 15
                        </div>
                        <div class="quantity">
                            Quantity: 1
                        </div>
                        <button class="buy-again-button">
                            <img src="../images/icons/buy-again.png" class="buy-again-img">
                            <div class="buy-again-txt">
                                Buy it again
                            </div>
                        </button>
                    </div>
                    <div class="track-div">
                        <button class="track-btn">
                            Track package
                        </button>
                    </div>
                </div>
                <div class="product">
                    <img src="../images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg" class="product-image">
                    <div class="product-details">
                        <div class="product-name">
                            Adults Plain Cotton T-Shirt - 2 Pack
                        </div>
                        <div class="delivey-date">
                            Arriving on: August 19
                        </div>
                        <div class="quantity">
                            Quantity: 2
                        </div>
                        <button class="buy-again-button">
                            <img src="../images/icons/buy-again.png" class="buy-again-img">
                            <div class="buy-again-txt">
                                Buy it again
                            </div>
                        </button>
                    </div>
                    <div class="track-div">
                        <button class="track-btn">
                            Track package
                        </button>
                    </div>
                </div>
            </section>
        </div>
    `;
});
document.querySelector('.js-display-orders').innerHTML = ordersHtml;


//functions
function renderProducts(){
    orders.forEach(order => {
        order.ids.forEach(id => {
            console.log(id);
        });
    });
}
renderProducts();

/*
<div class="ordered-items-div">
            <section class="order-details">
                <div class="todays-date">
                    Order Placed:
                    <div class="date">
                        June 10
                    </div>
                </div>
                <div class="total-price">
                    Total: 
                    <div class="price">
                        $41.90
                    </div>
                </div>
                <div class="order-id">
                    Order ID: 
                    <div class="id">
                        b6b6c212-d30e-4d4a-805d-90b52ce6b37d
                    </div>
                </div>
            </section>
            <section class="products-div">
                <div class="product">
                    <img src="../images/products/intermediate-composite-basketball.jpg" class="product-image">
                    <div class="product-details">
                        <div class="product-name">
                            Intermediate Size Basketball
                        </div>
                        <div class="delivey-date">
                            Arriving on: June 17
                        </div>
                        <div class="quantity">
                            Quantity: 2
                        </div>
                        <button class="buy-again-button">
                            <img src="../images/icons/buy-again.png" class="buy-again-img">
                            <div class="buy-again-txt">
                                Buy it again
                            </div>
                        </button>
                    </div>
                    <div class="track-div">
                        <button class="track-btn">
                            Track package
                        </button>
                    </div>
                </div>
            </section>
        </div>
*/