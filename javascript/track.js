import { getMobileHead } from "../others/shared-function.js";
import { trackDetails } from "../others/track-item.js";
import { products } from "../data/products.js";

getMobileHead();
let matching;
products.forEach(product => {
    if(trackDetails[0] === product.id){
        matching=product;
    }
});
const trackHtml =
`
    <a href="orders.html" class="orders-link-txt">
        View all orders
    </a>
    <div class="product">
        <div class="delivery-date">
            Arriving on ${trackDetails[1]}
        </div>
        <div class="name">
            ${matching.name}
        </div>
        <div class="quantity">
            Quantity: ${trackDetails[2]}
        </div>
        <img src="${matching.image}" class="product-image">
        <div class="progress-bar-txt-div">
            <div class="progress-txt">
                Preparing
            </div>
            <div class="progress-txt">
                Shipped
            </div>
            <div class="progress-txt">
                Delivered
            </div>
        </div>
        <progress id="progress" value="20" max="100"> 32% </progress>
        <!--
        <div class="progress-bar-div">
            <div class="progress-bar"></div>
        </div>
        -->
    </div>
`;
document.querySelector('.js-main-div').innerHTML = trackHtml;
