import React, { Component } from 'react'
import { connect } from 'react-redux';

import "./card.css";

import addToCartIcon from "../../../assets/addToCartIcon.svg";

import { Link } from 'react-router-dom';

import { addProductToCart } from '../../../redux/cartReducer/actions';


class Card extends Component {

    addDefaultProductToCart = (product) => {
        const defaultAttributes = {}
        product.attributes.forEach(attribute=>{
            defaultAttributes[attribute.name] = attribute.items[0].value;
        });
        this.props.addProductToCart(product, defaultAttributes);
    }

    render() {
        const { gallery, name, brand, prices, inStock, id, product} = this.props;

        const currentCurrency = prices.filter( price => price.currency.symbol === this.props.currentCurrency)[0];

        return (
            <div className='card'>
                {!inStock ? <div className='card-out-stock'>
                    <Link to={inStock ? `/main/item/${id}` : `/main/item/${id}`}>
                    OUT OF STOCK
                    </Link>
                </div>: null}
                {inStock ? 
                <div className='add-to-cart-button' onClick={()=> this.addDefaultProductToCart(product)}>
                        <img src={addToCartIcon} alt="add product to cart"/>
                </div> : null}
                <div>
                    <Link to={inStock ? `/main/item/${id}` : `/main/item/${id}`}>
                        <div className='card-img-wrapper'>
                            <img src={gallery[0]}  alt={name}/>
                        </div>
                    </Link>
                </div>
                <Link to={inStock ? `/main/item/${id}` : `/main/item/${id}`}>
                    <div className='card-title'>{brand} {name}</div>
                    <div className='card-amount'>{this.props.currentCurrency}{currentCurrency.amount.toFixed(2)}</div>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    currentCurrency: state.productListReducer.currentCurrency,
});

const actions = { addProductToCart }

export default connect(mapStateToProps, actions)(Card)