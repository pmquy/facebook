const mongoose = require('mongoose')


const connect = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connect mongo successfully'))
        .catch(err => console.log(err.message))
}

module.exports = connect