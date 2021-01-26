const express = require('express')
const BlackCard = require('../models/blackCard')

const router = express.Router()

// Get all cards
router.get('/', async (req, res) => {
  try {
    const card = await BlackCard.find()
    res.status(200).json(card)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new card
router.post('/', async (req, res) => {
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
    res.status(200).json(newCard)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
