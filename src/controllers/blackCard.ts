import express, { Request, Response } from 'express'
import BlackCard from '../models/blackCard'

const router = express.Router()

// Get all cards
router.get('/', async (_, res: Response) => {
  try {
    const card = await BlackCard.find()
    res.status(200).json(card)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new card
router.post('/', async (req: Request, res: Response) => {
  // Destructure the required card elements from the body
  const { description, responseCount } = req.body

  // Validation
  if (!description) {
    return res.status(400).json({ error: 'Description must be provided' })
  }

  if (!responseCount) {
    return res.status(400).json({ error: 'Response count must be provided' })
  }

  // Create new card
  try {
    const newCard = await BlackCard.create({
      description,
      responseCount,
    })
    return res.status(200).json(newCard)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

export default router
