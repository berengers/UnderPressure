const Sequelize = require('sequelize')
const config = require('../config')

const db = new Sequelize(config.DB, {})

const AuthToken = require('./authToken')(db, Sequelize)
const User = require('./user')(db, Sequelize)
const Test = require('./test')(db, Sequelize)
const Question = require('./question')(db, Sequelize)
const TestRun = require('./testRun')(db, Sequelize)

User.hasMany(Test, { onDelete: 'CASCADE' })
Test.belongsTo(User)
User.hasMany(AuthToken, { onDelete: 'CASCADE' })
AuthToken.belongsTo(User)
Test.hasMany(Question, { onDelete: 'CASCADE' })
Question.belongsTo(Test)
Test.hasMany(TestRun, { onDelete: 'CASCADE' })
TestRun.belongsTo(Test)

module.exports = {
  db,
  User,
  Test,
  AuthToken,
  Question,
  TestRun
}
