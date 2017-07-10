'use strict'

const errors    = require('restify-errors')

const log       = require('../../../index').log
const Scenario  = require('../../../models/scenario')


module.exports.get = function get(req, res, next) {
    Scenario.find({ _id: req.params.id }, function(err, scenario) {

        if (err) {
            if (process.env.NODE_ENV !== 'test') {
                log.error(err)
            }
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(scenario)
        next()
    })
}
