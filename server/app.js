const cors = require('cors')
const loggingMiddleware = require('express-pino-logger')()
const logger = require('pino')()
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const { db } = require('./models/db')

db.sync({ force: false }).then(() => {
  logger.info('database tables created')
})

const app = express()

app.use(cors())
app.use(loggingMiddleware)
app.use(bodyParser.json())

app.listen(config.PORT, () => {
  logger.info(`http server listening on port ${config.PORT}`)
})

require('./api/auth')(app, '/api')
require('./api/user')(app, '/api/user')
require('./api/test')(app, '/api/test')
require('./api/testRun')(app, '/api/testRun')
require('./api/question')(app, '/api/question')
