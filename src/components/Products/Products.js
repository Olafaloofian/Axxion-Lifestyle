import React, { Component } from 'react'
import './products.css'
import axios from 'axios'
import { updateCart } from '../../ducks/reducer'
import { connect } from 'react-redux'
import Product from './Product'
import { Link, withRouter } from 'react-router-dom'

class Products extends Component {
    constructor() {
        super()

        this.state = {
            products: [],
            number: ''
        }
    }

    componentDidMount() {
        axios.get(`/api/products/${this.props.match.params.category}`).then(res => {
            this.setState({
                products: res.data
            })
        })
    }

    render(){
        console.log(this.state.products)
        return(
            <div className='products-container'>
            {/* <Link to='/cart'><button onClick={() => this.props.history.push('/cart')}>Cart</button></Link> */}
                <div className='products-main'>
                    {this.state.products.map(product => {
                        return(
                            <div key={product.id}>
                            <Product id={product.id}
                                    picture={product.picture}
                                    name={product.product_name}
                                    price={product.price} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        cart: store.cart
    }
}

export default withRouter(connect(mapStateToProps, {updateCart})(Products))