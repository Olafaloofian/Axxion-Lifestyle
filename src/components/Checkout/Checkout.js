import React, { Component } from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import logo from '../../AXXION.png'
import { connect } from 'react-redux'
import { resetAddress, clearCart } from '../../ducks/reducer'
import '../InitialCart/cart.css'


// const PUBLISHABLE_KEY = 'sk_test_xOKaTRBZ8hrAfQpTlXKwCW17'
const fromUSDtoCent = amount => amount * 100

class Checkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orderComplete: false,
            orderNumber: '',
            // cart: this.props.cart,
            total: 0,
            orderid: "",
            qty: 0
        }
    }

    // componentDidMount() {
    //     this.setState({
    //         cart: JSON.parse(sessionStorage.getItem('cart'))
    //     })
    // }

    getTotal = () => {
        console.log('------------ this.props', this.props)
        const { cart } = this.props
        let allTotal = 0
        if(cart) {
            for(let i=0; i<cart.length; i++){
                allTotal += cart[i].total
            }
            return allTotal.toFixed(2)
        }
    }

    // getQty = () => {
    //     const { cart } = this.state
    //     let allQty = 0
    //     if(cart) {
    //         for(let i=0; i<cart.length; i++){
    //             allQty += cart[i].qty
    //         }
    //         return allQty
    //     }
    // }

    onToken = (amount) => (token) => {
        axios.post('/api/payment', {
            source: token.id,
            email: token.email,
            currency: 'USD',
            amount: fromUSDtoCent(amount)
        })
        .then(res => {
            this.paymentSuccess(res)
            console.log('------------ STRIPE res', res.data)})
        .catch(err => this.paymentError(err))
    }

    paymentSuccess = data => {
        const d = new Date()
        const today = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
        // console.log('------------ today', today)
        // console.log('------------ paymentSuccess data', data)
        alert('Payment successful!')
        let id = data.data.StripeSuccess.id.split('')
        id.splice(0, 3)
        this.setState({orderid: id.join('')})
        console.log('------------ this.props.address', this.props.address)
        axios.post('/api/email', { email: this.props.user.email, name: this.props.user.first_name, date: today, total: this.getTotal(), number: this.state.orderid, address: this.props.address})
        axios.post('/api/order', {orderId: id.join(''), userId: this.props.user.id, addressId: this.props.address.id, cart: this.props.cart, date: today})
        .then(res => {
            console.log('------------ POST Order res', res)
            sessionStorage.clear()
            this.props.clearCart()
            this.props.resetAddress()
            this.props.props.history.push(`/confirmation/${this.state.orderid}`)
        })
        .catch(err => console.log('------------ POST order err', err))
    }

    paymentError = (data) => {
        console.log('------------ paymentError data', data)
        alert('Payment Processing Error! No transaction occurred.')
    }

    render() {
        console.log('------------this.props', this.props)
        console.log('------------ this.state', this.state)
        // console.log('------------ this.getQty()', this.getQty())
        console.log('------------ this.getTotal()', this.getTotal())
        return(
            <StripeCheckout 
                name='Axxion Health'
                description='Your one stop for all health solutions!'
                amount={fromUSDtoCent(this.getTotal())}
                image={logo}
                panelLabel='Pay'
                currency='USD'
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
                email={this.props.user.email ? this.props.user.email : null}
                token={this.onToken(this.getTotal())}
            />
        )
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user,
        cart: store.cart,
        address: store.address
    }
}

export default connect(mapStateToProps, { resetAddress, clearCart })(Checkout)
