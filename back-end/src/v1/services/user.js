const User = require('../models/User')

class Service {
  get = query => {
    return User.find(query)
  }
}