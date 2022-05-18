import React, { Component } from 'react'

export default class ProductSideImages extends Component {
    render() {
        const { gallery } = this.props;

        return (
            <div className='product-side-images'>
                {gallery.map( ( item, index ) => <div onClick={ () => this.props.handleImgClick(item)} key={index}>
                    <img src={item} alt={this.props.name}/>
                </div>)}        
            </div>
        )
    }
}
