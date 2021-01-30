import { expect } from 'chai'
import request from 'supertest'
import { app } from '../server'

describe('GET request', () => {
  it('Returns all cards', (done) => {
    request(app)
      .get('/api/v1/cards/black')
      .set('origin', 'http://localhost:3000')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.a('array').that.is.not.empty
        done()
      })
      .catch((err) => done(err))
  })

  it('Returns cards with the correct properties', (done) => {
    request(app)
      .get('/api/v1/cards/black')
      .set('origin', 'http://localhost:3000')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body[0]).to.have.property('_id')
        expect(res.body[0]).to.have.property('description')
        expect(res.body[0]).to.have.property('responseCount')
        done()
      })
      .catch((err) => done(err))
  })
})
