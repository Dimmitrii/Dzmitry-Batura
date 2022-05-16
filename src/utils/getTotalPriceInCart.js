export default function getTotal(products, currentCurrency){
    if(products.length === 0) return 0 
    
    let total = 0;
    
    products.forEach(product => {
        let productQuantity = 0;
        
        product.selectedAttributes.forEach( attr => productQuantity += attr.quantity);

        total += product.prices.filter(price => price.currency.symbol === currentCurrency)[0].amount * productQuantity;
    });

    return Number(total.toFixed(10));
}