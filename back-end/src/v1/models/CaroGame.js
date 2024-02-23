const mongoose = require('mongoose')

const CaroGame = new mongoose.Schema({
  from : String,
  to : String,
  turn : String,
  content : Array,
  result : Array,
}, {timestamps : true})

module.exports = mongoose.model('CaroGames', CaroGame)