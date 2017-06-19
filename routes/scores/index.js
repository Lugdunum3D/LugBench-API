'use strict'

const errors  = require('restify-errors')
const _       = require('lodash')

const log = require('../../index').log
const Score = require('../../models/score')


module.exports.get = function get(req, res, next) {
    const findParams = _.pick(req.params, ['device', 'scenario'])
    const populateParams = _.pick(req.params, ['populate'])

    Score
    .find(findParams)
    .populate(populateParams ? populateParams.populate : '')
    .exec(function(err, scores) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        if (scores.length > 0) {
          res.send(res.paginate.getPaginatedResponse(scores))
        } else {
          res.send({})
        }
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
