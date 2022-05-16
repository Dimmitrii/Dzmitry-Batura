import React, { Component } from 'react'

import "./spinner.css"

export default class Spinner extends Component {
    render() {
        return (
            <div style={{display:"flex",justifyContent:"center",marginTop:"350px"}}>
                <div className='loader'/>
            </div>
        )
    }
}
