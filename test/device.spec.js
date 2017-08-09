'use strict'

require('../index.js')

const _               = require('lodash')
const chai            = require('chai')
const supertest       = require('supertest')
const mongoose        = require('mongoose')
const waterfall       = require('async/waterfall')

const expect          = chai.expect
const app             = supertest.agent('http://localhost:5000')
const db              = mongoose.connection

const device530       = require('../assets/mocks/devices/530.json')
const device960M      = require('../assets/mocks/devices/960M.json')

const pageUrlPattern  = /^(http:\/\/localhost:5000\/devices\?per_page=.&page=.)/
const requestHeaders  = {
    'content-type': 'application/json',
    'user-agent': 'LugBench/0.1.0',
}

describe('Device', function() {
    beforeEach(function (done) {
        waterfall([
            function (callback){
                db.collection('devices').drop(function () {
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
        ], function () {
            done()
        })
    })

    describe('GET /devices', function() {
        it('should return a list of devices', function(done) {
            app.get('/devices')
                .set(requestHeaders)
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(2)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should search the devices by name', function(done) {
            app
                .get(`/devices?name=${device530.name}`)
                .set(requestHeaders)
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(1)
                    expect(res.body.data[0]._id).to.have.string(device530._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should search the devices by os', function(done) {
            app
                .get(`/devices?os=${device960M.os}`)
                .set(requestHeaders)
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(1)
                    expect(res.body.data[0]._id).to.have.string(device960M._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should search the devices by driverVersion', function(done) {
            app
                .get(`/devices?driverVersion=${device530.driverVersion}`)
                .set(requestHeaders)
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(1)
                    expect(res.body.data[0]._id).to.have.string(device530._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should search the devices by vendorId', function(done) {
            app
                .get(`/devices?vendorId=${device960M.vendorId}`)
                .set(requestHeaders)
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(1)
                    expect(res.body.data[0]._id).to.have.string(device960M._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should search the devices by deviceId', function(done) {
            app
                .get(`/devices?deviceId=${device530.deviceId}`)
                .set(requestHeaders)
                .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(1)
                    expect(res.body.data[0]._id).to.have.string(device530._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })

        it('should paginate the devices', function(done) {
            app
                .get('/devices?per_page=1&page=1')
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

    describe('GET /devices/:id', function() {
        it('should return one device', function(done) {
            app
                .get(`/devices/${device960M._id}`)
                .set(requestHeaders)
                .end(function(err, res) {
                    expect(res.body.length).to.be.equal(1)
                    expect(res.body[0]._id).to.have.string(device960M._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                })
        })
    })

    describe('POST /devices', function() {
        beforeEach(function (done) {
            waterfall([
                function (callback){
                    db.collection('devices').drop(function () {
                        callback()
                    })
                },
            ], function () {
                done()
            })
        })

        it('should create a device', function(done) {
            app
                .post('/devices')
                .send(device960M)
                .set(requestHeaders)
                .end(function(err, res) {
                    expect(res.body._id).to.not.be.null
                    expect(res.statusCode).to.be.equal(201)
                    done()
                })
        })

        it('should reject a bad request', function(done) {
            let wrongDevice960M = _.cloneDeep(device960M)
            delete wrongDevice960M.driverVersion
            app
                .post('/devices')
                .send(wrongDevice960M)
                .set(requestHeaders)
                .end(function(err, res) {
                    expect(res.body.code).to.be.equal('BadRequest')
                    expect(res.body.message).to.be.equal('"driverVersion" is required')
                    expect(res.statusCode).to.be.equal(400)
                    done()
                })
        })

        it('should reject a bad request from vulkanInfo', function(done) {
            let wrongDevice960M = _.cloneDeep(device960M)
            delete wrongDevice960M.vulkanInfo.features.alphaToOne
            app
                .post('/devices')
                .send(wrongDevice960M)
                .set(requestHeaders)
                .end(function(err, res) {
                    expect(res.body.code).to.be.equal('BadRequest')
                    expect(res.body.message).to.be.equal('"alphaToOne" is required')
                    expect(res.statusCode).to.be.equal(400)
                    done()
                })
        })

        it('should detect a device duplication', function(done) {
            waterfall([
                function (callback){
                    app
                        .post('/devices')
                        .send(device960M)
                        .set(requestHeaders)
                        .end(function() {
                            callback()
                        })
                },
            ], function () {
                app
                    .post('/devices')
                    .send(device960M)
                    .set(requestHeaders)
                    .end(function(err, res) {
                        expect(res.body._id).to.not.be.null
                        expect(res.statusCode).to.be.equal(409)
                        done()
                    })
            })
        })
    })
})
