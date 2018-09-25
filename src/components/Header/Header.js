import React, { Component } from 'react'
import './header.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { updateLogin, updateUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import logo from './media/AXXION_logo_61-1024x1024.png'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: this.props.user.username,
            picture: this.props.user.picture,
            cart: this.props.cart,
            totalQty: this.props.cart.reduce((total, num) => total += num.qty, 0),
            toggleMenu: false,
            cartIndicator: true,
        }
    }

    componentDidMount() {
        axios.get('/api/session/user').then(res => {
            if(res.data.username) {
                this.props.updateUser(res.data)
                this.props.updateLogin(true)
            } else {
                this.props.updateLogin(false)
            }
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.cart !== prevProps.cart) {
            this.setState({
                cartIndicator: true,
                totalQty: this.props.cart.reduce((total, num) => total += num.qty, 0)
            })
        }
    }

    getTotalQty() {
        let totalQty = 0
        for(let i=0; i<this.state.cart.length; i++){
            totalQty += this.state.cart[i].qty
        }
        return totalQty
    }
    
    login() {
        this.setState({
            toggleMenu: false
        })
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback?prevPath=${window.location.pathname}`)
    
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    }

    render() {
        console.log('------------ this.props', this.props)
        return(
            <div className="header_container">
                <div className="header_background">
                { this.props.login ? 
                <Link to='/profile'>
                    <div className='mini-profile'>
                        <div className="image-container">
                            <img src={this.props.user.picture} width='65' alt="Profile"/>
                        </div>
                        {this.props.user.username} 
                    </div>
                </Link>
                :
                <Link to='/'>
                    <img onClick={() => this.setState({ toggleMenu: false })} src={logo} alt="Axxion" className="logo"/>
                </Link>
                }
                <div className="menu" onClick={() => this.setState({ toggleMenu: !this.state.toggleMenu, cartIndicator: false })}>
                    <div className={this.state.toggleMenu ? 'menux1' : "menuline1"}></div>
                    <div className={this.state.toggleMenu ? 'menux2' : "menuline2"}></div>
                    <div className={this.state.toggleMenu ? 'menux3' : "menuline3"}></div>
                        {this.props.cart.length ? 
                            this.state.cartIndicator &&
                                <div className='cart-indicator-menu'>{this.state.totalQty}</div>
                        :
                        null}
                </div>
                    <div className={this.state.toggleMenu ? "menulist open" : "menulist"}>
                        {this.props.login ?
                            <Link to='/profile'><div onClick={() => this.setState({ toggleMenu: false })}>Profile</div></Link>
                            :
                            <div className='login-portal' onClick={() => this.login()}>Login</div>
                        }
                        <Link to='/'><div onClick={() => this.setState({ toggleMenu: false })}>Home</div></Link>
                        <Link to='/articles'><div onClick={() => this.setState({ toggleMenu: false })}>Articles</div></Link>
                        <Link to='/products'><div onClick={() => this.setState({ toggleMenu: false })}>Products</div></Link>
                        <Link to='/about'><div onClick={() => this.setState({ toggleMenu: false })}>Contact</div></Link>
                        <Link to='/about'><div onClick={() => this.setState({ toggleMenu: false })}>About</div></Link>
                        {this.props.cart.length ? 
                        <Link to='/cart'><div className='cart' onClick={() => this.setState({ toggleMenu: false })}>Cart<div className='cart-indicator'>{this.state.totalQty}</div></div></Link>
                        :
                        null
                        }
                        <div className='hamburger' onClick={() => this.setState({ toggleMenu: false })}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        login: store.login,
        user: store.user,
        cart: store.cart
    }
}

export default connect(mapStateToProps, { updateLogin, updateUser })(Header)

