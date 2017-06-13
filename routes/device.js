'use strict'

/**
 * Module Dependencies
 */
const errors = require('restify-errors')

/**
 * Model Schema
 */
const Device = require('../models/device')

/**
 * POST /devices
 */
server.post('/devices', function(req, res, next) {

    let data = req.body || {}

    let device = new Device(data)
    device.save(function(err) {

        if (err) {
            log.error(err)
            return next(new errors.InternalError(err.message))
        }

        res.send(201)
        next()

    })

})

/**
 * GET /devices
 */
server.get('/devices', function(req, res, next) {

    Device.apiQuery(req.params, function(err, devices) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(devices)
        next()

    })

})

/**
 * GET /devices/:device_id
 */
server.get('/devices/:device_id', function(req, res, next) {

    Device.findOne({ _id: req.params.device_id }, function(err, device) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(device)
        next()

    })

})
