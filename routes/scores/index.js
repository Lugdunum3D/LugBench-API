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

function reqFromParams(params, cb) {
    const findParams = _.pick(params, ['device', 'scenario'])
    const populateParams = _.pick(params, ['populate'])
    const aggregateParams = _.pick(params, ['group'])

    if (aggregateParams.group) {
        Score.aggregate([
            {
                $group: {
                    _id: getIdFromGroupParams(aggregateParams.group),
                    averageFps: {
                        $avg: '$averageFps',
                    },
                },
            },
        ], !populateParams.populate ? null : function(err, transaction) {
            if (populateParams.populate === 'device') {
                Device.populate(transaction, { path: `_id.${populateParams.populate}` }, cb)
            } else {
                Scenario.populate(transaction, { path: `_id.${populateParams.populate}` }, cb)
            }
        })
    } else {
        if (populateParams.populate) {
            Score.find(findParams).populate(populateParams.populate, cb)
        } else {
            let scoreRequest = Score.find(findParams)
            scoreRequest.sort({ averageFps: 'desc' }).exec(cb)
        }
    }
}

module.exports.get = function get(req, res, next) {
    reqFromParams(req.params, function(err, scores) {
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
