import mongoose from 'mongoose'

const blackCardSchema = new mongoose.Schema({
  description: { type: String, required: true, unique: true },
  responseCount: { type: Number, required: true },
})

export default mongoose.model('BlackCard', blackCardSchema)
