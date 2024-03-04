const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connection = require('./connection')
const router = require('./routes/route')

dotenv.config({ path: './config.env' })


//Connect to MongoDB database
connection()

app.use('/api/v1', router)

app.get('/', (req, res) => {
    res.send('Hii')
})


app.listen(process.env.PORT, () => {
    console.log(`App running at port ${process.env.PORT}`);
})