const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')


function generateId(id) {
    return 100 + id
}

//Login 
router.get('/login', async (req, res) => {
    try {
        const fetch = await User.findOne({ username: req.body.username })
        if (fetch) {
            if (fetch.password === req.body.password) {
                res.send('Login Successful')
            } else {
                res.send('Incorrect Password')
            }
        } else {
            res.send({ "message": "No userexits" })
        }
    } catch (error) {
        console.log(error);
    }
})


//Signup
router.post('/signup', async (req, res) => {
    try {
        const username = await User.findOne({ username: req.body.username })
        if (username) {
            res.send({ "message": 'User already exists' })
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
            })
            await newUser.save()
            res.send({ message: "New User Created Successfully" })
        }
    } catch (error) {
        console.log(error);
    }
})


//Get Tablets Only
router.get('/tablets', async (req, res) => {
    try {

        const data = await Product.find({ productCode: "TAB-120" })
        if (data.length > 0) {
            res.send(data)
        } else {
            res.send('error in fetching Tablets')
        }
    } catch (error) {
        console.log(error);
    }
})



//Get Mobiles Only
router.get('/mobiles', async (req, res) => {
    try {

        const data = await Product.find({ productCode: "MOB-120" })
        if (data.length > 0) {
            res.send(data)
        } else {
            res.send('error in fetching Mobiles')
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/carts', async (req, res) => {
    try {
        const data = await Cart.find()
        if (data.length > 0) {
            res.send(data)
        } else {
            res.send('Error in fetching data...')
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/carts', async (req, res) => {
    try {
        const dataLength = await Cart.find()
        const data = await Cart.findOne({ username: req.body.username })
        const id = dataLength ? generateId(dataLength.length) : 100
        if (!data) {
            const newCart = new Cart({
                cartId: id,
                username: req.body.username,
                productsInCart: req.body.productsInCart
            })
            await newCart.save()
            res.send({ "message": ` New items got inserted into the cart with the ID : ${id}` })
        } else {
            res.send({ "message": "User's cart is already available, append to the same cart" })
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/carts/:username', async (req, res) => {
    try {
        const data = await Cart.findOne({ username: req.params.username })
        if (data) {
            res.send(data)
        } else {
            res.send('User Cart not found')
        }
    } catch (error) {
        console.log(error);
    }
})


router.put('/carts/:username', async (req, res) => {
    try {
        const data = await Cart.findOneAndUpdate({ username: req.params.username }, { productsInCart: req.body.productsInCart }, { new: true })
        if (data) {
            res.send({ "message": `CartID: ${data.cartId} updated` })

        } else {
            res.send({ "message": "User's cart is not available" })
        }
    } catch (error) {
        console.log(error);
    }
})


//Invalid route
router.all('*', (req, res) => {
    res.status(404).json({ "message": "Resource not found" })
})

module.exports = router