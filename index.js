'use strict'

/**
 * Module Dependencies
 */
const config                = require('./config')
const restify               = require('restify')
const paginate              = require('restify-paginate')
const winston               = require('winston')
const bunyanWinston         = require('bunyan-winston-adapter')
const mongoose              = require('mongoose')
const autoload              = require('auto-load')

const checkClientVersion    = require('./middlewares/checkClientVersion').checkClientVersion


/**
 * Logging
 */
const log = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            timestamp: () => {
                return new Date().toString()
            },
            json: true,
        }),
    ],
})

/**
 * Initialize Server
 */
const server = restify.createServer({
    name    : config.name,
    version : config.version,
    log     : bunyanWinston.createAdapter(log),
})

/**
 * Middleware
 */
server.use(restify.jsonBodyParser({ mapParams: true }))
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser({ mapParams: true }))
server.use(restify.fullResponse())
server.use(paginate(server))

/**
 * Error Handling
 */
server.on('uncaughtException', (req, res, route, err) => {
    log.error(err.stack)
    res.send(err)
})

const configRoutes = function(server, handlers) {
    // Devices
    server.get('/devices', handlers.devices.index.get)
    server.post('/devices', checkClientVersion, handlers.devices.index.post)

    server.get('/devices/:id', handlers.devices.id.index.get)

    // Scores
    server.get('/scores', handlers.scores.index.get)
    server.post('/scores', handlers.scores.index.post)

    server.get('/scores/:id', handlers.scores.id.index.get)

    // Scenarios
    server.get('/scenarios', handlers.scenarios.index.get)

    server.get('/scenarios/:id', handlers.scenarios.id.index.get)
}

/**
 * Lift Server, Connect to DB & Bind Routes
 */
server.listen(config.port, function() {

    mongoose.connection.on('error', function(err) {
        log.error('Mongoose default connection error: ' + err)
        process.exit(1)
    })

    mongoose.connection.on('open', function(err) {

        if (err) {
            log.error('Mongoose default connection error: ' + err)
            process.exit(1)
        }

        log.info(
            '%s v%s ready to accept connections on port %s in %s environment.',
            server.name,
            config.version,
            config.port,
            config.env
        )

        const handlers = autoload(__dirname + '/routes')
        configRoutes(server, handlers)
    })

    mongoose.connect(config.db.uri)
})

module.exports.log = log
module.exports.server = server
