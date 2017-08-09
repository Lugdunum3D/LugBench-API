'use strict'

require('../index.js')

const chai                = require('chai')
const supertest           = require('supertest')
const mongoose            = require('mongoose')
const waterfall           = require('async/waterfall')

const expect              = chai.expect
const app                 = supertest.agent('http://localhost:5000')
const db                  = mongoose.connection

const scenarioForce       = require('../assets/mocks/scenarios/force.json')
const scenarioEnterprise  = require('../assets/mocks/scenarios/enterprise.json')

const pageUrlPattern      = /^(http:\/\/localhost:5000\/scenarios\?per_page=.&page=.)/
const requestHeaders      = {
    'content-type': 'application/json',
    'user-agent': 'LugBench/0.1.0',
}

describe('Scenario', function() {
    beforeEach(function (done) {
        waterfall([
            function (callback){
                db.collection('scenarios').drop(function () {
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
        ], function () {
            done()
        })
    })

    describe('GET /scenarios', function() {
        it('should return a list of scenarios', function(done) {
            app
                .get('/scenarios')
                .set(requestHeaders)
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(2)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should paginate the scenarios', function(done) {
            app
                .get('/scenarios?per_page=1&page=1')
                .set(requestHeaders)
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(1)
                    expect(res.body.pages.last).to.match(pageUrlPattern)
                    expect(res.body.pages.next).to.match(pageUrlPattern)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })
    })

    describe('GET /scenarios/:id', function() {
        it('should return one scenario', function(done) {
            app
                .get(`/scenarios/${scenarioForce._id}`)
                .set(requestHeaders)
                .end(function(err, res) {
                    expect(res.body.length).to.be.equal(1)
                    expect(res.body[0]._id).to.have.string(scenarioForce._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })
    })
})
