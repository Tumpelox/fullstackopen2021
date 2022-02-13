const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

router.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const passwordHash = await bcrypt.hash('salainen', 10)
  const user  = new User({
      username: 'root',
      name: 'super user',
      passwordHash: passwordHash
  })
  
  const initialUser = await user.save()

  response.status(204).end()
})

module.exports = router

