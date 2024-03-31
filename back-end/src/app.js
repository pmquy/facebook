import express from 'express'
import {createServer} from 'http'
const app = express()
const server = createServer(app)

// connect database
import connect_mongo from './v1/configs/init.mongo.js'
connect_mongo()

// init socket server
import init_socket from './v1/configs/init.socket.js'
const io = init_socket(server)

import connect_redis from './v1/configs/init.redis.js'
const redisClient = connect_redis()
export {io, redisClient}

// log request
import morgan from 'morgan' 
if(process.env.ENV == 'DEV') {
    app.use(morgan('tiny'))
}

// handle cors
import cors from 'cors'
app.use(cors({
    origin : process.env.CLIENT,
    credentials : true
}))

// parse cookie
import cookie_parser from 'cookie-parser'
app.use(cookie_parser())

// parse body request
import body_parser from 'body-parser'
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended : true}))


// route app
import router from './v1/routers/index.js'
import handle_404 from './v1/middlewares/handle-404.js'
import handle_error from './v1/middlewares/handle-error.js'
app.use(router)
app.use(handle_404)
app.use(handle_error)

export default server