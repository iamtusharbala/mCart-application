const mongoose = require('mongoose');


function connection() {
    mongoose.connect(process.env.DB_LOCAL_URI).then(() => console.log('DB connected successfully')).catch((err) => console.log(err))
}


module.exports = connection