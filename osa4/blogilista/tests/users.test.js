const { response } = require('express')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { use } = require('express/lib/router')
const apitest = supertest(app)

describe('when there is initially one user in the  database', () => { 
    beforeEach(async () => {
        await User.deleteMany({})
        
        const passwordHash = await bcrypt.hash('salainen', 10)
        const user  = new User({
            username: 'sudo su',
            passwordHash: passwordHash
        })

        await user.save()
    })
    test('creating new user with API', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            username: 'root',
            name: 'M. Hyppönen',
            password: 'password123'
        }

        await apitest
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', 'application\/json; charset=utf-8')

        const usersAtEnd = await User.find({})

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('trying to create new user with reserved username', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            username: 'sudo su',
            name: 'V. Putin',
            password: 'password123'
        }

        const result = await apitest
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', 'application\/json; charset=utf-8')

        expect(result.body.error).toContain('`username` to be unique')
        expect(usersAtStart).toHaveLength(usersAtStart.length)
    })
})
