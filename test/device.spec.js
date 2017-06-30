const server    = require('../index')
const chai      = require('chai')
const supertest = require('supertest')
const mongoose  = require('mongoose')

const expect    = chai.expect
const app       = supertest.agent('http://localhost:5000')
const db        = mongoose.connection

const device530 = require('../assets/mocks/devices/530.json')
const device960M = require('../assets/mocks/devices/960M.json')

before(function (done) {
  db.collection('devices').drop(function () {
    done()
  })
})

afterEach(function (done) {
  db.collection('devices').drop(function () {
    done()
  })
})

describe('Device', function() {

  describe('GET /devices', function() {
    it('should return a list of devices', function(done) {
      db.collection('devices').insert(device530, function(err, first) {
        db.collection('devices').insert(device960M, function(err, second) {
          app
          .get('/devices')
          .end(function(err, res) {
            expect(res.body.data.length).to.be.equal(2)
            expect(res.body.data[0]._id).to.have.string(first.ops[0]._id)
            expect(res.body.data[1]._id).to.have.string(second.ops[0]._id)
            expect(res.body.data[0].name).to.be.equal(first.ops[0].name)
            expect(res.body.data[1].name).to.be.equal(second.ops[0].name)
            expect(res.statusCode).to.be.equal(200)
            done()
          })
        })
      })
    })

    it('should search the devices by name', function(done) {
      db.collection('devices').insert(device530, function(err, first) {
        db.collection('devices').insert(device960M, function(err, second) {
          app
          .get('/devices?name=' + first.ops[0].name)
          .end(function(err, res) {
            expect(res.body.data.length).to.be.equal(1)
            expect(res.body.data[0]._id).to.have.string(first.ops[0]._id)
            expect(res.body.data[0].name).to.be.equal(first.ops[0].name)
            expect(res.statusCode).to.be.equal(200)
            done()
          })
        })
      })
    })

    it('should search the devices by os', function(done) {
      db.collection('devices').insert(device530, function(err, first) {
        db.collection('devices').insert(device960M, function(err, second) {
          app
          .get('/devices?os=' + second.ops[0].os)
          .end(function(err, res) {
            expect(res.body.data.length).to.be.equal(1)
            expect(res.body.data[0]._id).to.have.string(second.ops[0]._id)
            expect(res.body.data[0].name).to.be.equal(second.ops[0].name)
            expect(res.statusCode).to.be.equal(200)
            done()
          })
        })
      })
    })

    it('should search the devices by driverVersion', function(done) {
      db.collection('devices').insert(device530, function(err, first) {
        db.collection('devices').insert(device960M, function(err, second) {
          app
          .get('/devices?driverVersion=' + first.ops[0].driverVersion)
          .end(function(err, res) {
            expect(res.body.data.length).to.be.equal(1)
            expect(res.body.data[0]._id).to.have.string(first.ops[0]._id)
            expect(res.body.data[0].name).to.be.equal(first.ops[0].name)
            expect(res.statusCode).to.be.equal(200)
            done()
          })
        })
      })
    })

    it('should search the devices by vendorId', function(done) {
      db.collection('devices').insert(device530, function(err, first) {
        db.collection('devices').insert(device960M, function(err, second) {
          app
          .get('/devices?vendorId=' + second.ops[0].vendorId)
          .end(function(err, res) {
            expect(res.body.data.length).to.be.equal(1)
            expect(res.body.data[0]._id).to.have.string(second.ops[0]._id)
            expect(res.body.data[0].name).to.be.equal(second.ops[0].name)
            expect(res.statusCode).to.be.equal(200)
            done()
          })
        })
      })
    })

    it('should search the devices by deviceId', function(done) {
      db.collection('devices').insert(device530, function(err, first) {
        db.collection('devices').insert(device960M, function(err, second) {
          app
          .get('/devices?deviceId=' + first.ops[0].deviceId)
          .end(function(err, res) {
            expect(res.body.data.length).to.be.equal(1)
            expect(res.body.data[0]._id).to.have.string(first.ops[0]._id)
            expect(res.body.data[0].name).to.be.equal(first.ops[0].name)
            expect(res.statusCode).to.be.equal(200)
            done()
          })
        })
      })
    })

    it('should paginate the devices', function(done) {
      db.collection('devices').insert(device530, function(err, first) {
        db.collection('devices').insert(device960M, function(err, second) {
          app
          .get('/devices?per_page=1&page=1')
          .end(function(err, res) {
            expect(res.body.data.length).to.be.equal(1)
            expect(res.body.pages.last).to.match(/^(http:\/\/localhost:5000\/devices\?per_page=.&page=.)/)
            expect(res.body.pages.next).to.match(/^(http:\/\/localhost:5000\/devices\?per_page=.&page=.)/)
            expect(res.statusCode).to.be.equal(200)
            done()
          })
        })
      })
    })
  })

  describe('GET /devices/:id', function() {
    it('should return one device', function(done) {
      db.collection('devices').insert(device530, function(err, device) {
        app
        .get('/devices/' + device.ops[0]._id)
        .end(function(err, res) {
          expect(res.body.length).to.be.equal(1)
          expect(res.body[0]._id).to.have.string(device.ops[0]._id)
          expect(res.body[0].name).to.be.equal(device.ops[0].name)
          expect(res.statusCode).to.be.equal(200)
          done()
        })
      })
    })
  })

  describe('POST /devices', function() {
    it('should create a device', function(done) {
      app
      .post('/devices')
      .send(device530)
      .set('User-Agent', 'LugBench/0.1.0')
      .end(function(err, res) {
        expect(res.body._id).to.not.be.null
        expect(res.statusCode).to.be.equal(201)
        done()
      })
    })
  })

})
