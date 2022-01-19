const { response } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const apitest = supertest(app)

const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10
    }
]

beforeEach(async () => {
    await blog.deleteMany({})
    var Blogs = new blog(blogs[0])
    await Blogs.save()
    Blogs = new blog(blogs[1])
    await Blogs.save()
    Blogs = new blog(blogs[2])
    await Blogs.save()
    Blogs = new blog(blogs[3])
    await Blogs.save()
})

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

test('testing blogilista api that POST works and added data is in the GET request response',  async () => {
    var newBlog = {
        title: "Harry Potter is real",
        author: "J.K. Rowling",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmlll",
        likes: 530
    }

    await apitest
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', 'application\/json; charset=utf-8')

    var response = await apitest.get('/api/blogs')
    var contents = response.body.map(r => r.author)

    expect(response.body).toHaveLength(blogs.length + 1)
    expect(contents).toContainEqual('J.K. Rowling')
})

test('testing blogilista api that POST works and final data contains likes field',  async () => {

    var newBlog = {
        title: "Suomi takaisin",
        author: "J. Halla-aho",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmlls",
    }

    await apitest
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', 'application\/json; charset=utf-8')

    var response = await apitest.get('/api/blogs')

    expect(response.body[blogs.length]["likes"]).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})