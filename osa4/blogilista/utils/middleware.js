const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'tietoa ei löytynyt' })
}

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformated id' })
    } else if (error.name === 'ValidationError') {
        console.log(error.name.message)
        return res.status(400).json({ error: error.message })
    }
    next(error)
}

module.exports = { unknownEndpoint, errorHandler }
