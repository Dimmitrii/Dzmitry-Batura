import { actions } from "./actions";

const initialState = {
    productsInCart: [],
    idForNewProduct: 1,
}

export const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.addProductToCart:

            const { product, selectedAttributes} = action.payload;

            const currentProductInCart = Object.assign({}, state.productsInCart.filter( i => i.id === product.id)[0]);

            const actionProduct= JSON.parse(JSON.stringify(product));
            const actionSelectedAttribute= Object.assign( {}, selectedAttributes );


            if(Object.keys(currentProductInCart).length === 0){ 

                actionSelectedAttribute.quantity = 1;
                actionSelectedAttribute.id = state.idForNewProduct

                actionProduct.selectedAttributes = [actionSelectedAttribute];

                return{
                    ...state,
                    idForNewProduct: state.idForNewProduct + 1,
                    productsInCart: [...state.productsInCart, actionProduct]
                }

            }else if(currentProductInCart.attributes.length === 0){

                currentProductInCart.selectedAttributes = [{
                    quantity: currentProductInCart.selectedAttributes[0].quantity + 1,
                    id: currentProductInCart.selectedAttributes[0].id,
                }];

                return{
                    ...state,
                    productsInCart: state.productsInCart.map(product => product.id === currentProductInCart.id ? currentProductInCart : product )
                }
            }

            let isSameSelectedAttributes = false;

            const copySelectedAttributes = currentProductInCart.selectedAttributes.map((item)=>{
    
                if(isSameSelectedAttributes === true) return item;
    
                for(let attribute in item){
                    if(item[attribute] === actionSelectedAttribute[attribute]){
                        isSameSelectedAttributes = true;
                    }else{
                        if(attribute === "quantity" || attribute === "id") continue
                        isSameSelectedAttributes = false;
                        break
                    }
                }
    
                if(isSameSelectedAttributes === true){
                    const copyItem = {...item}
                    copyItem.quantity = copyItem.quantity + 1;
                    return copyItem;
                }

                return item;
            });

            if(isSameSelectedAttributes === false){

                actionSelectedAttribute.quantity = 1;
                actionSelectedAttribute.id = state.idForNewProduct;

                currentProductInCart.selectedAttributes = [...currentProductInCart.selectedAttributes, actionSelectedAttribute];

            }else{
                currentProductInCart.selectedAttributes = copySelectedAttributes;
            }

            return{
                ...state,
                productsInCart: state.productsInCart.map( product => product.id === currentProductInCart.id ? currentProductInCart : product),
                idForNewProduct: isSameSelectedAttributes ? state.idForNewProduct : state.idForNewProduct + 1,
            }

        case actions.changeQuantityProduct:

            const products = state.productsInCart.map((product, productIndex) => {

                if(productIndex === action.payload.productIndex){

                    const productCopy = {...product}

                    productCopy.selectedAttributes = productCopy.selectedAttributes.map((attribute, attributeIndex) => {
                        
                        if(attributeIndex === action.payload.selectedAttributesIndex){

                            const copy = {...attribute}
                            copy.quantity = action.payload.isPlus ? copy.quantity + 1 : copy.quantity - 1;

                            return copy
                        }
                        return attribute;
                    });

                    return productCopy
                }
                return product
            });

            return{
                ...state,
                productsInCart: products,
            }

        case actions.removeProduct:

            if(state.productsInCart[action.payload.productIndex].selectedAttributes.length === 1){
                return{
                    ...state,
                    productsInCart: state.productsInCart.filter((item, index) => index !== action.payload.productIndex),
                }
            }

            const productsAfterRemoving = state.productsInCart.map((product, index) =>{ 
                if(index === action.payload.productIndex){
                    const productCopy = {...product}

                    const selectedAttributes = product.selectedAttributes.filter((item, index) => index !== action.payload.selectedAttributesIndex );

                    productCopy.selectedAttributes = selectedAttributes;

                    return productCopy;
                }
                return product
            });

            return{
                ...state,
                productsInCart: productsAfterRemoving,
            }

        default:
            return state;
    }
}