import React, { Component } from 'react'
import { connect } from 'react-redux'

import "./navBar.css";

import logo from "../../assets/logo.svg";
import cart from "../../assets/cart.svg";
import arrow from "../../assets/arrow.svg";

import getQuantityItemsInCart from '../../utils/getQuantityItemsInCart';

import { fetchAllProducts, changeProductsCategory, fetchCurrencies } from '../../redux/productListSlice';

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
        return (
            <nav>
                <div className='nav-links'>
                    <div><Link to="/main/" onClick={()=>{changeProductsCategory("")}}>All</Link></div>
                    <div><Link to="/main/tech/" onClick={()=>{changeProductsCategory("tech")}}>Tech</Link></div>
                    <div><Link to="/main/clothes/" onClick={()=>{changeProductsCategory("clothes")}}>Clothes</Link></div>
                </div>
                <div className='logo'>
                    <Link to="/main/" onClick={()=>{changeProductsCategory("")}}><img src={logo} alt="logo"/></Link>
                </div>
                <div className='cart-currency-menu'>
                    <div style={{width:"52px"}}>
                        <div style={{display:"flex",cursor:"pointer"}} onClick = {this.handleCurrencyMenuClick}>
                            <div style={{marginRight:"10px"}}>{currentCurrency}</div>
                            <div className={isCurrencyMenuOpen ? "cart-currency-arrow-open" : "cart-currency-arrow-closed"}>
                                <img src={arrow} alt="currency menu"/>
                            </div>
                        </div>
                        <div 
                            style={{display: isCurrencyMenuOpen ? "block" : "none"}}
                            className="cart-modal-currency"
                            onClick={this.handleCurrencyMenuClick}
                        >
                            <CurrencyMenu handleCurrencyMenuClick={this.handleCurrencyMenuClick}/>
                        </div>
                    </div>
                    <div>
                        <div onClick={()=> this.handleCartOverlayClick(!this.state.isCartOverlayOpen)} style={{cursor:"pointer"}}>
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
});

const mapDispatchToProps = { fetchAllProducts, changeProductsCategory, fetchCurrencies }

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)