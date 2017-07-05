'use strict'

function Agent(family, major, minor, patch, source) {
    this.family = family || 'Other'
    this.major = major || '0'
    this.minor = minor || '0'
    this.patch = patch || '0'
    this.source = source || 'other'
}

Agent.prototype.version = function version() {
    return this.major + '.' + this.minor + '.' + this.patch
}

function parse(userAgent) {
    const userAgentSplited = userAgent.split('/')
    if (userAgentSplited.length !== 2 || userAgentSplited[0] !== 'LugBench') {
        return new Agent()
    }
    const family = userAgentSplited[0]
    const source = userAgentSplited[2]
    const versionSplitted = userAgentSplited[1].split('.')
    if (versionSplitted.length !== 3) {
        return new Agent()
    }
    return new Agent(family, versionSplitted[0], versionSplitted[1],versionSplitted[2], source)
}

module.exports.parse = parse
module.exports.Agent = Agent

//   to-do :
//    to Json function
//   to string Versiom
// function parse string to agent
