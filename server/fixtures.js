const uuidv4 = require('uuid/v4')
const { db, User, Test, AuthToken, Question, TestRun } = require('./models/db')

const users = [
  { email: 'tom@tom.com', password: 'password' },
  { email: 'pierre@pierre.com', password: 'password' }
]

const tests = [
  {
    name: 'double',
    userId: 1
  },
  {
    name: 'square',
    userId: 1
  },
  {
    name: 'square',
    userId: 1
  },
  {
    name: 'square',
    userId: 1
  }
]

const testsRun = [
  {
    uuid: uuidv4(),
    maxTimeToComplete: 1800000,
    playerName: 'Arnaud Lopez',
    startedDate: new Date('2020-10-28'),
    testId: 1,
    timeToComplete: 900000
  },
  {
    uuid: uuidv4(),
    maxTimeToComplete: 1800000,
    playerName: 'Natalia Bergamote',
    testId: 1
  }
]

const tokens = [{ token: 'tom_token', userId: 1 }]

const questions = [
  {
    testId: 1,
    asserts: 'asserts(4)',
    code: 'function (value) {\n\n\n}',
    instructions: 'You have to return double value',
    name: 'double',
    order: 1
  },
  {
    testId: 1,
    asserts: 'asserts(4)',
    code: 'function (value) {\n\n\n}',
    instructions: 'You have to return double value',
    name: 'square',
    order: 3
  },
  {
    testId: 1,
    asserts: 'asserts(4)',
    code: 'function (value) {\n\n\n}',
    instructions: 'You have to return double value',
    name: 'double',
    order: 4
  },
  {
    testId: 1,
    asserts: 'asserts(4)',
    code: 'function (value) {\n\n\n}',
    instructions: 'You have to return double value',
    name: 'square',
    order: 2
  }
]

db.sync({ force: false })
  .then(() => Promise.all(users.map(user => User.create(user))))
  .then(() => Promise.all(tests.map(test => Test.create(test))))
  .then(() => Promise.all(testsRun.map(run => TestRun.create(run))))
  .then(() => Promise.all(tokens.map(token => AuthToken.create(token))))
  .then(() => Promise.all(questions.map(question => Question.create(question))))
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('fixtures inserted <------------------')
    process.exit()
  })
