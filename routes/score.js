'use strict'

/**
 * Module Dependencies
 */
const errors = require('restify-errors')

/**
 * Model Schema
 */
const Score = require('../models/score')

/**
 * POST /scores
 */
server.post('/scores', function(req, res, next) {

    let data = req.body || {}

    let score = new Score(data)
    score.save(function(err) {

        if (err) {
            log.error(err)
            return next(new errors.InternalError(err.message))
        }

        res.send(201)
        next()

    })

})

/**
 * GET /scores
 */
server.get('/scores', function(req, res, next) {

    Score.apiQuery(req.params, function(err, scores) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(scores)
        next()

    })

})

/**
 * GET /scores/:score_id
 */
server.get('/scores/:score_id', function(req, res, next) {

    Score.findOne({ _id: req.params.score_id }, function(err, score) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(score)
        next()

    })

})
