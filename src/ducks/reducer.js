const initialState =  {
    user: {},
    cart: JSON.parse(sessionStorage.getItem('cart')) || [],
    // total: JSON.parse(sessionStorage.getItem('total')) || 0,
    // qty: JSON.parse(sessionStorage.getItem('qty')) || 0,
    login: false,
    address: {},
    dimensions: {
        height: 0,
        width: 0
    }
}

const UPDATE_USER = 'UPDATE_USER'
const UPDATE_CART = 'UPDATE_CART'
const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_DUPLICATE = 'UPDATE_DUPLICATE'
const UPDATE_ADDRESS = 'UPDATE_ADDRESS'
const RESET_ADDRESS = 'RESET_ADDRESS'
const NEW_CART='NEW_CART'
const CLEAR_CART = 'CLEAR_CART'
const CLEAR_USER = 'CLEAR_USER'
const UPDATE_DIMENSIONS = 'UPDATE_DIMENSIONS'

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_CART:
            sessionStorage.setItem('cart', JSON.stringify( [...state.cart, action.payload] ))
            return {
                ...state, 
                cart: [...state.cart, action.payload]
            }
            
            case UPDATE_DUPLICATE:
            sessionStorage.clear()
            sessionStorage.setItem('cart', JSON.stringify( [...action.payload] ))
                return {...state, cart: [...action.payload]}

        case UPDATE_ADDRESS:
            return {...state, address: action.payload}

        case NEW_CART:
            // sessionStorage.setItem('cart', JSON.stringify(action.payload))
            return {...state, cart: action.payload}

        case RESET_ADDRESS:
            return {...state, address: {}}

        case CLEAR_CART:
            return {...state, cart: []}

        case CLEAR_USER:
            return {...state, user: {}}

        case UPDATE_LOGIN:
            return {...state, login: action.payload}

        case UPDATE_USER:
            return {...state, user: action.payload}

        case UPDATE_DIMENSIONS:
            return {...state, dimensions: action.payload}

        default: return state
    }
}

export function updateCart(id, name, picture, qty, total) {

    if(JSON.parse(sessionStorage.getItem('cart'))) {
        let tempCart = JSON.parse(sessionStorage.getItem('cart'))
        console.log(tempCart)

        let index = tempCart.findIndex(e => e.id === id)
        console.log(index)

            if(index !== -1){
                
                let copiedCart = [...tempCart]
                console.log('------------ copiedCart[index]', copiedCart[index])
                copiedCart[index].qty += qty
                copiedCart[index].total += total
                return {
                    type: UPDATE_DUPLICATE,
                    payload: copiedCart
                }
            } else {
                return {
                    type: UPDATE_CART,
                    payload: {
                        id,
                        name,
                        picture,
                        qty,
                        total
                    }
                }
            }
    } else {
        return {
            type: UPDATE_CART,
            payload: {
                id,
                name,
                picture,
                qty,
                total
            }
        }
    }
}

export function newCart(cart) {
    console.log('------------ cart', cart)
    sessionStorage.setItem('cart', JSON.stringify(cart))
    return {
        type: NEW_CART,
        payload: cart
    }
}

export function updateDimensions(dimensions) {
    return {
        type: UPDATE_DIMENSIONS,
        payload: dimensions
    }
}

export function clearCart() {
    return {
        type: CLEAR_CART
    }
}

export function clearUser() {
    return {
        type: CLEAR_USER
    }
}

export function resetAddress() {
    return {
        type: RESET_ADDRESS,
    }
}

export function updateAddress(address) {
    return {
        type: UPDATE_ADDRESS,
        payload: address
    }
}

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function updateLogin(val) {
    return {
        type: UPDATE_LOGIN,
        payload: val 
    }
}
