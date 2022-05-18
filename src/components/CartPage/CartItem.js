import React, { Component } from 'react'

import leftArrow from "../../assets/leftArrow.svg";
import rightArrow from "../../assets/rightArrow.svg";

import QuantitySquare from '../common/QuantitySquare/QuantitySquare';
import ProductAttributes from '../common/ProductAttributes/ProductAttributes';

export default class CartItem extends Component {
    state = {
        currentImage: 0,
    }

    nextImage = () => {
        if(this.state.currentImage === this.props.product.gallery.length - 1){
            this.setState({currentImage:0});
            return;
        }

        this.setState({currentImage: this.state.currentImage + 1})
    }

    previousImage = () =>{
        if(this.state.currentImage === 0){
            this.setState({currentImage: this.props.product.gallery.length - 1});
            return;
        }
        this.setState({currentImage: this.state.currentImage - 1})
    }

    render() {
        const { attribute, product, productIndex, atrIndex, validateChangeQuantityProduct, currentCurrency } =  this.props;

        const currentPrice = product.prices.filter( price => price.currency.symbol === currentCurrency)[0];

        return (
            <div className='cart-item'>
                <div className='cart-item-attribute'>
                    <div className='cart-item-brand'>{product.brand}</div>
                    <div className='cart-item-name'>{product.name}</div>
                    <div className='cart-item-price'>{currentCurrency}{currentPrice.amount}</div>
                    <ProductAttributes attributes={product.attributes} selectedAttributes={attribute} isCart={true}/>
                </div>
                <div className="cart-item-gallery">
                    <div className='cart-item-quantity'>
                        <QuantitySquare plus={true} onClick={()=> validateChangeQuantityProduct(productIndex, atrIndex,true)}/>
                        <div>{attribute.quantity}</div>
                        <QuantitySquare onClick={()=> validateChangeQuantityProduct(productIndex, atrIndex, false, attribute.quantity)}/>
                    </div>
                    <div className='cart-item-image'>
                        <img src={product.gallery[this.state.currentImage]} alt={product.description}/>
                        {product.gallery.length === 1 ? null : <>
                            <img src={leftArrow} alt="prevoius product" className="cart-previous-item-button" onClick = {this.previousImage}/>
                            <img src={rightArrow} alt="next product" className="cart-next-item-button" onClick = {this.nextImage}/>
                        </>}
                    </div>
                </div>
            </div>
        )
}
}