//import { Cart } from "../data/cart.js";

const bodyHtml=
    `
        <div class="checkout-body">
            <section class="checkout-title">
                Review your order
            </section>
            <section class="checkout-grid">
                <div class="order-summary-section-first">
                    ${orderedSummary()}
                </div>

                <div class="ordered-products">
                    ${orderedProducts()}
                </div>

                <div class="ordered-products-second">
                    ${orderedProducts()}
                </div>

                <div class="order-summary-section">
                    ${orderedSummary()}
                </div>
            </section>
        </div>
    `;
document.querySelector('.js-checkout-body-div').innerHTML=bodyHtml;

function orderedProducts(){
    const orderedProductHtml=
    `
        <div class="checklist-div">
            <div class="delivery-date-selected">
                Delivery date: Tuesday, July 9
            </div>
            <div class="checkout-display">
                <div>
                    <img src="../images/products/athletic-cotton-socks-6-pairs.jpg" class="products-img">
                </div>
                <div>
                    <div class="product-title">
                        Black and Gray Athletic Cotton Socks - 6 Pairs
                    </div>
                    <div class="product-cost">
                        $10.90
                    </div>
                    <div class="quantity-div">
                        <div class="quantity-txt">
                            Quantity:
                        </div>
                        <div>1</div>
                        <div class="update-btn">
                            Update
                        </div>
                        <div class="delete-btn">
                            Delete
                        </div>
                    </div>
                </div>
                <div class="delivery-div">
                    ${deliverOption()}
                </div>
            </div>
            <div class="delivery-div-second">
                ${deliverOption()}
            </div>
        </div>
    `;
    return orderedProductHtml;
}

function deliverOption(){
    const deliverOptionHtml=
    `
        <div class="option-head">
            Choose A delivery option:
        </div>
        <div class="select-option">
            <input type="radio" name="select-delivery-option" class="radio">
            <div>
                <div class="delivery-date">
                    Wednesday, July 17
                </div>
                <div class="price">
                    FREE Shipping
                </div>
            </div>
        </div>
        <div class="select-option">
            <input type="radio" name="select-delivery-option" class="radio">
            <div>
                <div class="delivery-date">
                    Wednesday, July 11
                </div>
                <div class="price">
                    $4.99 - Shipping
                </div>
            </div>
        </div>
        <div class="select-option">
            <input type="radio" name="select-delivery-option" class="radio">
            <div>
                <div class="delivery-date">
                    Wednesday, July 9
                </div>
                <div class="price">
                    $9.99 - Shipping
                </div>
            </div>
        </div>
    `;
    return deliverOptionHtml;
}

function orderedSummary(){
    const orderedSummaryHtml=
    `
        <div class="order-summary-div">
            <div class="order-summary-title">
                Order Summary
            </div>
            <div class="items-cost-div">
                <div class="items-count">
                    Items (0):
                </div>
                <div class="items-cost">
                    $0.00
                </div>
            </div>
            <div class="shipping-cost-div">
                <div class="shipping-handling">
                    Shipping & handling:
                </div>
                <div class="shipping-cost">
                    $0.00
                </div>
            </div>
            <div class="divider">
                <div></div>
                <button class="underline"></button>
            </div>
            <div class="before-tax-div">
                <div class="total-before-tax">
                    Total before tax:
                </div>
                <div class="total-before-tax-cost">
                    $0.00
                </div>
            </div>
            <div class="tax-div">
                <div class="estimated-tax">
                    Estimated tax (10%):
                </div>
                <div class="shipping-cost">
                    $0.00
                </div>
            </div>
            <div class="divider">
                <button class="underline2"></button>
            </div>
            <div class="total-div">
                <div class="order-total">
                    Order total:
                </div>
                <div class="total-cost">
                    $0.00
                </div>
            </div>
            <div class="paypal-div">
                <div class="papypal">Use PayPal</div>
                <input type="checkbox" name="paypal" class="pp-checkbox">
            </div>
            <button class="order-btn">
                <div class="footer-txt">
                    <div class="pay1">
                        Pay
                    </div>
                    <div class="pal1">
                        Pal
                    </div>
                </div>
            </button>
            <button class="cards-btn">g</button>
            <div class="footer-txt">
                <div class="powered-by">
                    Powered by 
                </div>
                <div class="pay2">
                    Pay
                </div>
                <div class="pal2">
                    Pal
                </div>
            </div>
        </div>
    `;
    return orderedSummaryHtml;
}