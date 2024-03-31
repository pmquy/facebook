import mongoose from "mongoose"

const CaroGame = new mongoose.Schema({
  from : String,
  to : String,
  turn : String,
  content : Array,
  result : Array,
}, {timestamps : true})

export default mongoose.model('CaroGames', CaroGame)