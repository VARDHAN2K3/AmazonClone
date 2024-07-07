export function renderPrice(priceCents){
    return `$${(priceCents/100).toFixed(2)}`;
}