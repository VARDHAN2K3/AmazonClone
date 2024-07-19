import { getMobileHead,renderCartCount } from "../others/shared-function.js";
import {orders} from "../others/ordersList.js";
import {renderPrice} from "../others/price.js";
import { products } from "../data/products.js";

getMobileHead();
renderCartCount();
console.log(orders);

let ordersHtml ='';
if(!(orders.length)){
    isEmpty();
}else{
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
                    ${renderProducts(order.ids,order.arrivalDay,order.quantity)} 
                </section>
            </div>
        `;
    });
    document.querySelector('.js-display-orders').innerHTML = ordersHtml;
}


//functions
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
        `;
    });
    return productHtml;
}

function isEmpty(){
    ordersHtml=
    `
        <div class="empty-list-txt">
            No Orders.
        </div>
        <a href="./amazon.html">
            <button class="view-products-btn">
                View products
            </button>
        </a>
    `;
    document.querySelector('.js-display-orders').innerHTML = ordersHtml;
}