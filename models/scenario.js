'use strict'

const mongoose = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query')

const ScenarioSchema = new mongoose.Schema({
  "name": { type: String, unique: true },
  "description": String
})

ScenarioSchema.plugin(mongooseApiQuery)

const Scenario = mongoose.model('Scenario', ScenarioSchema)
module.exports = Scenario
