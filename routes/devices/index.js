'use strict'

const errors = require('restify-errors')
const paginate = require('restify-paginate')

const log = require('../../index').log
const Device = require('../../models/device')


module.exports.get = function get(req, res, next) {
    Device.apiQuery(req.params, function(err, devices) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(res.paginate.getPaginatedResponse(devices))
        next()
    })
}

module.exports.post = function post(req, res, next) {
    let data = req.body || {}
    let device = new Device(data)

    device.save(function(err, device) {

        if (err) {
            log.error(err)
            return next(new errors.InternalError(err.message))
        }

        res.send({ id: device.id }, 201)
        next()
    })
}
