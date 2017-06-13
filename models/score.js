'use strict'

const mongoose = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query')

const ScoreSchema = new mongoose.Schema({
  "device": String,
  "scenario": String,
  "nbFrames": Number,
  "averageFps": Number
})

ScoreSchema.plugin(mongooseApiQuery)

const Score = mongoose.model('Score', ScoreSchema)
module.exports = Score