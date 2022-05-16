export default function getQuantityItemsInCart(items){
    if(items.length === 0) return 0

    let quantity = 0;

    items.forEach(item=>{
        item.selectedAttributes.forEach(i => quantity += i.quantity)
    });
    
    return quantity;
}