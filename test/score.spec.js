const server    = require('../index')
const chai      = require('chai')
const supertest = require('supertest')
const mongoose  = require('mongoose')

const expect    = chai.expect
const app       = supertest.agent('http://localhost:5000')
const db        = mongoose.connection

const device530 = require('../assets/mocks/devices/530.json')
const device960M = require('../assets/mocks/devices/960M.json')
const scenarioForce = require('../assets/mocks/scenarios/force.json')
const scenarioEnterprise = require('../assets/mocks/scenarios/enterprise.json')
const score40 = require('../assets/mocks/scores/40.json')
const score80 = require('../assets/mocks/scores/80.json')

before(function (done) {
  db.collection('devices').drop(function() {
    db.collection('scenarios').drop(function() {
      db.collection('scores').drop(function () {
        done()
      })
    })
  })
})

afterEach(function (done) {
  db.collection('devices').drop(function() {
    db.collection('scenarios').drop(function() {
      db.collection('scores').drop(function () {
        done()
      })
    })
  })
})

describe('Score', function() {

  describe('GET /scores', function() {
    it('should return a list of scores', function(done) {
      db.collection('devices').insert(device530, function(err, firstDevice) {
        db.collection('devices').insert(device960M, function(err, secondDevice) {
          db.collection('scenarios').insert(scenarioForce, function(err, firstScenario) {
            db.collection('scenarios').insert(scenarioEnterprise, function(err, secondScenario) {
              score40.device = `${firstDevice.ops[0]._id}`
              score40.scenario = `${firstScenario.ops[0]._id}`
              db.collection('scores').insert(score40, function(err, firstScore) {
                score80.device = `${secondDevice.ops[0]._id}`
                score80.scenario = `${secondScenario.ops[0]._id}`
                db.collection('scores').insert(score80, function(err, secondScore) {
                    app
                    .get('/scores')
                    .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(2)
                    expect(res.body.data[0]._id).to.have.string(firstScore.ops[0]._id)
                    expect(res.body.data[1]._id).to.have.string(secondScore.ops[0]._id)
                    expect(res.body.data[0].nbFrames).to.be.equal(firstScore.ops[0].nbFrames)
                    expect(res.body.data[1].nbFrames).to.be.equal(secondScore.ops[0].nbFrames)
                    expect(res.body.data[0].averageFps).to.be.equal(firstScore.ops[0].averageFps)
                    expect(res.body.data[1].averageFps).to.be.equal(secondScore.ops[0].averageFps)
                    expect(res.body.data[0].device).to.have.string(firstDevice.ops[0]._id)
                    expect(res.body.data[1].device).to.have.string(secondDevice.ops[0]._id)
                    expect(res.body.data[0].scenario).to.have.string(firstScenario.ops[0]._id)
                    expect(res.body.data[1].scenario).to.have.string(secondScenario.ops[0]._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                  })
                })
              })
            })
          })
        })
      })
    })

    it('should search the scores by device', function(done) {
      db.collection('devices').insert(device530, function(err, firstDevice) {
        db.collection('devices').insert(device960M, function(err, secondDevice) {
          db.collection('scenarios').insert(scenarioForce, function(err, firstScenario) {
            db.collection('scenarios').insert(scenarioEnterprise, function(err, secondScenario) {
              score40.device = `${firstDevice.ops[0]._id}`
              score40.scenario = `${firstScenario.ops[0]._id}`
              db.collection('scores').insert(score40, function(err, firstScore) {
                score80.device = `${secondDevice.ops[0]._id}`
                score80.scenario = `${secondScenario.ops[0]._id}`
                db.collection('scores').insert(score80, function(err, secondScore) {
                    app
                    .get(`/scores?device=${firstDevice.ops[0]._id}`)
                    .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(1)
                    expect(res.body.data[0]._id).to.have.string(firstScore.ops[0]._id)
                    expect(res.body.data[0].nbFrames).to.be.equal(firstScore.ops[0].nbFrames)
                    expect(res.body.data[0].averageFps).to.be.equal(firstScore.ops[0].averageFps)
                    expect(res.body.data[0].device).to.have.string(firstDevice.ops[0]._id)
                    expect(res.body.data[0].scenario).to.have.string(firstScenario.ops[0]._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                  })
                })
              })
            })
          })
        })
      })
    })

    it('should search the scores by multiple devices', function(done) {
      db.collection('devices').insert(device530, function(err, firstDevice) {
        db.collection('devices').insert(device960M, function(err, secondDevice) {
          db.collection('scenarios').insert(scenarioForce, function(err, firstScenario) {
            db.collection('scenarios').insert(scenarioEnterprise, function(err, secondScenario) {
              score40.device = `${firstDevice.ops[0]._id}`
              score40.scenario = `${firstScenario.ops[0]._id}`
              db.collection('scores').insert(score40, function(err, firstScore) {
                score80.device = `${secondDevice.ops[0]._id}`
                score80.scenario = `${secondScenario.ops[0]._id}`
                db.collection('scores').insert(score80, function(err, secondScore) {
                    app
                    .get(`/scores?device=${firstDevice.ops[0]._id}&device=${secondDevice.ops[0]._id}`)
                    .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(2)
                    expect(res.body.data[0]._id).to.have.string(firstScore.ops[0]._id)
                    expect(res.body.data[1]._id).to.have.string(secondScore.ops[0]._id)
                    expect(res.body.data[0].nbFrames).to.be.equal(firstScore.ops[0].nbFrames)
                    expect(res.body.data[1].nbFrames).to.be.equal(secondScore.ops[0].nbFrames)
                    expect(res.body.data[0].averageFps).to.be.equal(firstScore.ops[0].averageFps)
                    expect(res.body.data[1].averageFps).to.be.equal(secondScore.ops[0].averageFps)
                    expect(res.body.data[0].device).to.have.string(firstDevice.ops[0]._id)
                    expect(res.body.data[1].device).to.have.string(secondDevice.ops[0]._id)
                    expect(res.body.data[0].scenario).to.have.string(firstScenario.ops[0]._id)
                    expect(res.body.data[1].scenario).to.have.string(secondScenario.ops[0]._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                  })
                })
              })
            })
          })
        })
      })
    })

    it('should search the scores by scenario', function(done) {
      db.collection('devices').insert(device530, function(err, firstDevice) {
        db.collection('devices').insert(device960M, function(err, secondDevice) {
          db.collection('scenarios').insert(scenarioForce, function(err, firstScenario) {
            db.collection('scenarios').insert(scenarioEnterprise, function(err, secondScenario) {
              score40.device = `${firstDevice.ops[0]._id}`
              score40.scenario = `${firstScenario.ops[0]._id}`
              db.collection('scores').insert(score40, function(err, firstScore) {
                score80.device = `${secondDevice.ops[0]._id}`
                score80.scenario = `${secondScenario.ops[0]._id}`
                db.collection('scores').insert(score80, function(err, secondScore) {
                    app
                    .get(`/scores?scenario=${secondScenario.ops[0]._id}`)
                    .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(1)
                    expect(res.body.data[0]._id).to.have.string(secondScore.ops[0]._id)
                    expect(res.body.data[0].nbFrames).to.be.equal(secondScore.ops[0].nbFrames)
                    expect(res.body.data[0].averageFps).to.be.equal(secondScore.ops[0].averageFps)
                    expect(res.body.data[0].device).to.have.string(secondDevice.ops[0]._id)
                    expect(res.body.data[0].scenario).to.have.string(secondScenario.ops[0]._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                  })
                })
              })
            })
          })
        })
      })
    })

    it('should search the scores by multiple scenarios', function(done) {
      db.collection('devices').insert(device530, function(err, firstDevice) {
        db.collection('devices').insert(device960M, function(err, secondDevice) {
          db.collection('scenarios').insert(scenarioForce, function(err, firstScenario) {
            db.collection('scenarios').insert(scenarioEnterprise, function(err, secondScenario) {
              score40.device = `${firstDevice.ops[0]._id}`
              score40.scenario = `${firstScenario.ops[0]._id}`
              db.collection('scores').insert(score40, function(err, firstScore) {
                score80.device = `${secondDevice.ops[0]._id}`
                score80.scenario = `${secondScenario.ops[0]._id}`
                db.collection('scores').insert(score80, function(err, secondScore) {
                  app
                  .get(`/scores?scenario=${firstScenario.ops[0]._id}&scenario=${secondScenario.ops[0]._id}`)
                  .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(2)
                    expect(res.body.data[0]._id).to.have.string(firstScore.ops[0]._id)
                    expect(res.body.data[1]._id).to.have.string(secondScore.ops[0]._id)
                    expect(res.body.data[0].nbFrames).to.be.equal(firstScore.ops[0].nbFrames)
                    expect(res.body.data[1].nbFrames).to.be.equal(secondScore.ops[0].nbFrames)
                    expect(res.body.data[0].averageFps).to.be.equal(firstScore.ops[0].averageFps)
                    expect(res.body.data[1].averageFps).to.be.equal(secondScore.ops[0].averageFps)
                    expect(res.body.data[0].device).to.have.string(firstDevice.ops[0]._id)
                    expect(res.body.data[1].device).to.have.string(secondDevice.ops[0]._id)
                    expect(res.body.data[0].scenario).to.have.string(firstScenario.ops[0]._id)
                    expect(res.body.data[1].scenario).to.have.string(secondScenario.ops[0]._id)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                  })
                })
              })
            })
          })
        })
      })
    })

    it('should populate the scores with devices', function(done) {
      db.collection('devices').insert(device530, function(err, firstDevice) {
        db.collection('devices').insert(device960M, function(err, secondDevice) {
          db.collection('scenarios').insert(scenarioForce, function(err, firstScenario) {
            db.collection('scenarios').insert(scenarioEnterprise, function(err, secondScenario) {
              score40.device = `${firstDevice.ops[0]._id}`
              score40.scenario = `${firstScenario.ops[0]._id}`
              db.collection('scores').insert(score40, function(err, firstScore) {
                score80.device = `${secondDevice.ops[0]._id}`
                score80.scenario = `${secondScenario.ops[0]._id}`
                db.collection('scores').insert(score80, function(err, secondScore) {
                  app
                  .get('/scores?populate=device')
                  .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(2)
                    expect(res.body.data[0]._id).to.have.string(firstScore.ops[0]._id)
                    expect(res.body.data[1]._id).to.have.string(secondScore.ops[0]._id)
                    expect(res.body.data[0].device).to.be.an('object')
                    expect(res.body.data[1].device).to.be.an('object')
                    expect(res.statusCode).to.be.equal(200)
                    done()
                  })
                })
              })
            })
          })
        })
      })
    })

    it('should populate the scores with scenarios', function(done) {
      db.collection('devices').insert(device530, function(err, firstDevice) {
        db.collection('devices').insert(device960M, function(err, secondDevice) {
          db.collection('scenarios').insert(scenarioForce, function(err, firstScenario) {
            db.collection('scenarios').insert(scenarioEnterprise, function(err, secondScenario) {
              score40.device = `${firstDevice.ops[0]._id}`
              score40.scenario = `${firstScenario.ops[0]._id}`
              db.collection('scores').insert(score40, function(err, firstScore) {
                score80.device = `${secondDevice.ops[0]._id}`
                score80.scenario = `${secondScenario.ops[0]._id}`
                db.collection('scores').insert(score80, function(err, secondScore) {
                  app
                  .get('/scores?populate=scenario')
                  .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(2)
                    expect(res.body.data[0]._id).to.have.string(firstScore.ops[0]._id)
                    expect(res.body.data[1]._id).to.have.string(secondScore.ops[0]._id)
                    expect(res.body.data[0].scenario).to.be.an('object')
                    expect(res.body.data[1].scenario).to.be.an('object')
                    expect(res.statusCode).to.be.equal(200)
                    done()
                  })
                })
              })
            })
          })
        })
      })
    })

    it('should populate the scores with devices and scenarios', function(done) {
      db.collection('devices').insert(device530, function(err, firstDevice) {
        db.collection('devices').insert(device960M, function(err, secondDevice) {
          db.collection('scenarios').insert(scenarioForce, function(err, firstScenario) {
            db.collection('scenarios').insert(scenarioEnterprise, function(err, secondScenario) {
              score40.device = `${firstDevice.ops[0]._id}`
              score40.scenario = `${firstScenario.ops[0]._id}`
              db.collection('scores').insert(score40, function(err, firstScore) {
                score80.device = `${secondDevice.ops[0]._id}`
                score80.scenario = `${secondScenario.ops[0]._id}`
                db.collection('scores').insert(score80, function(err, secondScore) {
                  app
                  .get('/scores?populate=device&populate=scenario')
                  .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(2)
                    expect(res.body.data[0]._id).to.have.string(firstScore.ops[0]._id)
                    expect(res.body.data[1]._id).to.have.string(secondScore.ops[0]._id)
                    expect(res.body.data[0].device).to.be.an('object')
                    expect(res.body.data[1].device).to.be.an('object')
                    expect(res.body.data[0].scenario).to.be.an('object')
                    expect(res.body.data[1].scenario).to.be.an('object')
                    expect(res.statusCode).to.be.equal(200)
                    done()
                  })
                })
              })
            })
          })
        })
      })
    })

    it('should group the scores by devices', function(done) {
      db.collection('devices').insert(device530, function(err, firstDevice) {
        db.collection('devices').insert(device960M, function(err, secondDevice) {
          db.collection('scenarios').insert(scenarioForce, function(err, firstScenario) {
            db.collection('scenarios').insert(scenarioEnterprise, function(err, secondScenario) {
              score40.device = `${firstDevice.ops[0]._id}`
              score40.scenario = `${firstScenario.ops[0]._id}`
              db.collection('scores').insert(score40, function(err, firstScore) {
                score80.device = `${firstDevice.ops[0]._id}`
                score80.scenario = `${secondScenario.ops[0]._id}`
                db.collection('scores').insert(score80, function(err, secondScore) {
                  app
                  .get('/scores?group=device')
                  .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(1)
                    expect(res.body.data[0]._id.device).to.have.string(firstDevice.ops[0]._id)
                    expect(res.body.data[0].averageFps).to.be.equal(60)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                  })
                })
              })
            })
          })
        })
      })
    })

    it('should group the scores by scenarios', function(done) {
      db.collection('devices').insert(device530, function(err, firstDevice) {
        db.collection('devices').insert(device960M, function(err, secondDevice) {
          db.collection('scenarios').insert(scenarioForce, function(err, firstScenario) {
            db.collection('scenarios').insert(scenarioEnterprise, function(err, secondScenario) {
              score40.device = `${firstDevice.ops[0]._id}`
              score40.scenario = `${firstScenario.ops[0]._id}`
              db.collection('scores').insert(score40, function(err, firstScore) {
                score80.device = `${secondDevice.ops[0]._id}`
                score80.scenario = `${firstScenario.ops[0]._id}`
                db.collection('scores').insert(score80, function(err, secondScore) {
                  app
                  .get('/scores?group=scenario')
                  .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(1)
                    expect(res.body.data[0]._id.scenario).to.have.string(firstScenario.ops[0]._id)
                    expect(res.body.data[0].averageFps).to.be.equal(60)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                  })
                })
              })
            })
          })
        })
      })
    })

    it('should group the scores by devices and scenarios', function(done) {
      db.collection('devices').insert(device530, function(err, firstDevice) {
        db.collection('devices').insert(device960M, function(err, secondDevice) {
          db.collection('scenarios').insert(scenarioForce, function(err, firstScenario) {
            db.collection('scenarios').insert(scenarioEnterprise, function(err, secondScenario) {
              score40.device = `${firstDevice.ops[0]._id}`
              score40.scenario = `${firstScenario.ops[0]._id}`
              db.collection('scores').insert(score40, function(err, firstScore) {
                score80.device = `${firstDevice.ops[0]._id}`
                score80.scenario = `${firstScenario.ops[0]._id}`
                db.collection('scores').insert(score80, function(err, secondScore) {
                  app
                  .get('/scores?group=device&group=scenario')
                  .end(function(err, res) {
                    expect(res.body.data.length).to.be.equal(1)
                    expect(res.body.data[0]._id.device).to.have.string(firstDevice.ops[0]._id)
                    expect(res.body.data[0]._id.scenario).to.have.string(firstScenario.ops[0]._id)
                    expect(res.body.data[0].averageFps).to.be.equal(60)
                    expect(res.statusCode).to.be.equal(200)
                    done()
                  })
                })
              })
            })
          })
        })
      })
    })
  })

  describe('GET /scores/:id', function() {
    it('should return one score', function(done) {
      db.collection('devices').insert(device530, function(err, device) {
        db.collection('scenarios').insert(scenarioForce, function(err, scenario) {
          score40.device = `${device.ops[0]._id}`
          score40.scenario = `${scenario.ops[0]._id}`
          db.collection('scores').insert(score40, function(err, score) {
            app
            .get('/scores/' + score.ops[0]._id)
            .end(function(err, res) {
              expect(res.body.length).to.be.equal(1)
              expect(res.body[0]._id).to.have.string(score.ops[0]._id)
              expect(res.body[0].nbFrames).to.be.equal(score.ops[0].nbFrames)
              expect(res.body[0].averageFps).to.be.equal(score.ops[0].averageFps)
              expect(res.body[0].device).to.have.string(device.ops[0]._id)
              expect(res.body[0].scenario).to.have.string(scenario.ops[0]._id)
              expect(res.statusCode).to.be.equal(200)
              done()
            })
          })
        })
      })
    })
  })

  describe('POST /scores', function() {
    it('should create a score', function(done) {
      db.collection('devices').insert(device530, function(err, device) {
        db.collection('scenarios').insert(scenarioForce, function(err, scenario) {
          score40.device = device.ops[0]._id
          score40.scenario = scenario.ops[0]._id
          app
          .post('/scores')
          .send(score40)
          .end(function(err, res) {
            expect(res.body._id).to.not.be.null
            expect(res.statusCode).to.be.equal(201)
            done()
          })
        })
      })
    })
  })

})
