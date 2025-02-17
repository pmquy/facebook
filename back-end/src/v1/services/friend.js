import Friend from '../models/Friend.js';
import Redis from '../configs/init.redis.js';
class Service {

  async getFriends(user) {
    const cache = await Redis.client.sMembers(`friends:${user}`)
    if (cache) return cache
    const friends = await Friend.find({ status: 1, $or: [{ sender: user }, { receiver: user }] })
    const ids = friends.map(e => e.sender === user ? e.receiver : e.sender)
    if(ids.length) Redis.client.sAdd(`friends:${user}`, ...ids)
    return ids
  }

  async get(query) {
    return Friend.find(query)
  }

  async getRequests(user) {
    const requests = await Friend.find({ status: 0, receiver: user })
    const ids = requests.map(e => e.sender)
    return ids
  }

  async getSendings(user) {
    const sendings = await Friend.find({ status: 0, sender: user })
    const ids = sendings.map(e => e.receiver)
    return ids
  }

  async deleteOne({ sender, receiver }) {
    Redis.client.sRem(`friends:${sender}`, receiver)
    Redis.client.sRem(`friends:${receiver}`, sender)
    return Friend.deleteOne({ sender, receiver })
  }

  async create({ sender, receiver }) {
    return Friend.create({ sender, receiver, status: 0 })
  }

  async accept({ sender, receiver }) {
    Redis.client.sAdd(`friends:${sender}`, receiver)
    Redis.client.sAdd(`friends:${receiver}`, sender)
    return Friend.updateOne({ sender, receiver, status: 0 }, { status: 1 })
  }
}



export default new Service()