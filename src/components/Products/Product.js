import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCart } from '../../ducks/reducer'
import { withRouter } from 'react-router-dom'
import './products.css'

class Product extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            total: this.props.price,
            qty: 1
        }
    }

    clicky = (id, name, picture, qty, total) => {   
        this.props.updateCart(id, name, picture, qty, total);
    }

    render() {
        console.log('this.state', this.state)
        console.log('------------ this.props', this.props)
        const { picture, id, name, price } = this.props
        return (
            <div key={id} className='product-container'>
                <div className='product-main'>
                    <img src={picture} alt='Product' width='200'/>
                    <div>{name}</div>
                    <div>{`$${price}`}</div>
                    <div className='product-selection'>
                        Quantity: {this.state.qty}
                        <div>
                            <div>
                                <button className='selector-button' onClick={() => this.setState({ qty: this.state.qty + 1, total: (this.state.qty + 1) * this.props.price})}>▲</button>
                            </div>
                            <div>
                                <button className='selector-button' onClick={() => {this.state.qty > 1 && this.setState({ qty: this.state.qty - 1, total: (this.state.qty - 1) * this.props.price })}}>▼</button>
                            </div>
                        </div>
                    </div>
                    <div><button onClick={() => {this.clicky(id, name, picture, parseInt(this.state.qty, 10), parseFloat(this.state.total, 10))}}>Add to cart</button></div>
                </div>
                <hr/>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        cart: store.cart
    }
}

export default withRouter(connect(mapStateToProps, {updateCart})(Product))