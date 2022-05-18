import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import "./productPage.css";

import { fetchOneProduct } from '../../redux/productPageSlice';
import { addProductToCart } from '../../redux/cartReducer/actions';

import Spiner from "../common/Spinner/Spinner";

import ProductSideImages from './ProductSideImages';
import ProductDescription from './ProductDescription';

export class ProductPage extends PureComponent {

    state = {
        currentImg: "",
        selectedAttributes:{},
    }

    componentDidMount(){
        this.props.fetchOneProduct(this.props.match.params.id).then(data=>{
            const defaultAttributes = {};

            data.product.attributes.forEach( attribute => {
                defaultAttributes[attribute.name] = "";
            });

            this.setState({
                currentImg: data.product.gallery[0],
                selectedAttributes: defaultAttributes,
            });

        });
        // console.log("product mount")
    }

    handleImgClick = (img) => {
        this.setState({ currentImg: img })
    }

    handleSelectAttribute = (attribute, attributeValue) => {
        const selectedAttributesCopy = Object.assign( {}, this.state.selectedAttributes );
        selectedAttributesCopy[attribute] = attributeValue;
        this.setState( { selectedAttributes:selectedAttributesCopy } );
    }

    render() {
        const { gallery, description, name, brand, prices, attributes } = this.props.product;

        return (
            <>
                {!this.props.isPending ?
                    <div className='product-page'>
                        <ProductSideImages gallery={ gallery } name={name} handleImgClick={this.handleImgClick}/>
                        <div className='product-current-img'>
                            <img src={this.state.currentImg} alt={name}/>
                        </div>   
                        <ProductDescription description={description} name={name} brand={brand} prices={prices}
                            attributes={attributes} selectedAttributes={this.state.selectedAttributes} handleSelectAttribute={this.handleSelectAttribute}
                            handleAddToCart={this.props.addProductToCart} product = {this.props.product}
                        />
                    </div>:
                    <Spiner/>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.productPageReducer.product,
    isPending: state.productPageReducer.isPending,
});

const mapDispatchToProps = { fetchOneProduct, addProductToCart }

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)