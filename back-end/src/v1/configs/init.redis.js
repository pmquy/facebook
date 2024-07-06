import { createClient } from 'redis'

export default function () {
  const redisClient = createClient({ url: process.env.REDIS_URL })
  redisClient.on('error', e => {
    console.log(e)
  })
  redisClient.connect()
    .then(() => console.log('Connect redis successfully'))
    .catch(err => console.log(err.message))
  return redisClient
}