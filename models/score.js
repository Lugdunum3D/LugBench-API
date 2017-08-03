'use strict'

const mongoose = require('mongoose')

const ScoreSchema = new mongoose.Schema({
    'device': { type: mongoose.Schema.ObjectId, required: true, ref: 'Device' },
    'scenario': { type: mongoose.Schema.ObjectId, required: true, ref: 'Scenario' },
    'nbFrames': { type: Number, required: true },
    'averageFps': { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
}, {
    versionKey: false,
})

const Score = mongoose.model('Score', ScoreSchema)
module.exports = Score
