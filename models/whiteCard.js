const mongoose = require('mongoose')

const whiteCardSchema = new mongoose.Schema({
  description: { type: String, required: true, unique: true },
})

module.exports = mongoose.model('WhiteCard', whiteCardSchema)
