import { Document, model, Model, Schema } from 'mongoose'

export interface BlackCard {
  description: string
  responseCount: number
}

interface BlackCardDocument extends BlackCard, Document {}

const blackCardSchema: Schema<BlackCardDocument> = new Schema({
  description: { type: String, required: true, unique: true },
  responseCount: { type: Number, required: true },
})

const BlackCard: Model<BlackCardDocument> = model('BlackCard', blackCardSchema)

export default BlackCard
