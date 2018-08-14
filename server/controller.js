require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const nodemailer = require('nodemailer')

module.exports = {

    getUser(req, res) {
        const dbInstance = req.app.get('db')
        
        dbInstance.get_all_users()
        .then(users => res.status(200).json(users))
        .catch(error => {
            res.status(500).send('Get User Error!'); console.log('------------ getUser error', error)
        })
    },

    deleteUser(req, res) {
        const dbInstance = req.app.get('db')
        const { id } = req.query

        dbInstance.delete_user([id])
        .then(user => res.status(200).send('User delete success!'))
        .catch(error => {
            res.status(500).send('Delete user error!');
            console.log('---------- User Delete server error', error)
        })
    },

    processPayment(req, res) {
        const { source, currency, amount} = req.body

        stripe.charges.create({source, currency, amount}, (stripeErr, stripeRes) => {
            if(stripeErr) {
                res.status(500).send({StripeError: stripeErr})
                console.log('------------ stripeErr', stripeErr)
            } else {
                res.status(200).send({StripeSuccess: stripeRes})
                console.log('------------ stripeRes', stripeRes)
            }
        })
    },

    createOrder(req, res) {
        const dbInstance = req.app.get('db')
        const { orderId, userId, addressId, cart, date } = req.body
        console.log('------------ cart', cart)

        dbInstance.new_order({
            orderId,
            userId,
            addressId,
            date
        }).then(order => {
            cart.map(item => {
                const { id, qty } = item
                console.log('------------ order', order)
                const orderId = order[0].id
                dbInstance.new_line_item({
                    id,
                    qty,
                    orderId
                }).then(lineItem => {res.status(200); console.log('------------ lineItem', lineItem)})
                .catch(error => console.log('---------- Line Item error', error))
            })
            res.status(200).send(order)
        }).catch(err => {res.status(500).send('Create order error!'); console.log('------------ Create order err', err)})
    },

    sendConfirmation(req, res) {
        const { email, name, date, total, number, address } = req.body
        console.log('------------ address', address)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: `"Axxion Health" <${process.env.EMAIL}`,
            to: String(email),
            subject: `Axxion Health Order Confirmation`,
            html: address.address_line_two ? `<h1>${name}, thank you for your recent order on AxxionHealth.com!</h1><p>Order number: ${number}</p><p>Your order was placed on ${date} and came to a total of $${total}</p><p>Please allow up to 3 business days for delivery to:<br>${address.address_line_one}<br>${address.address_line_two}<br>${address.city}, ${address.state} ${address.zipcode}</p><p>We hope to do business again with you soon!</p>` : `<h1>${name}, thank you for your recent order on AxxionHealth.com!</h1><p>Order number: ${number}</p><p>Your order was placed on ${date} and came to a total of $${total}</p><p>Please allow up to 3 business days for delivery to:<br>${address.address_line_one}<br>${address.city}, ${address.state} ${address.zipcode}</p><p>We hope to do business again with you soon!</p>`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log('------------ Send email error', error)
            } else {
                return console.log('Email sent' + info.response)
            }
        })
    },

    sendProspectEmail(req, res) {
        const { name, email } = req.body

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: `"Axxion Health" <${process.env.EMAIL}`,
            to: String(email),
            subject: `Axxion Health Welcomes You!`,
            html: `<h3>Hello, ${name}! Thank you for your interest in Axxion Health!</h3><p>Here is a <a href='https://google.com'>link</a> to your download.</p>`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log('------------ Send email error', error)
            } else {
                return console.log('Email sent' + info.response)
            }
        })
    },

    getOneProduct(req, res) {
        const dbInstance = req.app.get('db')

        dbInstance.get_single_product({id: req.query.id})
        .then(product => res.status(200).send(product))
        .catch(error => console.log('---------- error', error))
    },

    newGuest(req, res) {
        const dbInstance = req.app.get('db')
        const {firstName, lastName, email} = req.body

        dbInstance.add_guest({
            firstName,
            lastName,
            email
        }).then(guest => res.status(200).send(guest))
        .catch(error => {
            res.status(500).send('Add guest error!');
            console.log('------------ Add guest error', error)
        })
    },

    newAddress(req, res) {
        const dbInstance = req.app.get('db')
        const { id, addressLine1, addressLine2, city, state, zipcode } = req.body

        dbInstance.add_address({
            id,
            addressLine1,
            addressLine2,
            city,
            state,
            zipcode
        }).then(address => res.status(200).send(address))
        .catch(error => {
            res.status(500).send('Add address error!');
            console.log('------------ Add address error', error)
        })
    },

    saveAddress(req, res) {
        const dbInstance = req.app.get('db')
        const { id, addressLine1, addressLine2, city, state, zipcode, defaultAddress } = req.body

        dbInstance.save_address({
            id,
            addressLine1,
            addressLine2,
            city,
            state,
            zipcode,
            defaultAddress
        }).then(address => res.status(200).send(address))
        .catch(error => {
            res.status(500).send('Add address error!');
            console.log('------------ Add address error', error)
        })
    },

    getAddress(req, res) {
        const dbInstance = req.app.get('db')
        const { id } = req.query
        console.log('------------ controller 97 user id', id)

        dbInstance.get_address({
            id
        }).then(user => res.status(200).json(user))
        .catch(error => {
            res.status(500).send('Get address error!');
            console.log('------------ Get address error!', error)
        })
    },


    getProducts(req, res) {
        const dbInstance = req.app.get('db')
        const { category } = req.params

        dbInstance.get_products_category([category])
        .then(products => res.status(200).json(products))
        .catch(error => {
            res.status(500).send('Get Products Error!'); console.log('------------ getProducts error', error)
        })
    },

    getComments(req, res) {
        const dbInstance = req.app.get('db')
        const { id } = req.query
        console.log('------------ req.query', req.query)

        dbInstance.get_comments({
            id
        }).then(comments => res.status(200).send(comments))
        .catch(error => {
            res.status(500).send('Get Comments Error!'); console.log('------------ getComments error', error)
        })
    },

    getUserComments(req, res) {
        const dbInstance = req.app.get('db')
        const { id } = req.query
        console.log('------------ req.query', req.query)

        dbInstance.get_user_comments({
            id
        }).then(comments => res.status(200).send(comments))
        .catch(error => {
            res.status(500).send('Get Comments Error!'); console.log('------------ getComments error', error)
        })
    },

    createComment(req, res) {
        const dbInstance = req.app.get('db')
        const { user_id, article_id, body } = req.body

        dbInstance.add_comment({
            user_id,
            article_id,
            body
        }).then(comment => res.status(200).send(comment))
        .catch(error => {
            res.status(500).send('Create Comments Error!'); console.log('------------ createComment error', error)
        })
    },

    deleteComment(req, res) {
        const dbInstance = req.app.get('db')
        const { id } = req.query

        dbInstance.delete_comment([id]).then(() => res.status(200).send('Comment deleted!'))
        .catch(error => {
            res.status(500).send('Delete Comments Error!'); console.log('------------ deleteComment error', error)
        })
    },

    updateComment(req, res) {
        const dbInstance = req.app.get('db')
        const { body, id } = req.body

        dbInstance.update_comment({
            body,
            id
        }).then(comment => res.status(200).send(comment))
        .catch(error => {
            res.status(500).send('update Comments Error!'); console.log('------------ updateComment error', error)
        })
    },

    getCheers(req, res) {
        const dbInstance = req.app.get('db')
        const { id } = req.query
        console.log('------------ req.query', req.query)

        dbInstance.get_cheers([id]).then(cheers => res.status(200).send(cheers))
        .catch(error => {
            res.status(500).send('update Comments Error!'); console.log('------------ updateComment error', error)
        })
    },

    newCheer(req, res) {
        const dbInstance = req.app.get('db')
        const { id } = req.query

        dbInstance.new_cheer([id]).then(cheers => res.status(200).send(cheers))
        .catch(error => {
            res.status(500).send('update Comments Error!'); console.log('------------ updateComment error', error)
        })
    },

    getProfile(req, res) {
        const dbInstance = req.app.get('db')
        const { id } = req.query

        dbInstance.get_other_user([id]).then(user => res.status(200).send(user))
        .catch(error => {
            res.status(500).send('Get User Error!'); console.log('------------ getProfile error', error)
        })
    }

}