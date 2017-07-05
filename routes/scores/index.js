'use strict'

const errors  = require('restify-errors')
const _       = require('lodash')

const log     = require('../../index').log
const Score   = require('../../models/score')

function getIdFromGroupParams(groupParams) {
    let groupId = {}

    if (_.isString(groupParams)) {
        groupId[groupParams] = '$' + groupParams
    } else if (_.isArray(groupParams)) {
        _.map(groupParams, function(group) {
            groupId[group] = '$' + group
        })
    }
    return groupId
}

function reqFromParams(params) {
    const findParams = _.pick(params, ['device', 'scenario'])
    const populateParams = _.pick(params, ['populate'])
    const aggregateParams = _.pick(params, ['group'])
    let scoreRequest

    if (aggregateParams.group) {
        scoreRequest = Score.aggregate([
            {
                $group: {
                    _id: getIdFromGroupParams(aggregateParams.group),
                    averageFps: {
                        $avg: '$averageFps',
                    },
                },
            },
        ])
    } else {
        scoreRequest = Score.find(findParams)
        if (populateParams.populate) {
            scoreRequest = scoreRequest.populate(populateParams.populate)
        }
    }

    return scoreRequest
}

module.exports.get = function get(req, res, next) {
    reqFromParams(req.params).exec(function(err, scores) {

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

        res.send(201, { id: score.id })
        next()
    })
}
