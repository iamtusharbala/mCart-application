const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    cartId: Number,
    username: String,
    productsInCart: [Object],
    statusOfCart: {
        type: String,
        default: "Open"
    }
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart