const uuidv4 = require('uuid/v4')

const { logged } = require('./utils')
const { Test, TestRun, Question } = require('../models/db')

async function getTestsRun(req, res) {
  const testRunEntity = await TestRun.findAll({
    include: [{ model: Test, where: { userId: req.user.id } }]
  })

  res.json(testRunEntity)
}

async function getTestRun(req, res) {
  const testRunEntity = await TestRun.findOne({
    include: {
      model: Test,
      include: {
        model: Question
      }
    },
    order: [[Test, Question, 'order', 'ASC']],
    where: { uuid: req.params.uuid }
  })

  if (!testRunEntity) {
    res.statusCode = 404
    res.json()
  }

  if (testRunEntity.startedDate) {
    const limitDate =
      new Date(testRunEntity.startedDate).getTime() +
      testRunEntity.maxTimeToComplete

    if (limitDate < new Date().getTime()) {
      res.statusCode = 500
      res.json('Time limit exceeded')
    }
  } else {
    testRunEntity.startedDate = new Date()
    testRunEntity.save()
  }

  res.json(testRunEntity)
}

async function createTestRun(req, res) {
  const uuid = uuidv4()
  const testRunEntity = await TestRun.create({ ...req.body, uuid })

  res.json(testRunEntity)
}

async function deleteTestRun(req, res) {
  const testRunEntity = await TestRun.findOne({
    where: { uuid: req.params.uuid }
  })

  if (!testRunEntity) {
    res.statusCode = 404
    res.json()
  }

  testRunEntity.destroy()
  res.json()
}

async function updateTestRunEntity(testRunEntity, testRunInput) {
  Object.keys(testRunInput).forEach(key => {
    if (testRunInput[key]) {
      // eslint-disable-next-line no-param-reassign
      testRunEntity[key] = testRunInput[key]
    }
  })

  return testRunEntity.save()
}

async function updateTestRun(req, res) {
  const { ...testRunInput } = req.body

  const testRunEntity = await TestRun.findOne({
    where: { uuid: req.params.uuid }
  })
  await updateTestRunEntity(testRunEntity, testRunInput)
  res.json(testRunEntity)
}

module.exports = (app, prefix) => {
  app.get(prefix, logged(getTestsRun))
  app.get(`${prefix}/:uuid`, getTestRun)
  app.post(prefix, logged(createTestRun))
  app.delete(`${prefix}/:uuid`, logged(deleteTestRun))
  app.put(`${prefix}/:uuid`, updateTestRun)
}
