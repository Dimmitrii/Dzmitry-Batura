import React, { Component } from 'react'
import { connect } from 'react-redux'

import "./navBar.css";

import logo from "../../assets/logo.svg";
import cart from "../../assets/cart.svg";
import arrow from "../../assets/arrow.svg";

import getQuantityItemsInCart from '../../utils/getQuantityItemsInCart';

import { fetchAllProducts, changeProductsCategory, fetchCurrencies, fetchCategories } from '../../redux/productListSlice';

import { Link } from 'react-router-dom';

import CurrencyMenu from './CurrencyMenu/CurrencyMenu';
import CartOverlay from './CartOverlay/CartOverlay';

export class NavBar extends Component {

    state = {
        isCurrencyMenuOpen: false,
        isCartOverlayOpen: false,
    }

    componentDidMount(){
        this.props.fetchCurrencies();
        this.props.fetchCategories();
    }

    handleCurrencyMenuClick = () => {
        this.setState({isCurrencyMenuOpen: !this.state.isCurrencyMenuOpen});
    }

    handleCartOverlayClick = (isOpen) => {
        if(isOpen){
            document.body.style.overflow = "hidden";
            this.setState({isCartOverlayOpen: isOpen});
        }else{
            document.body.style.overflow = "auto";
            this.setState({isCartOverlayOpen: isOpen});
        }

    }

    render() {

        const { isCurrencyMenuOpen } = this.state;
        const { currentCurrency, changeProductsCategory } = this.props;
        const currentCategoryUrl = this.props.location.pathname.slice(6).replace(/\//ig, "");
        return (
            <nav>
                <div className='nav-links'>
                    {this.props.productCategories.map( (category, index) => 
                    <div className={ (currentCategoryUrl === "" && index === 0) || currentCategoryUrl === category.name ? "nav-link-active" : "" }>
                        <Link to={`/main/${category.name}/`} onClick={()=>{changeProductsCategory(category.name)}}>
                            {category.name}
                        </Link>
                    </div> )}
                </div>
                <div className='logo'>
                    <Link to="/main/" onClick={()=>{changeProductsCategory("")}}><img src={logo} alt="logo"/></Link>
                </div>
                <div className='cart-currency-cart-menu'>
                        <div className='cart-currency-logo-wrapper' onClick = {this.handleCurrencyMenuClick}>
                            <div>{currentCurrency}</div>
                            <div className="cart-currency-arrow">
                                <img src={arrow} alt="currency menu" className={isCurrencyMenuOpen ? "arrow-open" : ""}/>
                            </div>
                        </div>
                        <div 
                            style={{display: isCurrencyMenuOpen ? "block" : "none"}}
                            className="cart-modal-currency"
                            onClick={this.handleCurrencyMenuClick}
                        >
                            <CurrencyMenu handleCurrencyMenuClick={this.handleCurrencyMenuClick}/>
                    </div>
                    <div>
                        <div onClick={()=> this.handleCartOverlayClick(!this.state.isCartOverlayOpen)}>
                            <img src={cart} alt="cart"/>
                            <div className='cart-overlay-button'>
                                {getQuantityItemsInCart(this.props.productsInCart)}
                            </div>
                        </div>
                        <CartOverlay isCartOverlayOpen={this.state.isCartOverlayOpen} handleCartOverlayClick={this.handleCartOverlayClick}/>
                    </div>
                </div>
            </nav>
        )
    }
}
const mapStateToProps = (state) => ({
    currentCurrency: state.productListReducer.currentCurrency,
    productsInCart: state.cartReducer.productsInCart,
    productCategories: state.productListReducer.productCategories,
});

const mapDispatchToProps = { fetchAllProducts, changeProductsCategory, fetchCurrencies, fetchCategories }

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)