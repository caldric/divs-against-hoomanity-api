const mongoose = require('mongoose')

const blackCardSchema = new mongoose.Schema({
  description: { type: String, required: true, unique: true },
  responseCount: { type: Number, required: true },
})

module.exports = mongoose.model('BlackCard', blackCardSchema)
