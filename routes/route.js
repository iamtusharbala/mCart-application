const express = require('express')
const router = express.Router()

const User = require('../models/user')


//Login 
router.get('/login', async (req, res) => {
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
})


//Signup
router.post('/signup', async (req, res) => {
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
})

module.exports = router