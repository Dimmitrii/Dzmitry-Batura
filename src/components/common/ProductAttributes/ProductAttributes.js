import React, { Component } from 'react'

import getAttributeItemStyle from '../../../utils/getAtributeItemStyle'

export default class ProductAttributes extends Component {
    render() {

        const { attributes, selectedAttributes, handleSelectAttribute, isCart } = this.props;

        return (
            <div className='product-page-atributes' style={{marginBottom: isCart ? "0px" : ""}}> 
                    {attributes.map((atribute, index, atrbts) => 
                    <div key={atribute.id}>
                        <p>{atribute.name.toUpperCase()}:</p>
                        <div className='product-atribute' style={{marginBottom: index === atrbts.length-1 ? "0px" : isCart ? "16px" : ""}}>
                            {atribute.items.map((item, index, itms) => 
                            <div
                                key={item.id}
                                style={getAttributeItemStyle( atribute.type, selectedAttributes[atribute.name] === item.value, itms.length-1 === index, isCart )}
                                onClick = {!handleSelectAttribute ? null : () => handleSelectAttribute(atribute.name, item.value)}
                            >
                                <div 
                                    className={atribute.type === "swatch" ? "product-atribute-item-swatch" : "product-atribute-item"}
                                    style={{backgroundColor:atribute.type === "swatch" ? item.value : null}}
                                >
                                    {atribute.type === "swatch" ? null : item.value}
                                </div>
                            </div>)}
                        </div>
                    </div>)}
                </div>
        )
    }
}
