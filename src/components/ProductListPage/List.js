import React, { Component } from 'react'
import { connect } from 'react-redux'

import "./list.css";

import { fetchAllProducts, changeProductsCategory } from '../../redux/productListSlice';

import Card from './ProductCard/Card';


export class List extends Component {

    componentDidMount(){
        if(this.props.location.pathname === "/main/tech/"){
            this.props.fetchAllProducts("tech");
            this.props.changeProductsCategory("tech");
            return;
        }
        else if(this.props.location.pathname === "/main/clothes/"){
            this.props.fetchAllProducts("clothes");
            this.props.changeProductsCategory("clothes");
            return;
        }    
        this.props.fetchAllProducts("");
    }

    componentDidUpdate(prevProps){
        if(prevProps.productsCategory === this.props.productsCategory) return;
        this.props.fetchAllProducts(this.props.productsCategory);
    }

    render() {
        const categoryTitle = this.props.productsCategory === "" ? "All" : this.props.productsCategory === "tech" ? "Tech" : "Clothes";

        return (
            <div style={{marginTop:"80px"}}>
                <div className='title'>{categoryTitle}</div>
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
