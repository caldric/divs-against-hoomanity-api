import { Document, model, Model, Schema } from 'mongoose'

export interface IBlackCard {
  description: string
  responseCount: number
}

interface BlackCardDocument extends IBlackCard, Document {}

const blackCardSchema: Schema<BlackCardDocument> = new Schema({
  description: { type: String, required: true, unique: true },
  responseCount: { type: Number, required: true },
})

const BlackCard: Model<BlackCardDocument> = model('BlackCard', blackCardSchema)

export default BlackCard
