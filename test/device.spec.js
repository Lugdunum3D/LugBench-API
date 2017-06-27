const server    = require('../index')
const chai      = require('chai')
const supertest = require('supertest')

const expect    = chai.expect;
const app       = supertest.agent('http://localhost:5000')

const device    = require('../assets/mocks/devices/530.json')

describe('Device', function() {

  describe('GET', function() {
    it('should return an empty list of devices', function(done) {
      app
      .get('/devices')
      .end(function(err, res) {
        expect(res.body).to.be.empty;
        expect(res.statusCode).to.be.equal(200)
        done()
      })
    })
  })

})
