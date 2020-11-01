const { logged } = require('./utils')
const { User, Test } = require('../models/db')

function getUser(req, res) {
  User.findOne({
    where: { id: req.user.id },
    include: [{ model: Test }]
  })
    .then(user => {
      if (user) {
        const returnUser = {
          email: user.email,
          tests: user.tests
        }
        res.json(returnUser)
      } else {
        res.statusCode = 404
        res.json()
      }
    })
    .catch(error => {
      res.statusCode = 404
      res.json(error)
    })
}

function newUser(req, res) {
  const { email, password } = req.body

  User.create({ email, password })
    .then(() => {
      res.json()
    })
    .catch(error => {
      res.statusCode = 404
      res.json(error)
    })
}

function deleteUser(req, res) {
  User.findOne({ where: { id: req.user.id } })
    .then(user => {
      user.destroy()
      res.json()
    })
    .catch(error => {
      res.statusCode = 404
      res.json(error)
    })
}

function updateUser(req, res) {
  const { email, password } = req.body
  User.findOne({ where: { id: req.user.id } })
    .then(user => {
      const resultUser = { ...user }

      if (email) resultUser.email = email
      if (password) resultUser.password = password

      resultUser.save()
      res.json()
    })
    .catch(error => {
      res.statusCode = 404
      res.json(error)
    })
}

module.exports = (app, prefix) => {
  app.get(prefix, logged(getUser))
  app.post(prefix, newUser)
  app.delete(prefix, logged(deleteUser))
  app.put(prefix, logged(updateUser))
}
