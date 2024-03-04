const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    productId: Number,
    productName: String,
    productCode: String,
    description: String,
    price: Number,
    rating: Number,
    manufacturer: String,
    osType: String
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product



