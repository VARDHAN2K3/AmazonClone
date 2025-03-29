import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { cart } from "../others/cart.js";
import { deliveryOptions } from "./delivery-option.js";

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
    const options = [];
    const ids = [];
    const arrivalDay = [];
    const quantity = [];
    cart.cartItems.forEach((cartItem) => {
        ids.push(cartItem.productId);
        options.push(cartItem.option);
        quantity.push(cartItem.quantity);
    });
    options.forEach((option) => {
        let matching;
        deliveryOptions.forEach((dOption) => {
            if(option === dOption.option){
                matching = dOption;
            }
        });  
        arrivalDay.push((dayjs().add(matching.time,'day')).format('MMMM D'));
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