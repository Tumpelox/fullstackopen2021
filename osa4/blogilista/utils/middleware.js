const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'tietoa ei löytynyt' })
}

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformated id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const token = (req) => {
        const auth = req.get("authorization")
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            return auth.substring(7)
        }
        return null
    }
    request.token = token(request)
    next()
}

const userExtractor = (request, response, next) => {
    const userId = (request) => {
        if (request.token) {
            return jwt.verify(request.token, config.SECRET).id
        }
        return null
    }
    request.userId = userId(request)
    next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor, userExtractor }
