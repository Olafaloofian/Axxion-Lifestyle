import React, { Component } from 'react'
import Cart from '../Cart/Cart'
import Checkout from '../Checkout/Checkout'
import logo from '../../StripeLogo.png'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import '../InitialCart/cart.css'

class OrderOverview extends Component {

    getItems = () => {
        const cart = this.props.cart
        let items = 0
        if(cart.length) {
            for(let i=0; i<cart.length; i++){
                items += parseInt(cart[i].qty, 10)
            }
            return items
        }
    }

    getTotal = () => {
        const cart = this.props.cart
        let totalPrice = 0
        if(cart.length) {
            for(let i=0; i<cart.length; i++){
                totalPrice += cart[i].total
            }
            return totalPrice
        }
    }

    render() {
        console.log('------------ this.props', this.props)
        let items = this.getItems()
        let total = this.getTotal()
        const { first_name, last_name, address_line_one, address_line_two, city, state, zipcode } = this.props.address
        if(this.props.cart.length && this.props.address.id) {
            return(
                <div>
                    <Cart />
                    <div className="shipping-info">
                        <div>Ship to:</div>
                        <div>{first_name ? first_name : this.props.user.first_name} {last_name ? last_name : this.props.user.last_name}</div>
                        <div>{address_line_one}</div>
                        <div>{address_line_two}</div>
                        <div>{city}</div>
                        <div>{state}</div>
                        <div>{zipcode}</div>
                        <hr/>
                        <div>Items: {items}</div>
                        <div>Total: ${total.toFixed(2)}</div>
                        <div className='stripey'>Checkout with <img src={logo} alt='Stripe' width='200'/></div>
                    </div>
                    <Checkout props={this.props}/>
                </div>
            )  
        } else {
            return(
                <Redirect to='/' />
            )
        }
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user,
        address: store.address,
        cart: store.cart
    }
}

export default connect (mapStateToProps)(OrderOverview)