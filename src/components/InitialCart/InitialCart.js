import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Cart from '../Cart/Cart'

class InitialCart extends Component {
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

    login() {
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback?prevPath=${this.props.location.pathname}`)
    
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    }

    render() {
        console.log('------------ this.props', this.props)
        return(
            <div className='cart-container'>
                {this.props.cart.length ?
                    <div className='cart-master'>
                        
                        <Cart props={this.props}/>  
                        {this.props.login ?
                            <div>Next step: <Link to='/shipping'><button>Enter Shipping Inofrmation</button></Link></div>
                            :
                            <div>
                                <div>
                                    <button onClick={() => this.login()}>Log In and Checkout</button>
                                </div>
                                <div>
                                    <Link to='/shipping'><button>Checkout as Guest</button></Link>
                                </div>
                            </div>
                        }
                        <button onClick={() => {this.props.history.goBack(); this.props.history.goBack()}}>Back</button>
                    </div>
                :
                <Cart props={this.props} />
                }
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

export default connect(mapStateToProps)(InitialCart)

