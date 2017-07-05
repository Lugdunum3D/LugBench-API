'use strict'

const mongoose = require('mongoose')

const ScenarioSchema = new mongoose.Schema({
    'name': { type: String, unique: true },
    'description': String,
}, {
    versionKey: false,
})

const Scenario = mongoose.model('Scenario', ScenarioSchema)
module.exports = Scenario
