const _ = require('lodash')

const { logged } = require('./utils')
const { Question, Test } = require('../models/db')

async function getTests(req, res) {
  const testEntity = await Test.findAll({
    include: [{ model: Question }],
    order: [[Question, 'order', 'ASC']],
    where: { userId: req.user.id }
  })

  res.json(testEntity)
}

async function getTest(req, res) {
  const testEntity = await Test.findOne({
    include: [{ model: Question }],
    order: [[Question, 'order', 'ASC']],
    where: { id: req.params.id }
  })

  res.json(testEntity)
}

async function createTest(req, res) {
  const { name: nameInput, questions: questionsInput } = req.body
  let questionsEntity = []
  const testEntity = await Test.create({
    name: nameInput,
    userId: req.user.id
  })

  if (questionsInput && questionsInput.length > 0) {
    questionsEntity = _.sortBy(
      await Promise.all(
        questionsInput.map(question =>
          Question.create({ ...question, testId: testEntity.id })
        )
      ),
      ['order']
    )
  }

  res.json({ ...testEntity.dataValues, questions: questionsEntity })
}

async function deleteTest(req, res) {
  const testEntity = await Test.findOne({ where: { id: req.params.id } })

  if (!testEntity) {
    res.statusCode = 404
    res.json()
  }

  testEntity.destroy()

  res.json()
}

async function updateTestEntity(testEntity, testInput) {
  Object.keys(testInput).forEach(key => {
    if (testInput[key]) {
      // eslint-disable-next-line no-param-reassign
      testEntity[key] = testInput[key]
    }
  })

  return testEntity.save()
}

async function updateTest(req, res) {
  const { test: testInput } = req.body
  const testEntity = await Test.findOne({ where: { id: req.params.id } })

  await updateTestEntity(testEntity, testInput)

  res.json(testEntity)
}

module.exports = (app, prefix) => {
  app.get(prefix, logged(getTests))
  app.get(`${prefix}/:id`, logged(getTest))
  app.post(prefix, logged(createTest))
  app.delete(`${prefix}/:id`, logged(deleteTest))
  app.put(`${prefix}/:id`, logged(updateTest))
}
