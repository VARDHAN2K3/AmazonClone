const html=
 `
    <header class="header">
        <section class="left-header">
            <a href="./amazon.html">
                <img src="../images/amazon-mobile-logo.png" class="amazon-mobile-logo">
            </a>
            <a href="./amazon.html">
                <img src="../images/amazon-logo.png" class="amazon-logo">
            </a>
        </section>
        <section class="center-header">
            <div class="checkout-txt">
                Checkout (<div class="js-cart-count">3 items</div><div>)</div>
            </div>
        </section>
        <section class="right-header">
            <img src="../images/icons/checkout-lock-icon.png">
        </section>
    </header>

 `;

 document.querySelector('.js-header-div').innerHTML=html;
 console.log(html);