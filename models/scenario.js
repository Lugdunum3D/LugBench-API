'use strict'

const mongoose = require('mongoose')

const ScenarioSchema = new mongoose.Schema({
    'name': { type: String, required: true, unique: true },
    'description': { type: String, required: true },
}, {
    versionKey: false,
})

const Scenario = mongoose.model('Scenario', ScenarioSchema)
module.exports = Scenario
