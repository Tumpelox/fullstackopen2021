const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const morgan = require('morgan')

morgan.token('content', (req) => {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] :content - :response-time ms'))
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/blogs', blogsRouter)

if (process.env.NODE_ENV === "test" ) {
    const testsRouter = require('./controllers/tests')
    app.use('/api/testing', testsRouter)
}

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

mongoose.connect(config.MONGO_URI)

module.exports = app