import React, { Component } from 'react'

import "./quantitySquare.css"

export default class QuantitySquare extends Component {
    render() {
        const { onClick } = this.props;
        return (
            <div className='quantity-square' onClick={onClick}>
                <div className='quantity-square-line minus-line'/>
                {this.props.plus === true ? <div className='quantity-square-line'/> : null}
            </div>
        )
    }
}
