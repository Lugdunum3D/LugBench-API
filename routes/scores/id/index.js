'use strict'

const errors = require('restify-errors')

const log = require('../../../index').log
const Score = require('../../../models/score')


module.exports.get = function get(req, res, next) {
    Score.find({ _id: req.params.score_id }, function(err, score) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(score)
        next()
    })
}
