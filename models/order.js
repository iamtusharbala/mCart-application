const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderId: Number,
    cartId: Number
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order