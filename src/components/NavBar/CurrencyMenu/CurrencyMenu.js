import React, { Component } from 'react'
import { connect } from 'react-redux'

import "./currencyMenu.css"

import { selectCurrentCurrency } from '../../../redux/productListSlice';

export class CurrencyMenu extends Component {
    render() {
        return (
            <div className='currency-menu-container'>
                <div className='currency-menu'>
                    {this.props.currencies.map((currency, index) =>
                    <div
                        key={index}
                        className={this.props.currentCurrency === currency.symbol ? "currency-menu-item-active" : "currency-menu-item"}
                        onClick={() =>{
                            this.props.selectCurrentCurrency(currency.symbol);
                            this.props.handleCurrencyMenuClick()
                        }}
                    >
                        {currency.symbol} {currency.label}
                    </div>)}
                </div> 
            </div>    
        )
    }
}

const mapStateToProps = (state) => ({
    currencies: state.productListReducer.currencies,
    currentCurrency: state.productListReducer.currentCurrency
});

const mapDispatchToProps = { selectCurrentCurrency }

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyMenu)