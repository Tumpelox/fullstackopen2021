const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body
    if ( !( "password" in body ) || body.password.length < 3 ) {
        response.status(400).json({ error: "password does not meet requirements. (it must be at least 3 characters long)" })
    } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()

    const userForToken = {
        username: user.username,
        id: savedUser.id
    }

    const token = await jwt.sign(userForToken, config.SECRET)

    response.status(200).send({token, username: user.username, name: user.name})
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate({
        path: 'blogs',
        select: 'title author url likes _id'
    })
    response.json(users)
})

module.exports = usersRouter