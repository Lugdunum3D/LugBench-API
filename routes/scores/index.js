'use strict'

const errors    = require('restify-errors')
const _         = require('lodash')

const log       = require('../../index').log
const Device    = require('../../models/device')
const Scenario  = require('../../models/scenario')
const Score     = require('../../models/score')


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

function getAggregateFromParams(aggregateParams, populateParams) {
    let aggregateRequest = [
        {
            $group: {
                _id: getIdFromGroupParams(aggregateParams.group),
                averageFps: {
                    $avg: '$averageFps',
                },
            },
        },
    ]

    if (_.isString(populateParams.populate)) {
        aggregateRequest.push({
            $lookup: {
                from: `${populateParams.populate}s`,
                localField: `_id.${populateParams.populate}`,
                foreignField: '_id',
                as: `${populateParams.populate}`,
            },
        })
        aggregateRequest.push({
            $unwind: {
                path: `$${populateParams.populate}`,
                preserveNullAndEmptyArrays: true,
            },
        })
    } else if (_.isArray(populateParams.populate)) {
        _.forEach(populateParams.populate, function(value) {
            aggregateRequest.push({
                $lookup: {
                    from: `${value}s`,
                    localField: `_id.${value}`,
                    foreignField: '_id',
                    as: `${value}`,
                },
            })
            aggregateRequest.push({
                $unwind: {
                    path: `$${value}`,
                    preserveNullAndEmptyArrays: true,
                },
            })
        })
    }
    return aggregateRequest
}

function reqFromParams(params) {
    const findParams = _.pick(params, ['device', 'scenario'])
    const populateParams = _.pick(params, ['populate'])
    const aggregateParams = _.pick(params, ['group'])
    let scoreRequest

    if (aggregateParams.group) {
        scoreRequest = Score.aggregate(getAggregateFromParams(aggregateParams, populateParams))
    } else {
        scoreRequest = Score.find(findParams)
        if (populateParams.populate) {
            scoreRequest = scoreRequest.populate(populateParams.populate)
        }
    }

    scoreRequest = scoreRequest.sort({ averageFps: 'desc' })

    return scoreRequest
}

module.exports.get = function get(req, res, next) {
    reqFromParams(req.params).exec(function(err, scores) {

        if (err) {
            if (process.env.NODE_ENV !== 'test') {
                log.error(err)
            }
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        if (scores && scores.length > 0) {
            res.send(res.paginate.getPaginatedResponse(scores))
        } else {
            res.send({})
        }
        next()
    })
}

module.exports.post = function post(req, res, next) {
    let data = req.body || {}

    Device.count({ _id: data.device }, function (err, deviceCount) {
        Scenario.count({ _id: data.scenario }, function (err, scenarioCount) {
            if (deviceCount > 0 && scenarioCount > 0) {
                let score = new Score(data)
                score.save(function(err, score) {

                    if (err) {
                        if (process.env.NODE_ENV !== 'test') {
                            log.error(err)
                        }
                        return next(new errors.InternalError(err.message))
                    }

                    res.send(201, { id: score.id })
                    next()
                })
            } else {
                return next(new errors.ForbiddenError('missing device or scenario'))
            }
        })
    })
}
