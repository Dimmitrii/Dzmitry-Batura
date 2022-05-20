import React, { Component } from 'react'
import { connect } from 'react-redux'

import "./list.css";

import { fetchAllProducts, changeProductsCategory } from '../../redux/productListSlice';

import Card from './ProductCard/Card';


export class List extends Component {

    componentDidMount(){
        const query = this.props.location.pathname.slice(6).replace(/\//ig, "");
        
        if(query === ""){
            this.props.fetchAllProducts("");

            return;
        }

        this.props.fetchAllProducts(query);
        this.props.changeProductsCategory(query);
    }

    componentDidUpdate(prevProps){
        if(prevProps.productsCategory === this.props.productsCategory) return;
        this.props.fetchAllProducts(this.props.productsCategory);
    }

    render() {
        const categoryTitle = this.props.productsCategory === "" ? "All" : this.props.productsCategory;

        return (
            <div className='products-list-wrapper'>
                <div className='produc-list-title'>{categoryTitle}</div>
                <div className='products-list'>
                    {this.props.products.map( item => 
                        <Card key={item.id} id={item.id} gallery={item.gallery} name={item.name}
                        brand={item.brand} prices={item.prices} inStock={item.inStock} product={item} attributes={item.attributes}/>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.productListReducer.products,
    productsCategory: state.productListReducer.productsCategory,
})

const actions = { fetchAllProducts, changeProductsCategory }

export default connect( mapStateToProps, actions )(List)
