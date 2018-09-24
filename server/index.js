const express = require('express')
const bodyParser = require('body-parser')
const massive = require ('massive')
const session = require('express-session')
require('dotenv').config()
const axios = require('axios')
const controller = require('./controller')
const configureStripe = require('stripe')
const articlesController = require('./articlesController')
const middleware = require('./middlwares')

const SECRET_KEY = process.env.STRIPE_SECRET

const stripe = configureStripe(SECRET_KEY)

module.exports = stripe

const PORT = 4000

const app = express()

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT} 😃`))

app.use(express.static(__dirname + '/../build'))

app.use(bodyParser.json())

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
}).catch(error => console.log('------------ MASSIVE error', error))

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))


// ========== Payment Endpoints ============ //
app.post('/api/payment', controller.processPayment)
app.post('/api/order', controller.createOrder)
app.post('/api/email', controller.sendConfirmation)

// ========== Articles Endpoints ============ //
app.get('/api/articles/:category', articlesController.getCategories)
app.get('/api/article', articlesController.getLimitedArticle)
app.get('/api/article/:urlTitle', articlesController.getArticle)
app.get('/api/comments', controller.getComments)
app.post('/api/comment', middleware.filterComment, controller.createComment)
app.delete('/api/comment', controller.deleteComment)
app.put('/api/comment', middleware.filterComment, controller.updateComment)
app.get('/api/cheers', controller.getCheers)
app.post('/api/cheers', controller.newCheer)

// ========== Products Endpoints ============ //
app.get('/api/products/:category', controller.getProducts)
app.get('/api/product', controller.getOneProduct)

// ========== User Endpoints ============ //
app.get('/api/profile', controller.getProfile)
app.get('/api/user/comments', controller.getUserComments)
app.post('/api/email/prospect', controller.sendProspectEmail)
app.get('/api/user-data', controller.getUser)
app.delete('/api/user', controller.deleteUser)
app.post('/api/session/end', (req, res) => {
    req.session.destroy()
    res.status(200).send('Session destroyed')
})
app.get('/api/session/user', (req, res ) => {
    req.session.user ?
    res.status(200).send(req.session.user)
    : res.status(200).send('No user logged in!')
})
app.post('/api/guest', controller.newGuest)
app.post('/api/address', controller.newAddress)
app.post('/api/address/save', controller.saveAddress)
app.get('/api/address', controller.getAddress)
app.post('/api/user', middleware.filterBio, (req, res) => {
    const {new_first_name, new_last_name, new_email, new_username, new_picture, new_bio, new_address, auth0_id} = req.body
    const dbInstance = req.app.get('db')
    console.log('------------ req.body', req.body)

    dbInstance.update_user({
        new_first_name,
        new_last_name,
        new_email,
        new_username,
        new_picture,
        new_bio,
        new_address,
        auth0_id
    }).then(user => { console.log('------------ update_user user', user); 
    req.session.user = user[0]; 
    res.status(200).send(user)})
    .catch(error => {
        res.status(500).send('Update user error!'); console.log('---------- updateUser error', error)
    })
})
app.post('/api/user/logout', (req, res) => {
    req.session.destroy()
    res.status(200).send('Logout success!')
})

// ========== Auth0 Endpoints ============ //
app.get('/auth/callback', (req, res) => {
    // The payload you will be providing to Auth0 for a token
    console.log(req.query)
    const { prevPath }= req.query
    const payload = {
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    }
    // Trading a token for an access code at Auth0
    function tradeCodeForAccessToken() {
        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
    }
    // Trading a token for user info at Auth0
    function exchangeAccessTokenForUserInfo(response) {
        const accessToken = response.data.access_token
        return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`)
    }
    // This function will take the returned user info, determine whether a user is logged in, and store their info in the database if they are new.
    function storeUserInfoInDatabase (response) {
        console.log('------------ Auth0 response', response)
        const auth0Id = response.data.sub // .sub is short for 'subject' on Auth0
        const db = req.app.get('db')
        return db.get_single_user(auth0Id).then(users => {
            if (users.length) {
                const user = users[0]
                req.session.user = user // Using sessions with Auth0
                res.redirect(prevPath)
                console.log('------------ users', users)
                console.log('------------ this.props', this.props)
            } else {
                // console.log('------------ users', users)
                const {given_name, family_name, nickname, picture, email} = response.data
                const createUserData = {
                    auth0_id: auth0Id,
                    first_name: given_name,
                    last_name: family_name,
                    username: nickname,
                    picture: picture,
                    email: email
                }
            return db.add_user(createUserData).then(newUsers => {
                const user = newUsers[0]
                console.log('------------ newUsers', newUsers)
                req.session.user = user // Here is session again
                res.redirect('/profile')
                }).catch(error => console.log('------------ Add user error', error))
            }
        }).catch(error => console.log('------------ Get user error', error))
    }
    //Here is where all the above functions are chained together.
    tradeCodeForAccessToken()
    .then(exchangeAccessTokenForUserInfo)
    .then(storeUserInfoInDatabase)
    .catch(error => {
        console.log('---------- Auth0 error', error)
        res.status(500).json({message: "Auth0 error in server!"})
    })
})

const path = require('path')
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})