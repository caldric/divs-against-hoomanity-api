const express = require('express')
const BlackCard = require('../models/blackCard')

const router = express.Router()

router.get('/', async (req, res) => {
  // Get all cards
  try {
    const card = await BlackCard.find()
    res.status(200).json(card)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
