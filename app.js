const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })


app.get('/', (req, res) => {
    res.send('Hii')
})


app.listen(process.env.PORT, () => {
    console.log(`App running at port ${process.env.PORT}`);
})