import React, { PureComponent } from 'react'
import { connect } from 'react-redux';

import parse from 'html-react-parser';

import ProductAttributes from '../common/ProductAttributes/ProductAttributes';

class ProductDescription extends PureComponent {

    validateAddToCart = ( callBack, product, selectedAttributes ) => {
        for(const key in selectedAttributes){
            if(selectedAttributes[key] === ""){
                alert("You can not add a product to the cart without selected attributes ")
                return;
            }
        }
        callBack( product, selectedAttributes);
    }

    render() {
        const { name, description, brand, prices, attributes, selectedAttributes, handleSelectAttribute, handleAddToCart, product, currentCurrency } = this.props;

        const currentPrice = prices.filter( price => price.currency.symbol === currentCurrency)[0];

        return (
            <div>
                <div className='product-page-title'>
                    <p>{brand}</p>
                    <p>{name}</p>
                </div>
                <ProductAttributes attributes={attributes} handleSelectAttribute={handleSelectAttribute} selectedAttributes={selectedAttributes} />
                <div className='product-page-price'>
                    <p>PRICE:</p>
                    <p>{currentCurrency}{currentPrice.amount}</p>
                </div>
                <div style={{marginTop:"48px"}}>
                    <button className='product-add-button' onClick={()=> this.validateAddToCart( handleAddToCart, product, selectedAttributes )}>ADD TO CART</button>
                </div>
                <div style={{marginTop:"40px"}}>{parse(description)}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentCurrency: state.productListReducer.currentCurrency,
});

export default connect(mapStateToProps)(ProductDescription)