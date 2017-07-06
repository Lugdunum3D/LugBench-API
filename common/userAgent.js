'use strict';

 /**
  * @param  {String} family This is the Client Name for us Lugbench
  * @param  {Int} major  This is the major number of client version
  * @param  {Int} minor  This is the minor number of client version
  * @param  {Int} patch  This is the patch number of client version
  * @param  {String} source This is the actual user agent string
  */
 function Agent(family, major, minor, patch, source) {
  this.family = family || '';
  this.major = major || 0;
  this.minor = minor || 0;
  this.patch = patch || 0;
  this.source = source || '';
}

/**
 * Display a readable version of the user agent 
 * @returns a String contqining the version
 */
Agent.prototype.version = function version() {
    return this.major + '.' + this.minor + '.' + this.patch;
};

/**
 * Transform a String to a Agent Object
 * @param {String} userAgent This is the string to parse
 * @return {Agent} This return an Agent object
 */
 function parse(userAgent) {
    let userAgentSplited = userAgent.split('/');
    if (userAgentSplited.length !== 2 || userAgentSplited[0] !== 'LugBench' ) {
        return new Agent('', 0, 0, 0, userAgent);
    }
    let family = userAgentSplited[0];
    let source = userAgentSplited[2];
    let versionSplitted = userAgentSplited[1].split('.');
    if (versionSplitted.length !== 3) {
         return new Agent('', 0, 0, 0, userAgent);
    }
    return new Agent(family,
      versionSplitted[0],
      versionSplitted[1],
      versionSplitted[2],
      userAgent);
}
module.exports.parse = parse;
module.exports.Agent = Agent;
