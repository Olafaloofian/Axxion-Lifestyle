import React, { Component } from 'react'
import { connect } from 'react-redux';
import { newCart } from '../../ducks/reducer'
import { Link } from 'react-router-dom'
import '../InitialCart/cart.css'

class Cart extends Component {
    constructor() {
        super()

        this.state = {
            cart: []
        }
    }

    componentDidMount() {
        this.setState({
            cart: JSON.parse(sessionStorage.getItem('cart')) || []
        }) 
    }

    deleteFromCart(id) {
        const index = this.state.cart.findIndex(element => element.id === id)
        const oldCart = [...this.state.cart]
        oldCart.splice(index, 1)
        this.setState({
            cart: oldCart
        })
        // console.log('------------ this.state.cart', this.state.cart)
        // console.log('------------ oldCart', oldCart)
        // console.log('------------ this.state.cart.findIndex(element => element.id === id)', this.state.cart.findIndex(element => element.id === id))
        this.props.newCart(oldCart)
        console.log('------------ this.state.cart', this.state.cart)
    }

    changeQty(id, num, total, qty) {
        const index = this.state.cart.findIndex(element => element.id === id)
        const oldCart = [...this.state.cart]
        const price = total / qty
        // console.log('------------ price', price)
        if(num > 0) {
            oldCart[index].qty = parseInt(num, 10)
            oldCart[index].total = num * price
            // console.log('------------ num', num)
            // console.log('------------ oldCart', oldCart)
            this.props.newCart(oldCart)
            this.setState({
                cart: oldCart
            })
        }
    }


    render() {
        // console.log('------------ this.props', this.props)
            return(
                <div>
                    <div>
                        {this.state.cart.length ?
                            this.state.cart.map(item => {
                                return(
                                    <div key={item.id} className='cart-item'>
                                        <img src={item.picture} alt="Item" width='100'/>
                                        <span>{item.name}</span>
                                        <span>{`$${parseFloat(item.total, 10).toFixed(2)}`}</span>
                                        <div>
                                            <span>Change Quantity</span><input type="number" min="0" onChange={(e) => this.changeQty(item.id, e.target.value, item.total, item.qty)} value={item.qty}/>
                                        </div>
                                        <div>
                                            <button onClick={() => {this.deleteFromCart(item.id)}}>Delete from cart</button>
                                        </div>
                                        <hr/>
                                    </div>
                                )
                            })
                        :
                        <div className='empty'>
                            Cart is empty! <br/> Visit our <span className='products'><Link to='/products'>products</Link></span> page!
                        </div>
                        }
                    </div>
                </div>
            )
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user,
        cart: store.cart,
        login: store.login
    }
}

export default connect(mapStateToProps, { newCart })(Cart)