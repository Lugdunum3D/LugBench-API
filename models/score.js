'use strict'

const mongoose = require('mongoose')

const ScoreSchema = new mongoose.Schema({
    'device': { type: String, ref: 'Device' },
    'scenario': { type: String, ref: 'Scenario' },
    'nbFrames': Number,
    'averageFps': Number,
    date: { type: Date, default: Date.now }
}, {
  versionKey: false
})

const Score = mongoose.model('Score', ScoreSchema)
module.exports = Score
