const products=[{
  image:'images/products/athletic-cotton-socks-6-pairs.jpg',
  name:'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating:{
    stars:4.5,
    count:87
  },
  priceCents:1090
},{
  image:'images/products/intermediate-composite-basketball.jpg',
  name:'Intermediate Size Basketball',
  rating:{
    stars:4.0,
    count:127
  },
  priceCents:2095
},{
  image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name:'Adults Plain Cotton T-shirt - 2 Pack',
  rating: {
    stars:4.5,
    count:56
  },
  priceCents:799
}];

let html='';
products.forEach((product) => {
  html+=`
    <section class="products-display">
      <div class="product-image-display">
        <img class="products-image" src="${product.image}">
      </div>
      <div class="products-details">
        ${product.name}
      </div>
      <div class="ratings-display">
        <div>
          <img class="ratings" src="images/ratings/rating-${product.rating.stars * 10}.png">
        </div>
        <div class="total-ratings">${product.rating.count}</div>
      </div>
      <div class="product-cost">
        $${product.priceCents/100}
      </div>
      <div class="quantity-selection-display">
        <select class="quantity-selection">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
      </div>
      <button class="add-to-cart">
        Add to Cart
      </button>
    </section>
  `;
  document.querySelector('.js-products-main').innerHTML=html;
});
