// Package dependencies
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')

// Controllers
const blackCards = require('./controllers/blackCard')

require('dotenv').config()

// API config
const app = express()
const PORT = process.env.PORT || 8080
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dah'

// Connect to MongoDB via Mongoose
mongoose.connection.on('error', (err) => {
  console.log(`${err.message} is Mongo not running?`)
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongo disconnected')
})
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
mongoose.connection.once('open', () => {
  console.log('Connected to Mongoose')
})

// CORS config
// TODO: remove undefined
const whitelist = new Set(['http://localhost:3000', undefined])
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.has(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`))
    }
  },
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

// Use controllers for routing
app.use('/api/v1/cards/black', blackCards)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})