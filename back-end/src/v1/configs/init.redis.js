import {createClient} from 'redis'
const connect = () => {
  const redisClient = createClient({url : process.env.REDIS_URL})
  redisClient.connect()
    .then(() => console.log('Connect redis successfully'))
    .catch(err => console.log(err.message))  
  return redisClient
}

export default connect