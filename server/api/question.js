const { logged } = require('./utils')
const { Question } = require('../models/db')

async function getQuestion(req, res) {
  const { id } = req.params
  const questionEntity = await Question.findOne({ where: { id } })

  res.json(questionEntity)
}

async function createQuestion(req, res) {
  const questionEntity = await Question.create({ ...req.body })

  res.json(questionEntity)
}

async function deleteQuestion(req, res) {
  const { id } = req.params
  const questionEntity = await Question.findOne({ where: { id } })

  if (!questionEntity) {
    res.statusCode = 404
    res.json()
  }

  questionEntity.destroy()

  res.json()
}

async function updateQuestionEntity(questionEntity, questionInput) {
  Object.keys(questionInput).forEach(key => {
    if (questionInput[key]) {
      // eslint-disable-next-line no-param-reassign
      questionEntity[key] = questionInput[key]
    }
  })

  return questionEntity.save()
}

async function updateQuestion(req, res) {
  const questionInput = req.body
  const questionEntity = await Question.findOne({
    where: { id: req.params.id }
  })

  if (!questionEntity) {
    res.statusCode = 404
    res.json()
  }

  await updateQuestionEntity(questionEntity, questionInput)
  res.json(questionEntity)
}

module.exports = (app, prefix) => {
  app.get(`${prefix}/:id`, logged(getQuestion))
  app.post(prefix, logged(createQuestion))
  app.delete(`${prefix}/:id`, logged(deleteQuestion))
  app.put(`${prefix}/:id`, logged(updateQuestion))
}
