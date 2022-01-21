const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    var blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    var result = await blog.save()
    response.json(result)
})

blogsRouter.put('/:id', async (request, response) => {
    var result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})
  

module.exports = blogsRouter