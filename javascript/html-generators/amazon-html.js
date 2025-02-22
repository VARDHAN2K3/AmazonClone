import { products } from "../../data/products.js";
import { renderPrice } from "../../others/price.js";

export function renderProducts(){
    let html='';
    products.forEach((product) => {
    html+=
        `
        <main class="products-display">
            <div class="product-image-display">
            <img class="products-image" src="../../${product.image}">
            </div>
            <div class="products-details">
            ${product.name}
            </div>
            <div class="ratings-display">
            <div>
                <img class="stars" src="../images/ratings/rating-${product.rating.stars * 10}.png">
            </div>
            <div class="count">${product.rating.count}</div>
            </div>
            <div class="product-cost">
            ${renderPrice(product.priceCents)}
            </div>
            <div class="quantity-selection-display">
            <select class="quantity-selection js-quantity-selection-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>
            <div class="added-msg js-added-msg-${product.id}"></div>
            <!-- use productId in data instead for uniqueness-->
            <button class="add-to-cart js-add-to-cart" data-product-Id="${product.id}">
            Add to Cart
            </button>
        </main>
        `;
    });
    document.querySelector('.js-products-main').innerHTML=html;
}