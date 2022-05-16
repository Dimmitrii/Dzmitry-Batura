import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom';

import "./cartOverlay.css"

import getQuantityItemsInCart from '../../../utils/getQuantityItemsInCart';
import getTotal from '../../../utils/getTotalPriceInCart';

import Cart from '../../CartPage/Cart';

export class CartOverlay extends Component {
    render() {
        const { handleCartOverlayClick, isCartOverlayOpen, productsInCart, currentCurrency } = this.props;

        return (
            <div className='cart-overlay-modal' onClick={()=>{handleCartOverlayClick(false)}} style={{display: isCartOverlayOpen ? "block" : "none"}}>
                <div className='cart-overlay-wrapper'>
                    <div className='cart-overlay-content' onClick={(e)=> e.stopPropagation()}>
                        <div className='cart-overlay-content-quantity'>
                            <b>My Bag,</b> {getQuantityItemsInCart(productsInCart)} items
                        </div>
                        <Cart overlay={true}/>
                        <div>
                            <div className='cart-overlay-content-total'>
                                <div>Total</div>
                                <div><b>{currentCurrency}{getTotal(productsInCart, currentCurrency)}</b></div>
                            </div>
                            <div className='cart-overlay-content-buttons'>
                                <Link to="/cart/">
                                    <button className='cart-overlay-button-view' onClick={()=>{handleCartOverlayClick(false)}}>VIEW BAG</button>
                                </Link>
                                <button className='cart-overlay-button-checkout'>CHECK OUT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    productsInCart: state.cartReducer.productsInCart,
    currentCurrency: state.productListReducer.currentCurrency,
});

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay)