import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { updateAddress, updateUser } from '../../ducks/reducer'
import '../InitialCart/cart.css'

class Shipping extends Component {
    constructor() {
        super()

        this.state = {
            cart: [],
            firstName: "",
            lastName: "",
            email: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zipcode: "",
            savedAddresses: '',
            selectedAddress: '',
            saveAddress: false
        }
    }

    componentDidMount() {
        if(this.props.user.id) {
        console.log('------------ this.props.user.id', this.props.user.id)
        const id = this.props.user.id
        axios.get(`/api/address?id=${id}`).then(res => {
            console.log('------------ Get Address res', res)
            this.setState({
                savedAddresses: res.data
            })
        }).catch(error => console.log('------------ Address error', error))
        }
        this.setState({
            cart: JSON.parse(sessionStorage.getItem('cart')) || []
        })
    }

    updateState = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    makeGuest = () => {
        const { firstName, lastName, email, addressLine1, addressLine2, city, state, zipcode } = this.state
        if(!firstName || !lastName || !email || !addressLine1 || !city || !state || state === 'State' || !zipcode) {
            alert('Please fill out all shipping information')
        } else {
            axios.post('/api/guest', { firstName, lastName, email }).then(res => {
                console.log('------------ Guest res', res)
                const id = res.data[0].id
                this.props.updateUser(res.data[0])
                axios.post('/api/address', { id, addressLine1, addressLine2, city, state, zipcode }).then(res => {
                    console.log('------------ Address res', res)
                    this.props.updateAddress(res.data[0])
                    this.props.history.push('/overview')
                }).catch(error => console.log('------------ Address error', error))
            }).catch(error => console.log('------------ Guest error', error))
        }
    }

    addAddress = () => {
        const { addressLine1, addressLine2, city, state, zipcode } = this.state
        if(!addressLine1 || !city || !state || state === 'State' || !zipcode) {
            alert('Please fill out all shipping information')
        } else if (!this.state.saveAddress) {
            axios.get('/api/session/user').then(response => {
                const id = response.data.id
                axios.post('/api/address', { id, addressLine1, addressLine2, city, state, zipcode }).then(res => {
                    console.log('------------ Address res', res)
                    this.props.updateAddress(res.data[0])
                    this.props.history.push('/overview')
                }).catch(error => console.log('------------ Address error', error))
            })
        } else {
            axios.get('/api/session/user').then(response => {
                const id = response.data.id
                const defaultAddress = this.state.saveAddress
                axios.post('/api/address/save', { id, addressLine1, addressLine2, city, state, zipcode, defaultAddress }).then(res => {
                    console.log('------------ Address res', res)
                    this.props.updateAddress(res.data[0])
                    this.props.history.push('/overview')
                }).catch(error => console.log('------------ Address error', error))
            })
        }
    }

    clicky() {
        if(this.state.selectedAddress) {
            this.props.updateAddress(this.state.selectedAddress)
            this.props.history.push('/overview')
        } else {
            alert('Please select a shipping address')
        }
    }

