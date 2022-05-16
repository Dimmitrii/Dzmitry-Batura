export const actions = {
    addProductToCart: "ADD_PRODUCT_TO_CART",
    changeQuantityProduct: "CHANGE_QUANTITY_PRODUCT",
    removeProduct: "REMOVE_PRODUCT",
}

export const addProductToCart = ( product, selectedAttributes ) => {
    return ({ type: actions.addProductToCart, payload: { product, selectedAttributes } })
}

export const changeQuantityProduct = ( productIndex, selectedAttributesIndex, isPlus ) => {
    return ({ type: actions.changeQuantityProduct, payload: { productIndex, selectedAttributesIndex, isPlus } })
}
export const removeProduct = ( productIndex, selectedAttributesIndex ) => {
    return ({ type: actions.removeProduct, payload: { productIndex, selectedAttributesIndex } })
}