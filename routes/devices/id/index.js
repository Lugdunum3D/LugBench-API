'use strict'

const errors  = require('restify-errors')

const log     = require('../../../index').log
const Device  = require('../../../models/device')


module.exports.get = function get(req, res, next) {
    Device.find({ _id: req.params.id }, function(err, device) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(device)
        next()
    })
}