    render() {
        console.log('------------ this.props', this.props)
        if(this.props.cart.length) {
            if(this.props.login) {
                if(this.state.savedAddresses.length) {
                    return(
                        <div className='saved-address'>
                            {this.state.savedAddresses.map(address => {
                            return(
                                <div key={address.id} className='saved-address'>
                                    <div>{address.first_name} {address.last_name}</div>
                                    <div>{address.address_line_one}</div>
                                    <div>{address.address_line_two}</div>
                                    <div>{address.city}</div>
                                    <div>{address.state}</div>
                                    <div>{address.zipcode}</div>
                                    <div><input type="checkbox" onChange={() => this.setState({selectedAddress: address})}/> Ship to this address</div>
                                    <hr/>
                                </div>
                                )})}
                                <div>Final step: <button onClick={() => this.clicky()}>Review Order</button></div>
                                <div><button onClick={() => this.setState({savedAddresses: ''})}>Ship to Other Address</button></div>
                        </div>
                    )
                } else {
                    return(
                        <div>
                            <div><input type="text" placeholder="Address Line 1" onChange={(e) => this.updateState('addressLine1', e.target.value)}/></div>
                            <div><input type="text" placeholder="Address Line 2" onChange={(e) => this.updateState('addressLine2', e.target.value)}/></div>
                            <div><input type="text" placeholder="City" onChange={(e) => this.updateState('city', e.target.value)}/></div>
                            <div><select onChange={(e) => this.updateState('state', e.target.value)}>
                                <option value='State'>State</option>
                                <option value='AL'>Alabama</option>
                                <option value='AK'>Alaska</option>
                                <option value='AZ'>Arizona</option>
                                <option value='AR'>Arkansas</option>
                                <option value='CA'>California</option>
                                <option value='CO'>Colorado</option>
                                <option value='CT'>Connecticut</option>
                                <option value='DE'>Delaware</option>
                                <option value='DC'>District Of Columbia</option>
                                <option value='FL'>Florida</option>
                                <option value='GA'>Georgia</option>
                                <option value='HI'>Hawaii</option>
                                <option value='ID'>Idaho</option>
                                <option value='IL'>Illinois</option>
                                <option value='IN'>Indiana</option>
                                <option value='IA'>Iowa</option>
                                <option value='KS'>Kansas</option>
                                <option value='KY'>Kentucky</option>
                                <option value='LA'>Louisiana</option>
                                <option value='ME'>Maine</option>
                                <option value='MD'>Maryland</option>
                                <option value='MA'>Massachusetts</option>
                                <option value='MI'>Michigan</option>
                                <option value='MN'>Minnesota</option>
                                <option value='MS'>Mississippi</option>
                                <option value='MO'>Missouri</option>
                                <option value='MT'>Montana</option>
                                <option value='NE'>Nebraska</option>
                                <option value='NV'>Nevada</option>
                                <option value='NH'>New Hampshire</option>
                                <option value='NJ'>New Jersey</option>
                                <option value='NM'>New Mexico</option>
                                <option value='NY'>New York</option>
                                <option value='NC'>North Carolina</option>
                                <option value='ND'>North Dakota</option>
                                <option value='OH'>Ohio</option>
                                <option value='OK'>Oklahoma</option>
                                <option value='OR'>Oregon</option>
                                <option value='PA'>Pennsylvania</option>
                                <option value='RI'>Rhode Island</option>
                                <option value='SC'>South Carolina</option>
                                <option value='SD'>South Dakota</option>
                                <option value='TN'>Tennessee</option>
                                <option value='TX'>Texas</option>
                                <option value='UT'>Utah</option>
                                <option value='VT'>Vermont</option>
                                <option value='VA'>Virginia</option>
                                <option value='WA'>Washington</option>
                                <option value='WV'>West Virginia</option>
                                <option value='WI'>Wisconsin</option>
                                <option value='WY'>Wyoming</option>
                            </select></div>
                            <div><input type="number" placeholder="Zipcode" onChange={(e) => this.updateState('zipcode', e.target.value)}/></div>
                            <input type='checkbox' onChange={() => this.setState({saveAddress: !this.state.saveAddress})}/> Save this address
                            <div>Final step: <button onClick={() => this.addAddress()}>Review Order</button></div>
                        </div>
                    )
                } 
            } else {
                return (
                    <div>
                        <div><input type="text" placeholder="First Name" onChange={(e) => this.updateState('firstName', e.target.value)}/></div>
                        <div><input type="text" placeholder="Last Name" onChange={(e) => this.updateState('lastName', e.target.value)}/></div>
                        <div><input type="text" placeholder="Email" onChange={(e) => this.updateState('email', e.target.value)}/></div>
                        <div><input type="text" placeholder="Address Line 1" onChange={(e) => this.updateState('addressLine1', e.target.value)}/></div>
                        <div><input type="text" placeholder="Address Line 2" onChange={(e) => this.updateState('addressLine2', e.target.value)}/></div>
                        <div><input type="text" placeholder="City" onChange={(e) => this.updateState('city', e.target.value)}/></div>
                        <div><select onChange={(e) => this.updateState('state', e.target.value)}>
                            <option value='State'>State</option>
                            <option value='AL'>Alabama</option>
                            <option value='AK'>Alaska</option>
                            <option value='AZ'>Arizona</option>
                            <option value='AR'>Arkansas</option>
                            <option value='CA'>California</option>
                            <option value='CO'>Colorado</option>
                            <option value='CT'>Connecticut</option>
                            <option value='DE'>Delaware</option>
                            <option value='DC'>District Of Columbia</option>
                            <option value='FL'>Florida</option>
                            <option value='GA'>Georgia</option>
                            <option value='HI'>Hawaii</option>
                            <option value='ID'>Idaho</option>
                            <option value='IL'>Illinois</option>
                            <option value='IN'>Indiana</option>
                            <option value='IA'>Iowa</option>
                            <option value='KS'>Kansas</option>
                            <option value='KY'>Kentucky</option>
                            <option value='LA'>Louisiana</option>
                            <option value='ME'>Maine</option>
                            <option value='MD'>Maryland</option>
                            <option value='MA'>Massachusetts</option>
                            <option value='MI'>Michigan</option>
                            <option value='MN'>Minnesota</option>
                            <option value='MS'>Mississippi</option>
                            <option value='MO'>Missouri</option>
                            <option value='MT'>Montana</option>
                            <option value='NE'>Nebraska</option>
                            <option value='NV'>Nevada</option>
                            <option value='NH'>New Hampshire</option>
                            <option value='NJ'>New Jersey</option>
                            <option value='NM'>New Mexico</option>
                            <option value='NY'>New York</option>
                            <option value='NC'>North Carolina</option>
                            <option value='ND'>North Dakota</option>
                            <option value='OH'>Ohio</option>
                            <option value='OK'>Oklahoma</option>
                            <option value='OR'>Oregon</option>
                            <option value='PA'>Pennsylvania</option>
                            <option value='RI'>Rhode Island</option>
                            <option value='SC'>South Carolina</option>
                            <option value='SD'>South Dakota</option>
                            <option value='TN'>Tennessee</option>
                            <option value='TX'>Texas</option>
                            <option value='UT'>Utah</option>
                            <option value='VT'>Vermont</option>
                            <option value='VA'>Virginia</option>
                            <option value='WA'>Washington</option>
                            <option value='WV'>West Virginia</option>
                            <option value='WI'>Wisconsin</option>
                            <option value='WY'>Wyoming</option>
                        </select></div>
                        <div><input type="number" placeholder="Zipcode" onChange={(e) => this.updateState('zipcode', e.target.value)}/></div>
                        <div>Final step: <button onClick={() => this.makeGuest()}>Review Order</button></div>
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <Redirect to='/' />
                </div>
            )
        }
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user,
        login: store.login,
        cart: store.cart
    }
}

export default connect(mapStateToProps, { updateAddress, updateUser })(Shipping)