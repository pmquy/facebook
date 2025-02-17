import { createClient } from 'redis'

class Redis {

  client

  async connect() {
    this.client = createClient({ url: process.env.REDIS_URL })
    this.client.on('error', console.log)
    return this.client.connect()
      .then(() => console.log('Connect redis successfully'))
      .catch(err => console.log(err.message))
  }
}

export default new Redis()