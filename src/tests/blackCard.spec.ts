import { expect } from 'chai'
import request from 'supertest'
import { app } from '../server'
import BlackCard, { IBlackCard } from '../models/blackCard'

const origin: string = 'http://localhost:3000'

describe('GET request', () => {
  const endpoint: string = '/api/v1/cards/black'

  it('Returns all cards', (done) => {
    request(app)
      .get(endpoint)
      // simulate an origin of localhost:3000 to get past CORS
      .set('origin', origin)
      .expect('Content-Type', /json/)
      // network status code
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array').that.is.not.empty
        done()
      })
      .catch((err) => done(err))
  })

  it('Returns cards as objects with the correct properties', (done) => {
    request(app)
      .get(endpoint)
      // simulate an origin of localhost:3000 to get past CORS
      .set('origin', origin)
      .expect('Content-Type', /json/)
      // network status code
      .expect(200)
      .then((res) => {
        // Check the data type and shape of the first card
        const firstCard = res.body[0]
        expect(firstCard).to.be.an('object')
        expect(firstCard).to.have.all.keys([
          '_id',
          'description',
          'responseCount',
        ])
        done()
      })
      .catch((err) => done(err))
  })
})

describe('POST request', () => {
  let newCard: IBlackCard
  const endpoint: string = '/api/v1/cards/black'

  afterEach(async () => {
    // Delete the newly added test card per test run
    await BlackCard.findOneAndDelete(newCard)
  })

  it('Creates a new card with proper inputs', (done) => {
    // New card to be added to the database
    newCard = {
      description: 'Test description',
      responseCount: 1,
    }

    request(app)
      .post(endpoint)
      // simulate an origin of localhost:3000 to get past CORS
      .set('origin', origin)
      .send(newCard)
      .expect('Content-Type', /json/)
      // network status code
      .expect(200)
      .then((res) => {
        const { body } = res
        expect(body).to.be.an('object')
        expect(body).to.include(newCard)
        done()
      })
      .catch((err) => done(err))
  })

  it('Returns 400 with error message when description is falsy', (done) => {
    // New card to be added to the database
    newCard = {
      description: '',
      responseCount: 1,
    }

    request(app)
      .post(endpoint)
      // simulate an origin of localhost:3000 to get past CORS
      .set('origin', origin)
      .send(newCard)
      .expect('Content-Type', /json/)
      // network status code
      .expect(400)
      .then((res) => {
        // Must receive back an error response that isn't empty
        const { body } = res
        expect(body).to.be.an('object')
        expect(body).to.have.own.property('error')
        expect(body.error).to.have.lengthOf.above(0)
        done()
      })
      .catch((err) => done(err))
  })

  it('Returns 400 with error message when responseCount is falsy', (done) => {
    // New card to be added to the database
    newCard = {
      description: 'Test description',
      responseCount: 0,
    }

    request(app)
      .post(endpoint)
      // simulate an origin of localhost:3000 to get past CORS
      .set('origin', origin)
      .send(newCard)
      .expect('Content-Type', /json/)
      // network status code
      .expect(400)
      .then((res) => {
        // Must receive back an error response that isn't empty
        const { body } = res
        expect(body).to.be.an('object')
        expect(body).to.have.own.property('error')
        expect(body.error).to.have.lengthOf.above(0)
        done()
      })
      .catch((err) => done(err))
  })
})
