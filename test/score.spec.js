'use strict'

require('../index.js')

const chai                = require('chai')
const supertest           = require('supertest')
const mongoose            = require('mongoose')
const waterfall           = require('async/waterfall')

const expect              = chai.expect
const app                 = supertest.agent('http://localhost:5000')
const db                  = mongoose.connection

const device530           = require('../assets/mocks/devices/530.json')
const device960M          = require('../assets/mocks/devices/960M.json')
const scenarioForce       = require('../assets/mocks/scenarios/force.json')
const scenarioEnterprise  = require('../assets/mocks/scenarios/enterprise.json')
const score40             = require('../assets/mocks/scores/40.json')
const score80             = require('../assets/mocks/scores/80.json')
const score120            = require('../assets/mocks/scores/120.json')
const score160            = require('../assets/mocks/scores/160.json')

const pageUrlPattern      = /^(http:\/\/localhost:5000\/scores\?per_page=.&page=.)/

describe('Score', function() {
    beforeEach(function (done) {
        waterfall([
            function (callback){
                db.collection('devices').drop(function () {
                    callback()
                })
            },
            function (callback){
                db.collection('scenarios').drop(function () {
                    callback()
                })
            },
            function (callback){
                db.collection('scores').drop(function () {
                    callback()
                })
            },
            function (callback) {
                db.collection('devices').insert(device530, function() {
                    callback()
                })
            },
            function (callback) {
                db.collection('devices').insert(device960M, function() {
                    callback()
                })
            },
            function (callback) {
                db.collection('scenarios').insert(scenarioForce, function() {
                    callback()
                })
            },
            function (callback) {
                db.collection('scenarios').insert(scenarioEnterprise, function() {
                    callback()
                })
            },
            function (callback) {
                score40.device = `${device530._id}`
                score40.scenario = `${scenarioForce._id}`
                db.collection('scores').insert(score40, function() {
                    callback()
                })
            },
            function (callback) {
                score80.device = `${device960M._id}`
                score80.scenario = `${scenarioEnterprise._id}`
                db.collection('scores').insert(score80, function() {
                    callback()
                })
            },
            function (callback) {
                score120.device = `${device960M._id}`
                score120.scenario = `${scenarioEnterprise._id}`
                db.collection('scores').insert(score120, function() {
                    callback()
                })
            },
            function (callback) {
                score160.device = `${device530._id}`
                score160.scenario = `${scenarioForce._id}`
                db.collection('scores').insert(score160, function() {
                    callback()
                })
            },
        ], function () {
            done()
        })
    })

    describe('GET /scores', function() {
        it('should return a list of scores', function(done) {
            app
                .get('/scores')
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(4)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should search the scores by device', function(done) {
            app
                .get(`/scores?device=${device530._id}`)
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(2)
                    expect(res.body.data[0]._id).to.have.string(score40._id)
                    expect(res.body.data[0].nbFrames).to.be.equal(score40.nbFrames)
                    expect(res.body.data[0].averageFps).to.be.equal(score40.averageFps)
                    expect(res.body.data[0].date).to.be.equal(score40.date)
                    expect(res.body.data[0].device).to.have.string(device530._id)
                    expect(res.body.data[0].scenario).to.have.string(scenarioForce._id)
                    expect(res.body.data[1]._id).to.have.string(score160._id)
                    expect(res.body.data[1].nbFrames).to.be.equal(score160.nbFrames)
                    expect(res.body.data[1].averageFps).to.be.equal(score160.averageFps)
                    expect(res.body.data[1].date).to.be.equal(score160.date)
                    expect(res.body.data[1].device).to.have.string(device530._id)
                    expect(res.body.data[1].scenario).to.have.string(scenarioForce._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should search the scores by multiple devices', function(done) {
            app
                .get(`/scores?device=${device530._id}&device=${device960M._id}`)
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(4)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should search the scores by scenario', function(done) {
            app
                .get(`/scores?scenario=${scenarioEnterprise._id}`)
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(2)
                    expect(res.body.data[0]._id).to.have.string(score80._id)
                    expect(res.body.data[0].nbFrames).to.be.equal(score80.nbFrames)
                    expect(res.body.data[0].averageFps).to.be.equal(score80.averageFps)
                    expect(res.body.data[0].date).to.be.equal(score80.date)
                    expect(res.body.data[0].device).to.have.string(device960M._id)
                    expect(res.body.data[0].scenario).to.have.string(scenarioEnterprise._id)
                    expect(res.body.data[1]._id).to.have.string(score120._id)
                    expect(res.body.data[1].nbFrames).to.be.equal(score120.nbFrames)
                    expect(res.body.data[1].averageFps).to.be.equal(score120.averageFps)
                    expect(res.body.data[1].date).to.be.equal(score120.date)
                    expect(res.body.data[1].device).to.have.string(device960M._id)
                    expect(res.body.data[1].scenario).to.have.string(scenarioEnterprise._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should search the scores by multiple scenarios', function(done) {
            app
                .get(`/scores?scenario=${scenarioForce._id}&scenario=${scenarioEnterprise._id}`)
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(4)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should populate the scores with devices', function(done) {
            app
                .get('/scores?populate=device')
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(4)
                    expect(res.body.data[0]._id).to.have.string(score40._id)
                    expect(res.body.data[1]._id).to.have.string(score80._id)
                    expect(res.body.data[2]._id).to.have.string(score120._id)
                    expect(res.body.data[3]._id).to.have.string(score160._id)
                    expect(res.body.data[0].device).to.be.an('object')
                    expect(res.body.data[1].device).to.be.an('object')
                    expect(res.body.data[2].device).to.be.an('object')
                    expect(res.body.data[3].device).to.be.an('object')
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should populate the scores with scenarios', function(done) {
            app
                .get('/scores?populate=scenario')
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(4)
                    expect(res.body.data[0]._id).to.have.string(score40._id)
                    expect(res.body.data[1]._id).to.have.string(score80._id)
                    expect(res.body.data[2]._id).to.have.string(score120._id)
                    expect(res.body.data[3]._id).to.have.string(score160._id)
                    expect(res.body.data[0].scenario).to.be.an('object')
                    expect(res.body.data[1].scenario).to.be.an('object')
                    expect(res.body.data[2].scenario).to.be.an('object')
                    expect(res.body.data[3].scenario).to.be.an('object')
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should populate the scores with devices and scenarios', function(done) {
            app
                .get('/scores?populate=device&populate=scenario')
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(4)
                    expect(res.body.data[0]._id).to.have.string(score40._id)
                    expect(res.body.data[1]._id).to.have.string(score80._id)
                    expect(res.body.data[2]._id).to.have.string(score120._id)
                    expect(res.body.data[3]._id).to.have.string(score160._id)
                    expect(res.body.data[0].device).to.be.an('object')
                    expect(res.body.data[1].device).to.be.an('object')
                    expect(res.body.data[2].device).to.be.an('object')
                    expect(res.body.data[3].device).to.be.an('object')
                    expect(res.body.data[0].scenario).to.be.an('object')
                    expect(res.body.data[1].scenario).to.be.an('object')
                    expect(res.body.data[2].scenario).to.be.an('object')
                    expect(res.body.data[3].scenario).to.be.an('object')
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })

        })

        it('should group the scores by devices', function(done) {
            app
                .get('/scores?group=device')
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(2)
                    expect(res.body.data[0].averageFps).to.be.equal(100)
                    expect(res.body.data[1].averageFps).to.be.equal(100)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should group the scores by scenarios', function(done) {
            app
                .get('/scores?group=scenario')
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(2)
                    expect(res.body.data[0].averageFps).to.be.equal(100)
                    expect(res.body.data[1].averageFps).to.be.equal(100)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should group the scores by devices and scenarios', function(done) {
            app
                .get('/scores?group=device&group=scenario')
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(2)
                    expect(res.body.data[0].averageFps).to.be.equal(100)
                    expect(res.body.data[1].averageFps).to.be.equal(100)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should paginate the scores', function(done) {
            app
                .get('/scores?per_page=1&page=1')
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(1)
                    expect(res.body.pages.last).to.match(pageUrlPattern)
                    expect(res.body.pages.next).to.match(pageUrlPattern)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })
    })

    describe('GET /scores/:id', function() {
        it('should return one score', function(done) {
            app
                .get('/scores/' + score40._id)
                .end(function(err, res) {
                    expect(res.body.length).to.be.equal(1)
                    expect(res.body[0]._id).to.have.string(score40._id)
                    expect(res.body[0].nbFrames).to.be.equal(score40.nbFrames)
                    expect(res.body[0].averageFps).to.be.equal(score40.averageFps)
                    expect(res.body[0].date).to.be.equal(score40.date)
                    expect(res.body[0].device).to.have.string(device530._id)
                    expect(res.body[0].scenario).to.have.string(scenarioForce._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })
    })

    describe('POST /scores', function() {
        beforeEach(function (done) {
            waterfall([
                function (callback){
                    db.collection('scores').drop(function () {
                        callback()
                    })
                },
            ], function () {
                done()
            })
        })

        it('should create a score', function(done) {
            app
                .post('/scores')
                .send(score40)
                .end(function(err, res) {
                    expect(res.body._id).to.not.be.null
                    expect(res.statusCode).to.be.equal(201)
                    done()
                })
        })

        it('should reject a bad device', function(done) {
            score40.device = '000000000000000000000000'
            app
                .post('/scores')
                .send(score40)
                .end(function(err, res) {
                    expect(res.body.code).to.be.equal('Forbidden')
                    expect(res.body.message).to.be.equal('missing device or scenario')
                    expect(res.statusCode).to.be.equal(403)
                    done()
                })
        })

        it('should reject a bad scenario', function(done) {
            score40.scenario = '000000000000000000000000'
            app
                .post('/scores')
                .send(score40)
                .end(function(err, res) {
                    expect(res.body.code).to.be.equal('Forbidden')
                    expect(res.body.message).to.be.equal('missing device or scenario')
                    expect(res.statusCode).to.be.equal(403)
                    done()
                })
        })
    })

})
