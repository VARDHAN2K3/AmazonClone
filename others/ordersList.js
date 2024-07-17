import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { cart } from "../others/cart.js";


 export let orders; 
loadOrdersFromStorage();
function loadOrdersFromStorage(){
    orders=JSON.parse(localStorage.getItem('orders')) || [];
}

function saveOrdersInStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}
export function moveToOrdersList(total){
    const head = Date.now().toString(36);
    const tail = Math.random().toString(36).substr(2);
    const uid = head + tail;
    const today = dayjs().format('MMMM D');
    const ids = [];
    const arrivalDay = [];
    const quantity = [];
    cart.cartItems.forEach((cartItem,i) => {
        ids.push(cartItem.productId);
        arrivalDay.push(cartItem.option);
        quantity.push(cartItem.quantity);
    });
    orders.push({
        uid,
        orderPlaced : today,
        total,
        ids,
        arrivalDay,
        quantity
    });
    saveOrdersInStorage();
}