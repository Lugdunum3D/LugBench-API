'use strict'

/**
 * Module Dependencies
 */
const errors = require('restify-errors')

/**
 * Model Schema
 */
const Scenario = require('../models/scenario')

/**
 * GET /scenarios
 */
server.get('/scenarios', function(req, res, next) {

    Scenario.apiQuery(req.params, function(err, scenarios) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(scenarios)
        next()

    })

})

/**
 * GET /scenarios/:scenario_id
 */
server.get('/scenarios/:scenario_id', function(req, res, next) {

    Scenario.findOne({ _id: req.params.scenario_id }, function(err, scenario) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(scenario)
        next()

    })

})
