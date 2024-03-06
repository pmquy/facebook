const {createClient} = require('redis')


const connect = () => {
  const redisClient = createClient({url : process.env.REDIS_URL})
  redisClient.on('error', err => 'Connect redis failed')
  redisClient.connect().then(() => console.log('Connect redis successfully'))  
  return redisClient
}

module.exports = connect