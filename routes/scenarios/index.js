'use strict'

const errors    = require('restify-errors')

const log       = require('../../index').log
const Scenario  = require('../../models/scenario')


module.exports.get = function get(req, res, next) {
    Scenario.find({}, function(err, scenarios) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(res.paginate.getPaginatedResponse(scenarios))
        next()
    })
}
