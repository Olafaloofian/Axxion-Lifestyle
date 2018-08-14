import React from 'react'
import { Link } from 'react-router-dom'
import '../InitialCart/cart.css'

export default function Confirmation(props) {
    const d = new Date()
    return (
        <div className='cart-container'>
            <div className="cart-master">
                <div>Thank you for your order placed on: {d.getMonth()+1}/{d.getDate()}/{d.getFullYear()}</div>
                <div>Your order number is: {props.match.params.orderid}</div>
                <div>Confirmation email sent! Please check your inbox.</div>
                <div><Link to='/'><button>Home</button></Link></div>
            </div>
        </div>
    )
} 