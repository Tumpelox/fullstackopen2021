const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    var blogs = await Blog.find({}).populate({
        path: 'user',
        select: 'username name _id'
    })
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!request.token || !request.userId) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(request.userId)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id.toString()
    })

    var result = await blog.save()

    user.blogs = user.blogs.concat(result._id.toString())

    await User.findByIdAndUpdate(
        { _id: user._id.toString() }, 
        { $push: { blogs: result._id.toString() } });

    response.json(result)
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if ( !( blog.user.toString() === request.userId ) ) {
        return response.status(401).send({ error: 'user is unauthorized' })
    }

    const body = request.body

    const updatetBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    var result = await Blog.findByIdAndUpdate({_id: blog._id.toString()}, request.body, { new: true }).populate({
        path: 'user',
        select: 'username name _id'
    })
    response.json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if ( !( blog.user.toString() === request.userId ) ) {
        return response.status(401).send({ error: 'user is unauthorized' })
    }

    await Blog.findOneAndRemove({_id: blog._id.toString()})
    response.status(204).end()
})
  

module.exports = blogsRouter