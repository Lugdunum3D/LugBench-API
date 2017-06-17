'use strict'

const errors = require('restify-errors')

const log = require('../../index').log
const Score = require('../../models/score')


module.exports.get = function get(req, res, next) {
    Score.apiQuery(req.params, function(err, scores) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(res.paginate.getPaginatedResponse(scores))
        next()
    })
}

module.exports.post = function post(req, res, next) {
    let data = req.body || {}

    let score = new Score(data)
    score.save(function(err, score) {

        if (err) {
            log.error(err)
            return next(new errors.InternalError(err.message))
        }

        res.send({ id: score.id }, 201)
        next()
    })
}
