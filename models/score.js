'use strict'

const mongoose = require('mongoose')

const ScoreSchema = new mongoose.Schema({
    'device': String,
    'scenario': String,
    'nbFrames': Number,
    'averageFps': Number,
}, {
  versionKey: false
})

const Score = mongoose.model('Score', ScoreSchema)
module.exports = Score
