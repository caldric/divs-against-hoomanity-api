import { expect } from 'chai'
import request from 'supertest'
import { app } from '../server'

describe('GET request', () => {
  const endpoint: string = '/api/v1/cards/black'
  const origin: string = 'http://localhost:3000'

  it('Returns all cards', (done) => {
    request(app)
      .get(endpoint)
      .set('origin', origin)
      .expect('Content-Type', /json/)
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
      .set('origin', origin)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
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
