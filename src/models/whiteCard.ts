import mongoose from 'mongoose'

const whiteCardSchema = new mongoose.Schema({
  description: { type: String, required: true, unique: true },
})

export default mongoose.model('WhiteCard', whiteCardSchema)
