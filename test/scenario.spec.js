const server    = require('../index')
const chai      = require('chai')
const supertest = require('supertest')
const mongoose  = require('mongoose')

const expect    = chai.expect
const app       = supertest.agent('http://localhost:5000')
const db        = mongoose.connection

const scenarioForce = require('../assets/mocks/scenarios/force.json')
const scenarioEnterprise = require('../assets/mocks/scenarios/enterprise.json')

describe('Scenario', function() {

  before(function (done) {
    db.collection('scenarios').drop(function () {
      done()
    })
  })

  afterEach(function (done) {
    db.collection('scenarios').drop(function () {
      done()
    })
  })

  describe('GET /scenarios', function() {
    it('should return a list of scenarios', function(done) {
      db.collection('scenarios').insert(scenarioForce, function(err, first) {
        db.collection('scenarios').insert(scenarioEnterprise, function(err, second) {
          app
          .get('/scenarios')
          .end(function(err, res) {
            expect(res.body.data.length).to.be.equal(2)
            expect(res.body.data[0]._id).to.have.string(first.ops[0]._id)
            expect(res.body.data[1]._id).to.have.string(second.ops[0]._id)
            expect(res.body.data[0].name).to.be.equal(first.ops[0].name)
            expect(res.body.data[1].name).to.be.equal(second.ops[0].name)
            expect(res.body.data[0].description).to.be.equal(first.ops[0].description)
            expect(res.body.data[1].description).to.be.equal(second.ops[0].description)
            expect(res.statusCode).to.be.equal(200)
            done()
          })
        })
      })
    })
  })

  describe('GET /scenarios/:id', function() {
    it('should return one scenario', function(done) {
      db.collection('scenarios').insert(scenarioForce, function(err, scenario) {
        app
        .get(`/scenarios/${scenario.ops[0]._id}`)
        .end(function(err, res) {
          expect(res.body.length).to.be.equal(1)
          expect(res.body[0]._id).to.have.string(scenario.ops[0]._id)
          expect(res.body[0].name).to.be.equal(scenario.ops[0].name)
          expect(res.body[0].description).to.be.equal(scenario.ops[0].description)
          expect(res.statusCode).to.be.equal(200)
          done()
        })
      })
    })
  })

})
