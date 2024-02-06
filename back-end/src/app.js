const express = require('express')
const app = express()

// connect database
require('./v1/configs/init.mongo')()

// init socket server
require('./v1/configs/init.socket')(app)

// log request 
app.use(require('morgan')('tiny'))

// handle cors
app.use(require('cors')({
    origin : 'http://localhost:5173',
    credentials : true
}))

// parse cookie
app.use(require('cookie-parser')())

// parse body request
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))


// route app
app.use(require('./v1/routers'))
app.use(require('./v1/middlewares/handle-404'))
app.use(require('./v1/middlewares/handle-error'))


module.exports = app