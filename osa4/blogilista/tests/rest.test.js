const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const apitest = supertest(app)
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    }
]
var token = ""
beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('salainen', 10)
    const user  = new User({
        username: 'root',
        passwordHash: passwordHash
    })
    
    const initialUser = await user.save()

    const userForToken = {
        username: user.username,
        id: initialUser._id.toString()
    }
    
    token = "Bearer " + await jwt.sign(userForToken, config.SECRET)

    const loadedBlogs = await Blog.insertMany( blogs.map( b => { b.user = initialUser._id.toString(); return b } ) )
    await User.findByIdAndUpdate(
        {_id: initialUser._id.toString()}, 
        { $push: { blogs: loadedBlogs.map(b => b._id) } });
})

describe('when there is certain data in the database', () => {

    test('testing blogilista api GET status and content-type', async () => {
        await apitest
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', 'application\/json; charset=utf-8')
    })

    test('testing blogilista api that all the blogs are in response', async () => {
        var response = await apitest.get('/api/blogs')

        expect(response.body).toHaveLength(blogs.length)
    })

    test('testing blogilista api that response contains right data', async () => {
        var response = await apitest.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('when new data is added to the database', () => { 
  test('testing blogilista API and that database contains all the new data',  async () => {
      var newBlog = {
          title: "Harry Potter is real",
          author: "J.K. Rowling",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmlll",
          likes: 530
      }

      await apitest
          .post('/api/blogs')
          .set('Authorization', token )
          .send(newBlog)
          .expect(200)
          .expect('Content-Type', 'application\/json; charset=utf-8')

      var response = await apitest.get('/api/blogs')

      var contents = response.body.map(r => r.author)

      expect(response.body).toHaveLength(blogs.length + 1)
      expect(contents).toContainEqual('J.K. Rowling')
  })

  test('testing blogilista api with incomplete data',  async () => {

      var newBlog = {
          title: "Suomi takaisin",
          author: "J. Halla Aho",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmlls"
      }

      await apitest
          .post('/api/blogs')
          .set('Authorization', token )
          .send(newBlog)
          .expect(200)
          .expect('Content-Type', 'application\/json; charset=utf-8')

      var response = await apitest.get('/api/blogs')

      expect(response.body[blogs.length]["likes"]).toBeDefined()
  })

  test('testing blogilista data validation with incorrect data',  async () => {

      var newBlog = {
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmllsd"
      }

      await apitest
          .post('/api/blogs')
          .set('Authorization', token )
          .send(newBlog)
          .expect(400)
  })
  test('testing blogilista api without token',  async () => {

    var newBlog = {
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmllsd"
    }

    await apitest
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})
})

describe('when data is deleted or modified in the database', () => { 
  test('testing blogilista api DELETE', async () => {
      var response = await apitest.get('/api/blogs')
      var id = response.body[0].id

      await apitest.delete(`/api/blogs/${id}`).set('Authorization', token ).expect(204)

      response = await apitest.get('/api/blogs')

      expect(response.body).toHaveLength(blogs.length - 1)
  })

  test('testing blogilista api PUT', async () => {
      var response = await apitest.get('/api/blogs')
      var id = response.body[0].id

      var newBlog = {
          likes: 500
      }

      await apitest.put(`/api/blogs/${id}`).send(newBlog).set('Authorization', token )

      response = await apitest.get('/api/blogs')

      expect(response.body[0]['likes']).toBe(500)
  })
})

describe('when data is deleted or modified in the database', () => { 
  test('testing blogilista api DELETE', async () => {
      var response = await apitest.get('/api/blogs')
      var id = response.body[0].id

      await apitest.delete(`/api/blogs/${id}`).set('Authorization', token ).expect(204)

      response = await apitest.get('/api/blogs')

      expect(response.body).toHaveLength(blogs.length - 1)
  })

  test('testing blogilista api PUT', async () => {
      var response = await apitest.get('/api/blogs')
      var id = response.body[0].id

      var newBlog = {
          likes: 500
      }

      await apitest.put(`/api/blogs/${id}`).send(newBlog).set('Authorization', token )

      response = await apitest.get('/api/blogs')

      expect(response.body[0]['likes']).toBe(500)
  })
})

afterAll(() => {
  mongoose.connection.close()
})