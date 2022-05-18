import React, { Component } from 'react'
import { connect } from 'react-redux'

import "./cart.css"

import { changeQuantityProduct, removeProduct } from '../../redux/cartReducer/actions'

import getQuantityItemsInCart from '../../utils/getQuantityItemsInCart'
import getTotal from '../../utils/getTotalPriceInCart'
import getTax from '../../utils/getTaxInCart'

import CartItem from './CartItem'

class Cart extends Component {

    validateChangeQuantityProduct = ( productIndex, selectedAttributesIndex, isPlus, quantity ) => {
        if(quantity === 1 && !isPlus){
            this.props.removeProduct(productIndex, selectedAttributesIndex);
            return;
        }
        this.props.changeQuantityProduct(productIndex, selectedAttributesIndex, isPlus);
    }

    render() {
        const { currentCurrency, overlay } = this.props;

        return (
            <div>
                {overlay ? null : <h1 className='cart-page-title'>CART</h1>}
                <div className='cart-page-container'>
                    {this.props.productsInCart.map((product, productIndex) => product.selectedAttributes.map((attribute, atrIndex) => 
                        <CartItem key={attribute.id} attribute={attribute} product={product} currentCurrency={currentCurrency}
                            productIndex={productIndex} atrIndex={atrIndex} validateChangeQuantityProduct={this.validateChangeQuantityProduct}
                        />
                    ))}
                </div>
                {overlay ? null : <>
                    <div className='cart-order-info'>
                        <p>Tax 21%:</p> <p><b>{currentCurrency}{getTax(getTotal(this.props.productsInCart, currentCurrency)).toFixed(2)}</b></p>
                        <p>Quantity: &nbsp;</p> <p><b>{getQuantityItemsInCart(this.props.productsInCart)}</b></p>
                        <p>Total:</p> <p><b>{currentCurrency}{getTotal(this.props.productsInCart, currentCurrency).toFixed(2)}</b></p>
                    </div>
                    <button className='order-button'>ORDER</button>
                </>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    productsInCart: state.cartReducer.productsInCart,
    currentCurrency: state.productListReducer.currentCurrency,
});

const mapDispatchToProps = {changeQuantityProduct, removeProduct}

export default connect(mapStateToProps, mapDispatchToProps)(Cart) 