const uuidv4 = require('uuid/v4')
const { db, User, Test, AuthToken, Question, TestRun } = require('./models/db')

const users = [
  { email: 'tom@tom.com', password: 'password' },
  { email: 'pierre@pierre.com', password: 'password' }
]

const tests = [
  {
    name: 'beginner',
    userId: 1
  },
  {
    name: 'intermediate',
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
    asserts: "it(square(3), 9)\nit(square('5'), 25)",
    code: 'function square (value) {\n    \n    \n}',
    instructions: 'You have to return square value',
    name: 'square',
    order: 2
  },
  {
    testId: 1,
    asserts: "it(double(3), 6)\nit(double(10), 20)\nit(double('3'), 6)",
    code: 'function double (value) {\n    \n    \n}',
    instructions: 'You have to return double value',
    name: 'double',
    order: 1
  },
  {
    testId: 1,
    asserts:
      "it(moveZeros([1,2,0,1,0,1,0,3,0,1]), [ 1, 2, 1, 1, 3, 1, 0, 0, 0, 0 ])\nit(moveZeros([1,2,0,1,0,1,'0',3,1]), [ 1, 2, 1, 1, 3, 1, 0, 0, 0 ])",
    code: 'const moveZeros = (arr) => {\n    // TODO: Program me\n}',
    instructions:
      'Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.\n\n\nmoveZeros([false,1,0,1,2,0,1,3,"a"]) //returns[false,1,1,2,1,3,"a",0,0]',
    name: 'double',
    order: 3
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
